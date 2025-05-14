import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MonetizationRitualProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MonetizationRitual({ isOpen, onClose }: MonetizationRitualProps) {
  const [analysisDepth, setAnalysisDepth] = useState("7");
  const [selectedData, setSelectedData] = useState({
    resourceUsage: true,
    operationFrequency: true,
    domainContext: false
  });

  const handleCheckboxChange = (id: keyof typeof selectedData) => {
    setSelectedData(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleBeginRitual = () => {
    // In a real implementation, this would trigger the monetization ritual process
    console.log("Starting ritual with settings:", { analysisDepth, selectedData });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Monetization Ritual</DialogTitle>
          <DialogDescription>
            Analyze domain flow patterns and optimize monetization strategies
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="text-blue-500 dark:text-blue-400 mt-1">
                <i className="fas fa-info-circle"></i>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-300">About the Monetization Ritual</h4>
                <p className="text-sm text-blue-600 dark:text-blue-200 mt-1">
                  This ritual analyzes your domain's flow patterns and proposes optimized monetization strategies based on usage. All proposals require your explicit approval before implementation.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">LLM Reflexologist Activation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The ritual will activate your dormant LLM Reflexologist agent to analyze your flow friction logs and suggest potential monetization strategies tailored to your usage patterns.
            </p>
            
            <div className="bg-gray-50 dark:bg-neutral-dark/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Analysis Depth</span>
                <Select 
                  value={analysisDepth} 
                  onValueChange={setAnalysisDepth}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Data Used for Analysis</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="data-usage" 
                  checked={selectedData.resourceUsage}
                  onCheckedChange={() => handleCheckboxChange('resourceUsage')}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="data-usage" className="font-medium">Resource Usage Patterns</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    CPU, memory, storage, and bandwidth consumption
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="data-operations" 
                  checked={selectedData.operationFrequency}
                  onCheckedChange={() => handleCheckboxChange('operationFrequency')}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="data-operations" className="font-medium">Operation Frequency</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Types and volumes of system operations
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="data-context" 
                  checked={selectedData.domainContext}
                  onCheckedChange={() => handleCheckboxChange('domainContext')}
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="data-context" className="font-medium">Domain Context</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Project type and industry vertical (if available)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleBeginRitual}>
            Begin Ritual
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
