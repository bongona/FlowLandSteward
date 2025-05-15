import React, { useState, useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTooltip } from '@/components/TooltipContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface HelpTooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  analyzeData?: boolean;
  dataType?: 'tribute' | 'integrity' | 'agents' | 'monetization' | 'dashboard';
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  analyzeData = false,
  dataType = 'dashboard',
}) => {
  const { tooltipsEnabled } = useTooltip();
  const [showTooltip, setShowTooltip] = useState(false);
  const [persistentTooltip, setPersistentTooltip] = useState(false);
  const [analyzedContent, setAnalyzedContent] = useState<React.ReactNode | null>(null);

  // This would typically fetch real-time data from the backend
  // Here we're simulating the analysis with pre-generated insights
  useEffect(() => {
    if (analyzeData && showTooltip) {
      // Simulated analysis delay
      const timer = setTimeout(() => {
        setAnalyzedContent(getAnalyzedContent(dataType));
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [analyzeData, showTooltip, dataType]);

  if (!tooltipsEnabled) {
    return <>{children}</>;
  }

  const closeTooltip = () => {
    setPersistentTooltip(false);
    setShowTooltip(false);
  };
  
  const makeTooltipPersistent = () => {
    setPersistentTooltip(true);
  };

  const tooltipContent = (
    <div className="flex flex-col">
      <div className="mb-2">{content}</div>
      
      {analyzeData && (
        <div className="mt-2 border-t pt-2">
          <h4 className="text-sm font-medium mb-1">Asset Analysis:</h4>
          {analyzedContent ? (
            <div className="text-xs">{analyzedContent}</div>
          ) : (
            <div className="text-xs italic">Analyzing current data...</div>
          )}
        </div>
      )}
      
      <div className="flex justify-end mt-2 gap-2">
        {!persistentTooltip && (
          <Button 
            size="sm" 
            variant="outline" 
            className="h-6 px-2 text-xs"
            onClick={makeTooltipPersistent}
          >
            Keep Open
          </Button>
        )}
        <Button 
          size="sm" 
          variant="default" 
          className="h-6 px-2 text-xs"
          onClick={closeTooltip}
        >
          OK
        </Button>
      </div>
    </div>
  );

  // For persistent tooltips, we use a card instead of a tooltip
  if (persistentTooltip) {
    return (
      <>
        {children ? (
          children
        ) : (
          <span className="inline-flex items-center justify-center cursor-help ml-1 text-blue-500">
            <i className="fas fa-info-circle" />
          </span>
        )}
        <Card className="absolute z-50 bg-white dark:bg-gray-800 shadow-md p-3 max-w-xs rounded-md border">
          {tooltipContent}
        </Card>
      </>
    );
  }

  return (
    <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
      <TooltipTrigger asChild>
        {children ? (
          children
        ) : (
          <span className="inline-flex items-center justify-center cursor-help ml-1 text-blue-500">
            <i className="fas fa-info-circle" />
          </span>
        )}
      </TooltipTrigger>
      <TooltipContent side={side} align={align} className="max-w-xs">
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
};

// Function to generate analyzed content based on data type
function getAnalyzedContent(dataType: string): React.ReactNode {
  switch (dataType) {
    case 'tribute':
      return (
        <div>
          <p className="mb-1"><strong>Current Pattern:</strong> Regular intervals, moderate volume</p>
          <p className="mb-1"><strong>Recommendation:</strong> Friction Credits model could increase monetization by 23%</p>
          <p><strong>Optimal Query:</strong> Focus on high-volume operations</p>
        </div>
      );
    case 'integrity':
      return (
        <div>
          <p className="mb-1"><strong>Security Status:</strong> Multiple validation layers active (98% coverage)</p>
          <p className="mb-1"><strong>Optimization:</strong> Daily integrity checks on critical paths would improve resilience</p>
          <p><strong>Search Strategy:</strong> Target audit logs with anomaly detection patterns</p>
        </div>
      );
    case 'agents':
      return (
        <div>
          <p className="mb-1"><strong>Resource Allocation:</strong> Integrity agent consuming 45% of resources</p>
          <p className="mb-1"><strong>Suggestion:</strong> Enable Resilience agent during peak hours</p>
          <p><strong>Search Focus:</strong> Load distribution patterns with minimal query footprint</p>
        </div>
      );
    case 'monetization':
      return (
        <div>
          <p className="mb-1"><strong>Potential Revenue:</strong> Current tribute model captures ~67% of value</p>
          <p className="mb-1"><strong>Strategy:</strong> Time-based pricing during peak periods could increase yield</p>
          <p><strong>Analysis Query:</strong> Value distribution across operation types</p>
        </div>
      );
    default: // dashboard
      return (
        <div>
          <p className="mb-1"><strong>System Status:</strong> Healthy operations with balanced resource allocation</p>
          <p className="mb-1"><strong>Monetization Potential:</strong> Consider scheduled analysis to optimize tribute modes</p>
          <p><strong>Query Strategy:</strong> Scan high-level metrics first, then drill into specific patterns</p>
        </div>
      );
  }
}

export default HelpTooltip;