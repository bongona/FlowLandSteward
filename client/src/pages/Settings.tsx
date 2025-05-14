import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoBackupsEnabled, setAutoBackupsEnabled] = useState(true);
  const [domainVisibility, setDomainVisibility] = useState("private");
  const [loggingLevel, setLoggingLevel] = useState("normal");
  const [backupFrequency, setBackupFrequency] = useState("daily");
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure your domain settings and preferences</p>
        </div>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="agents">Agent Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Control how the system notifies you about events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications" className="font-medium">Enable Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive alerts for important system events
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                
                {notificationsEnabled && (
                  <>
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                      <Label htmlFor="notification-integrity" className="text-sm">Integrity Alerts</Label>
                      <div className="flex items-center mt-2">
                        <input
                          id="notification-integrity"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                        <label htmlFor="notification-integrity" className="ml-2 text-sm">
                          Anomalies and policy violations
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-3">
                      <Label htmlFor="notification-tribute" className="text-sm">Tribute Collection</Label>
                      <div className="flex items-center mt-2">
                        <input
                          id="notification-tribute"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                        <label htmlFor="notification-tribute" className="ml-2 text-sm">
                          Credit milestones and collection summaries
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-3">
                      <Label htmlFor="notification-rituals" className="text-sm">Monetization Rituals</Label>
                      <div className="flex items-center mt-2">
                        <input
                          id="notification-rituals"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked
                        />
                        <label htmlFor="notification-rituals" className="ml-2 text-sm">
                          Ritual completion and recommendations
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">Save Notification Settings</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Domain Preferences</CardTitle>
                <CardDescription>Configure domain visibility and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="domain-visibility" className="font-medium">Domain Visibility</Label>
                  <Select 
                    id="domain-visibility"
                    value={domainVisibility} 
                    onValueChange={setDomainVisibility}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select visibility level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private (You only)</SelectItem>
                      <SelectItem value="shared">Shared (Selected users)</SelectItem>
                      <SelectItem value="public">Public (Anyone with link)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <Label htmlFor="logging-level" className="font-medium">Logging Level</Label>
                  <Select 
                    id="logging-level"
                    value={loggingLevel} 
                    onValueChange={setLoggingLevel}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select logging level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="verbose">Verbose</SelectItem>
                      <SelectItem value="debug">Debug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Automatic Resource Cleanup</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically clean unused resources
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">Save Domain Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>Manage domain access permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Require Authentication</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Require login for all domain operations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Sandbox Guest Access</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow limited guest operations
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <Label className="font-medium">API Access Keys</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Manage API access for external integrations
                  </p>
                  <Button variant="outline" size="sm">
                    <i className="fas fa-key mr-2"></i>
                    Manage API Keys
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
                <CardDescription>Configure system security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Data Encryption</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Encrypt all domain data at rest
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Network Protection</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable advanced network security features
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <Label className="font-medium">External Resource Access</Label>
                  <div className="flex items-center mt-2">
                    <input
                      id="resource-explicit"
                      type="radio"
                      name="resource-access"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="resource-explicit" className="ml-2 text-sm">
                      Explicit approval only
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      id="resource-whitelist"
                      type="radio"
                      name="resource-access"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="resource-whitelist" className="ml-2 text-sm">
                      Allow whitelisted resources
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      id="resource-all"
                      type="radio"
                      name="resource-access"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="resource-all" className="ml-2 text-sm">
                      Allow all resources
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">Save Security Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="backups">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Backup Configuration</CardTitle>
                <CardDescription>Configure automatic domain backups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-backups" className="font-medium">Automatic Backups</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Periodically backup domain data
                    </p>
                  </div>
                  <Switch
                    id="auto-backups"
                    checked={autoBackupsEnabled}
                    onCheckedChange={setAutoBackupsEnabled}
                  />
                </div>
                
                {autoBackupsEnabled && (
                  <>
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                      <Label htmlFor="backup-frequency" className="font-medium">Backup Frequency</Label>
                      <Select 
                        id="backup-frequency"
                        value={backupFrequency} 
                        onValueChange={setBackupFrequency}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                      <Label htmlFor="backup-retention" className="font-medium">Retention Period</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <Input
                            id="backup-retention"
                            type="number"
                            min="1"
                            defaultValue="30"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <Select defaultValue="days">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="days">Days</SelectItem>
                              <SelectItem value="weeks">Weeks</SelectItem>
                              <SelectItem value="months">Months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Encrypt Backups</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Use strong encryption for backup data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Restore Backup</Button>
                <Button variant="default">Create Backup Now</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Backups</CardTitle>
                <CardDescription>View and manage recent system backups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">Daily Backup</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">May 10, 2025 - 11:30 PM</p>
                      </div>
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Complete
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                        <i className="fas fa-download mr-1"></i>
                        Download
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
                        <h5 className="font-medium">Daily Backup</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">May 9, 2025 - 11:30 PM</p>
                      </div>
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Complete
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                        <i className="fas fa-download mr-1"></i>
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-2 py-0">
                        <i className="fas fa-undo-alt mr-1"></i>
                        Restore
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button variant="link" size="sm" className="text-sm">
                      View All Backups
                      <i className="fas fa-chevron-right ml-1 text-xs"></i>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="agents">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Behavior Settings</CardTitle>
                <CardDescription>Configure how domain agents operate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h4 className="font-medium text-lg mb-3">Integrity Watcher</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Check Frequency</Label>
                        <Select defaultValue="hourly">
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Realtime</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Alert Threshold</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h4 className="font-medium text-lg mb-3">LLM Reflexologist</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm">Auto-Activation</Label>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Allow automatic activation</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Analysis Depth</Label>
                        <Select defaultValue="normal">
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="surface">Surface</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="deep">Deep</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h4 className="font-medium text-lg mb-3">Tribute Agent</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm">Always Active</Label>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Keep tribute agent running</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Tracking Resolution</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="detailed">Detailed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-lg mb-3">Forensic Relay</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm">Access Control</Label>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Require manual approval</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Data Retention</Label>
                        <Select defaultValue="7d">
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1d">1 Day</SelectItem>
                            <SelectItem value="7d">7 Days</SelectItem>
                            <SelectItem value="30d">30 Days</SelectItem>
                            <SelectItem value="indefinite">Indefinite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default">Save Agent Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}