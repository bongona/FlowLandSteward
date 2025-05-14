import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import MonetizationRitual from "@/components/modals/MonetizationRitual";
import { TributeMode, TributeStatistics } from "@/lib/types";

interface TributeManagementProps {
  activeMode: TributeMode;
  statistics: TributeStatistics;
  onModeChange: (mode: TributeMode) => void;
}

export default function TributeManagement({ activeMode, statistics, onModeChange }: TributeManagementProps) {
  const [isRitualOpen, setIsRitualOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<TributeMode>(activeMode);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  
  // Mode-specific settings
  const [donationEnabled, setDonationEnabled] = useState(true);
  const [donationSuggestion, setDonationSuggestion] = useState("usage-based");
  const [royaltyPercentage, setRoyaltyPercentage] = useState(5);
  const [frictionPricing, setFrictionPricing] = useState({
    cpu: 2,
    memory: 1,
    storage: 3,
    network: 4
  });
  
  // Update local state when active mode changes from props
  useEffect(() => {
    setSelectedMode(activeMode);
  }, [activeMode]);
  
  const handleModeChange = (mode: TributeMode) => {
    setSelectedMode(mode);
  };
  
  const handleSubmit = () => {
    onModeChange(selectedMode);
  };

  // Render different settings based on selected mode
  const renderModeSettings = () => {
    if (!showAdvancedSettings) return null;
    
    switch (selectedMode) {
      case "symbolic":
        return (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h5 className="text-sm font-medium mb-3">Symbolic Credits Settings</h5>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Credit Visibility</span>
                <Select defaultValue="private">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="shared">User Controlled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Track Historical Usage</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        );
      
      case "donation":
        return (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h5 className="text-sm font-medium mb-3">Donation Settings</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Donations</span>
                <Switch 
                  checked={donationEnabled} 
                  onCheckedChange={setDonationEnabled} 
                />
              </div>
              
              {donationEnabled && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Suggestion Method</span>
                    <Select 
                      value={donationSuggestion} 
                      onValueChange={setDonationSuggestion}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usage-based">Usage Based</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="tiered">Tiered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show Donation Link</span>
                    <Switch defaultChecked />
                  </div>
                </>
              )}
            </div>
          </div>
        );
      
      case "royalty":
        return (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h5 className="text-sm font-medium mb-3">Royalty Settings</h5>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Royalty Percentage</span>
                  <span className="text-sm font-medium">{royaltyPercentage}%</span>
                </div>
                <Slider
                  value={[royaltyPercentage]}
                  min={1}
                  max={20}
                  step={0.5}
                  onValueChange={(value) => setRoyaltyPercentage(value[0])}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Revenue Model</span>
                <Select defaultValue="per-operation">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per-operation">Per Operation</SelectItem>
                    <SelectItem value="resource-usage">Resource Usage</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Apply Revenue Cap</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        );
      
      case "friction":
        return (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h5 className="text-sm font-medium mb-3">Friction Credits Pricing</h5>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">CPU Usage (credits/unit)</span>
                  <Input
                    type="number"
                    value={frictionPricing.cpu}
                    onChange={(e) => setFrictionPricing({...frictionPricing, cpu: parseInt(e.target.value) || 0})}
                    className="w-20 h-8 text-right"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Memory Allocation (credits/MB)</span>
                  <Input
                    type="number"
                    value={frictionPricing.memory}
                    onChange={(e) => setFrictionPricing({...frictionPricing, memory: parseInt(e.target.value) || 0})}
                    className="w-20 h-8 text-right"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Storage Operations (credits/op)</span>
                  <Input
                    type="number"
                    value={frictionPricing.storage}
                    onChange={(e) => setFrictionPricing({...frictionPricing, storage: parseInt(e.target.value) || 0})}
                    className="w-20 h-8 text-right"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Network Transactions (credits/KB)</span>
                  <Input
                    type="number"
                    value={frictionPricing.network}
                    onChange={(e) => setFrictionPricing({...frictionPricing, network: parseInt(e.target.value) || 0})}
                    className="w-20 h-8 text-right"
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
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
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Active Tribute Mode</h4>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Advanced</span>
              <Switch 
                checked={showAdvancedSettings} 
                onCheckedChange={setShowAdvancedSettings}
                className="h-4 w-7"
              />
            </div>
          </div>
          
          <RadioGroup 
            value={selectedMode} 
            onValueChange={(value) => handleModeChange(value as TributeMode)} 
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
          
          {renderModeSettings()}
          
          <div className="mt-6">
            <Button 
              variant="default" 
              className="w-full"
              onClick={handleSubmit}
              disabled={selectedMode === activeMode}
            >
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
