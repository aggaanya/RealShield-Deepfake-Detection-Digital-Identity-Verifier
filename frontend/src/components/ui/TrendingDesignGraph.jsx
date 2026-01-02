import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TrendingDesignGraph = ({ className, data = [], color = '#3182CE', height = 180, showDots = true }) => {
  const canvasRef = useRef(null);
  const defaultData = [35, 48, 26, 38, 52, 45, 62, 54, 59, 45, 65, 58];
  const graphData = data.length > 0 ? data : defaultData;
  
  // Generate points for SVG path
  const points = graphData.map((value, index) => {
    const x = (index / (graphData.length - 1)) * 100;
    const y = 100 - ((value - Math.min(...graphData)) / (Math.max(...graphData) - Math.min(...graphData))) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  // Create the SVG path with a slightly irregular, organic curve
  const path = `M0,100 L${points} L100,100 Z`;
  
  // Draw custom canvas effects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw subtle grid
    ctx.strokeStyle = 'rgba(99, 179, 237, 0.1)';
    ctx.lineWidth = 0.5;
    
    // Draw horizontal lines with slight irregularity
    for (let i = 0; i <= 5; i++) {
      const y = (i / 5) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      
      // Create slightly wavy horizontal lines
      for (let x = 0; x < width; x += 20) {
        const wave = Math.sin(x / 50) * (i === 0 || i === 5 ? 0 : 1.2);
        ctx.lineTo(x, y + wave);
      }
      
      ctx.stroke();
    }
    
    // Draw vertical lines with subtle variation
    for (let i = 0; i <= 6; i++) {
      const x = (i / 6) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      
      // Create slightly wavy vertical lines
      for (let y = 0; y < height; y += 20) {
        const wave = Math.cos(y / 40) * (i === 0 || i === 6 ? 0 : 0.8);
        ctx.lineTo(x + wave, y);
      }
      
      ctx.stroke();
    }
  }, []);

  return (
    <div className={`relative ${className}`} style={{ height: `${height}px` }}>
      {/* Background canvas for organic grid */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" width="400" height="200" />
      
      {/* SVG graph with asymmetric styling */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="90%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
          
          {/* Asymmetric clip path */}
          <clipPath id="graphClip">
            <path 
              d={`M-2,100 L-2,75 C10,65 35,82 45,72 C55,62 75,25 105,20 L105,100 Z`} 
            />
          </clipPath>
        </defs>
        
        {/* Custom organic background with subtle noise texture */}
        <rect 
          x="0" y="0" width="100%" height="100%" 
          fill="url(#trendGradient)" 
          fillOpacity="0.2"
          mask="url(#noiseMask)"
        />
        
        {/* Filled graph area with organic styling */}
        <path
          d={path}
          fill="url(#trendGradient)"
          strokeWidth="0"
          className="transition-all duration-500"
        />
        
        {/* Graph line path with not-perfectly-smooth curves */}
        <path
          d={`M${points}`}
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          className="transition-all duration-500"
        />
        
        {/* Irregular accent line */}
        <path
          d={`M10,${100 - graphData[1]} C25,${100 - graphData[3] - 5} 45,${100 - graphData[5] + 8} 90,${100 - graphData[graphData.length - 2] - 3}`}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeDasharray="3,2"
          className="opacity-40"
        />
        
        {/* Decorative elements */}
        {showDots && graphData.map((value, index) => {
          const x = (index / (graphData.length - 1)) * 100;
          const y = 100 - ((value - Math.min(...graphData)) / (Math.max(...graphData) - Math.min(...graphData))) * 100;
          
          // Only show dots for some points to create asymmetry
          if (index % 3 === 0 || index === graphData.length - 1) {
            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r={index === graphData.length - 1 ? 1.8 : 1.2}
                fill="#fff"
                stroke={color}
                strokeWidth="1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 500,
                  damping: 15
                }}
              />
            );
          }
          return null;
        })}
        
        {/* Focal point with animation */}
        <motion.circle
          cx={(graphData.length - 3) / (graphData.length - 1) * 100}
          cy={100 - ((graphData[graphData.length - 3] - Math.min(...graphData)) / (Math.max(...graphData) - Math.min(...graphData))) * 100}
          r="2.5"
          fill={color}
          initial={{ opacity: 0.5, r: 1.5 }}
          animate={{ 
            opacity: [0.5, 1, 0.5], 
            r: [1.5, 2.2, 1.5] 
          }}
          transition={{ 
            repeat: Infinity,
            duration: 3
          }}
        />
      </svg>
      
      {/* Data labels with asymmetric positioning */}
      <div className="absolute bottom-0 left-2 text-xs font-mono text-shield-600 dark:text-shield-400 opacity-80">
        trend:{graphData[graphData.length-1] > graphData[0] ? '+' : '-'}{Math.abs(graphData[graphData.length-1] - graphData[0])}
      </div>
      
      {/* Floating marker with custom styling */}
      <div className="absolute top-4 right-4">
        <div className="px-2 py-1 text-xs font-mono bg-white/80 dark:bg-shield-900/80 shadow-sm rounded-sm border-l-2 border-shield-500">
          <span className="font-medium">{Math.max(...graphData)}</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingDesignGraph;
