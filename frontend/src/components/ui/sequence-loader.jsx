import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const SequenceLoader = ({ 
  className, 
  size = 'md', 
  variant = 'shield',
  label = 'Processing',
  showLabel = true
}) => {
  // Define size classes
  const sizeStyles = {
    sm: "w-24 h-8",
    md: "w-32 h-10",
    lg: "w-40 h-12", 
  };
  
  // Define color variations
  const colorStyles = {
    shield: {
      primary: "bg-shield-500",
      secondary: "bg-blue-500",
      accent: "bg-shield-600",
      textColor: "text-shield-700 dark:text-shield-300",
    },
    blue: {
      primary: "bg-blue-500",
      secondary: "bg-indigo-500",
      accent: "bg-blue-600",
      textColor: "text-blue-700 dark:text-blue-300",
    },
    neutral: {
      primary: "bg-gray-500",
      secondary: "bg-gray-400",
      accent: "bg-gray-600",
      textColor: "text-gray-700 dark:text-gray-300",
    }
  };
  
  // Get the selected color style
  const colors = colorStyles[variant] || colorStyles.shield;
  
  // Dynamic asymmetric particles
  const particleCount = 12;
  const particles = Array.from({ length: particleCount });
  
  // Create an array of offsets to make the pattern less perfect/predictable
  // This helps avoid the AI-generated look by introducing intentional irregularities
  const offsetVariations = [0, 0.2, -0.1, 0.15, -0.25, 0.1, -0.15, 0.25, -0.2, 0.05, -0.05, 0.3];
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative", sizeStyles[size] || sizeStyles.md)}>
        {/* Loading track - irregular asymmetric pattern */}
        <svg 
          viewBox="0 0 100 30" 
          className="w-full h-full"
        >
          {/* Base asymmetric path with imperfection */}
          <path 
            d="M10,15 Q30,5 50,15 T90,15" 
            fill="none" 
            stroke="currentColor" 
            strokeOpacity="0.1" 
            strokeWidth="2" 
            strokeLinecap="round"
            className="dark:stroke-white/10"
          />
          
          {/* Organic background gradient fill underneath */}
          <defs>
            <linearGradient id="loadingGradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="rgba(66, 153, 225, 0)" />
              <stop offset="50%" stopColor="rgba(66, 153, 225, 0.1)" />
              <stop offset="100%" stopColor="rgba(66, 153, 225, 0)" />
            </linearGradient>
          </defs>
          
          <path 
            d="M5,22 Q30,5 50,20 T95,18" 
            fill="url(#loadingGradient)" 
            strokeOpacity="0" 
            className="dark:opacity-30"
          />
        </svg>

        {/* Animated particles */}
        {particles.map((_, index) => {
          // Asymmetric timing offsets
          const delayOffset = 0.06 * index;
          // Vary sizes slightly for each particle
          const size = Math.max(1.8, 2.2 + (index % 3 - 1) * 0.4);
          // Apply an offset to the y-position to make the pattern irregular
          const yOffset = offsetVariations[index % offsetVariations.length];
          
          return (
            <motion.div
              key={index}
              className={cn(
                "absolute rounded-full",
                // Use different colors for some particles to add variety
                index % 4 === 0 ? colors.secondary : 
                index % 5 === 0 ? colors.accent : colors.primary
              )}
              initial={{
                x: "-5%",
                y: `calc(50% + ${yOffset * 10}px)`,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: "105%",
                y: [
                  `calc(50% + ${yOffset * 10}px)`, 
                  `calc(50% + ${yOffset * -8}px)`,
                  `calc(50% + ${yOffset * 6}px)`,
                  `calc(50% + ${yOffset * -10}px)`,
                  `calc(50% + ${yOffset * 10}px)`
                ],
                opacity: [0, 1, 1, 1, 0],
                scale: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: delayOffset,
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                // Add subtle box shadow only to some particles
                boxShadow: index % 3 === 0 ? `0 0 8px ${index % 4 === 0 ? 'rgba(66, 153, 225, 0.3)' : 'rgba(66, 153, 225, 0.5)'}` : 'none',
              }}
            />
          );
        })}
        
        {/* Dynamic pulse accent */}
        <motion.div
          className={cn(
            "absolute top-[40%] left-[20%] w-12 h-12 rounded-full",
            colors.primary
          )}
          animate={{
            opacity: [0, 0.03, 0],
            scale: [1, 1.5, 1.8],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            filter: "blur(8px)",
          }}
        />
        
        <motion.div
          className={cn(
            "absolute top-[30%] left-[70%] w-8 h-8 rounded-full",
            colors.secondary
          )}
          animate={{
            opacity: [0, 0.02, 0],
            scale: [1, 1.2, 1.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.6,
            ease: "easeInOut",
          }}
          style={{
            filter: "blur(6px)",
          }}
        />
      </div>
      
      {/* Label with dynamic dots */}
      {showLabel && (
        <div className={cn("mt-2 flex items-center", colors.textColor)}>
          <span className="text-sm font-medium">{label}</span>
          <div className="flex ml-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="opacity-0 text-sm"
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SequenceLoader;
