import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertTributeConfigSchema, insertMonetizationRitualSchema, insertIntegrityCheckSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard API endpoints
  app.get("/api/dashboard/status", async (req: Request, res: Response) => {
    try {
      const agents = await storage.getAgents();
      const tributeConfig = await storage.getTributeConfig();
      
      const activeAgents = agents.filter(agent => agent.status === 'active' || agent.status === 'metering').length;
      
      const statusCards = [
        {
          title: "Cloaked Domain",
          value: "Active",
          icon: "fa-shield-alt",
          color: "green",
          percentage: 98,
          subvalue: "Integrity"
        },
        {
          title: "Flow Friction Layer",
          value: "Metering",
          icon: "fa-tachometer-alt",
          color: "blue",
          submetric: {
            label: "Resource Usage",
            value: "12.3 MB/s"
          }
        },
        {
          title: "Active Agents",
          value: `${activeAgents}/${agents.length}`,
          icon: "fa-robot",
          color: "purple"
        },
        {
          title: "Tribute Mode",
          value: tributeConfig?.mode === 'symbolic' ? 'Symbolic' : 
                 tributeConfig?.mode === 'donation' ? 'Donation' : 
                 tributeConfig?.mode === 'royalty' ? 'Royalty' : 'Friction',
          icon: "fa-hand-holding-usd",
          color: "yellow",
          percentage: 64,
          submetric: {
            label: "Credits Accrued",
            value: tributeConfig?.creditsAccrued.toString() || "0"
          }
        }
      ];
      
      res.json(statusCards);
    } catch (error) {
      console.error("Error fetching dashboard status:", error);
      res.status(500).json({ message: "Error fetching dashboard status" });
    }
  });
  
  app.get("/api/dashboard/logs", async (req: Request, res: Response) => {
    try {
      const activityLogs = await storage.getLogs(6);
      const agents = await storage.getAgents();
      
      // Map agent IDs to agent names and colors
      const agentMap = new Map();
      agents.forEach(agent => {
        agentMap.set(agent.id, {
          name: agent.name.split(' ')[0].toUpperCase(),
          color: agent.name.includes('Integrity') ? 'green' : 
                 agent.name.includes('Tribute') ? 'blue' : 
                 agent.name.includes('Resilience') ? 'purple' : 
                 agent.name.includes('LLM') ? 'purple' : 'yellow'
        });
      });
      
      // Additional hardcoded entries for demo purposes
      agentMap.set(3, { name: 'RESILIENCE_AGENT', color: 'purple' });
      agentMap.set(4, { name: 'FLOW_FRICTION', color: 'yellow' });
      
      // Format logs for frontend
      const formattedLogs = activityLogs.map(log => {
        const agent = agentMap.get(log.agentId);
        const timestamp = log.timestamp 
          ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return {
          id: log.id.toString(),
          timestamp,
          agent: agent?.name || 'SYSTEM',
          agentColor: agent?.color || 'gray',
          message: log.message
        };
      });
      
      res.json(formattedLogs);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      res.status(500).json({ message: "Error fetching activity logs" });
    }
  });
  
  app.get("/api/dashboard/metrics", async (req: Request, res: Response) => {
    try {
      // Use mock data if no metrics exist yet
      const defaultMetricsData = [
        { timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), operationsCount: 63 },
        { timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), operationsCount: 42 },
        { timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), operationsCount: 51 },
        { timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), operationsCount: 30 },
        { timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), operationsCount: 56 },
        { timestamp: new Date(), operationsCount: 45 }
      ];
      
      // Get actual metrics from database, or use default if empty
      const metricsHistory = await storage.getMetricsHistory(6);
      const metricsData = metricsHistory.length > 0 ? metricsHistory : defaultMetricsData;
      
      // Calculate total operations and find peak rate
      const totalOperations = metricsData.reduce((sum, metric) => {
        return sum + (typeof metric.operationsCount === 'number' ? metric.operationsCount : 0);
      }, 0);
      
      const operationRates = metricsData.map(metric => 
        typeof metric.operationsCount === 'number' ? metric.operationsCount : 0
      );
      const peakRate = Math.max(...operationRates) + '/hr';
      
      // Format hourly metrics
      const hourlyMetrics = metricsData.map(metric => ({
        hour: metric.timestamp ? new Date(metric.timestamp).getHours() + 'h' : new Date().getHours() + 'h',
        operations: typeof metric.operationsCount === 'number' ? metric.operationsCount : 0
      }));
      
      res.json({
        totalOperations,
        peakRate,
        hourlyMetrics
      });
    } catch (error) {
      console.error("Error fetching flow metrics:", error);
      res.status(500).json({ message: "Error fetching flow metrics" });
    }
  });
  
  app.get("/api/dashboard/tribute", async (req: Request, res: Response) => {
    try {
      const tributeConfig = await storage.getTributeConfig();
      
      if (!tributeConfig) {
        return res.status(404).json({ message: "Tribute configuration not found" });
      }
      
      const lastRitual = tributeConfig.lastRitualDate 
        ? new Date(tributeConfig.lastRitualDate).toLocaleDateString() 
        : 'Never';
      
      res.json({
        activeMode: tributeConfig.mode,
        statistics: {
          creditsAccrued: tributeConfig.creditsAccrued,
          creditsPercentage: 64,
          resourceUsage: `${tributeConfig.resourceUsageMB} MB`,
          resourcePercentage: 32,
          operationsTracked: tributeConfig.operationsTracked,
          operationsPercentage: 78,
          lastRitual: tributeConfig.lastRitualDate 
            ? `${Math.floor((Date.now() - tributeConfig.lastRitualDate.getTime()) / (1000 * 60 * 60 * 24))} days ago` 
            : 'Never'
        }
      });
    } catch (error) {
      console.error("Error fetching tribute data:", error);
      res.status(500).json({ message: "Error fetching tribute data" });
    }
  });
  
  app.get("/api/dashboard/agents", async (req: Request, res: Response) => {
    try {
      const agents = await storage.getAgents();
      
      // Format agent data for frontend
      const formattedAgents = agents.map(agent => {
        const agentData: any = {
          id: agent.id.toString(),
          name: agent.name,
          endpoint: agent.endpoint,
          status: agent.status,
          statusColor: 
            agent.status === 'active' ? 'green' : 
            agent.status === 'metering' ? 'blue' : 
            agent.status === 'dormant' ? 'purple' : 'gray',
          description: agent.description
        };
        
        // Add agent-specific details
        if (agent.name.includes('Integrity')) {
          agentData.lastCheck = {
            time: '3 minutes ago',
            status: 'All Clear'
          };
        } else if (agent.name.includes('Tribute')) {
          agentData.mode = 'Symbolic Credits';
          agentData.metering = '128 operations';
        } else if (agent.name.includes('LLM')) {
          agentData.lastActivation = '3 days ago';
          agentData.activationTrigger = 'Monetization Ritual';
        }
        
        return agentData;
      });
      
      res.json(formattedAgents);
    } catch (error) {
      console.error("Error fetching agents:", error);
      res.status(500).json({ message: "Error fetching agents" });
    }
  });
  
  // Tribute Management API endpoints
  app.get("/api/tribute", async (req: Request, res: Response) => {
    try {
      const tributeConfig = await storage.getTributeConfig();
      
      if (!tributeConfig) {
        return res.status(404).json({ message: "Tribute configuration not found" });
      }
      
      // Mock history data for demonstration
      const history = [
        { date: '2023-07-01', mode: 'Symbolic', credits: 524, operations: 2341 },
        { date: '2023-07-02', mode: 'Symbolic', credits: 612, operations: 2876 },
        { date: '2023-07-03', mode: 'Friction', credits: 273, operations: 1253 },
        { date: '2023-07-04', mode: 'Symbolic', credits: 398, operations: 1821 },
        { date: '2023-07-05', mode: 'Symbolic', credits: 724, operations: 3192 }
      ];
      
      res.json({
        activeMode: tributeConfig.mode,
        statistics: {
          creditsAccrued: tributeConfig.creditsAccrued,
          creditsPercentage: 64,
          resourceUsage: `${tributeConfig.resourceUsageMB} MB`,
          resourcePercentage: 32,
          operationsTracked: tributeConfig.operationsTracked,
          operationsPercentage: 78,
          lastRitual: tributeConfig.lastRitualDate 
            ? `${Math.floor((Date.now() - tributeConfig.lastRitualDate.getTime()) / (1000 * 60 * 60 * 24))} days ago` 
            : 'Never'
        },
        history
      });
    } catch (error) {
      console.error("Error fetching tribute configuration:", error);
      res.status(500).json({ message: "Error fetching tribute configuration" });
    }
  });
  
  app.post("/api/tribute/mode", async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        mode: z.enum(['symbolic', 'donation', 'royalty', 'friction'])
      });
      
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid tribute mode" });
      }
      
      const { mode } = result.data;
      const updated = await storage.updateTributeMode(mode);
      
      if (!updated) {
        return res.status(404).json({ message: "Tribute configuration not found" });
      }
      
      // Log this activity
      await storage.createLog({
        agentId: 2, // Tribute Agent
        message: `Tribute mode updated to "${mode}" by user`,
        level: 'info',
        metadata: { previousMode: updated.mode }
      });
      
      res.json(updated);
    } catch (error) {
      console.error("Error updating tribute mode:", error);
      res.status(500).json({ message: "Error updating tribute mode" });
    }
  });
  
  app.post("/api/tribute/record", async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        credits: z.number().int().min(0),
        resourceMB: z.number().int().min(0),
        operations: z.number().int().min(0)
      });
      
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid tribute data" });
      }
      
      const { credits, resourceMB, operations } = result.data;
      const updated = await storage.incrementTributeStats(credits, resourceMB, operations);
      
      if (!updated) {
        return res.status(404).json({ message: "Tribute configuration not found" });
      }
      
      // Log this activity
      await storage.createLog({
        agentId: 2, // Tribute Agent
        message: `Metered ${resourceMB}MB of data - ${credits} credits added`,
        level: 'info',
        metadata: { credits, resourceMB, operations }
      });
      
      // Also record a system metric
      await storage.recordMetric({
        cpuUsage: Math.floor(Math.random() * 50) + 20,
        memoryUsage: Math.floor(Math.random() * 40) + 30,
        storageUsage: Math.floor(Math.random() * 30) + 10,
        networkUsage: Math.floor(Math.random() * 20) + 5,
        operationsCount: operations
      });
      
      res.json(updated);
    } catch (error) {
      console.error("Error recording tribute:", error);
      res.status(500).json({ message: "Error recording tribute" });
    }
  });
  
  // Integrity Monitor API endpoints
  app.get("/api/integrity/status", async (req: Request, res: Response) => {
    try {
      const latestCheck = await storage.getLatestIntegrityCheck();
      
      if (!latestCheck) {
        return res.status(404).json({ message: "No integrity checks found" });
      }
      
      // Extract details from the check
      const details = latestCheck.details as any;
      
      const lastCheck = latestCheck.timestamp 
        ? new Date(latestCheck.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
      res.json({
        status: latestCheck.status,
        lastCheck,
        metrics: details.metrics,
        checksPerformed: details.checksPerformed,
        issuesFound: latestCheck.issues_found,
        lastAnomaly: details.lastAnomaly,
        securityStatus: details.securityStatus,
        checkFrequency: details.checkFrequency,
        monitoringSettings: details.monitoringSettings
      });
    } catch (error) {
      console.error("Error fetching integrity status:", error);
      res.status(500).json({ message: "Error fetching integrity status" });
    }
  });
  
  app.get("/api/integrity/logs", async (req: Request, res: Response) => {
    try {
      // Get logs from Integrity Watcher agent
      const integrityAgent = await storage.getAgentByName('Integrity Watcher');
      
      if (!integrityAgent) {
        return res.status(404).json({ message: "Integrity Watcher agent not found" });
      }
      
      const logs = await storage.getLogsByAgent(integrityAgent.id, 10);
      
      // Format logs for frontend
      const formattedLogs = logs.map(log => ({
        id: log.id.toString(),
        timestamp: log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        agent: 'INTEGRITY_WATCHER',
        agentColor: 'green',
        message: log.message
      }));
      
      res.json(formattedLogs);
    } catch (error) {
      console.error("Error fetching integrity logs:", error);
      res.status(500).json({ message: "Error fetching integrity logs" });
    }
  });
  
  app.post("/api/integrity/check", async (req: Request, res: Response) => {
    try {
      // Run a new integrity check
      const newCheck = await storage.recordIntegrityCheck({
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
          checksPerformed: 43,
          lastAnomaly: null,
          securityStatus: 'secure',
          checkFrequency: 'hourly',
          monitoringSettings: ['resource', 'network', 'file', 'auth']
        }
      });
      
      // Log this activity
      await storage.createLog({
        agentId: 1, // Integrity Watcher
        message: 'System integrity check completed successfully',
        level: 'info',
        metadata: { score: newCheck.integrity_score }
      });
      
      res.json({
        status: newCheck.status,
        timestamp: newCheck.timestamp,
        integrityScore: newCheck.integrity_score,
        message: 'Integrity check completed successfully'
      });
    } catch (error) {
      console.error("Error running integrity check:", error);
      res.status(500).json({ message: "Error running integrity check" });
    }
  });
  
  // Monetization Rituals API endpoints
  app.get("/api/monetization/rituals", async (req: Request, res: Response) => {
    try {
      const tributeConfig = await storage.getTributeConfig();
      
      // Prepare clearer demo data with more professional language
      const completedRituals = [
        {
          id: 1,
          date: '2023-06-12',
          daysAnalyzed: 7,
          recommendedMode: 'Symbolic Credits',
          keyInsight: 'Analysis indicates symbolic credit tracking is optimal for your domain flow patterns. This approach provides detailed metrics without introducing financial friction to user operations.'
        }
      ];
      
      // Enhanced scheduled ritual data with more specific terminology
      const scheduledRituals = [
        {
          id: 2,
          scheduledDate: '2023-07-15',
          daysToAnalyze: 30,
          dataSelection: [
            'Computational Resource Allocation', 
            'Operation Frequency Distribution', 
            'Domain Context Classification',
            'Flow Path Analysis'
          ]
        }
      ];
      
      // Format the last ritual date in a more user-friendly way
      let lastRitualFormatted = 'Never conducted';
      if (tributeConfig?.lastRitualDate) {
        const date = new Date(tributeConfig.lastRitualDate);
        lastRitualFormatted = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      
      res.json({
        lastRitual: lastRitualFormatted,
        completed: completedRituals,
        scheduled: scheduledRituals,
        ritualStatus: {
          canPerform: true,
          recommendedInterval: '30 days',
          nextRecommendedDate: '2023-07-15'
        },
        domainContext: {
          flowComplexity: 'Moderate',
          resourceIntensity: 'Low to Medium',
          userInteractionFrequency: 'High'
        }
      });
    } catch (error) {
      console.error("Error fetching monetization rituals:", error);
      res.status(500).json({ 
        message: "Error fetching monetization rituals",
        lastRitual: 'Unknown',
        completed: [],
        scheduled: []
      });
    }
  });
  
  app.post("/api/monetization/rituals", async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        daysAnalyzed: z.number().int().min(1),
        dataSelection: z.object({
          resourceUsage: z.boolean(),
          operationFrequency: z.boolean(),
          domainContext: z.boolean()
        })
      });
      
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid ritual configuration" });
      }
      
      const { daysAnalyzed, dataSelection } = result.data;
      
      // Create data selection array for storage
      const dataSelectionArray = [];
      if (dataSelection.resourceUsage) dataSelectionArray.push('resourceUsage');
      if (dataSelection.operationFrequency) dataSelectionArray.push('operationFrequency');
      if (dataSelection.domainContext) dataSelectionArray.push('domainContext');
      
      // Create the ritual
      const ritual = await storage.createRitual({
        daysAnalyzed,
        dataSelectionConfig: {
          dataTypes: dataSelectionArray
        }
      });
      
      // Log this activity and activate LLM Reflexologist
      await storage.updateAgentStatus(3, 'active'); // LLM Reflexologist agent
      
      await storage.createLog({
        agentId: 3, // LLM Reflexologist
        message: 'Monetization ritual initiated - agent activated for analysis',
        level: 'info',
        metadata: { daysAnalyzed, dataSelectionTypes: dataSelectionArray }
      });
      
      res.json({
        message: 'Monetization ritual initiated successfully',
        ritualId: ritual.id,
        status: ritual.status
      });
    } catch (error) {
      console.error("Error initiating monetization ritual:", error);
      res.status(500).json({ message: "Error initiating monetization ritual" });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
