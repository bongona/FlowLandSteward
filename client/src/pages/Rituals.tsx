import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonetizationRitual from "@/components/modals/MonetizationRitual";

// Define types for the API response
interface RitualHistoryResponse {
  lastRitual: string;
  completed: Array<{
    id: number;
    date: string;
    daysAnalyzed: number;
    recommendedMode: string;
    keyInsight: string;
  }>;
  scheduled: Array<{
    id: number;
    scheduledDate: string;
    daysToAnalyze: number;
    dataSelection: string[];
  }>;
  ritualStatus?: {
    canPerform: boolean;
    recommendedInterval: string;
    nextRecommendedDate: string;
  };
  domainContext?: {
    flowComplexity: string;
    resourceIntensity: string;
    userInteractionFrequency: string;
  };
}

export default function Rituals() {
  const [isRitualOpen, setIsRitualOpen] = useState(false);
  
  const { 
    data: ritualHistory,
    isLoading,
  } = useQuery<RitualHistoryResponse>({
    queryKey: ['/api/monetization/rituals'],
  });
  
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Monetization Rituals</h2>
            <p className="text-gray-600 dark:text-gray-400">Review past rituals and initiate new ones</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-neutral shadow rounded-lg p-6 animate-pulse">
          <div className="h-96"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Resource Allocation Analysis</h2>
          <p className="text-gray-600 dark:text-gray-400">Review historical analyses and configure new evaluations</p>
        </div>
        <Button variant="default" className="bg-accent hover:bg-accent-dark" onClick={() => setIsRitualOpen(true)}>
          <i className="fas fa-chart-line mr-2"></i>
          New Analysis
        </Button>
      </div>
      
      <div className="bg-white dark:bg-neutral shadow rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold">About Resource Allocation Analysis</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Resource allocation analyses evaluate operational patterns and utilization metrics to propose optimized 
            resource management strategies. The system employs statistical modeling and pattern recognition to identify 
            efficiency opportunities and recommend optimal contribution distribution models.
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            All computational recommendations undergo administrative review before implementation, preserving full 
            administrative control over resource management policies and tribute collection methodologies.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          {ritualHistory?.domainContext && (
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Domain Context Classification</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Operational Complexity:</span>
                  <span className="font-medium">{ritualHistory.domainContext.flowComplexity}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Resource Utilization:</span>
                  <span className="font-medium">{ritualHistory.domainContext.resourceIntensity}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Interaction Frequency:</span>
                  <span className="font-medium">{ritualHistory.domainContext.userInteractionFrequency}</span>
                </li>
              </ul>
            </div>
          )}
          
          {ritualHistory?.ritualStatus && (
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Analysis Status</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Analysis Available:</span>
                  <span className="font-medium">{ritualHistory.ritualStatus.canPerform ? 'Yes' : 'No'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Optimal Interval:</span>
                  <span className="font-medium">{ritualHistory.ritualStatus.recommendedInterval}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Next Scheduled:</span>
                  <span className="font-medium">{ritualHistory.ritualStatus.nextRecommendedDate}</span>
                </li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="text-blue-500 dark:text-blue-400">
              <i className="fas fa-info-circle text-xl"></i>
            </div>
            <div>
              <span className="font-medium">Last analysis completed:</span>
              <span className="ml-2">{ritualHistory?.lastRitual || 'Never'}</span>
            </div>
          </div>
          <Button variant="link" className="text-primary hover:text-primary-dark dark:hover:text-primary-light">
            View Analysis Report
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">Analysis History</h3>
        
        <Tabs defaultValue="completed" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="completed">Completed Analyses</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Analyses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!ritualHistory?.completed || ritualHistory.completed.length === 0 ? (
                <div className="col-span-2 text-center py-12 bg-white dark:bg-neutral rounded-lg shadow">
                  <div className="text-gray-400 mb-2">
                    <i className="fas fa-chart-bar text-4xl"></i>
                  </div>
                  <h4 className="text-lg font-medium">No Completed Analyses</h4>
                  <p className="text-sm text-gray-500 mt-1">Initialize your first resource allocation analysis to view evaluation results here</p>
                </div>
              ) : (
                ritualHistory.completed.map((ritual) => (
                  <Card key={ritual.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Analysis from {ritual.date}</CardTitle>
                        <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Completed
                        </div>
                      </div>
                      <CardDescription>Evaluation period: {ritual.daysAnalyzed} operational days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Recommended Resource Allocation Model:</span>
                          <span className="ml-2">{ritual.recommendedMode}</span>
                        </div>
                        <div>
                          <span className="font-medium">Primary Analysis Finding:</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ritual.keyInsight}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <i className="fas fa-download mr-1 text-xs"></i>
                        Export Data
                      </Button>
                      <Button variant="link" size="sm" className="text-primary hover:text-primary-dark dark:hover:text-primary-light">
                        View Analysis Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!ritualHistory?.scheduled || ritualHistory.scheduled.length === 0 ? (
                <div className="col-span-2 text-center py-12 bg-white dark:bg-neutral rounded-lg shadow">
                  <div className="text-gray-400 mb-2">
                    <i className="fas fa-calendar-alt text-4xl"></i>
                  </div>
                  <h4 className="text-lg font-medium">No Scheduled Analyses</h4>
                  <p className="text-sm text-gray-500 mt-1">Schedule your next resource allocation evaluation to optimize contribution systems</p>
                </div>
              ) : (
                ritualHistory.scheduled.map((ritual) => (
                  <Card key={ritual.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Analysis Scheduled for {ritual.scheduledDate}</CardTitle>
                        <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Pending
                        </div>
                      </div>
                      <CardDescription>Will analyze {ritual.daysToAnalyze} days of data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <span className="font-medium">Data Selection:</span>
                        <ul className="mt-2 space-y-1 text-sm">
                          {ritual.dataSelection.map((item, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Cancel Analysis
                      </Button>
                      <Button variant="default" size="sm">
                        Modify Parameters
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <MonetizationRitual 
        isOpen={isRitualOpen} 
        onClose={() => setIsRitualOpen(false)} 
      />
    </div>
  );
}
