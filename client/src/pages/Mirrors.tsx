import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Mirrors() {
  const [isAddMirrorOpen, setIsAddMirrorOpen] = useState(false);
  
  const mockMirrors = [
    {
      id: 1,
      name: "Local Development",
      type: "filesystem",
      location: "/local/flow-land",
      status: "active",
      syncFrequency: "real-time",
      lastSync: "5 minutes ago",
    },
    {
      id: 2,
      name: "Cloud Backup",
      type: "s3",
      location: "s3://flow-land-backup/domain1",
      status: "active",
      syncFrequency: "hourly",
      lastSync: "54 minutes ago",
    },
    {
      id: 3,
      name: "Archive Storage",
      type: "glacier",
      location: "glacier://flow-land-archive",
      status: "inactive",
      syncFrequency: "monthly",
      lastSync: "25 days ago",
    }
  ];
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Account Mirrors</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your sovereign account mirrors and synchronization</p>
        </div>
        <Button onClick={() => setIsAddMirrorOpen(true)}>
          <i className="fas fa-plus mr-2"></i>
          Add Mirror
        </Button>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 dark:text-blue-400 mt-1">
            <i className="fas fa-info-circle"></i>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-300">About Account Mirrors</h4>
            <p className="text-sm text-blue-600 dark:text-blue-200 mt-1">
              Account mirrors create synchronized copies of your domain's data, ensuring sovereignty through redundancy. All mirrors are user-controlled and can be configured with different synchronization policies.
            </p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Mirrors</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Mirrors</TabsTrigger>
          <TabsTrigger value="sync">Sync Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMirrors.filter(mirror => mirror.status === 'active').map(mirror => (
              <Card key={mirror.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle>{mirror.name}</CardTitle>
                    <Badge variant="outline" className="capitalize">{mirror.type}</Badge>
                  </div>
                  <CardDescription className="truncate">{mirror.location}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Sync Frequency</span>
                      <span>{mirror.syncFrequency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Last Sync</span>
                      <span>{mirror.lastSync}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium">Auto-Sync</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                  <Button variant="outline" size="sm">
                    <i className="fas fa-sync-alt mr-1"></i>
                    Sync Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <i className="fas fa-cog mr-1"></i>
                    Settings
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <i className="fas fa-plus text-primary"></i>
              </div>
              <h4 className="font-medium mb-1">Add New Mirror</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Create a new synchronized account mirror</p>
              <Button variant="outline" size="sm" onClick={() => setIsAddMirrorOpen(true)}>
                Add Mirror
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="inactive">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMirrors.filter(mirror => mirror.status === 'inactive').map(mirror => (
              <Card key={mirror.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle>{mirror.name}</CardTitle>
                    <Badge variant="outline" className="capitalize">{mirror.type}</Badge>
                  </div>
                  <CardDescription className="truncate">{mirror.location}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Sync Frequency</span>
                      <span>{mirror.syncFrequency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Last Sync</span>
                      <span>{mirror.lastSync}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-medium">Auto-Sync</span>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                  <Button variant="outline" size="sm">
                    <i className="fas fa-sync-alt mr-1"></i>
                    Activate
                  </Button>
                  <Button variant="outline" size="sm">
                    <i className="fas fa-trash-alt mr-1"></i>
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sync">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Synchronization Status</CardTitle>
                <CardDescription>Overview of all mirror synchronizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mirror</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Sync</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Data Size</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium">Local Development</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">filesystem</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">5 minutes ago</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Synced
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">2.3 GB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-sync-alt"></i>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-history"></i>
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium">Cloud Backup</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">s3</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">54 minutes ago</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Synced
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">2.3 GB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-sync-alt"></i>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-history"></i>
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium">Archive Storage</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">glacier</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">25 days ago</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            Outdated
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">2.1 GB</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-sync-alt"></i>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                            <i className="fas fa-history"></i>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Synchronization Events</CardTitle>
                <CardDescription>Recent mirror synchronization activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4 pb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Local Development</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">5 minutes ago</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automatic synchronization completed successfully.
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded">
                        24 files synced
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-primary pl-4 pb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cloud Backup</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">54 minutes ago</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Scheduled hourly backup synchronization complete.
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded">
                        18 files synced
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-yellow-500 pl-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cloud Backup</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Synchronization retry succeeded after temporary connection error.
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-0.5 rounded">
                        Warning: Network latency detected
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="link" size="sm" className="text-sm">
                    View Full Sync History
                    <i className="fas fa-chevron-right ml-1 text-xs"></i>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isAddMirrorOpen} onOpenChange={setIsAddMirrorOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Mirror</DialogTitle>
            <DialogDescription>
              Create a new account mirror for enhanced sovereignty.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="mirror-name">Mirror Name</Label>
              <Input id="mirror-name" placeholder="Enter a descriptive name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mirror-type">Mirror Type</Label>
              <Select>
                <SelectTrigger id="mirror-type">
                  <SelectValue placeholder="Select mirror type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="filesystem">Local Filesystem</SelectItem>
                  <SelectItem value="s3">S3 Compatible Storage</SelectItem>
                  <SelectItem value="disk">External Disk</SelectItem>
                  <SelectItem value="glacier">Glacier Archive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mirror-location">Location</Label>
              <Input id="mirror-location" placeholder="Path or URL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sync-frequency">Sync Frequency</Label>
              <Select defaultValue="hourly">
                <SelectTrigger id="sync-frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Switch id="activate-mirror" defaultChecked />
              <Label htmlFor="activate-mirror">Activate mirror immediately</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMirrorOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddMirrorOpen(false)}>Add Mirror</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}