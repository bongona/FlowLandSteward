import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Forensic() {
  const [isRelayOpen, setIsRelayOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [auditReason, setAuditReason] = useState("");
  
  const handleOpenRelay = () => {
    // In a real implementation, this would check credentials and open the relay
    setIsRelayOpen(true);
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Forensic Relay</h2>
          <p className="text-gray-600 dark:text-gray-400">Secure audit access to domain operations and logs</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={isRelayOpen ? "destructive" : "default"} 
            onClick={() => setIsRelayOpen(!isRelayOpen)}
          >
            <i className={`fas ${isRelayOpen ? "fa-lock" : "fa-lock-open"} mr-2`}></i>
            {isRelayOpen ? "Close Relay" : "Open Relay"}
          </Button>
        </div>
      </div>
      
      <div className={`${isRelayOpen ? "bg-green-50 dark:bg-green-900/20 border-green-200" : "bg-red-50 dark:bg-red-900/20 border-red-200"} border p-4 rounded-lg mb-6`}>
        <div className="flex items-start space-x-3">
          <div className={`${isRelayOpen ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"} mt-1`}>
            <i className={`fas ${isRelayOpen ? "fa-shield-check" : "fa-shield-alt"} text-lg`}></i>
          </div>
          <div>
            <h4 className={`font-medium ${isRelayOpen ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}>
              {isRelayOpen ? "Forensic Relay Active" : "Forensic Relay Inactive"}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {isRelayOpen 
                ? "The Forensic Relay is currently active. Audit access is open for external analysis." 
                : "The Forensic Relay is currently closed. No external audit access is permitted."}
            </p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="access" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="settings">Relay Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="access">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Forensic Access Request</CardTitle>
                <CardDescription>Request access to open the forensic relay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isRelayOpen ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="access-code">Access Code</Label>
                      <Input 
                        id="access-code" 
                        placeholder="Enter authorization code" 
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="access-reason">Reason for Access</Label>
                      <Input 
                        id="access-reason" 
                        placeholder="Describe reason for forensic access" 
                        value={auditReason}
                        onChange={(e) => setAuditReason(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="access-type">Access Type</Label>
                      <Select defaultValue="read">
                        <SelectTrigger id="access-type">
                          <SelectValue placeholder="Select access type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="read">Read-Only</SelectItem>
                          <SelectItem value="extended">Extended Analysis</SelectItem>
                          <SelectItem value="full">Full Access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="access-duration">Access Duration</Label>
                      <Select defaultValue="4h">
                        <SelectTrigger id="access-duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">1 Hour</SelectItem>
                          <SelectItem value="4h">4 Hours</SelectItem>
                          <SelectItem value="12h">12 Hours</SelectItem>
                          <SelectItem value="24h">24 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-check-circle text-green-500"></i>
                        <span className="text-sm font-medium text-green-800 dark:text-green-300">Relay Access Granted</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Access Details</Label>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Access Type</span>
                          <span>Read-Only</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Duration</span>
                          <span>4 Hours (Expires in 3:42:18)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Requested By</span>
                          <span>User (Local)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Authorized At</span>
                          <span>May 14, 2025 - 11:22 AM</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Relay Connection</Label>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3 font-mono text-sm overflow-x-auto">
                        <div>relay.endpoint = <span className="text-green-600 dark:text-green-400">forensic://local:8889/relay</span></div>
                        <div>auth.token = <span className="text-green-600 dark:text-green-400">f08e7a6b3d....</span></div>
                        <div>stream.status = <span className="text-green-600 dark:text-green-400">ACTIVE</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {!isRelayOpen ? (
                  <>
                    <Button variant="outline">Clear</Button>
                    <Button 
                      onClick={handleOpenRelay}
                      disabled={!accessCode || !auditReason}
                    >
                      Request Access
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline">
                      <i className="fas fa-terminal mr-2"></i>
                      View Console
                    </Button>
                    <Button variant="destructive">
                      <i className="fas fa-times-circle mr-2"></i>
                      Revoke Access
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Access Policies</CardTitle>
                <CardDescription>Configure forensic relay access control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="policy-manual-approval" className="font-medium">Manual Approval</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Require explicit approval for all relay access
                      </p>
                    </div>
                    <Switch id="policy-manual-approval" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="policy-audit-logging" className="font-medium">Comprehensive Logging</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Log all data accessed through relay
                      </p>
                    </div>
                    <Switch id="policy-audit-logging" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="policy-timeout" className="font-medium">Auto-Timeout</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Automatically close relay after inactivity
                      </p>
                    </div>
                    <Switch id="policy-timeout" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="policy-revocation" className="font-medium">Emergency Revocation</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Allow immediate access termination
                      </p>
                    </div>
                    <Switch id="policy-revocation" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <Label className="text-sm font-medium">Authorized Access Types</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        id="access-logs"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="access-logs" className="text-sm">
                        Activity Logs
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="access-metrics"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="access-metrics" className="text-sm">
                        System Metrics
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="access-configs"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="access-configs" className="text-sm">
                        Configuration Data
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="access-tribute"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="access-tribute" className="text-sm">
                        Tribute Records
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="default">
                  Save Policy Changes
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Forensic Access Audit Logs</CardTitle>
                <CardDescription>Records of all relay access activity</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <i className="fas fa-filter mr-1"></i>
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <i className="fas fa-download mr-1"></i>
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requestor</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Access Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">May 14, 2025 11:22 AM</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Relay Open</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">User (Local)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Read-Only</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Approved
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                          <i className="fas fa-info-circle"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">May 10, 2025 3:14 PM</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Data Access</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Integrity Watcher</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Internal</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Auto-Approved
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                          <i className="fas fa-info-circle"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">May 7, 2025 9:42 AM</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Relay Open</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">External (192.168.1.34)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">Extended</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          Denied
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                          <i className="fas fa-info-circle"></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Relay Configuration</CardTitle>
                <CardDescription>Configure forensic relay settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="relay-port">Relay Port</Label>
                  <Input id="relay-port" defaultValue="8889" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relay-protocol">Protocol</Label>
                  <Select defaultValue="secure">
                    <SelectTrigger id="relay-protocol">
                      <SelectValue placeholder="Select protocol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="secure">Secure (Encrypted)</SelectItem>
                      <SelectItem value="tunneled">Tunneled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relay-buffer">Buffer Size (MB)</Label>
                  <Input id="relay-buffer" defaultValue="128" type="number" className="w-full" />
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Session Logging</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Record detailed session activity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Data Redaction</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Redact sensitive information in logs
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <Label className="text-sm font-medium">Access Notification</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        id="notify-console"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="notify-console" className="text-sm">
                        System Console
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="notify-dashboard"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="notify-dashboard" className="text-sm">
                        Dashboard Alert
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="notify-email"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="notify-email" className="text-sm">
                        Email Notification
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full">
                  Save Configuration
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Relay Security</CardTitle>
                <CardDescription>Configure access security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="security-method">Authentication Method</Label>
                  <Select defaultValue="token">
                    <SelectTrigger id="security-method">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="password">Password</SelectItem>
                      <SelectItem value="token">Access Token</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="multi">Multi-Factor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="security-timeout">Session Timeout (minutes)</Label>
                  <Input id="security-timeout" defaultValue="240" type="number" className="w-full" />
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <Label className="text-sm font-medium">Access Restrictions</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        id="restrict-ip"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="restrict-ip" className="text-sm">
                        IP Address Filtering
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="restrict-time"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="restrict-time" className="text-sm">
                        Time-Based Restrictions
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="restrict-concurrent"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="restrict-concurrent" className="text-sm">
                        Prevent Concurrent Access
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <Label className="text-sm font-medium">Access Tokens</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Default Token</span>
                      <Button variant="outline" size="sm">
                        <i className="fas fa-sync-alt mr-1"></i>
                        Regenerate
                      </Button>
                    </div>
                    <div className="rounded-md border border-gray-200 dark:border-gray-700 p-2 font-mono text-xs overflow-x-auto">
                      f08e7a6b3d4c2e1f5a9b8c7d6e5f4a3b2c1d0e9f8g7h6i5j4k3l2m1n0o9p8
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Tamper Detection</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Detect modification attempts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full">
                  Update Security Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}