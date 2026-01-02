import React from 'react';
import { motion } from 'framer-motion';

export const GridBackground = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative tech-bg-grid overflow-hidden ${className || ''}`}
    {...props}
  >
    {children}
  </div>
));
GridBackground.displayName = "GridBackground";

export const DotBackground = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative tech-bg-dots overflow-hidden ${className || ''}`}
    {...props}
  >
    {children}
  </div>
));
DotBackground.displayName = "DotBackground";

export const GlowBackground = ({ className, children, ...props }) => (
  <div className={`relative overflow-hidden ${className || ''}`} {...props}>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 filter blur-3xl opacity-50 animate-gradient" />
    {children}
  </div>
);

export const ParticleBackground = ({ className, count = 20, ...props }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`} {...props}>
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 3 + 1; // Random size between 1-4px
        const duration = Math.random() * 15 + 10; // Random duration between 10-25s
        const delay = Math.random() * -15; // Random start delay
        
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-blue-500/20 dark:bg-blue-400/30"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              scale: 0
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: [Math.random() * 0.5 + 0.3, 0],
              scale: [0, size]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut"
            }}
            style={{ width: '2px', height: '2px' }}
          />
        );
      })}
    </div>
  );
};

export const CyberBackground = ({ className, children, ...props }) => {
  return (
    <div className={`relative overflow-hidden ${className || ''}`} {...props}>
      <div className="absolute inset-0 tech-bg-grid animate-grid-lines opacity-30" />
      
      {/* Top overlay gradient */}
      <div className="absolute inset-x-0 top-0 h-[150px] bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      
      {/* Side glowing accents */}
      <div className="absolute -left-20 top-1/3 h-[300px] w-[100px] bg-blue-500/20 rotate-45 blur-3xl animate-pulse-tech" />
      <div className="absolute -right-20 top-2/3 h-[300px] w-[100px] bg-purple-500/20 -rotate-45 blur-3xl animate-pulse-tech" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export const HexagonBackground = ({ className, ...props }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`} {...props}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagonPattern" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)" viewBox="0 0 50 43.4">
            <path
              d="M25 0 L50 14.5 L50 38.5 L25 53 L0 38.5 L0 14.5 Z"
              fill="none"
              stroke="rgba(66, 153, 225, 0.1)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagonPattern)" opacity="0.5" />
      </svg>
    </div>
  );
};

// Export a default tech background that combines multiple effects
const TechBackground = ({ className, children, variant = "cyber", ...props }) => {
  const backgrounds = {
    grid: <GridBackground className={className} {...props}>{children}</GridBackground>,
    dots: <DotBackground className={className} {...props}>{children}</DotBackground>,
    glow: <GlowBackground className={className} {...props}>{children}</GlowBackground>,
    cyber: (
      <CyberBackground className={className} {...props}>
        <ParticleBackground count={15} />
        <HexagonBackground />
        {children}
      </CyberBackground>
    )
  };

  return backgrounds[variant] || backgrounds.cyber;
};

export default TechBackground;
