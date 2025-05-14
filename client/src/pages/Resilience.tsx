import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Resilience() {
  const [isHealthCheckRunning, setIsHealthCheckRunning] = useState(false);
  const [healthProgress, setHealthProgress] = useState(0);
  
  const runHealthCheck = () => {
    setIsHealthCheckRunning(true);
    setHealthProgress(0);
    
    // Simulate health check progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setHealthProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsHealthCheckRunning(false);
      }
    }, 500);
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Resilience Agent</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor and maintain system health and stability</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            disabled={isHealthCheckRunning}
          >
            <i className="fas fa-sync-alt mr-2"></i>
            Self-Repair
          </Button>
          <Button 
            variant="default"
            onClick={runHealthCheck}
            disabled={isHealthCheckRunning}
          >
            <i className="fas fa-heartbeat mr-2"></i>
            Run Health Check
          </Button>
        </div>
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg mb-6">
        <div className="flex items-start space-x-3">
          <div className="text-green-500 dark:text-green-400 mt-1">
            <i className="fas fa-check-circle text-lg"></i>
          </div>
          <div>
            <h4 className="font-medium text-green-800 dark:text-green-300">All Systems Operational</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              The resilience agent is active and all system components are functioning normally. Last health check completed 42 minutes ago.
            </p>
            
            {isHealthCheckRunning && (
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Health check in progress...</span>
                  <span>{healthProgress}%</span>
                </div>
                <Progress value={healthProgress} className="h-2" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="health" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="health">Health Status</TabsTrigger>
          <TabsTrigger value="resources">Resource Monitoring</TabsTrigger>
          <TabsTrigger value="recovery">Recovery & Backup</TabsTrigger>
          <TabsTrigger value="settings">Agent Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="health">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">CPU Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">98%</div>
                <div className="mt-2">
                  <Progress value={98} className="h-2" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Current load: 12%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Memory Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">92%</div>
                <div className="mt-2">
                  <Progress value={92} className="h-2" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  432MB of 1GB allocated
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">96%</div>
                <div className="mt-2">
                  <Progress value={96} className="h-2" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  2.1GB of 10GB used
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">100%</div>
                <div className="mt-2">
                  <Progress value={100} className="h-2" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  All connections stable
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Stability</CardTitle>
                <CardDescription>Health metrics for all domain subsystems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Core Services</span>
                      <span className="text-sm font-medium text-green-500">Operational</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Tribute Process</span>
                      <span className="text-sm font-medium text-green-500">Operational</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: "98%" }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Agent Communication</span>
                      <span className="text-sm font-medium text-green-500">Operational</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Storage Systems</span>
                      <span className="text-sm font-medium text-green-500">Operational</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: "96%" }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Data Integrity</span>
                      <span className="text-sm font-medium text-green-500">Operational</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Health Events</CardTitle>
                <CardDescription>System health activity log</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-green-500 pl-4 pb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Routine Health Check</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">42 minutes ago</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      All system components reporting nominal operation.
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded">
                        Healthy
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-yellow-500 pl-4 pb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Resource Optimization</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">3 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Performed memory cleanup to optimize performance.
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-0.5 rounded">
                        Maintenance
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-green-500 pl-4 pb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Full System Check</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Yesterday</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Comprehensive system health validation completed successfully.
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded">
                        Healthy
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-red-500 pl-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Resource Spike</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      CPU usage spike detected and automatically mitigated.
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-0.5 rounded">
                        Resolved
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="link" size="sm" className="text-sm">
                    View Full Health History
                    <i className="fas fa-chevron-right ml-1 text-xs"></i>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Resource Usage Trends</CardTitle>
                <CardDescription>System resource consumption over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400">
                    <i className="fas fa-chart-line text-3xl mb-2 block text-center"></i>
                    <p>Resource usage graph would display here</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">Showing CPU, memory, and network usage</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                <Select defaultValue="24h">
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <i className="fas fa-download mr-1"></i>
                  Export Data
                </Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Resource Allocation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Quota</span>
                      <span>35%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Allocation</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage Usage</span>
                      <span>21%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: "21%" }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network Bandwidth</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: "15%" }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Resource Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Max CPU</span>
                      <span className="font-mono">4 cores</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Max Memory</span>
                      <span className="font-mono">1 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Max Storage</span>
                      <span className="font-mono">10 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Max Bandwidth</span>
                      <span className="font-mono">100 Mbps</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-800">
                      <Button variant="outline" size="sm" className="w-full">
                        Adjust Limits
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Resource Usage</CardTitle>
                <CardDescription>Resource consumption by individual agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Agent</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">CPU</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Memory</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Storage</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">Integrity Watcher</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">5%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">108 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">450 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-chart-line"></i>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-cog"></i>
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">Tribute Agent</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Metering
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">7%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">164 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">720 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-chart-line"></i>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-cog"></i>
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">LLM Reflexologist</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            Dormant
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">0%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">24 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">850 MB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-chart-line"></i>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-cog"></i>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recovery">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Recovery</CardTitle>
                <CardDescription>Self-healing and recovery capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Automatic Recovery</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically recover from system errors
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">System Checkpoints</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Create periodic system state snapshots
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <Label className="font-medium mb-2 block">Recovery Strategy</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        id="strategy-full"
                        type="radio"
                        name="recovery-strategy"
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="strategy-full" className="text-sm">
                        Full Recovery (Restore all data and state)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="strategy-essential"
                        type="radio"
                        name="recovery-strategy"
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="strategy-essential" className="text-sm">
                        Essential Services Only (Faster restart)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="strategy-clean"
                        type="radio"
                        name="recovery-strategy"
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="strategy-clean" className="text-sm">
                        Clean Start (Reset to baseline)
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <Label className="font-medium mb-2 block">Recovery Actions</Label>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <i className="fas fa-undo-alt mr-2"></i>
                      Restore Last Known Good State
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <i className="fas fa-toolbox mr-2"></i>
                      Run System Repair
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
                      <i className="fas fa-exclamation-triangle mr-2"></i>
                      Emergency Recovery Mode
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Checkpoints</CardTitle>
                <CardDescription>Recent system state snapshots</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">Daily Checkpoint</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">May 14, 2025 - 06:00 AM</p>
                      </div>
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <p>System state: <span className="text-green-600 dark:text-green-400">Healthy</span></p>
                      <p>Size: 156 MB</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                        <i className="fas fa-info-circle mr-1"></i>
                        Details
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                        <i className="fas fa-undo-alt mr-1"></i>
                        Restore
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">Manual Checkpoint</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">May 13, 2025 - 02:15 PM</p>
                      </div>
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <p>System state: <span className="text-green-600 dark:text-green-400">Healthy</span></p>
                      <p>Size: 154 MB</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                        <i className="fas fa-info-circle mr-1"></i>
                        Details
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                        <i className="fas fa-undo-alt mr-1"></i>
                        Restore
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">Pre-Update Checkpoint</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">May 12, 2025 - 10:30 AM</p>
                      </div>
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <p>System state: <span className="text-green-600 dark:text-green-400">Healthy</span></p>
                      <p>Size: 152 MB</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                        <i className="fas fa-info-circle mr-1"></i>
                        Details
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                        <i className="fas fa-undo-alt mr-1"></i>
                        Restore
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="link" size="sm" className="text-sm">
                    View All Checkpoints
                    <i className="fas fa-chevron-right ml-1 text-xs"></i>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="justify-end border-t border-gray-100 dark:border-gray-800 pt-4">
                <Button>
                  <i className="fas fa-save mr-2"></i>
                  Create Checkpoint
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Resilience Agent Settings</CardTitle>
              <CardDescription>Configure system resilience behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Monitoring Settings</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="monitor-interval">Check Interval (seconds)</Label>
                    <Input id="monitor-interval" defaultValue="60" type="number" className="w-full" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="monitor-sensitivity">Alert Sensitivity</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="monitor-sensitivity">
                        <SelectValue placeholder="Select sensitivity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Fewer Alerts)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High (More Alerts)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <Label className="font-medium">Resource Monitoring</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Monitor system resource usage
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <Label className="font-medium">Process Monitoring</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Track process health and status
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Recovery Settings</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="recovery-threshold">Auto-Recover Threshold</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="recovery-threshold">
                        <SelectValue placeholder="Select threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Frequent Recovery)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High (Minimal Recovery)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="checkpoint-frequency">Checkpoint Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="checkpoint-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <Label className="font-medium">Pre-Update Checkpoints</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Create checkpoint before updates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <Label className="font-medium">Automatic Optimization</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Periodically optimize system performance
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                <h4 className="font-medium mb-4">Alert and Notification Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        id="alert-dashboard"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="alert-dashboard" className="text-sm">
                        Dashboard Notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="alert-email"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="alert-email" className="text-sm">
                        Email Alerts
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="alert-log"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="alert-log" className="text-sm">
                        System Log Entries
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        id="notify-critical"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="notify-critical" className="text-sm">
                        Critical Issues Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="notify-recovery"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="notify-recovery" className="text-sm">
                        Recovery Actions
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="notify-optimization"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="notify-optimization" className="text-sm">
                        Optimization Events
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t border-gray-100 dark:border-gray-800 pt-4">
              <Button>
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}