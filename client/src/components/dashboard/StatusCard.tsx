import { StatusCardData } from "@/lib/types";

interface StatusCardProps {
  data: StatusCardData;
}

export default function StatusCard({ data }: StatusCardProps) {
  const { title, value, icon, color, percentage, subvalue, submetric } = data;
  
  return (
    <div className="bg-white dark:bg-neutral-dark shadow rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`bg-${color}-100 dark:bg-${color}-900 p-2 rounded-md`}>
          <i className={`fas ${icon} text-${color}-600 dark:text-${color}-400`}></i>
        </div>
      </div>
      
      {percentage !== undefined && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`bg-${color}-500 h-2 rounded-full`} 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {percentage}% {subvalue}
          </p>
        </div>
      )}
      
      {submetric && (
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-xs">{submetric.label}</span>
            <span className="text-xs">{submetric.value}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`bg-${color}-500 h-2 rounded-full`} 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
