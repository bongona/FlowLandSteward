import { LogEntry } from "@/lib/types";

interface ActivityLogProps {
  logs: LogEntry[];
  isLoading?: boolean;
}

export default function ActivityLog({ logs, isLoading = false }: ActivityLogProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-neutral-dark shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Recent System Activity</h3>
          <div className="flex space-x-2">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <i className="fas fa-filter text-gray-500 dark:text-gray-400"></i>
            </button>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <i className="fas fa-ellipsis-v text-gray-500 dark:text-gray-400"></i>
            </button>
          </div>
        </div>
        
        <div className="terminal overflow-y-auto h-64">
          <div className="p-4 text-center text-sm">
            Loading activity logs...
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-neutral-dark shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Recent System Activity</h3>
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <i className="fas fa-filter text-gray-500 dark:text-gray-400"></i>
          </button>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <i className="fas fa-ellipsis-v text-gray-500 dark:text-gray-400"></i>
          </button>
        </div>
      </div>
      
      <div className="terminal overflow-y-auto h-64">
        {logs.length === 0 ? (
          <div className="p-4 text-center text-sm">
            No activity logs to display
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="log-entry">
              <div className="flex justify-between text-xs">
                <span className={`text-${log.agentColor}-400`}>[{log.agent}]</span>
                <span className="text-gray-500">{log.timestamp}</span>
              </div>
              <p className="text-sm mt-1">{log.message}</p>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <button className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition">
          View Full Logs
        </button>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Showing {logs.length} of {logs.length + 241} entries
        </div>
      </div>
    </div>
  );
}
