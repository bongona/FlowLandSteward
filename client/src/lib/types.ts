export type Agent = {
  id: string;
  name: string;
  endpoint: string;
  status: 'active' | 'dormant' | 'metering' | 'inactive';
  statusColor: string;
  description: string;
  lastCheck?: {
    time: string;
    status: string;
  };
  mode?: string;
  metering?: string;
  lastActivation?: string;
  activationTrigger?: string;
};

export type LogEntry = {
  id: string;
  timestamp: string;
  agent: string;
  agentColor: string;
  message: string;
};

export type MetricData = {
  hour: string;
  operations: number;
};

export type FlowMetrics = {
  totalOperations: number;
  peakRate: string;
  hourlyMetrics: MetricData[];
};

export type TributeMode = 'symbolic' | 'donation' | 'royalty' | 'friction';

export type TributeStatistics = {
  creditsAccrued: number;
  creditsPercentage: number;
  resourceUsage: string;
  resourcePercentage: number;
  operationsTracked: number;
  operationsPercentage: number;
  lastRitual: string;
};

export type StatusCardData = {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  percentage?: number;
  subvalue?: string;
  submetric?: {
    label: string;
    value: string;
  };
};
