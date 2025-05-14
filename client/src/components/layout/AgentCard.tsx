import { Button } from "@/components/ui/button";
import { Agent } from "@/lib/types";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const statusColors = {
    active: "green",
    metering: "blue",
    dormant: "gray",
    inactive: "gray"
  };
  
  const borderColor = 
    agent.status === 'active' ? 'green' : 
    agent.status === 'metering' ? 'blue' : 
    agent.status === 'dormant' ? 'purple' : 'gray';
  
  const statusClass = `bg-${statusColors[agent.status]}-100 text-${statusColors[agent.status]}-800 dark:bg-${statusColors[agent.status]}-900 dark:text-${statusColors[agent.status]}-200`;
  
  return (
    <div className={`agent-card bg-white dark:bg-neutral-dark shadow rounded-lg overflow-hidden border-t-4 border-${borderColor}-500`}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold">{agent.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{agent.endpoint}</p>
          </div>
          <span className={`${statusClass} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
            {agent.status === 'active' ? 'Active' : 
              agent.status === 'metering' ? 'Metering' : 
              agent.status === 'dormant' ? 'Dormant' : 'Inactive'}
          </span>
        </div>
        
        <div className="mt-4">
          <p className="text-sm">{agent.description}</p>
        </div>
        
        <div className="mt-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
            {agent.lastCheck && (
              <>
                <div className="flex justify-between text-xs">
                  <span className="font-medium">Last Check</span>
                  <span>{agent.lastCheck.time}</span>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="font-medium">Status</span>
                  <span className="text-green-600 dark:text-green-400">{agent.lastCheck.status}</span>
                </div>
              </>
            )}
            {agent.mode && (
              <div className="flex justify-between text-xs">
                <span className="font-medium">Mode</span>
                <span>{agent.mode}</span>
              </div>
            )}
            {agent.metering && (
              <div className="flex justify-between text-xs mt-2">
                <span className="font-medium">Today's Metering</span>
                <span>{agent.metering}</span>
              </div>
            )}
            {agent.lastActivation && (
              <>
                <div className="flex justify-between text-xs">
                  <span className="font-medium">Last Activation</span>
                  <span>{agent.lastActivation}</span>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="font-medium">Activation Trigger</span>
                  <span>{agent.activationTrigger}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between">
        <Button 
          variant="link" 
          className="text-xs text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-0 py-0 h-auto"
        >
          {agent.status === 'dormant' ? 'Activate' : 'View Logs'}
        </Button>
        <Button 
          variant="link" 
          className="text-xs text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-0 py-0 h-auto"
        >
          Configure
        </Button>
      </div>
    </div>
  );
}
