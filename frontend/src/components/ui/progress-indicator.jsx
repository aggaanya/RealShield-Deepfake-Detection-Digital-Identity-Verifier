import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ProgressIndicator = ({ 
  progress, 
  label, 
  variant = 'default',
  size = 'default',
  showPercentage = true,
  className,
  ...props 
}) => {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    // Animate progress value
    setAnimated(progress);
  }, [progress]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'tech':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600';
      case 'success':
        return 'bg-trust-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-alert-500';
      case 'shield':
        return 'bg-shield-500';
      default:
        return 'bg-primary';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-1.5';
      case 'lg':
        return 'h-3';
      default:
        return 'h-2';
    }
  };

  return (
    <div className={cn("w-full space-y-2", className)} {...props}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {showPercentage && (
            <span className="text-xs font-medium text-muted-foreground">{Math.round(animated)}%</span>
          )}
        </div>
      )}
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", getSizeClasses())}>
        <motion.div
          className={cn("rounded-full", getSizeClasses(), getVariantClasses())}
          initial={{ width: 0 }}
          animate={{ width: `${animated}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export const TechProgressBar = ({ 
  progress, 
  label, 
  showPercentage = true,
  className,
  ...props 
}) => {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    setAnimated(progress);
  }, [progress]);

  return (
    <div className={cn("w-full space-y-2", className)} {...props}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{label}</span>
          {showPercentage && (
            <span className="text-xs font-medium text-blue-600 dark:text-blue-500">{Math.round(animated)}%</span>
          )}
        </div>
      )}
      <div className="relative w-full h-3 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Glowing border */}
        <div className="absolute inset-0 rounded-full border border-blue-200 dark:border-blue-800/50"></div>
        
        {/* Animated progress */}
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 relative"
          initial={{ width: 0 }}
          animate={{ width: `${animated}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 tech-shine-overlay"></div>
          
          {/* Pulse markers */}
          {[25, 50, 75].map((marker) => (
            marker <= progress && (
              <div 
                key={marker} 
                className="absolute top-0 bottom-0 w-0.5 bg-white/50"
                style={{ left: `${marker}%` }}
              />
            )
          ))}
        </motion.div>
        
        {/* Track markers */}
        <div className="absolute inset-0 flex justify-between items-center px-1">
          {[25, 50, 75].map((marker) => (
            <div 
              key={marker} 
              className="h-1.5 w-0.5 bg-blue-300/30 dark:bg-blue-700/30"
              style={{ marginLeft: `${marker}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ScanningProgressBar = ({ 
  progress, 
  label, 
  className, 
  ...props 
}) => {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    setAnimated(progress);
  }, [progress]);

  return (
    <div className={cn("w-full space-y-3", className)} {...props}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{label}</span>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-500">{Math.round(animated)}%</span>
        </div>
      )}
      
      <div className="relative w-full h-5 bg-blue-50/50 dark:bg-blue-900/10 rounded-md overflow-hidden border border-blue-200/50 dark:border-blue-800/30 backdrop-blur-sm">
        {/* Background grid pattern */}
        <div className="absolute inset-0 tech-bg-grid"></div>
        
        {/* Animated progress */}
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500/80 via-blue-600/80 to-indigo-600/80 relative"
          initial={{ width: 0 }}
          animate={{ width: `${animated}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Scanning line */}
          <div className="absolute top-0 bottom-0 right-0 w-1 bg-white/90 animate-pulse-tech"></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 tech-shine-overlay"></div>
        </motion.div>
        
        {/* Status labels */}
        <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
          <span className="text-[10px] font-medium text-blue-700 dark:text-blue-400">Scanning</span>
          <span className="text-[10px] font-medium text-muted-foreground">Analyzing</span>
          <span className="text-[10px] font-medium text-muted-foreground">Verifying</span>
          <span className="text-[10px] font-medium text-muted-foreground">Complete</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
