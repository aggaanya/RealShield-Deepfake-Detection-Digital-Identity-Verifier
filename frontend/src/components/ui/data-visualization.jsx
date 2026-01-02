import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './card';
import { cn } from '@/lib/utils';

// Radar Chart Component
export const RadarChart = ({ data, labels, className }) => {
  const maxValue = Math.max(...data, 100);
  const points = data.map((value, i) => {
    const angle = (Math.PI * 2 * i) / data.length;
    const radius = (value / maxValue) * 100;
    const x = 100 + radius * Math.sin(angle);
    const y = 100 - radius * Math.cos(angle);
    return `${x},${y}`;
  });

  return (
    <div className={cn("relative w-full aspect-square max-w-md mx-auto", className)}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background circles */}
        {[20, 40, 60, 80, 100].map((radius, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-800"
            strokeWidth="0.5"
          />
        ))}

        {/* Axis lines */}
        {labels.map((_, i) => {
          const angle = (Math.PI * 2 * i) / labels.length;
          const x = 100 + 100 * Math.sin(angle);
          const y = 100 - 100 * Math.cos(angle);
          return (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={x}
              y2={y}
              stroke="currentColor"
              className="text-gray-300 dark:text-gray-700"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          points={points.join(' ')}
          className="fill-blue-500/20 stroke-blue-500 dark:fill-blue-700/30 dark:stroke-blue-400"
          strokeWidth="2"
        />

        {/* Data points */}
        {data.map((value, i) => {
          const angle = (Math.PI * 2 * i) / data.length;
          const radius = (value / maxValue) * 100;
          const x = 100 + radius * Math.sin(angle);
          const y = 100 - radius * Math.cos(angle);
          return (
            <motion.circle
              key={i}
              initial={{ opacity: 0, r: 0 }}
              animate={{ opacity: 1, r: 3 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              cx={x}
              cy={y}
              className="fill-white stroke-blue-500 dark:stroke-blue-400"
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {labels.map((label, i) => {
          const angle = (Math.PI * 2 * i) / labels.length;
          const radius = 115;
          const x = 100 + radius * Math.sin(angle);
          const y = 100 - radius * Math.cos(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-current text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// Bar Chart Component
export const BarChart = ({ data, labels, className, maxValue = 100, datasets }) => {
  // Handle case where data is not an array or is undefined
  const safeData = Array.isArray(data) ? data : [];
  const safeLabels = Array.isArray(labels) ? labels : [];
  const safeDatasets = Array.isArray(datasets) ? datasets : [];
  
  // If datasets are provided, use those instead of simple data array
  const hasDatasets = safeDatasets.length > 0;
  
  // Color mappings for multiple datasets
  const colors = [
    'bg-gradient-to-r from-blue-500 to-indigo-600',
    'bg-gradient-to-r from-purple-500 to-pink-500',
    'bg-gradient-to-r from-emerald-500 to-cyan-500',
    'bg-gradient-to-r from-orange-500 to-amber-600'
  ];
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col space-y-3">
        {safeLabels.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No data available</div>
        ) : (
          safeLabels.map((label, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-gray-700 dark:text-gray-300">{label || `Item ${i+1}`}</span>
                {!hasDatasets && (
                  <span className="text-gray-500 dark:text-gray-400">
                    {safeData[i] !== undefined ? `${safeData[i]}%` : '0%'}
                  </span>
                )}
              </div>
              
              {hasDatasets ? (
                <div className="space-y-1">
                  {safeDatasets.map((dataset, datasetIndex) => (
                    <div key={datasetIndex} className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${((dataset.values[i] || 0) / maxValue) * 100}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 + datasetIndex * 0.1 }}
                          className={`h-full ${colors[datasetIndex % colors.length]}`}
                        />
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${colors[datasetIndex % colors.length]}`}></div>
                        <span className="text-xs text-gray-500">{dataset.values[i] || 0}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((safeData[i] || 0) / maxValue) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`h-full ${colors[0]}`}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Confidence Meter Component
export const ConfidenceMeter = ({ value = 0, className }) => {
  const getColor = () => {
    if (value < 30) return 'from-red-500 to-orange-500';
    if (value < 70) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-teal-500';
  };

  const getLabel = () => {
    if (value < 30) return 'Low Confidence';
    if (value < 70) return 'Medium Confidence';
    return 'High Confidence';
  };

  return (
    <div className={cn("w-full max-w-xs mx-auto", className)}>
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm font-medium">Confidence Level</span>
        <span className="text-sm font-bold text-blue-700 dark:text-blue-400">{value}%</span>
      </div>
      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-0.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`h-full rounded-full bg-gradient-to-r ${getColor()}`}
        />
      </div>
      <div className="mt-1 text-xs text-right font-medium">{getLabel()}</div>
    </div>
  );
};

// Threat Analysis Card
export const ThreatAnalysisCard = ({ 
  title, 
  description, 
  confidence, 
  metrics = [],
  className 
}) => {
  return (
    <Card variant="tech" className={cn("overflow-hidden", className)}>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <div className="mb-6">
          <ConfidenceMeter value={confidence} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Detection Metrics</h4>
            <BarChart 
              data={metrics.map(m => m.value)} 
              labels={metrics.map(m => m.label)} 
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Analysis Overview</h4>
            <RadarChart 
              data={metrics.map(m => m.value)} 
              labels={metrics.map(m => m.label)} 
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

// Default export for main visualization component
const DataVisualization = ({ 
  type = 'radar', 
  data = [],
  labels = [],
  className,
  ...props
}) => {
  // Handle different data formats
  let processedData = data;
  let processedLabels = labels;
  let datasets = [];
  
  // Check if data is an object with datasets and labels properties (chart.js format)
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    if (data.datasets) {
      datasets = data.datasets;
      processedLabels = data.labels || [];
      
      if (type === 'bar') {
        // For bar chart, extract the first dataset's values if we need single dataset data
        processedData = data.datasets[0]?.values || [];
      }
    }
  }
  
  const charts = {
    radar: <RadarChart data={processedData} labels={processedLabels} className={className} {...props} />,
    bar: <BarChart 
           data={processedData} 
           labels={processedLabels} 
           datasets={datasets}
           className={className} 
           {...props} 
         />,
    confidence: <ConfidenceMeter 
                  value={Array.isArray(processedData) ? processedData[0] || 0 : 0} 
                  className={className} 
                  {...props} 
                />
  };
  
  return charts[type] || charts.radar;
};

export default DataVisualization;
