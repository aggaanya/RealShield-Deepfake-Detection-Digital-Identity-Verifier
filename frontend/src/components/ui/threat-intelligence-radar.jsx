import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Radar, Shield, AlertTriangle, Info, RotateCcw, Maximize2, Filter } from 'lucide-react';
import { Button } from './button';

const ThreatIntelligenceRadar = ({ className, threatFeeds = [] }) => {
  const canvasRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const animationRef = useRef(null);
  
  // Default threats data if none provided
  const defaultThreats = [
    {
      id: 't1',
      name: 'Voice Synthesis Attack',
      category: 'audio',
      severity: 'critical',
      distance: 0.2, // 0-1 scale, where 0 is center and 1 is edge
      angle: 45,
      firstSeen: '2 hours ago',
      source: 'Global Threat Network',
      description: 'New AI voice synthesis technique capable of mimicking high-profile political figures with minimal sample data'
    },
    {
      id: 't2',
      name: 'DeepFake Video Distribution',
      category: 'video',
      severity: 'high',
      distance: 0.4,
      angle: 120,
      firstSeen: '5 hours ago',
      source: 'Media Monitoring System',
      description: 'Coordinated campaign to distribute manipulated video content across multiple social platforms'
    },
    {
      id: 't3',
      name: 'Metadata Forgery Technique',
      category: 'metadata',
      severity: 'medium',
      distance: 0.6,
      angle: 200,
      firstSeen: '1 day ago',
      source: 'Forensic Analysis Team',
      description: 'New method to forge file creation metadata to appear from legitimate sources'
    },
    {
      id: 't4',
      name: 'Image Manipulation Tool',
      category: 'image',
      severity: 'high',
      distance: 0.3,
      angle: 280,
      firstSeen: '12 hours ago',
      source: 'Darkweb Monitor',
      description: 'New tool allowing seamless object removal and addition in photographs with no detectable artifacts'
    },
    {
      id: 't5',
      name: 'Adversarial Model Attack',
      category: 'model',
      severity: 'critical',
      distance: 0.5,
      angle: 330,
      firstSeen: '3 hours ago',
      source: 'AI Security Initiative',
      description: 'Technique to trick detection systems by incorporating adversarial patterns into generated content'
    },
  ];
  
  const threats = threatFeeds.length > 0 ? threatFeeds : defaultThreats;
  const filteredThreats = filterCategory === 'all' 
    ? threats 
    : threats.filter(t => t.category === filterCategory);
  
  // Handle radar animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 10;
    
    let rotation = 0;
    const scannerSpeed = 0.01 * animationSpeed;
    
    const drawRadar = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw radar circles
      const circleCount = 4;
      for (let i = 1; i <= circleCount; i++) {
        const radius = (i / circleCount) * maxRadius;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(99, 179, 237, 0.2)';
        ctx.stroke();
      }
      
      // Draw crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.strokeStyle = 'rgba(99, 179, 237, 0.15)';
      ctx.stroke();
      
      // Draw rotating scanner line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(rotation) * maxRadius,
        centerY + Math.sin(rotation) * maxRadius
      );
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw scanner arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, rotation - 0.2, rotation);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.stroke();
      
      // Draw threat points
      filteredThreats.forEach(threat => {
        const threatAngle = (threat.angle * Math.PI) / 180;
        const threatRadius = threat.distance * maxRadius;
        const x = centerX + Math.cos(threatAngle) * threatRadius;
        const y = centerY + Math.sin(threatAngle) * threatRadius;
        
        // Check if the scanner is passing over this threat
        const angleDiff = Math.abs((rotation % (2 * Math.PI)) - threatAngle);
        const isHighlighted = angleDiff < 0.2 || angleDiff > (2 * Math.PI - 0.2);
        
        // Draw threat point
        ctx.beginPath();
        ctx.arc(x, y, isHighlighted ? 6 : 4, 0, Math.PI * 2);
        
        let color;
        switch(threat.severity) {
          case 'critical':
            color = 'rgba(244, 63, 94, ';
            break;
          case 'high':
            color = 'rgba(249, 115, 22, ';
            break;
          case 'medium':
            color = 'rgba(234, 179, 8, ';
            break;
          default:
            color = 'rgba(59, 130, 246, ';
        }
        
        ctx.fillStyle = color + (isHighlighted ? '1)' : '0.7)');
        ctx.fill();
        
        // Draw pulse effect for highlighted threats
        if (isHighlighted) {
          ctx.beginPath();
          ctx.arc(x, y, 6 + Math.sin(Date.now() / 100) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = color + '0.4)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
      
      // Update rotation
      rotation = (rotation + scannerSpeed) % (Math.PI * 2);
    };
    
    const animate = () => {
      drawRadar();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [filteredThreats, animationSpeed]);
  
  const handleThreatClick = (threat) => {
    setSelectedThreat(selectedThreat?.id === threat.id ? null : threat);
  };
  
  const severityColor = {
    'critical': 'bg-red-500',
    'high': 'bg-orange-500',
    'medium': 'bg-yellow-500',
    'low': 'bg-blue-500',
  };
  
  const categoryLabels = {
    'audio': 'Audio Attack',
    'video': 'Video Manipulation',
    'image': 'Image Forgery',
    'metadata': 'Metadata Exploit',
    'model': 'Model Vulnerability'
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="space-y-0 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md font-bold flex items-center">
            <Radar className="h-5 w-5 mr-2 text-blue-500" />
            Real-Time Threat Intelligence
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setAnimationSpeed(animationSpeed === 1 ? 2 : 1)}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-1 mt-2 overflow-x-auto pb-2 scrollbar-hide">
          <Badge 
            variant={filterCategory === 'all' ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilterCategory('all')}
          >
            All
          </Badge>
          {Array.from(new Set(threats.map(t => t.category))).map(category => (
            <Badge
              key={category}
              variant={filterCategory === category ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setFilterCategory(category)}
            >
              {categoryLabels[category] || category}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <motion.div 
          className={`relative ${isFullscreen ? 'h-[500px]' : 'h-[300px]'}`}
          layout
        >
          <canvas 
            ref={canvasRef}
            width={500}
            height={500}
            className="w-full h-full"
          />
          
          <div className="absolute bottom-3 left-3 right-3 max-h-[40%] overflow-y-auto">
            <AnimatePresence>
              {selectedThreat && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-background/80 backdrop-blur-sm border border-border p-3 rounded-lg shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`h-2 w-2 rounded-full ${severityColor[selectedThreat.severity]}`} />
                    <h4 className="font-semibold">{selectedThreat.name}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{selectedThreat.description}</p>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-muted-foreground">First seen: {selectedThreat.firstSeen}</span>
                    <span className="font-medium">{selectedThreat.source}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-3">
          {filteredThreats.map(threat => (
            <motion.div
              key={threat.id}
              whileHover={{ scale: 1.02 }}
              className={`px-3 py-2 rounded-md border cursor-pointer transition-colors ${
                selectedThreat?.id === threat.id 
                  ? 'bg-primary/10 border-primary/20' 
                  : 'bg-card/60 border-border/60'
              }`}
              onClick={() => handleThreatClick(threat)}
            >
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${severityColor[threat.severity]}`} />
                <p className="text-xs font-medium truncate">{threat.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatIntelligenceRadar;
