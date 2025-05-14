import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import TributeManagement from "@/components/dashboard/TributeManagement";
import { TributeMode } from "@/lib/types";

export default function Tribute() {
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['/api/tribute'],
  });
  
  const mutation = useMutation({
    mutationFn: async (mode: TributeMode) => {
      await apiRequest('POST', '/api/tribute/mode', { mode });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tribute'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/tribute'] });
    }
  });
  
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Tribute Management</h2>
            <p className="text-gray-600 dark:text-gray-400">Configure tribute collection and view statistics</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral shadow rounded-lg p-6 animate-pulse">
          <div className="h-96"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Tribute Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure tribute collection and view statistics</p>
        </div>
        <Button variant="default" onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/tribute'] })}>
          <i className="fas fa-sync-alt mr-2"></i>
          Refresh
        </Button>
      </div>
      
      <TributeManagement 
        activeMode={data.activeMode} 
        statistics={data.statistics}
        onModeChange={(mode) => mutation.mutate(mode)}
      />
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral shadow rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Flow Friction Details</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Flow Friction Layer is always active, ensuring all system activity is metered and produces a measurable imprint.
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Metering Categories</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>CPU Utilization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Memory Allocation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span>Storage Operations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>Network Transactions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral shadow rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Tribute History</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Mode</th>
                  <th className="text-right py-2">Credits</th>
                  <th className="text-right py-2">Operations</th>
                </tr>
              </thead>
              <tbody>
                {data.history.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2">{entry.date}</td>
                    <td className="py-2">{entry.mode}</td>
                    <td className="py-2 text-right">{entry.credits.toLocaleString()}</td>
                    <td className="py-2 text-right">{entry.operations.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
