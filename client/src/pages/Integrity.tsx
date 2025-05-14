import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ActivityLog from "@/components/dashboard/ActivityLog";

export default function Integrity() {
  const { 
    data: integrityStatus,
    isLoading: statusLoading,
    refetch: refetchStatus
  } = useQuery({
    queryKey: ['/api/integrity/status'],
  });
  
  const { 
    data: integrityLogs,
    isLoading: logsLoading 
  } = useQuery({
    queryKey: ['/api/integrity/logs'],
  });
  
  const handleRunCheck = () => {
    refetchStatus();
  };
  
  if (statusLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Integrity Monitor</h2>
            <p className="text-gray-600 dark:text-gray-400">Domain integrity status and monitoring</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral shadow rounded-lg p-6 animate-pulse">
          <div className="h-40"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Integrity Monitor</h2>
          <p className="text-gray-600 dark:text-gray-400">Domain integrity status and monitoring</p>
        </div>
        <Button variant="default" onClick={handleRunCheck}>
          <i className="fas fa-shield-alt mr-2"></i>
          Run Integrity Check
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral shadow rounded-lg p-6 col-span-2">
          <h3 className="text-lg font-bold mb-4">Domain Integrity Status</h3>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${integrityStatus.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="font-medium">{integrityStatus.status === 'healthy' ? 'Healthy' : 'Warning'}</span>
            </div>
            <Badge variant="outline">Last Check: {integrityStatus.lastCheck}</Badge>
          </div>
          
          <div className="space-y-4">
            {integrityStatus.metrics.map((metric) => (
              <div key={metric.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <span className="text-sm text-gray-500">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral shadow rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Checks Performed</span>
              <span className="text-sm">{integrityStatus.checksPerformed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Issues Found</span>
              <span className="text-sm">{integrityStatus.issuesFound}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Last Anomaly</span>
              <span className="text-sm">{integrityStatus.lastAnomaly || 'None'}</span>
            </div>
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium mb-2">Security Status</h4>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${integrityStatus.securityStatus === 'secure' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm">{integrityStatus.securityStatus === 'secure' ? 'Secure' : 'Alert'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ActivityLog logs={integrityLogs || []} isLoading={logsLoading} />
      
      <div className="bg-white dark:bg-neutral shadow rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Integrity Watcher Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Check Frequency</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="freq-realtime" 
                  name="check-frequency" 
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                  checked={integrityStatus.checkFrequency === 'realtime'} 
                  onChange={() => {}}
                />
                <label htmlFor="freq-realtime">Realtime Monitoring</label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="freq-hourly" 
                  name="check-frequency" 
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                  checked={integrityStatus.checkFrequency === 'hourly'} 
                  onChange={() => {}}
                />
                <label htmlFor="freq-hourly">Hourly</label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="freq-daily" 
                  name="check-frequency" 
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                  checked={integrityStatus.checkFrequency === 'daily'} 
                  onChange={() => {}}
                />
                <label htmlFor="freq-daily">Daily</label>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Monitoring Settings</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="monitor-resource" 
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                  checked={integrityStatus.monitoringSettings.includes('resource')} 
                  onChange={() => {}}
                />
                <label htmlFor="monitor-resource">Resource Access</label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="monitor-network" 
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                  checked={integrityStatus.monitoringSettings.includes('network')} 
                  onChange={() => {}}
                />
                <label htmlFor="monitor-network">Network Activity</label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="monitor-file" 
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                  checked={integrityStatus.monitoringSettings.includes('file')} 
                  onChange={() => {}}
                />
                <label htmlFor="monitor-file">File System Changes</label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="monitor-auth" 
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                  checked={integrityStatus.monitoringSettings.includes('auth')} 
                  onChange={() => {}}
                />
                <label htmlFor="monitor-auth">Authentication Events</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button variant="outline">Save Configuration</Button>
        </div>
      </div>
    </div>
  );
}
