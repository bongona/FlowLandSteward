import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import StatusCard from "@/components/dashboard/StatusCard";
import ActivityLog from "@/components/dashboard/ActivityLog";
import FlowMetricsChart from "@/components/dashboard/FlowMetricsChart";
import TributeManagement from "@/components/dashboard/TributeManagement";
import AgentCard from "@/components/layout/AgentCard";
import InlineHelp from "@/components/ui/InlineHelp";

export default function Dashboard() {
  const { 
    data: statusCards,
    isLoading: statusLoading 
  } = useQuery({
    queryKey: ['/api/dashboard/status'],
  });

  const { 
    data: logs,
    isLoading: logsLoading 
  } = useQuery({
    queryKey: ['/api/dashboard/logs'],
  });

  const { 
    data: flowMetrics,
    isLoading: metricsLoading 
  } = useQuery({
    queryKey: ['/api/dashboard/metrics'],
  });

  const { 
    data: tributeData,
    isLoading: tributeLoading 
  } = useQuery({
    queryKey: ['/api/dashboard/tribute'],
  });

  const { 
    data: agents,
    isLoading: agentsLoading 
  } = useQuery({
    queryKey: ['/api/dashboard/agents'],
  });

  return (
    <section className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Domain Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitoring and managing your sovereign domain</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="default" className="flex items-center space-x-2">
            <i className="fas fa-sync-alt"></i>
            <span>Refresh Metrics</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <i className="fas fa-download"></i>
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-full flex items-center mb-2">
          <h3 className="text-lg font-medium">System Status</h3>
          <InlineHelp topic="status-cards" position="dashboard" />
        </div>
        {statusLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white dark:bg-neutral shadow rounded-lg p-4 animate-pulse">
              <div className="h-16"></div>
            </div>
          ))
        ) : (
          statusCards.map((card, index) => (
            <StatusCard key={index} data={card} />
          ))
        )}
      </div>
      
      {/* Recent Activity & Flow Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium">Activity Log</h3>
            <InlineHelp topic="activity-log" position="dashboard" />
          </div>
          <ActivityLog logs={logs || []} isLoading={logsLoading} />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium">Flow Metrics</h3>
            <InlineHelp topic="metrics" position="dashboard" />
          </div>
          <FlowMetricsChart 
            data={flowMetrics || { totalOperations: 0, peakRate: "0/hr", hourlyMetrics: [] }} 
            isLoading={metricsLoading} 
          />
        </div>
      </div>
      
      {/* Tribute Management */}
      <div className="mt-2">
        <div className="flex items-center mb-2">
          <h3 className="text-lg font-medium">Tribute Management</h3>
          <InlineHelp topic="mode-selection" position="tribute" />
        </div>
        
        {tributeLoading ? (
          <div className="bg-white dark:bg-neutral shadow rounded-lg p-6 animate-pulse">
            <div className="h-64"></div>
          </div>
        ) : (
          <TributeManagement 
            activeMode={tributeData?.activeMode} 
            statistics={tributeData?.statistics}
            onModeChange={(mode) => console.log("Mode changed to:", mode)}
          />
        )}
      </div>
      
      {/* Agent Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <div className="col-span-full flex items-center mb-2">
          <h3 className="text-lg font-medium">Domain Agents</h3>
          <InlineHelp topic="agent-status" position="agents" />
        </div>
        
        {agentsLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-white dark:bg-neutral shadow rounded-lg p-4 animate-pulse">
              <div className="h-48"></div>
            </div>
          ))
        ) : (
          agents?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))
        )}
      </div>
    </section>
  );
}
