import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * ImmerseCard creates a distinctive 3D interface effect with depth and parallax
 * that creates a sense of tactile dimension and doesn't look AI-generated
 */
const ImmerseCard = ({ 
  className,
  backgroundClassName,
  contentClassName,
  children,
  depth = 3,
  backgroundImage,
  accentColor = 'rgba(66, 153, 225, 0.8)',
  maxRotation = 5,
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Update rotation based on mouse position
  const handleMouseMove = (e) => {
    if (!isHovered) return;
    
    // Get position relative to card
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    
    // Convert to normalized coordinates (-1 to 1)
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  };

  // Calculate rotation angles with easing
  const rotateX = isHovered ? -mousePosition.y * maxRotation : 0;
  const rotateY = isHovered ? mousePosition.x * maxRotation : 0;
  
  // Generate parallax layers for depth effect
  const generateLayers = () => {
    const layers = [];
    
    for (let i = 0; i < depth; i++) {
      const scale = 1 - (i * 0.01);
      const opacity = 1 - (i * 0.18); 
      const translateZ = -10 * (i + 1); // Stagger depth
      const delay = i * 0.05; // Stagger animation
      
      // Add asymmetry to avoid a perfect, template-like pattern
      const offsetX = i % 2 ? i * 1.2 : i * 1;
      const offsetY = i % 3 ? i * 0.8 : i * 1.4;
      
      layers.push(
        <motion.div
          key={i}
          className={cn(
            "absolute inset-0 rounded-xl border overflow-hidden",
            i === 0 ? "border-shield-300/40 dark:border-shield-700/40" : "border-shield-300/20 dark:border-shield-700/20"
          )}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: isHovered ? opacity : 0,
            x: isHovered ? mousePosition.x * offsetX : 0,
            y: isHovered ? mousePosition.y * offsetY : 0,
            scale: isHovered ? scale : 1,
          }}
          transition={{ duration: 0.3, delay }}
          style={{ 
            zIndex: depth - i,
            transform: `translateZ(${translateZ}px)`,
            // Apply more dramatic effects to deeper layers
            filter: i > 0 ? `blur(${i * 0.5}px)` : 'none'
          }}
        />
      );
    }
    
    return layers;
  };

  // Unique accent lines that create an asymmetric pattern
  const generateAccentLines = () => {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-80 pointer-events-none">
        {/* Asymmetric accent lines */}
        <motion.div 
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-shield-500/30 to-transparent"
          style={{ 
            width: '120%',
            left: '-10%',
            top: '22%'
          }}
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scaleX: isHovered ? 1 : 0.8,
            x: isHovered ? mousePosition.x * -3 : 0,
          }}
          transition={{ duration: 0.4 }}
        />
        
        <motion.div 
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-shield-500/20 to-transparent"
          style={{ 
            width: '140%',
            left: '-20%',
            top: '64%'
          }}
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ 
            opacity: isHovered ? 0.7 : 0, 
            scaleX: isHovered ? 1 : 0.7,
            x: isHovered ? mousePosition.x * -5 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        
        <motion.div 
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-shield-500/30 to-transparent"
          style={{ 
            height: '80%',
            top: '10%',
            left: '28%'
          }}
          initial={{ opacity: 0, scaleY: 0.6 }}
          animate={{ 
            opacity: isHovered ? 0.8 : 0, 
            scaleY: isHovered ? 1 : 0.6,
            y: isHovered ? mousePosition.y * -2 : 0,
          }}
          transition={{ duration: 0.4, delay: 0.05 }}
        />
        
        <motion.div 
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-shield-500/20 to-transparent"
          style={{ 
            height: '65%',
            top: '20%',
            left: '72%'
          }}
          initial={{ opacity: 0, scaleY: 0.8 }}
          animate={{ 
            opacity: isHovered ? 0.6 : 0, 
            scaleY: isHovered ? 1 : 0.8,
            y: isHovered ? mousePosition.y * -4 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.15 }}
        />
        
        {/* Diagonal accent line for uniqueness */}
        <motion.div 
          className="absolute h-[1px] origin-bottom-left rotate-[32deg] bg-gradient-to-r from-transparent via-shield-500/40 to-transparent"
          style={{ 
            width: '80%',
            bottom: '20%',
            left: '15%'
          }}
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={{ 
            opacity: isHovered ? 0.9 : 0, 
            scaleX: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
    );
  };
  
  // Glowing corners that aren't perfectly symmetric
  const generateCornerGlows = () => {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left */}
        <motion.div 
          className="absolute top-0 left-0 w-16 h-16 rounded-br-full"
          style={{
            background: `radial-gradient(circle at 0% 0%, ${accentColor}20, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Bottom right - slightly different size for asymmetry */}
        <motion.div 
          className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-full"
          style={{
            background: `radial-gradient(circle at 100% 100%, ${accentColor}15, transparent 75%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.8 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      </div>
    );
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-xl overflow-hidden perspective-1000 bg-white/60 dark:bg-shield-900/60 backdrop-blur-lg",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        rotateX,
        rotateY,
        z: isHovered ? 10 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {/* Background with asymmetric lighting effects */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-300",
          backgroundClassName
        )}
        style={backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {}}
      >
        {/* Grid pattern with intentional imperfection */}
        {!backgroundImage && (
          <div className="absolute inset-0 tech-bg-grid opacity-10"></div>
        )}
        
        {/* Light effect that follows cursor */}
        <motion.div
          className="absolute opacity-70 pointer-events-none bg-gradient-radial from-shield-500/10 via-shield-500/5 to-transparent rounded-full"
          animate={{          x: `calc(${mousePosition.x * 100}% - 50%)`,
          y: `calc(${mousePosition.y * 100}% - 50%)`,
            opacity: isHovered ? 0.7 : 0,
            scale: isHovered ? 1 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            width: '180%',
            height: '180%',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
      
      {/* Depth layers */}
      {generateLayers()}
      
      {/* Accent lines */}
      {generateAccentLines()}
      
      {/* Corner glows */}
      {generateCornerGlows()}
      
      {/* Actual content */}
      <motion.div
        className={cn("relative z-10", contentClassName)}
        animate={{
          z: isHovered ? 20 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transform: 'translateZ(10px)' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ImmerseCard;
