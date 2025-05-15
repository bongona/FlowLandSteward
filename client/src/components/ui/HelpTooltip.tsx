import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTooltip } from '@/components/TooltipContext';

interface HelpTooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
}) => {
  const { tooltipsEnabled } = useTooltip();

  if (!tooltipsEnabled) {
    return <>{children}</>;
  }

  return (
    <Tooltip>
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
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default HelpTooltip;