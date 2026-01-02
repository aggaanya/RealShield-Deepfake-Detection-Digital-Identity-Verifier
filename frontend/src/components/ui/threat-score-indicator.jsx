import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Shield, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const ThreatScoreIndicator = ({ 
  score = 42, 
  previousScore = 37, 
  maxScore = 100,
  className 
}) => {
  const getScoreLevel = (score) => {
    if (score < 20) return { level: 'Low', color: 'green' };
    if (score < 40) return { level: 'Moderate', color: 'blue' };
    if (score < 70) return { level: 'Elevated', color: 'yellow' };
    if (score < 90) return { level: 'High', color: 'orange' };
    return { level: 'Critical', color: 'red' };
  };
  
  const scoreInfo = getScoreLevel(score);
  const scoreDiff = score - previousScore;
  const isIncreasing = scoreDiff > 0;
  
  // Determine color classes based on threat level
  const bgGradientClass = {
    'green': 'from-green-500 to-emerald-600',
    'blue': 'from-blue-500 to-cyan-600',
    'yellow': 'from-yellow-500 to-amber-600',
    'orange': 'from-orange-500 to-red-500',
    'red': 'from-red-600 to-rose-700'
  }[scoreInfo.color];
  
  const ringColorClass = {
    'green': 'border-green-500',
    'blue': 'border-blue-500',
    'yellow': 'border-yellow-500',
    'orange': 'border-orange-500',
    'red': 'border-red-600'
  }[scoreInfo.color];
  
  const textColorClass = {
    'green': 'text-green-500',
    'blue': 'text-blue-500',
    'yellow': 'text-yellow-500',
    'orange': 'text-orange-500',
    'red': 'text-red-600'
  }[scoreInfo.color];
  
  const badgeColorClass = {
    'green': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'blue': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'yellow': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    'orange': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    'red': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  }[scoreInfo.color];

  // Calculate the position of the needle on the gauge
  const needleRotation = (score / maxScore) * 180; // 180 degrees is the full range

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="relative">
        <div className={`absolute -left-1 top-0 bottom-0 w-[2px] bg-gradient-to-b ${bgGradientClass}`}></div>
        
        <CardTitle className="text-lg flex items-center pl-3">
          <div className={`mr-3 p-1.5 rounded-md border backdrop-blur-sm bg-${scoreInfo.color}-500/20 border-${scoreInfo.color}-500/30`}>
            <Shield className={`h-4 w-4 ${textColorClass}`} />
          </div>
          <span className={`gradient-${scoreInfo.color}`}>Threat Score</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative w-48 h-48">
          {/* Semicircle gauge background */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="25%" stopColor="#0ea5e9" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="75%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            
            {/* Gauge background track */}
            <path 
              d="M 10,50 A 40,40 0 1,1 90,50" 
              fill="none" 
              stroke="#e5e7eb"
              className="dark:stroke-gray-800"
              strokeWidth="8" 
              strokeLinecap="round"
            />
            
            {/* Colored gauge fill */}
            <path 
              d="M 10,50 A 40,40 0 1,1 90,50" 
              fill="none" 
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeDasharray={`${(score/maxScore) * 126}, 126`}
              strokeLinecap="round"
            />
            
            {/* Tick marks */}
            {[0, 25, 50, 75, 100].map((tick, i) => {
              const tickAngle = (tick / maxScore) * Math.PI;
              const x1 = 50 - Math.cos(tickAngle) * 32;
              const y1 = 50 - Math.sin(tickAngle) * 32;
              const x2 = 50 - Math.cos(tickAngle) * 40;
              const y2 = 50 - Math.sin(tickAngle) * 40;
              
              return (
                <line 
                  key={i}
                  x1={x1} 
                  y1={y1} 
                  x2={x2} 
                  y2={y2} 
                  stroke="#9ca3af"
                  className="dark:stroke-gray-600"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          
          {/* Needle */}
          <div 
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          >
            <div className="relative h-[5px]">
              <div className={`w-24 h-1 bg-gradient-to-r ${bgGradientClass}`} />
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-gray-800" />
            </div>
          </div>
          
          {/* Center pivot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              className={`w-8 h-8 rounded-full border-4 ${ringColorClass} flex items-center justify-center`}
              animate={{ 
                boxShadow: [
                  `0 0 0 rgba(${scoreInfo.color === 'red' ? '220, 38, 38' : '59, 130, 246'}, 0)`,
                  `0 0 15px rgba(${scoreInfo.color === 'red' ? '220, 38, 38' : '59, 130, 246'}, 0.7)`,
                  `0 0 0 rgba(${scoreInfo.color === 'red' ? '220, 38, 38' : '59, 130, 246'}, 0)`
                ]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2
              }}
            >
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${bgGradientClass}`} />
            </motion.div>
          </div>
          
          {/* Score value */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-3xl font-bold flex items-baseline">
            <span>{score}</span>
            <span className="text-xs text-muted-foreground ml-1">/{maxScore}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between w-full px-4">
          <Badge variant="tech" className={badgeColorClass}>
            {scoreInfo.level} Risk
          </Badge>
          
          <div className="flex items-center">
            {isIncreasing ? (
              <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
            )}
            <span className={`text-xs font-medium ${isIncreasing ? 'text-red-500' : 'text-green-500'}`}>
              {isIncreasing ? '+' : '-'}{Math.abs(scoreDiff)} pts
            </span>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground text-center">
          <AlertTriangle className="inline-block h-3 w-3 mr-1" />
          {score > previousScore 
            ? 'Increasing threat activity detected in your region'
            : 'Threat situation stable in your network'
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatScoreIndicator;
