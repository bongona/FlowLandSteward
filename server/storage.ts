import {
  User, InsertUser, users,
  Agent, InsertAgent, agents,
  ActivityLog, InsertActivityLog, activityLogs,
  SystemMetric, InsertSystemMetric, systemMetrics,
  TributeConfig, InsertTributeConfig, tributeConfig,
  MonetizationRitual, InsertMonetizationRitual, monetizationRituals,
  IntegrityCheck, InsertIntegrityCheck, integrityChecks
} from "@shared/schema";

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

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private agents: Map<number, Agent>;
  private logs: ActivityLog[];
  private metrics: SystemMetric[];
  private tributeConfigs: TributeConfig[];
  private rituals: MonetizationRitual[];
  private integrityChecks: IntegrityCheck[];
  private currentId: {
    user: number;
    agent: number;
    log: number;
    metric: number;
    tribute: number;
    ritual: number;
    integrity: number;
  };

  constructor() {
    // Initialize collections
    this.users = new Map();
    this.agents = new Map();
    this.logs = [];
    this.metrics = [];
    this.tributeConfigs = [];
    this.rituals = [];
    this.integrityChecks = [];
    
    // Initialize ID counters
    this.currentId = {
      user: 1,
      agent: 1,
      log: 1,
      metric: 1,
      tribute: 1,
      ritual: 1,
      integrity: 1
    };
    
    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default tribute config
    const defaultTribute: TributeConfig = {
      id: this.currentId.tribute++,
      mode: 'symbolic',
      creditsAccrued: 1287,
      resourceUsageMB: 324,
      operationsTracked: 5943,
      lastRitualDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      updatedAt: new Date()
    };
    this.tributeConfigs.push(defaultTribute);
    
    // Create default agents
    const integrityAgent: Agent = {
      id: this.currentId.agent++,
      name: 'Integrity Watcher',
      endpoint: '/integrity/monitor',
      status: 'active',
      description: 'Monitors system integrity and flags anomalies or policy violations',
      config: {},
      lastActive: new Date(),
      createdAt: new Date()
    };
    
    const tributeAgent: Agent = {
      id: this.currentId.agent++,
      name: 'Tribute Agent',
      endpoint: '/tribute/meter',
      status: 'metering',
      description: 'Manages and tracks system usage, applies tribute collection rules',
      config: {},
      lastActive: new Date(),
      createdAt: new Date()
    };
    
    const llmAgent: Agent = {
      id: this.currentId.agent++,
      name: 'LLM Reflexologist',
      endpoint: '/maintenance/analyze',
      status: 'dormant',
      description: 'Analyzes system patterns and proposes optimized monetization strategies',
      config: {},
      lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      createdAt: new Date()
    };
    
    this.agents.set(integrityAgent.id, integrityAgent);
    this.agents.set(tributeAgent.id, tributeAgent);
    this.agents.set(llmAgent.id, llmAgent);
    
    // Create some activity logs
    const logs: InsertActivityLog[] = [
      {
        agentId: integrityAgent.id,
        message: 'System integrity check completed successfully',
        level: 'info',
        metadata: {}
      },
      {
        agentId: tributeAgent.id,
        message: 'Metered 2.3MB of data exchange - symbolic credits +15',
        level: 'info',
        metadata: {}
      },
      {
        agentId: 3, // Resilience agent
        message: 'System health check: All systems nominal',
        level: 'info',
        metadata: {}
      },
      {
        agentId: 4, // Flow friction
        message: 'Resource usage spike detected - CPU usage 78%',
        level: 'warning',
        metadata: {}
      },
      {
        agentId: integrityAgent.id,
        message: 'Domain access verified - user authentication successful',
        level: 'info',
        metadata: {}
      },
      {
        agentId: tributeAgent.id,
        message: 'Tribute mode updated to "Symbolic Credits" by user',
        level: 'info',
        metadata: {}
      }
    ];
    
    logs.forEach(log => this.createLog(log));
    
    // Create default metrics
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const timestamp = new Date(now);
      timestamp.setHours(now.getHours() - 6 + i);
      
      const operations = [23, 42, 56, 63, 52, 35, 31][i];
      
      this.recordMetric({
        cpuUsage: Math.floor(Math.random() * 50) + 20,
        memoryUsage: Math.floor(Math.random() * 40) + 30,
        storageUsage: Math.floor(Math.random() * 30) + 10,
        networkUsage: Math.floor(Math.random() * 20) + 5,
        operationsCount: operations
      });
    }
    
    // Create default integrity check
    this.recordIntegrityCheck({
      status: 'healthy',
      integrity_score: 98,
      issues_found: 0,
      details: {
        metrics: [
          { name: 'System Integrity', value: 98 },
          { name: 'Data Sovereignty', value: 100 },
          { name: 'Resource Security', value: 95 },
          { name: 'Access Control', value: 97 }
        ],
        checksPerformed: 42,
        lastAnomaly: null,
        securityStatus: 'secure',
        checkFrequency: 'hourly',
        monitoringSettings: ['resource', 'network', 'file', 'auth']
      }
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.user++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Agent operations
  async getAgents(): Promise<Agent[]> {
    return Array.from(this.agents.values());
  }
  
  async getAgent(id: number): Promise<Agent | undefined> {
    return this.agents.get(id);
  }
  
  async getAgentByName(name: string): Promise<Agent | undefined> {
    return Array.from(this.agents.values()).find(
      (agent) => agent.name === name
    );
  }
  
  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const id = this.currentId.agent++;
    const now = new Date();
    const agent: Agent = { 
      ...insertAgent, 
      id, 
      lastActive: insertAgent.status === 'active' ? now : undefined,
      createdAt: now
    };
    this.agents.set(id, agent);
    return agent;
  }
  
  async updateAgentStatus(id: number, status: string): Promise<Agent | undefined> {
    const agent = this.agents.get(id);
    if (!agent) return undefined;
    
    agent.status = status;
    agent.lastActive = status === 'active' ? new Date() : agent.lastActive;
    this.agents.set(id, agent);
    
    return agent;
  }
  
  // Activity logs operations
  async getLogs(limit: number = 10): Promise<ActivityLog[]> {
    return this.logs.slice(-limit).reverse();
  }
  
  async getLogsByAgent(agentId: number, limit: number = 10): Promise<ActivityLog[]> {
    return this.logs
      .filter(log => log.agentId === agentId)
      .slice(-limit)
      .reverse();
  }
  
  async createLog(insertLog: InsertActivityLog): Promise<ActivityLog> {
    const id = this.currentId.log++;
    const now = new Date();
    const log: ActivityLog = {
      ...insertLog,
      id,
      timestamp: now
    };
    this.logs.push(log);
    return log;
  }
  
  // System metrics operations
  async getLatestMetrics(): Promise<SystemMetric | undefined> {
    return this.metrics.length ? this.metrics[this.metrics.length - 1] : undefined;
  }
  
  async getMetricsHistory(hours: number = 24): Promise<SystemMetric[]> {
    const now = new Date();
    const cutoff = new Date(now.getTime() - hours * 60 * 60 * 1000);
    
    return this.metrics.filter(metric => metric.timestamp >= cutoff);
  }
  
  async recordMetric(insertMetric: InsertSystemMetric): Promise<SystemMetric> {
    const id = this.currentId.metric++;
    const now = new Date();
    const metric: SystemMetric = {
      ...insertMetric,
      id,
      timestamp: now
    };
    this.metrics.push(metric);
    return metric;
  }
  
  // Tribute operations
  async getTributeConfig(): Promise<TributeConfig | undefined> {
    return this.tributeConfigs.length ? this.tributeConfigs[this.tributeConfigs.length - 1] : undefined;
  }
  
  async updateTributeMode(mode: string): Promise<TributeConfig | undefined> {
    const current = await this.getTributeConfig();
    if (!current) return undefined;
    
    const updated: TributeConfig = {
      ...current,
      mode,
      updatedAt: new Date()
    };
    
    this.tributeConfigs.push(updated);
    return updated;
  }
  
  async incrementTributeStats(credits: number, resourceMB: number, operations: number): Promise<TributeConfig | undefined> {
    const current = await this.getTributeConfig();
    if (!current) return undefined;
    
    const updated: TributeConfig = {
      ...current,
      creditsAccrued: current.creditsAccrued + credits,
      resourceUsageMB: current.resourceUsageMB + resourceMB,
      operationsTracked: current.operationsTracked + operations,
      updatedAt: new Date()
    };
    
    this.tributeConfigs.push(updated);
    return updated;
  }
  
  // Monetization ritual operations
  async getRituals(status?: string): Promise<MonetizationRitual[]> {
    if (status) {
      return this.rituals.filter(ritual => ritual.status === status);
    }
    return this.rituals;
  }
  
  async getRitual(id: number): Promise<MonetizationRitual | undefined> {
    return this.rituals.find(ritual => ritual.id === id);
  }
  
  async createRitual(insertRitual: InsertMonetizationRitual): Promise<MonetizationRitual> {
    const id = this.currentId.ritual++;
    const now = new Date();
    const ritual: MonetizationRitual = {
      ...insertRitual,
      id,
      startDate: now,
      completionDate: undefined,
      status: 'pending',
      recommendedMode: undefined,
      insights: undefined
    };
    this.rituals.push(ritual);
    
    // Update the last ritual date in tribute config
    const tributeConfig = await this.getTributeConfig();
    if (tributeConfig) {
      this.tributeConfigs.push({
        ...tributeConfig,
        lastRitualDate: now,
        updatedAt: now
      });
    }
    
    return ritual;
  }
  
  async completeRitual(id: number, recommendedMode: string, insights: any): Promise<MonetizationRitual | undefined> {
    const ritualIndex = this.rituals.findIndex(ritual => ritual.id === id);
    if (ritualIndex === -1) return undefined;
    
    const now = new Date();
    const updated: MonetizationRitual = {
      ...this.rituals[ritualIndex],
      completionDate: now,
      status: 'completed',
      recommendedMode,
      insights
    };
    
    this.rituals[ritualIndex] = updated;
    return updated;
  }
  
  // Integrity operations
  async getIntegrityChecks(limit: number = 10): Promise<IntegrityCheck[]> {
    return this.integrityChecks.slice(-limit).reverse();
  }
  
  async getLatestIntegrityCheck(): Promise<IntegrityCheck | undefined> {
    return this.integrityChecks.length ? this.integrityChecks[this.integrityChecks.length - 1] : undefined;
  }
  
  async recordIntegrityCheck(insertCheck: InsertIntegrityCheck): Promise<IntegrityCheck> {
    const id = this.currentId.integrity++;
    const now = new Date();
    const check: IntegrityCheck = {
      ...insertCheck,
      id,
      timestamp: now
    };
    this.integrityChecks.push(check);
    return check;
  }
}

// Instantiate the storage
export const storage = new MemStorage();
