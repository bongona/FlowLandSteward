import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FlowMetrics } from "@/lib/types";

interface FlowMetricsChartProps {
  data: FlowMetrics;
  isLoading?: boolean;
}

export default function FlowMetricsChart({ data, isLoading = false }: FlowMetricsChartProps) {
  const [timeRange, setTimeRange] = useState("24h");
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-neutral-dark shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Flow Friction Metrics</h3>
          <div className="flex space-x-2">
            <Select defaultValue="24h">
              <SelectTrigger className="w-36 text-xs">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-gray-500">Loading metrics data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-neutral-dark shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Flow Friction Metrics</h3>
        <div className="flex space-x-2">
          <Select 
            value={timeRange} 
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-36 text-xs">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-1 px-4">
        {data.hourlyMetrics.map((metric, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <div 
              className="bg-primary hover:bg-primary-dark transition rounded w-6" 
              style={{ height: `${(metric.operations / Math.max(...data.hourlyMetrics.map(m => m.operations))) * 100}%` }}
              title={`${metric.operations} operations`}
            ></div>
            <span className="text-xs text-gray-500">{metric.hour}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Operations</p>
          <p className="text-lg font-bold">{data.totalOperations.toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Peak Rate</p>
          <p className="text-lg font-bold">{data.peakRate}</p>
        </div>
      </div>
    </div>
  );
}
