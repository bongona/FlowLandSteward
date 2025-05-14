import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MonetizationRitual from "@/components/modals/MonetizationRitual";
import { TributeMode, TributeStatistics } from "@/lib/types";

interface TributeManagementProps {
  activeMode: TributeMode;
  statistics: TributeStatistics;
  onModeChange: (mode: TributeMode) => void;
}

export default function TributeManagement({ activeMode, statistics, onModeChange }: TributeManagementProps) {
  const [isRitualOpen, setIsRitualOpen] = useState(false);
  
  return (
    <div className="bg-white dark:bg-neutral-dark shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">Tribute Management</h3>
          <p className="text-gray-600 dark:text-gray-400">Configure how system usage is metered and tribute is collected</p>
        </div>
        <Button 
          onClick={() => setIsRitualOpen(true)} 
          className="mt-3 md:mt-0 bg-accent hover:bg-accent-dark text-white"
        >
          <i className="fas fa-sync-alt mr-2"></i>
          Start Monetization Ritual
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tribute Mode Selection */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-medium mb-4">Active Tribute Mode</h4>
          
          <RadioGroup 
            value={activeMode} 
            onValueChange={(value) => onModeChange(value as TributeMode)} 
            className="space-y-3"
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="symbolic" id="tribute-symbolic" />
              <div>
                <Label htmlFor="tribute-symbolic" className="font-medium">Symbolic Credits</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tracks usage with virtual tokens without real-world value
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="donation" id="tribute-donation" />
              <div>
                <Label htmlFor="tribute-donation" className="font-medium">Donation</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Suggests optional donations based on usage patterns
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="royalty" id="tribute-royalty" />
              <div>
                <Label htmlFor="tribute-royalty" className="font-medium">Royalty</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Calculates usage-based royalties for revenue sharing
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="friction" id="tribute-friction" />
              <div>
                <Label htmlFor="tribute-friction" className="font-medium">Friction Credits</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Implements a micro-credit system for resource balancing
                </p>
              </div>
            </div>
          </RadioGroup>
          
          <div className="mt-6">
            <Button variant="default" className="w-full">
              Update Tribute Mode
            </Button>
          </div>
        </div>
        
        {/* Tribute Statistics */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="font-medium mb-4">Tribute Collection Statistics</h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Symbolic Credits Accrued</span>
                <span className="text-sm font-medium">{statistics.creditsAccrued.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${statistics.creditsPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Resource Usage Metered</span>
                <span className="text-sm font-medium">{statistics.resourceUsage}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${statistics.resourcePercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Operations Tracked</span>
                <span className="text-sm font-medium">{statistics.operationsTracked.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${statistics.operationsPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Last Monetization Ritual</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{statistics.lastRitual}</span>
            </div>
            <div className="mt-4">
              <Button variant="link" className="p-0 text-primary hover:text-primary-dark dark:hover:text-primary-light text-sm">
                <span>View Last Ritual Report</span>
                <i className="fas fa-chevron-right text-xs ml-1"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <MonetizationRitual 
        isOpen={isRitualOpen} 
        onClose={() => setIsRitualOpen(false)} 
      />
    </div>
  );
}
