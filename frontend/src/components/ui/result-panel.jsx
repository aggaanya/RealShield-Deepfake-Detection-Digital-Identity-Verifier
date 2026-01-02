import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shield, AlertCircle, CheckCircle2, Info, ArrowRight, ChevronRight } from 'lucide-react';

const ResultPanel = ({ 
  className, 
  title = "Analysis Results", 
  status = "authenticated", // authenticated, suspicious, inconclusive
  score = 98.7,
  metadata = null,
  details = [],
  onAction,
  actionLabel = "View Full Report",
}) => {
  const [expandedItem, setExpandedItem] = useState(null);
  
  // Determine color scheme and icon based on status
  const config = {
    authenticated: {
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-900/50",
      icon: CheckCircle2,
      label: "Authentic Content",
      accent: "bg-gradient-to-r from-green-500/80 to-green-600/80"
    },
    suspicious: {
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-200 dark:border-amber-900/50",
      icon: AlertCircle,
      label: "Suspicious Content",
      accent: "bg-gradient-to-r from-amber-500/80 to-amber-600/80"
    },
    inconclusive: {
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-900/50",
      icon: Info,
      label: "Inconclusive Results",
      accent: "bg-gradient-to-r from-blue-500/80 to-blue-600/80"
    },
    deepfake: {
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-900/50",
      icon: AlertCircle,
      label: "Deepfake Detected",
      accent: "bg-gradient-to-r from-red-500/80 to-red-600/80"
    }
  };
  
  const statusConfig = config[status] || config.inconclusive;
  const StatusIcon = statusConfig.icon;

  // Generate score representation
  const renderScore = () => {
    // Don't use perfect centering for a more organic, designed look
    return (
      <div className="relative flex flex-col items-center justify-center">
        {/* Asymmetric background blob for organic feel */}
        <div className={`absolute w-40 h-40 rounded-full opacity-10 filter blur-xl ${statusConfig.color}`}></div>
        
        {/* Score path tracing for an active, visually engaging component */}
        <div className="relative w-32 h-32">
          {/* Background track */}
          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="42" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeOpacity="0.2" 
              className="text-muted-foreground" 
            />
          </svg>
          
          {/* Score progress - with intentional offset for distinctive look */}
          <svg className="absolute w-full h-full rotate-[210deg]" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="42" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="6"
              strokeDasharray={`${Math.min(score, 100) * 2.64} 264`}
              strokeLinecap="round"
              className={statusConfig.color}
            />
          </svg>
          
          {/* Small accent arrow at the end of the progress */}
          <div 
            className={`absolute w-3 h-3 rounded-full ${statusConfig.color}`}
            style={{
              top: '5%',
              left: '50%',
              transform: `translateX(-50%) rotate(${(Math.min(score, 100) * 2.64) - 30}deg) translateY(-20px)`,
            }}
          />
          
          {/* Main score display - slightly off center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center -translate-y-1">
            <div className={`text-4xl font-bold ${statusConfig.color}`}>{score}%</div>
            <div className="text-xs text-muted-foreground mt-1">confidence</div>
          </div>
        </div>
      </div>
    );
  };
  
  // Main component render
  return (
    <div className={cn(
      "rounded-xl overflow-hidden shadow-lg border",
      statusConfig.borderColor,
      statusConfig.bgColor,
      className
    )}>
      {/* Header bar */}
      <div className={cn(
        "py-4 px-6 flex items-center justify-between text-white",
        statusConfig.accent
      )}>
        <div className="flex items-center space-x-2">
          <StatusIcon className="w-5 h-5" />
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="text-sm font-semibold tracking-wide">
          {statusConfig.label}
        </div>
      </div>
      
      {/* Content area with asymmetric layout */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left content */}
          <div className="md:col-span-5 lg:col-span-4">
            {renderScore()}
            
            {/* Metadata with custom asymmetric design */}
            {metadata && (
              <div className="mt-6 border-t border-dashed pt-4 text-sm text-muted-foreground">
                <ul className="space-y-1">
                  {Object.entries(metadata).map(([key, value], index) => (
                    <li key={key} className="flex justify-between items-center">
                      <span className="text-xs uppercase tracking-wider opacity-70">{key}:</span>
                      <span className={`font-mono text-xs ${index === 0 ? 'font-medium ' + statusConfig.color : ''}`}>
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {onAction && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={onAction}
                  className={cn(
                    "text-sm flex items-center px-4 py-2 rounded-md transition-colors",
                    `text-${status === 'authenticated' ? 'green' : status === 'suspicious' ? 'amber' : status === 'deepfake' ? 'red' : 'blue'}-600`,
                    `hover:bg-${status === 'authenticated' ? 'green' : status === 'suspicious' ? 'amber' : status === 'deepfake' ? 'red' : 'blue'}-50`,
                    `dark:text-${status === 'authenticated' ? 'green' : status === 'suspicious' ? 'amber' : status === 'deepfake' ? 'red' : 'blue'}-400`,
                    `dark:hover:bg-${status === 'authenticated' ? 'green' : status === 'suspicious' ? 'amber' : status === 'deepfake' ? 'red' : 'blue'}-900/30`,
                  )}
                >
                  {actionLabel}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          
          {/* Right content - detailed analysis */}
          <div className="md:col-span-7 lg:col-span-8">
            <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">Analysis Details</h4>
            
            {/* Detail items with expandable sections */}
            <div className="space-y-3">
              {details.map((detail, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "border rounded-lg overflow-hidden transition-colors",
                    expandedItem === index ? statusConfig.borderColor : "border-muted"
                  )}
                >
                  <button
                    onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                    className={cn(
                      "w-full px-4 py-3 flex items-center justify-between text-left",
                      expandedItem === index ? "bg-white/50 dark:bg-black/5" : "bg-transparent"
                    )}
                  >
                    <div className="flex items-center">
                      {/* Confidence indicator dot - slightly irregular sizing */}
                      <div 
                        className="w-2.5 h-2.5 rounded-full mr-2.5"
                        style={{
                          backgroundColor: detail.confidence >= 80 ? '#22c55e' : 
                                          detail.confidence >= 60 ? '#f59e0b' : 
                                          '#ef4444'
                        }}
                      />
                      <span className={`font-medium ${expandedItem === index ? statusConfig.color : ''}`}>
                        {detail.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className={`text-xs font-medium mr-2 ${expandedItem === index ? statusConfig.color : 'text-muted-foreground'}`}>
                        {detail.confidence}%
                      </span>
                      <ChevronRight 
                        className={cn("h-4 w-4 text-muted-foreground transition-transform", 
                          expandedItem === index ? "transform rotate-90" : ""
                        )} 
                      />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedItem === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-3 pt-0 border-t border-dashed border-muted">
                          <p className="text-sm text-muted-foreground py-2">
                            {detail.description}
                          </p>
                          
                          {/* Result metrics in asymmetric pattern */}
                          {detail.metrics && (
                            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                              {Object.entries(detail.metrics).map(([key, value]) => (
                                <div key={key} className="text-xs flex justify-between">
                                  <span className="text-muted-foreground">{key}:</span>
                                  <span className="font-medium ml-1">{value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            
            {/* Subtle asymmetric decoration */}
            <div className="mt-6 flex items-center">
              <div className={`h-0.5 w-1/3 ${statusConfig.color} opacity-20`}></div>
              <div className={`h-0.5 w-1/6 bg-muted opacity-10 ml-1`}></div>
              <Shield className={`h-3.5 w-3.5 ${statusConfig.color} opacity-40 ml-3`} />
            </div>
            
            {/* Analysis timestamp with offset position */}
            <div className="mt-2 text-xs text-muted-foreground opacity-70 flex justify-end">
              Analysis completed: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPanel;
