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
  initializeTributeConfig(): Promise<TributeConfig>;
  
  // Monetization ritual operations
  getRituals(status?: string): Promise<MonetizationRitual[]>;
  getRitual(id: number): Promise<MonetizationRitual | undefined>;
  createRitual(ritual: InsertMonetizationRitual): Promise<MonetizationRitual>;
  completeRitual(id: number, recommendedMode: string, insights: any): Promise<MonetizationRitual | undefined>;
  
  // Integrity operations
  getIntegrityChecks(limit?: number): Promise<IntegrityCheck[]>;
  getLatestIntegrityCheck(): Promise<IntegrityCheck | undefined>;
  recordIntegrityCheck(check: InsertIntegrityCheck): Promise<IntegrityCheck>;

  // Seed data operations - for initial setup
  seedDefaultData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Default data for initialization
  private defaultAgents = [
    {
      name: "Integrity Watcher",
      endpoint: "/api/integrity",
      status: "active",
      description: "Monitors domain integrity and detects violations."
    },
    {
      name: "Tribute Steward",
      endpoint: "/api/tribute",
      status: "active",
      description: "Manages flow tributes and monetization."
    },
    {
      name: "LLM Reflexologist",
      endpoint: "/api/reflexologist",
      status: "dormant",
      description: "Specialized AI agent for monitoring LLM operations."
    }
  ];

  private defaultTribute = {
    mode: "symbolic",
    creditsAccrued: 230,
    resourceUsageMB: 150,
    operationsTracked: 300,
  };

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
    const results = await db.select().from(agents);
    return results.length ? results : this.seedDefaultAgents();
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
    
    // Use a raw SQL condition for timestamp comparison
    return db.select()
      .from(systemMetrics)
      .where(sql`${systemMetrics.timestamp} >= NOW() - INTERVAL '${hours} HOURS'`)
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
    const configs = await db.select().from(tributeConfig);
    if (configs.length === 0) {
      return this.initializeTributeConfig();
    }
    return configs[0];
  }
  
  async initializeTributeConfig(): Promise<TributeConfig> {
    const [config] = await db.insert(tributeConfig)
      .values({
        mode: this.defaultTribute.mode,
        creditsAccrued: this.defaultTribute.creditsAccrued,
        resourceUsageMB: this.defaultTribute.resourceUsageMB,
        operationsTracked: this.defaultTribute.operationsTracked
      })
      .returning();
    return config;
  }
  
  async updateTributeMode(mode: string): Promise<TributeConfig | undefined> {
    const configs = await db.select().from(tributeConfig);
    
    if (configs.length > 0) {
      const [updated] = await db
        .update(tributeConfig)
        .set({ mode })
        .where(eq(tributeConfig.id, configs[0].id))
        .returning();
      return updated;
    } else {
      return this.initializeTributeConfig();
    }
  }
  
  async incrementTributeStats(credits: number, resourceMB: number, operations: number): Promise<TributeConfig | undefined> {
    const configs = await db.select().from(tributeConfig);
    
    if (configs.length > 0) {
      const [updated] = await db
        .update(tributeConfig)
        .set({
          creditsAccrued: sql`${tributeConfig.creditsAccrued} + ${credits}`,
          resourceUsageMB: sql`${tributeConfig.resourceUsageMB} + ${resourceMB}`,
          operationsTracked: sql`${tributeConfig.operationsTracked} + ${operations}`,
        })
        .where(eq(tributeConfig.id, configs[0].id))
        .returning();
      return updated;
    } else {
      return this.initializeTributeConfig();
    }
  }
  
  async getRituals(status?: string): Promise<MonetizationRitual[]> {
    if (status) {
      return db.select()
        .from(monetizationRituals)
        .where(eq(monetizationRituals.status, status))
        .orderBy(desc(monetizationRituals.startDate));
    }
    
    return db.select()
      .from(monetizationRituals)
      .orderBy(desc(monetizationRituals.startDate));
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
        completionDate: new Date(),
        recommendedMode,
        insights: insights
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

  // Helper methods for seeding default data
  private async seedDefaultAgents(): Promise<Agent[]> {
    const insertedAgents = await Promise.all(
      this.defaultAgents.map(agent => this.createAgent(agent))
    );
    return insertedAgents;
  }

  async seedDefaultData(): Promise<void> {
    // Seed agents
    const agentCount = await db.select({ count: sql`count(*)` }).from(agents);
    if (agentCount[0].count === "0") {
      await this.seedDefaultAgents();
    }

    // Seed tribute config
    const tributeCount = await db.select({ count: sql`count(*)` }).from(tributeConfig);
    if (tributeCount[0].count === "0") {
      await this.initializeTributeConfig();
    }

    // Create a sample log
    const logCount = await db.select({ count: sql`count(*)` }).from(activityLogs);
    if (logCount[0].count === "0") {
      await this.createLog({
        message: "System initialized with database storage",
        level: "info",
      });
    }
  }
}

// Initialize the database storage
export const storage = new DatabaseStorage();