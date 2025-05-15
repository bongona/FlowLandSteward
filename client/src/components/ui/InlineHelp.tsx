import React from 'react';
import { useTooltip } from '@/components/TooltipContext';
import HelpTooltip from '@/components/ui/HelpTooltip';

interface InlineHelpProps {
  topic: string;
  position?: 'dashboard' | 'tribute' | 'integrity' | 'rituals' | 'agents';
}

/**
 * This component displays context-aware help for various parts of the application
 * It shows tooltips based on the current section and topic when tooltips are enabled
 */
const InlineHelp: React.FC<InlineHelpProps> = ({ topic, position = 'dashboard' }) => {
  const { tooltipsEnabled } = useTooltip();
  
  if (!tooltipsEnabled) return null;
  
  // Help content organized by section and topic
  const helpContent: Record<string, Record<string, React.ReactNode>> = {
    dashboard: {
      'status-cards': (
        <div className="max-w-xs">
          <p className="font-medium">Status Cards</p>
          <p className="text-sm">These cards provide an at-a-glance view of your domain's critical metrics and statuses. The color indicators show severity or importance.</p>
        </div>
      ),
      'activity-log': (
        <div className="max-w-xs">
          <p className="font-medium">Activity Log</p>
          <p className="text-sm">This section shows recent operations performed by your domain agents. The colored agent names indicate their current status.</p>
        </div>
      ),
      'metrics': (
        <div className="max-w-xs">
          <p className="font-medium">Performance Metrics</p>
          <p className="text-sm">This chart shows resource usage over time. Peaks indicate high activity periods that may require optimization.</p>
        </div>
      ),
    },
    tribute: {
      'mode-selection': (
        <div className="max-w-xs">
          <p className="font-medium">Tribute Mode Selection</p>
          <p className="text-sm">Choose the most appropriate mode based on your domain's operational characteristics and monetization goals.</p>
          <ul className="text-xs mt-1 list-disc pl-4">
            <li>Symbolic: Best for metrics only</li>
            <li>Donation: For voluntary contributions</li>
            <li>Royalty: For percentage-based billing</li>
            <li>Friction: For optimizing high-volume operations</li>
          </ul>
        </div>
      ),
      'credits': (
        <div className="max-w-xs">
          <p className="font-medium">Credits Accumulation</p>
          <p className="text-sm">This metric tracks the total tribute units accrued under the current mode. Value interpretation varies by mode.</p>
        </div>
      ),
    },
    integrity: {
      'integrity-score': (
        <div className="max-w-xs">
          <p className="font-medium">Integrity Score</p>
          <p className="text-sm">This score (0-100) represents overall domain sovereignty and security. Scores below 90 indicate areas needing attention.</p>
        </div>
      ),
      'check-frequency': (
        <div className="max-w-xs">
          <p className="font-medium">Check Frequency</p>
          <p className="text-sm">Regular integrity checks should be performed weekly or after significant system changes.</p>
        </div>
      ),
    },
    rituals: {
      'ritual-scheduling': (
        <div className="max-w-xs">
          <p className="font-medium">Strategy Analysis Scheduling</p>
          <p className="text-sm">Schedule analyses for periods of typical usage to get the most accurate monetization recommendations.</p>
        </div>
      ),
      'data-selection': (
        <div className="max-w-xs">
          <p className="font-medium">Data Selection</p>
          <p className="text-sm">For comprehensive analysis, select all data types. For focused analysis, select only the relevant categories.</p>
        </div>
      ),
    },
    agents: {
      'agent-status': (
        <div className="max-w-xs">
          <p className="font-medium">Agent Status</p>
          <p className="text-sm">Agents can be Active (running), Dormant (configured but not running), or Inactive (needs setup).</p>
        </div>
      ),
      'agent-config': (
        <div className="max-w-xs">
          <p className="font-medium">Agent Configuration</p>
          <p className="text-sm">Configure each agent's behavior, resource allocation, and operational parameters from this panel.</p>
        </div>
      ),
    }
  };
  
  // Get the help content for the current position and topic
  const content = helpContent[position]?.[topic];
  
  if (!content) return null;
  
  return (
    <HelpTooltip content={content}>
      <i className="fas fa-info-circle text-blue-500 cursor-help ml-1.5 text-sm" />
    </HelpTooltip>
  );
};

export default InlineHelp;