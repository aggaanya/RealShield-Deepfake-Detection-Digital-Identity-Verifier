import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './card';
import { cn } from '@/lib/utils';

const FeatureCard = ({ 
  icon, 
  title, 
  description,
  variant = "default",
  delay = 0,
  className
}) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay 
      } 
    }
  };

  const getCardClasses = () => {
    switch (variant) {
      case 'tech':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200/50 dark:border-blue-800/30 hover:shadow-blue-500/10';
      case 'glass':
        return 'bg-white/10 dark:bg-gray-900/20 backdrop-blur-md border border-white/30 dark:border-gray-800/30';
      case 'glow':
        return 'shadow-[0_4px_20px_rgba(59,130,246,0.1)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.2)]';
      default:
        return 'bg-card hover:shadow-lg';
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
    >
      <Card
        className={cn(
          'relative overflow-hidden p-6 transition-all duration-300',
          getCardClasses(),
          className
        )}
      >
        {variant === 'tech' && (
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border border-blue-300/20 dark:border-blue-700/20"></div>
        )}
        <div className="relative z-10">
          {icon && (
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export function FeatureCardGrid({ children, className }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {children}
    </div>
  );
}

export default FeatureCard;
