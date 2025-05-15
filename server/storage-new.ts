import {
  User, InsertUser, users,
  Agent, InsertAgent, agents,
  ActivityLog, InsertActivityLog, activityLogs,
  SystemMetric, InsertSystemMetric, systemMetrics,
  TributeConfig, InsertTributeConfig, tributeConfig,
  MonetizationRitual, InsertMonetizationRitual, monetizationRituals,
  IntegrityCheck, InsertIntegrityCheck, integrityChecks
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, asc, lte, gte } from "drizzle-orm";

// Storage interface for all domain management operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Agent operations
  getAgents(): Promise<Agent[]>;
  getAgent(id: number): Promise<Agent | undefined>;
  getAgentByName(name: string): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgentStatus(id: number, status: string): Promise<Agent | undefined>;
  
  // Activity logs operations
  getLogs(limit?: number): Promise<ActivityLog[]>;
  getLogsByAgent(agentId: number, limit?: number): Promise<ActivityLog[]>;
  createLog(log: InsertActivityLog): Promise<ActivityLog>;
  
  // System metrics operations
  getLatestMetrics(): Promise<SystemMetric | undefined>;
  getMetricsHistory(hours: number): Promise<SystemMetric[]>;
  recordMetric(metric: InsertSystemMetric): Promise<SystemMetric>;
  
  // Tribute operations
  getTributeConfig(): Promise<TributeConfig | undefined>;
  updateTributeMode(mode: string): Promise<TributeConfig | undefined>;
  incrementTributeStats(credits: number, resourceMB: number, operations: number): Promise<TributeConfig | undefined>;
  
  // Monetization ritual operations
  getRituals(status?: string): Promise<MonetizationRitual[]>;
  getRitual(id: number): Promise<MonetizationRitual | undefined>;
  createRitual(ritual: InsertMonetizationRitual): Promise<MonetizationRitual>;
  completeRitual(id: number, recommendedMode: string, insights: any): Promise<MonetizationRitual | undefined>;
  
  // Integrity operations
  getIntegrityChecks(limit?: number): Promise<IntegrityCheck[]>;
  getLatestIntegrityCheck(): Promise<IntegrityCheck | undefined>;
  recordIntegrityCheck(check: InsertIntegrityCheck): Promise<IntegrityCheck>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async getAgents(): Promise<Agent[]> {
    return db.select().from(agents);
  }
  
  async getAgent(id: number): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent || undefined;
  }
  
  async getAgentByName(name: string): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.name, name));
    return agent || undefined;
  }
  
  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const [agent] = await db
      .insert(agents)
      .values(insertAgent)
      .returning();
    return agent;
  }
  
  async updateAgentStatus(id: number, status: string): Promise<Agent | undefined> {
    const [agent] = await db
      .update(agents)
      .set({ status })
      .where(eq(agents.id, id))
      .returning();
    return agent;
  }
  
  async getLogs(limit: number = 10): Promise<ActivityLog[]> {
    return db.select()
      .from(activityLogs)
      .orderBy(desc(activityLogs.timestamp))
      .limit(limit);
  }
  
  async getLogsByAgent(agentId: number, limit: number = 10): Promise<ActivityLog[]> {
    return db.select()
      .from(activityLogs)
      .where(eq(activityLogs.agentId, agentId))
      .orderBy(desc(activityLogs.timestamp))
      .limit(limit);
  }
  
  async createLog(insertLog: InsertActivityLog): Promise<ActivityLog> {
    const [log] = await db
      .insert(activityLogs)
      .values(insertLog)
      .returning();
    return log;
  }
  
  async getLatestMetrics(): Promise<SystemMetric | undefined> {
    const [metric] = await db.select()
      .from(systemMetrics)
      .orderBy(desc(systemMetrics.timestamp))
      .limit(1);
    return metric || undefined;
  }
  
  async getMetricsHistory(hours: number = 24): Promise<SystemMetric[]> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hours);
    
    return db.select()
      .from(systemMetrics)
      .where(sql`${systemMetrics.timestamp} >= ${cutoffTime}`)
      .orderBy(asc(systemMetrics.timestamp));
  }
  
  async recordMetric(insertMetric: InsertSystemMetric): Promise<SystemMetric> {
    const [metric] = await db
      .insert(systemMetrics)
      .values(insertMetric)
      .returning();
    return metric;
  }
  
  async getTributeConfig(): Promise<TributeConfig | undefined> {
    const [config] = await db.select()
      .from(tributeConfig)
      .limit(1);
    return config || undefined;
  }
  
  async updateTributeMode(mode: string): Promise<TributeConfig | undefined> {
    const [config] = await db.select().from(tributeConfig).limit(1);
    
    if (config) {
      const [updated] = await db
        .update(tributeConfig)
        .set({ mode })
        .where(eq(tributeConfig.id, config.id))
        .returning();
      return updated;
    }
    
    return undefined;
  }
  
  async incrementTributeStats(credits: number, resourceMB: number, operations: number): Promise<TributeConfig | undefined> {
    const [config] = await db.select().from(tributeConfig).limit(1);
    
    if (config) {
      const [updated] = await db
        .update(tributeConfig)
        .set({
          creditsAccrued: sql`${tributeConfig.creditsAccrued} + ${credits}`,
          resourceUsageMB: sql`${tributeConfig.resourceUsageMB} + ${resourceMB}`,
          operationsTracked: sql`${tributeConfig.operationsTracked} + ${operations}`,
        })
        .where(eq(tributeConfig.id, config.id))
        .returning();
      return updated;
    }
    
    return undefined;
  }
  
  async getRituals(status?: string): Promise<MonetizationRitual[]> {
    let query = db.select().from(monetizationRituals);
    
    if (status) {
      query = query.where(eq(monetizationRituals.status, status));
    }
    
    return query.orderBy(desc(monetizationRituals.createdAt));
  }
  
  async getRitual(id: number): Promise<MonetizationRitual | undefined> {
    const [ritual] = await db.select()
      .from(monetizationRituals)
      .where(eq(monetizationRituals.id, id));
    return ritual || undefined;
  }
  
  async createRitual(insertRitual: InsertMonetizationRitual): Promise<MonetizationRitual> {
    const [ritual] = await db
      .insert(monetizationRituals)
      .values(insertRitual)
      .returning();
    return ritual;
  }
  
  async completeRitual(id: number, recommendedMode: string, insights: any): Promise<MonetizationRitual | undefined> {
    const [ritual] = await db
      .update(monetizationRituals)
      .set({ 
        status: 'completed',
        completedAt: new Date().toISOString(),
        recommendedMode,
        insights: JSON.stringify(insights)
      })
      .where(eq(monetizationRituals.id, id))
      .returning();
    return ritual;
  }
  
  async getIntegrityChecks(limit: number = 10): Promise<IntegrityCheck[]> {
    return db.select()
      .from(integrityChecks)
      .orderBy(desc(integrityChecks.timestamp))
      .limit(limit);
  }
  
  async getLatestIntegrityCheck(): Promise<IntegrityCheck | undefined> {
    const [check] = await db.select()
      .from(integrityChecks)
      .orderBy(desc(integrityChecks.timestamp))
      .limit(1);
    return check || undefined;
  }
  
  async recordIntegrityCheck(insertCheck: InsertIntegrityCheck): Promise<IntegrityCheck> {
    const [check] = await db
      .insert(integrityChecks)
      .values(insertCheck)
      .returning();
    return check;
  }
}

// Initialize the database storage
export const storage = new DatabaseStorage();