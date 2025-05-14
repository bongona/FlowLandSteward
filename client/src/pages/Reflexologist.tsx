import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Reflexologist() {
  const [analysisDepth, setAnalysisDepth] = useState(50);
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">LLM Reflexologist</h2>
          <p className="text-gray-600 dark:text-gray-400">Analyze system patterns and optimize monetization strategies</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <i className="fas fa-plug mr-2"></i>
            Configure
          </Button>
          <Button variant="default">
            <i className="fas fa-play mr-2"></i>
            Activate
          </Button>
        </div>
      </div>
      
      <div className="bg-primary/10 dark:bg-primary/5 border border-primary/20 p-4 rounded-lg mb-6">
        <div className="flex items-start space-x-3">
          <div className="text-primary mt-1">
            <i className="fas fa-brain text-lg"></i>
          </div>
          <div>
            <h4 className="font-medium text-primary">Dormant Status</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              LLM Reflexologist is currently in dormant mode. It can be activated for specific analysis tasks or during monetization rituals. Last activation was during the monetization ritual 3 days ago.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Analysis Configuration</CardTitle>
            <CardDescription>Configure the LLM Reflexologist analysis parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="font-medium">Analysis Depth</Label>
                <span className="text-sm font-medium">{analysisDepth}%</span>
              </div>
              <Slider
                value={[analysisDepth]}
                min={10}
                max={100}
                step={10}
                onValueChange={(value) => setAnalysisDepth(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Surface</span>
                <span>Balanced</span>
                <span>Deep</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <Label className="font-medium mb-2 block">Analysis Focus</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      id="focus-usage"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="focus-usage" className="text-sm">
                      Resource Usage Patterns
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="focus-operations"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="focus-operations" className="text-sm">
                      Operation Frequency
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="focus-context"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="focus-context" className="text-sm">
                      Domain Context
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="focus-trends"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="focus-trends" className="text-sm">
                      Historical Trends
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="font-medium mb-2 block">Time Range</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      id="time-7d"
                      type="radio"
                      name="time-range"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="time-7d" className="text-sm">
                      Last 7 Days
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="time-30d"
                      type="radio"
                      name="time-range"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="time-30d" className="text-sm">
                      Last 30 Days
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="time-90d"
                      type="radio"
                      name="time-range"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="time-90d" className="text-sm">
                      Last 90 Days
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="time-custom"
                      type="radio"
                      name="time-range"
                      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="time-custom" className="text-sm">
                      Custom Range
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
              <div>
                <Label className="font-medium">Detailed Analysis</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generate comprehensive insights with granular details
                </p>
              </div>
              <Switch 
                checked={showDetails} 
                onCheckedChange={setShowDetails}
              />
            </div>
            
            {showDetails && (
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                <Label className="font-medium mb-2 block">Recommendation Preferences</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="strategy-preference" className="text-sm block mb-1">Strategy Type</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger id="strategy-preference">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="progressive">Progressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="insight-format" className="text-sm block mb-1">Insight Format</Label>
                    <Select defaultValue="actionable">
                      <SelectTrigger id="insight-format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="actionable">Actionable</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="summary">Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              Reset to Defaults
            </Button>
            <Button>
              Save Configuration
            </Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agent Status</CardTitle>
              <CardDescription>Current reflexologist state</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Status</span>
                <span className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Dormant
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Last Active</span>
                <span className="text-sm">3 days ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Activation Trigger</span>
                <span className="text-sm">Monetization Ritual</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Resource Usage</span>
                <span className="text-sm">Minimal</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">
                <i className="fas fa-play mr-2"></i>
                Activate Agent
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Last Analysis</CardTitle>
              <CardDescription>Previous analysis results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm">3 days ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Duration</span>
                <span className="text-sm">12 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Depth</span>
                <span className="text-sm">70%</span>
              </div>
              <div className="pt-2">
                <Label className="text-sm font-medium mb-2 block">Recommended Mode</Label>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm text-blue-800 dark:text-blue-200">
                  Symbolic Credits
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">View Analysis</Button>
              <Button variant="outline" size="sm">Export Report</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Analysis History</h3>
        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trigger</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Depth</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recommendation</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">May 11, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Monetization Ritual</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">70%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Symbolic Credits</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                    <i className="fas fa-file-alt"></i>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                    <i className="fas fa-download"></i>
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">April 20, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">User Requested</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">90%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Donation</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                    <i className="fas fa-file-alt"></i>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                    <i className="fas fa-download"></i>
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">March 15, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Monetization Ritual</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">50%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Royalty</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                    <i className="fas fa-file-alt"></i>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 py-0">
                    <i className="fas fa-download"></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}