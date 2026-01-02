import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Layers, Check, Info, BarChart, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './button';

const DetectionMethodsChart = ({ className, data }) => {
  const [expandedMethod, setExpandedMethod] = useState(null);
  
  // Default data if none provided
  const defaultMethods = [
    {
      id: 'method1',
      name: 'Deep Neural Network Analysis',
      effectivenessScore: 94,
      processingTime: 'Fast',
      description: 'Uses advanced neural networks to detect irregularities in content structure and patterns',
      bestFor: ['Video content', 'GAN-generated images', 'Face swaps'],
      limitations: ['Requires significant processing power', 'May produce false positives with artistic content'],
      improvementRate: '+12% last quarter'
    },
    {
      id: 'method2',
      name: 'Frequency Domain Analysis',
      effectivenessScore: 87,
      processingTime: 'Medium',
      description: 'Analyzes frequency components to identify artifacts introduced during synthesis',
      bestFor: ['Audio deepfakes', 'Voice synthesis', 'Video compression artifacts'],
      limitations: ['Less effective with high-quality forgeries', 'Requires clean reference samples'],
      improvementRate: '+8% last quarter'
    },
    {
      id: 'method3',
      name: 'Temporal Consistency Validation',
      effectivenessScore: 91,
      processingTime: 'Slow',
      description: 'Checks for consistency errors across video frames or audio segments',
      bestFor: ['Longer video clips', 'Interview manipulation', 'Lip sync discrepancies'],
      limitations: ['Time-consuming for long content', 'Less effective on short clips'],
      improvementRate: '+15% last quarter'
    },
    {
      id: 'method4',
      name: 'Metadata Forensics',
      effectivenessScore: 78,
      processingTime: 'Very Fast',
      description: 'Examines file metadata for signs of manipulation or inconsistency',
      bestFor: ['Quick first-pass screening', 'Source verification', 'Chain of custody'],
      limitations: ['Easily bypassed by sophisticated attackers', 'Limited to technical metadata'],
      improvementRate: '+5% last quarter'
    }
  ];
  
  const methods = data || defaultMethods;

  // Toggle expanded method
  const toggleMethod = (id) => {
    if (expandedMethod === id) {
      setExpandedMethod(null);
    } else {
      setExpandedMethod(id);
    }
  };
  
  // Get color based on effectiveness score
  const getEffectivenessColor = (score) => {
    if (score >= 90) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (score >= 80) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    if (score >= 70) return 'bg-gradient-to-r from-yellow-500 to-amber-500';
    return 'bg-gradient-to-r from-red-500 to-orange-500';
  };
  
  // Get processing time badge
  const getProcessingTimeBadge = (time) => {
    const badgeMap = {
      'Very Fast': <Badge variant="tech" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Very Fast</Badge>,
      'Fast': <Badge variant="tech" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Fast</Badge>,
      'Medium': <Badge variant="tech" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Medium</Badge>,
      'Slow': <Badge variant="tech" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">Slow</Badge>,
      'Very Slow': <Badge variant="tech" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Very Slow</Badge>
    };
    
    return badgeMap[time] || <Badge variant="tech">Unknown</Badge>;
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="relative border-b border-gray-200 dark:border-gray-800">
        <CardTitle className="text-lg flex items-center">
          <div className="mr-3 p-1.5 bg-indigo-500/20 rounded-md border border-indigo-500/30 backdrop-blur-sm">
            <Layers className="h-4 w-4 text-indigo-400" />
          </div>
          <span className="gradient-text">Detection Methods Comparison</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {methods.map((method) => {
            const isExpanded = expandedMethod === method.id;
            
            return (
              <div 
                key={method.id}
                className={`relative ${isExpanded ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}
              >
                {/* Hover effect */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${isExpanded ? 'bg-indigo-500' : 'bg-transparent group-hover:bg-indigo-500/50'}`} />
                
                <div 
                  onClick={() => toggleMethod(method.id)}
                  className="p-4 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm">
                      <div className="w-8 h-8 rounded-sm overflow-hidden relative">
                        {/* 3D-like bars */}
                        <div className="absolute bottom-0 left-0 w-2 bg-indigo-500/80 h-[60%]" style={{ transform: 'translateZ(5px)' }} />
                        <div className="absolute bottom-0 left-[3px] w-2 bg-blue-500/80 h-[40%]" style={{ transform: 'translateZ(10px)' }} />
                        <div className="absolute bottom-0 left-[6px] w-2 bg-cyan-500/80 h-[80%]" style={{ transform: 'translateZ(15px)' }} />
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-semibold">{method.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        {getProcessingTimeBadge(method.processingTime)}
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          {method.improvementRate}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Effectiveness score with 3D-effect bar */}
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Effectiveness</div>
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mr-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${method.effectivenessScore}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`h-full rounded-full ${getEffectivenessColor(method.effectivenessScore)}`}
                          />
                        </div>
                        <span className="text-xs font-bold">{method.effectivenessScore}%</span>
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="p-0 w-8 h-8">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </Button>
                  </div>
                </div>
                
                {/* Expanded details */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 pt-2 ml-16 border-t border-dashed border-gray-100 dark:border-gray-800"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{method.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                          <Check size={12} className="mr-1 text-green-500" /> Best For
                        </h5>
                        <ul className="space-y-1">
                          {method.bestFor.map((item, i) => (
                            <li key={i} className="text-xs flex items-center">
                              <span className="inline-block w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                          <Info size={12} className="mr-1 text-amber-500" /> Limitations
                        </h5>
                        <ul className="space-y-1">
                          {method.limitations.map((item, i) => (
                            <li key={i} className="text-xs flex items-center">
                              <span className="inline-block w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetectionMethodsChart;
