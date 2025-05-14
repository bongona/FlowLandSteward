import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonetizationRitual from "@/components/modals/MonetizationRitual";

export default function Rituals() {
  const [isRitualOpen, setIsRitualOpen] = useState(false);
  
  const { 
    data: ritualHistory,
    isLoading,
  } = useQuery({
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
          <h2 className="text-2xl font-bold">Monetization Rituals</h2>
          <p className="text-gray-600 dark:text-gray-400">Review past rituals and initiate new ones</p>
        </div>
        <Button variant="default" className="bg-accent hover:bg-accent-dark" onClick={() => setIsRitualOpen(true)}>
          <i className="fas fa-sync-alt mr-2"></i>
          Start New Ritual
        </Button>
      </div>
      
      <div className="bg-white dark:bg-neutral shadow rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold">What are Monetization Rituals?</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monetization Rituals are reflection cycles where your system's flow patterns are analyzed to propose optimized 
            monetization strategies. The LLM Reflexologist agent is temporarily activated during rituals to analyze your 
            domain's unique usage patterns and suggest potential tribute configurations.
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            All proposals require your explicit approval before implementation, ensuring you maintain complete sovereignty 
            over how your domain manages tribute collection.
          </p>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="text-blue-500 dark:text-blue-400">
              <i className="fas fa-info-circle text-xl"></i>
            </div>
            <div>
              <span className="font-medium">Last ritual performed:</span>
              <span className="ml-2">{ritualHistory.lastRitual || 'Never'}</span>
            </div>
          </div>
          <Button variant="link" className="text-primary hover:text-primary-dark dark:hover:text-primary-light">
            View Report
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">Ritual History</h3>
        
        <Tabs defaultValue="completed" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="completed">Completed Rituals</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Rituals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ritualHistory.completed.length === 0 ? (
                <div className="col-span-2 text-center py-12 bg-white dark:bg-neutral rounded-lg shadow">
                  <div className="text-gray-400 mb-2">
                    <i className="fas fa-scroll text-4xl"></i>
                  </div>
                  <h4 className="text-lg font-medium">No Completed Rituals</h4>
                  <p className="text-sm text-gray-500 mt-1">Begin your first monetization ritual to see results here</p>
                </div>
              ) : (
                ritualHistory.completed.map((ritual) => (
                  <Card key={ritual.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{ritual.date}</CardTitle>
                        <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Completed
                        </div>
                      </div>
                      <CardDescription>Analyzed {ritual.daysAnalyzed} days of data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Recommended Mode:</span>
                          <span className="ml-2">{ritual.recommendedMode}</span>
                        </div>
                        <div>
                          <span className="font-medium">Key Insight:</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{ritual.keyInsight}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <i className="fas fa-download mr-1 text-xs"></i>
                        Export
                      </Button>
                      <Button variant="link" size="sm" className="text-primary hover:text-primary-dark dark:hover:text-primary-light">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ritualHistory.scheduled.length === 0 ? (
                <div className="col-span-2 text-center py-12 bg-white dark:bg-neutral rounded-lg shadow">
                  <div className="text-gray-400 mb-2">
                    <i className="fas fa-calendar text-4xl"></i>
                  </div>
                  <h4 className="text-lg font-medium">No Scheduled Rituals</h4>
                  <p className="text-sm text-gray-500 mt-1">Schedule your next ritual to optimize monetization</p>
                </div>
              ) : (
                ritualHistory.scheduled.map((ritual) => (
                  <Card key={ritual.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Scheduled for {ritual.scheduledDate}</CardTitle>
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
                        Cancel
                      </Button>
                      <Button variant="default" size="sm">
                        Edit
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
