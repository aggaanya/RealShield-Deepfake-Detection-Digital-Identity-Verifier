import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './card';
import { Badge } from './badge';
import { Shield, AlertTriangle, CheckCircle, Clock, Search, Zap } from 'lucide-react';

const ActivityTimeline = ({ activities = [], className }) => {
  // Default activities if none provided
  const defaultActivities = [
    {
      id: 'act1',
      type: 'detection',
      title: 'Deepfake detected',
      description: 'AI-generated content detected in video file',
      time: '5 minutes ago',
      severity: 'high',
      user: 'Analyst Team'
    },
    {
      id: 'act2',
      type: 'verification',
      title: 'Source verified',
      description: 'Content authenticity confirmed with 97.5% confidence',
      time: '27 minutes ago',
      severity: 'info',
      user: 'System'
    },
    {
      id: 'act3',
      type: 'scan',
      title: 'New scan initiated',
      description: 'Audio analysis for voice synthesis detection',
      time: '1 hour ago',
      severity: 'medium',
      user: 'Raj Kumar'
    },
    {
      id: 'act4',
      type: 'alert',
      title: 'New threat pattern identified',
      description: 'Novel manipulation technique detected in network',
      time: '3 hours ago',
      severity: 'high',
      user: 'Threat Intelligence'
    },
    {
      id: 'act5',
      type: 'verification',
      title: 'Content authenticated',
      description: 'Digital signature verification completed',
      time: '1 day ago',
      severity: 'info',
      user: 'System'
    }
  ];

  const items = activities.length > 0 ? activities : defaultActivities;

  // Get icon based on activity type
  const getActivityIcon = (type, severity) => {
    const iconMap = {
      detection: <Shield className={`h-5 w-5 ${severity === 'high' ? 'text-red-500' : 'text-blue-500'}`} />,
      verification: <CheckCircle className="h-5 w-5 text-green-500" />,
      scan: <Search className="h-5 w-5 text-indigo-500" />,
      alert: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      default: <Zap className="h-5 w-5 text-blue-500" />
    };
    
    return iconMap[type] || iconMap.default;
  };
  
  // Get badge for severity
  const getSeverityBadge = (severity) => {
    const badgeMap = {
      high: <Badge variant="tech" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">High</Badge>,
      medium: <Badge variant="tech" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Medium</Badge>,
      low: <Badge variant="tech" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Low</Badge>,
      info: <Badge variant="tech" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Info</Badge>
    };
    
    return badgeMap[severity] || badgeMap.info;
  };
  
  // Timeline connectors and pulses
  const TimelineConnector = ({ active, last }) => (
    <div className={`absolute left-4 top-10 bottom-0 w-[1px] ${last ? 'h-0' : 'h-full'} ${active ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-800'}`}>
      {active && !last && (
        <motion.div 
          className="absolute w-[5px] h-[5px] bg-blue-500 rounded-full -left-[2px]"
          initial={{ top: 0 }}
          animate={{ top: '100%' }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );

  return (
    <Card className={`p-5 ${className}`}>
      <h3 className="text-lg font-semibold mb-6 flex items-center">
        <Zap className="mr-2 h-5 w-5 text-blue-500" />
        Real-Time Activity
      </h3>

      <div className="relative">
        {items.map((activity, index) => {
          const isActive = index === 0;
          const isLast = index === items.length - 1;
          
          return (
            <div key={activity.id} className="relative pb-8">
              <TimelineConnector active={isActive} last={isLast} />
              
              <div className="relative flex items-start ml-10">
                <div className={`absolute -left-14 flex items-center justify-center w-8 h-8 rounded-full border-2 ${isActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
                  {getActivityIcon(activity.type, activity.severity)}
                  
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 rounded-full border-blue-500"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                      }}
                    />
                  )}
                </div>
                
                <motion.div 
                  className="flex-1"
                  initial={isActive ? { opacity: 0, x: -20 } : { opacity: 1 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                    <h4 className="font-medium text-sm flex-1">{activity.title}</h4>
                    <div className="flex items-center mt-1 sm:mt-0 space-x-2">
                      {getSeverityBadge(activity.severity)}
                      <span className="text-xs flex items-center text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  
                  <div className="text-xs text-muted-foreground mt-1 flex items-center">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-1"></span>
                    {activity.user}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ActivityTimeline;
