import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const FlowBackground = ({ 
  className, 
  contentClassName, 
  children, 
  variant = 'shield', 
  intensity = 'medium',
  layerCount = 3,
  animate = true
}) => {
  // Color variants
  const colors = {
    shield: [
      'rgba(66, 153, 225, 0.03)', // Base layer
      'rgba(49, 130, 206, 0.04)', // Mid layer
      'rgba(43, 108, 176, 0.05)' // Top layer
    ],
    blue: [
      'rgba(66, 153, 225, 0.04)',
      'rgba(59, 130, 246, 0.05)',
      'rgba(37, 99, 235, 0.06)'
    ],
    purple: [
      'rgba(124, 58, 237, 0.03)',
      'rgba(139, 92, 246, 0.04)',
      'rgba(91, 33, 182, 0.05)'
    ],
    dark: [
      'rgba(30, 41, 59, 0.15)', 
      'rgba(15, 23, 42, 0.2)',
      'rgba(2, 6, 23, 0.25)'
    ],
  };
  
  // Intensity levels
  const intensities = {
    low: 0.7,
    medium: 1,
    high: 1.5
  };
  
  // Animation durations - stagger for depth effect
  const durations = [90, 120, 140].map(d => d / (intensities[intensity] || 1));

  // Get color set for selected variant
  const colorSet = colors[variant] || colors.shield;
  
  // Calculate the layers based on the layer count
  const layers = Array.from({ length: layerCount || 3 });
  
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Animated background layers */}
      {layers.map((_, index) => {
        // Get the color for this layer, cycling through the available colors
        const color = colorSet[index % colorSet.length];
        
        // Make later layers slightly larger for parallax effect
        const scale = 1 + (index * 0.05);
        
        // Adjust opacity to create depth sensation
        const opacity = 1 - (index * 0.15);
        
        return (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            style={{ 
              background: `radial-gradient(50% 50% at 50% 50%, ${color} 0%, transparent 80%)`,
              opacity,
              transform: `scale(${scale})`,
            }}
            initial={false}
            animate={animate ? { 
              // Create a complex but organic asymmetric motion
              // Avoid using perfect circular or predictable animations
              x: [
                `${-5 - index * 2}%`, 
                `${3 + index}%`, 
                `${-2 - index}%`,
                `${5 + index * 2}%`,
                `${-5 - index * 2}%`
              ],
              y: [
                `${3 + index}%`, 
                `${-4 - index * 2}%`, 
                `${5 + index}%`,
                `${-3 - index}%`,
                `${3 + index}%`
              ]
            } : {}}
            transition={{
              repeat: Infinity,
              duration: durations[index % durations.length],
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Optional organic noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none"></div>
      
      {/* Content with elevated z-index */}
      <div className={cn('relative z-10', contentClassName)}>
        {children}
      </div>
      
      {/* Asymmetrically placed subtle accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Horizontal accent line with gradient */}
        <div 
          className={cn(
            "absolute h-[1px] left-0 w-full",
            variant === 'shield' ? "bg-gradient-to-r from-transparent via-shield-500/10 to-transparent" :
            variant === 'blue' ? "bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" :
            variant === 'purple' ? "bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" :
            "bg-gradient-to-r from-transparent via-gray-500/10 to-transparent"
          )}
          style={{
            top: "27%"
          }}
        />
        
        {/* Vertical accent line with gradient - slightly off-center for organic feel */}
        <div 
          className={cn(
            "absolute w-[1px] top-0 h-full",
            variant === 'shield' ? "bg-gradient-to-b from-transparent via-shield-500/10 to-transparent" :
            variant === 'blue' ? "bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" :
            variant === 'purple' ? "bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" :
            "bg-gradient-to-b from-transparent via-gray-500/10 to-transparent"
          )}
          style={{
            left: "58%"
          }}
        />
        
        {/* Diagonal accent line for visual interest */}
        <div 
          className={cn(
            "absolute h-[1px] w-[60%] origin-bottom-left rotate-[35deg]",
            variant === 'shield' ? "bg-gradient-to-r from-transparent via-shield-500/8 to-transparent" :
            variant === 'blue' ? "bg-gradient-to-r from-transparent via-blue-500/8 to-transparent" :
            variant === 'purple' ? "bg-gradient-to-r from-transparent via-purple-500/8 to-transparent" :
            "bg-gradient-to-r from-transparent via-gray-500/8 to-transparent"
          )}
          style={{
            bottom: "35%",
            left: "10%"
          }}
        />
      </div>
      
      <div 
        className="absolute top-0 right-[20%] w-[30%] h-[25%] rounded-[40%] opacity-[0.06] blur-3xl bg-white" 
        style={{
          transform: 'rotate(25deg)',
          background: variant === 'shield' ? 'linear-gradient(to bottom right, rgba(66, 153, 225, 0.3), transparent)' :
                     variant === 'blue' ? 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.3), transparent)' :
                     variant === 'purple' ? 'linear-gradient(to bottom right, rgba(124, 58, 237, 0.3), transparent)' :
                     'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), transparent)'
        }}
      />
      
      <div 
        className="absolute bottom-[-5%] left-[15%] w-[25%] h-[20%] rounded-[45%] opacity-[0.04] blur-3xl" 
        style={{
          transform: 'rotate(-15deg)',
          background: variant === 'shield' ? 'linear-gradient(to top left, rgba(66, 153, 225, 0.3), transparent)' :
                     variant === 'blue' ? 'linear-gradient(to top left, rgba(59, 130, 246, 0.3), transparent)' :
                     variant === 'purple' ? 'linear-gradient(to top left, rgba(124, 58, 237, 0.3), transparent)' :
                     'linear-gradient(to top left, rgba(255, 255, 255, 0.2), transparent)'
        }}
      />
    </div>
  );
};

export default FlowBackground;
