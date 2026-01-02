import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Brain, Info, Search, ChevronRight, Download, AlertTriangle, ShieldCheck } from 'lucide-react';

const AIDetectionScoreVisualizer = ({ className, detectionData }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showLegend, setShowLegend] = useState(false);
  
  // Default data if none provided
  const defaultData = {
    overallScore: 87,
    timestamp: '2023-07-14T15:20:45Z',
    analysisTime: '1.2s',
    confidence: 'high',
    categories: [
      {
        name: 'Visual Artifacts',
        score: 92,
        subScores: [
          { name: 'Face Warping', score: 87 },
          { name: 'Boundary Inconsistencies', score: 94 },
          { name: 'Lighting Uniformity', score: 96 }
        ],
        description: 'Detection of visual artifacts introduced by AI generation or manipulation'
      },
      {
        name: 'Metadata Analysis',
        score: 72,
        subScores: [
          { name: 'EXIF Consistency', score: 65 },
          { name: 'Compression History', score: 78 },
          { name: 'Creation Timestamp', score: 73 }
        ],
        description: 'Examination of file metadata for signs of manipulation or fabrication'
      },
      {
        name: 'Pattern Recognition',
        score: 89,
        subScores: [
          { name: 'GAN Patterns', score: 91 },
          { name: 'Model Fingerprints', score: 88 },
          { name: 'Neural Artifacts', score: 85 }
        ],
        description: 'Identification of patterns typically left by AI generation models'
      },
      {
        name: 'Contextual Analysis',
        score: 80,
        subScores: [
          { name: 'Semantic Consistency', score: 84 },
          { name: 'Physical Plausibility', score: 75 },
          { name: 'Environmental Context', score: 82 }
        ],
        description: 'Evaluation of content plausibility and contextual consistency'
      },
      {
        name: 'Audio Sync',
        score: 93,
        subScores: [
          { name: 'Lip Synchronization', score: 95 },
          { name: 'Voice Consistency', score: 92 },
          { name: 'Audio Artifacts', score: 94 }
        ],
        description: 'Analysis of audio-visual synchronization and voice synthesis detection'
      }
    ]
  };
  
  const data = detectionData || defaultData;
  
  // Animation for radar chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 40;
    
    const categories = data.categories;
    const categoryCount = categories.length;
    const animationProgress = { value: 0 };
    
    // Function to draw radar chart
    const drawRadarChart = (progress) => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw background circles
      const circleCount = 5;
      ctx.strokeStyle = 'rgba(99, 179, 237, 0.1)';
      ctx.fillStyle = 'rgba(99, 179, 237, 0.02)';
      
      for (let i = 1; i <= circleCount; i++) {
        const radius = (i / circleCount) * maxRadius;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Add score labels
        ctx.fillStyle = 'rgba(99, 179, 237, 0.5)';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${i * 20}`, centerX, centerY - radius - 5);
      }
      
      // Draw category axes
      for (let i = 0; i < categoryCount; i++) {
        const angle = (i / categoryCount) * Math.PI * 2 - Math.PI / 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * maxRadius,
          centerY + Math.sin(angle) * maxRadius
        );
        ctx.strokeStyle = 'rgba(99, 179, 237, 0.2)';
        ctx.stroke();
        
        // Add category labels
        const labelRadius = maxRadius + 20;
        const category = categories[i];
        const labelX = centerX + Math.cos(angle) * labelRadius;
        const labelY = centerY + Math.sin(angle) * labelRadius;
        
        ctx.font = hoveredCategory === category.name ? 'bold 12px Inter, sans-serif' : '11px Inter, sans-serif';
        ctx.fillStyle = hoveredCategory === category.name ? '#3b82f6' : 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(category.name, labelX, labelY);
      }
      
      // Draw data points and connecting lines
      ctx.beginPath();
      
      for (let i = 0; i < categoryCount; i++) {
        const angle = (i / categoryCount) * Math.PI * 2 - Math.PI / 2;
        const score = categories[i].score;
        const scaledScore = (score / 100) * maxRadius * progress;
        
        const pointX = centerX + Math.cos(angle) * scaledScore;
        const pointY = centerY + Math.sin(angle) * scaledScore;
        
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      
      // Close the polygon
      const firstAngle = -Math.PI / 2;
      const firstScore = categories[0].score;
      const firstScaled = (firstScore / 100) * maxRadius * progress;
      ctx.lineTo(
        centerX + Math.cos(firstAngle) * firstScaled,
        centerY + Math.sin(firstAngle) * firstScaled
      );
      
      // Fill the polygon
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.7)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw data points
      for (let i = 0; i < categoryCount; i++) {
        const angle = (i / categoryCount) * Math.PI * 2 - Math.PI / 2;
        const score = categories[i].score;
        const scaledScore = (score / 100) * maxRadius * progress;
        
        const pointX = centerX + Math.cos(angle) * scaledScore;
        const pointY = centerY + Math.sin(angle) * scaledScore;
        
        ctx.beginPath();
        ctx.arc(pointX, pointY, hoveredCategory === categories[i].name ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = hoveredCategory === categories[i].name ? '#3b82f6' : 'rgba(59, 130, 246, 0.8)';
        ctx.fill();
        
        // If category is hovered, add pulse effect
        if (hoveredCategory === categories[i].name) {
          ctx.beginPath();
          ctx.arc(pointX, pointY, 8 + Math.sin(Date.now() / 200) * 3, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Show score as tooltip
          ctx.font = 'bold 12px Inter, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          const tooltipY = pointY - 18;
          
          // Draw tooltip background
          const scoreText = `${score}%`;
          const textWidth = ctx.measureText(scoreText).width;
          
          ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
          ctx.beginPath();
          ctx.roundRect(pointX - textWidth / 2 - 6, tooltipY - 10, textWidth + 12, 20, 4);
          ctx.fill();
          
          // Draw tooltip text
          ctx.fillStyle = '#ffffff';
          ctx.fillText(scoreText, pointX, tooltipY);
        }
      }
      
      // Draw central score
      ctx.font = 'bold 32px Inter, sans-serif';
      ctx.fillStyle = getScoreColor(data.overallScore);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round(data.overallScore * progress)}%`, centerX, centerY);
      
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('Detection Score', centerX, centerY + 25);
    };
    
    // Animate the chart using requestAnimationFrame instead of GSAP
    let startTime = null;
    const duration = 1500; // 1.5 seconds
    
    const animateRadar = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      drawRadarChart(progress);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateRadar);
      }
    };
    
    animationRef.current = requestAnimationFrame(animateRadar);
    
    // Clean up animation
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [data, hoveredCategory]);
  
  // Get color based on score
  const getScoreColor = (score) => {
    if (score > 85) return '#10b981'; // green
    if (score > 70) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };
  
  const getBadgeVariant = (score) => {
    if (score > 85) return 'default';
    if (score > 70) return 'outline';
    return 'destructive';
  };
  
  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
  };
  
  const handleCategoryLeave = () => {
    setHoveredCategory(null);
  };

  // No GSAP implementation needed as we're using native animations
  
  return (
    <Card className={className}>
      <CardHeader className="space-y-0 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md font-bold flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-500" />
            AI Detection Analysis
          </CardTitle>
          <Badge 
            variant={getBadgeVariant(data.overallScore)} 
            className="relative z-10"
          >
            {data.overallScore >= 80 ? (
              <><ShieldCheck className="h-3 w-3 mr-1" /> High Confidence</>
            ) : (
              <><AlertTriangle className="h-3 w-3 mr-1" /> {data.confidence} Confidence</>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-3/5">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="w-full h-auto"
            />
          </div>
          
          <div className="w-full md:w-2/5 p-4 border-t md:border-t-0 md:border-l">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold">Detection Categories</h4>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => setShowLegend(!showLegend)}
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {data.categories.map((category) => (
                <div 
                  key={category.name}
                  className="relative overflow-hidden rounded-lg border p-3 transition-colors hover:bg-accent/50"
                  onMouseEnter={() => handleCategoryHover(category.name)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <div className="flex justify-between items-center">
                    <h5 className="text-sm font-medium">{category.name}</h5>
                    <Badge variant={getBadgeVariant(category.score)}>
                      {category.score}%
                    </Badge>
                  </div>
                  
                  {hoveredCategory === category.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-2 space-y-1 overflow-hidden"
                    >
                      {category.subScores.map((subScore) => (
                        <div 
                          key={subScore.name}
                          className="flex justify-between items-center"
                        >
                          <span className="text-xs text-muted-foreground">{subScore.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div 
                                className="h-full rounded-full"
                                style={{ 
                                  width: `${subScore.score}%`,
                                  backgroundColor: getScoreColor(subScore.score)
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium">{subScore.score}%</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  
                  {/* Show description when legend is open */}
                  {showLegend && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Analysis time: {data.analysisTime}
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Search className="h-3 w-3 mr-1" />
                Full Report
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIDetectionScoreVisualizer;
