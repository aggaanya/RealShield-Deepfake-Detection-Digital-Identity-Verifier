import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { Box, RotateCcw, Download, Eye, Share2 } from 'lucide-react';

const ContentAnalysis3D = ({ content, className }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Default content if none provided
  const defaultContent = {
    id: 'vid123',
    name: 'PoliticalSpeech_Analysis.mp4',
    type: 'video',
    analysisComplete: true,
    manipulationScore: 87,
    authenticity: 13,
    dimensions: {
      visual: 92,
      audio: 76,
      metadata: 22,
      contextual: 83
    },
    artifacts: [
      { type: 'lip_sync', confidence: 94, timeCode: '00:01:45' },
      { type: 'face_warp', confidence: 87, timeCode: '00:02:12' },
      { type: 'audio_splice', confidence: 76, timeCode: '00:03:38' },
    ],
    thumbnailUrl: ''
  };
  
  const analyzedContent = content || defaultContent;
  
  // Canvas animation for 3D cube effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    let rotation = 0;
    
    const drawCube = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Center of canvas
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Cube size
      const size = width / 4;
      
      // Define 3D points for cube (3D space coordinates)
      const points = [
        [-size, -size, -size],  // 0: back bottom left
        [size, -size, -size],   // 1: back bottom right
        [size, size, -size],    // 2: back top right
        [-size, size, -size],   // 3: back top left
        [-size, -size, size],   // 4: front bottom left
        [size, -size, size],    // 5: front bottom right
        [size, size, size],     // 6: front top right
        [-size, size, size]     // 7: front top left
      ];
      
      // Function to apply 3D rotation
      const rotatePoint = (point) => {
        const [x, y, z] = point;
        
        // Rotating around Y axis
        const cosY = Math.cos(rotation);
        const sinY = Math.sin(rotation);
        
        const rotatedX = x * cosY + z * sinY;
        const rotatedZ = -x * sinY + z * cosY;
        
        // Rotating around X axis (tilted slightly)
        const tilt = Math.PI / 10;
        const cosX = Math.cos(tilt);
        const sinX = Math.sin(tilt);
        
        const finalY = y * cosX - rotatedZ * sinX;
        const finalZ = y * sinX + rotatedZ * cosX;
        
        // Convert 3D to 2D coordinates with perspective
        const scale = 600 / (600 + finalZ);
        const projectedX = centerX + rotatedX * scale;
        const projectedY = centerY + finalY * scale;
        
        return [projectedX, projectedY, finalZ];
      };
      
      // Rotate and project all points
      const projectedPoints = points.map(rotatePoint);
      
      // Define edges of the cube
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],  // back face
        [4, 5], [5, 6], [6, 7], [7, 4],  // front face
        [0, 4], [1, 5], [2, 6], [3, 7]   // connecting edges
      ];
      
      // Define faces for coloring (points indices for each face)
      const faces = [
        [0, 1, 2, 3],  // back face
        [4, 5, 6, 7],  // front face
        [0, 1, 5, 4],  // bottom face
        [2, 3, 7, 6],  // top face
        [1, 2, 6, 5],  // right face
        [0, 3, 7, 4]   // left face
      ];
      
      // Colors for each face (tech-inspired)
      const faceColors = [
        'rgba(59, 130, 246, 0.1)',  // blue
        'rgba(99, 102, 241, 0.15)', // indigo
        'rgba(139, 92, 246, 0.1)',  // purple
        'rgba(14, 165, 233, 0.1)',  // sky
        'rgba(79, 70, 229, 0.15)',  // indigo darker
        'rgba(236, 72, 153, 0.1)'   // pink
      ];
      
      // Sort faces by depth (painter's algorithm)
      const faceDepths = faces.map((face, i) => {
        // Calculate average depth of face
        const avgZ = face.reduce((sum, pointIdx) => sum + projectedPoints[pointIdx][2], 0) / 4;
        return { index: i, depth: avgZ };
      });
      
      // Sort from back to front
      faceDepths.sort((a, b) => a.depth - b.depth);
      
      // Draw faces from back to front
      faceDepths.forEach(({ index }) => {
        const face = faces[index];
        
        ctx.beginPath();
        const startPoint = projectedPoints[face[0]];
        ctx.moveTo(startPoint[0], startPoint[1]);
        
        for (let i = 1; i < face.length; i++) {
          const point = projectedPoints[face[i]];
          ctx.lineTo(point[0], point[1]);
        }
        
        ctx.closePath();
        ctx.fillStyle = faceColors[index];
        ctx.fill();
        
        // Draw face borders
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Draw edges (lines)
      edges.forEach(([from, to]) => {
        const fromPoint = projectedPoints[from];
        const toPoint = projectedPoints[to];
        
        ctx.beginPath();
        ctx.moveTo(fromPoint[0], fromPoint[1]);
        ctx.lineTo(toPoint[0], toPoint[1]);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
      
      // Draw vertices (points)
      projectedPoints.forEach(([x, y, z]) => {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(129, 140, 248, 0.8)';
        ctx.fill();
      });
      
      // Highlight specific areas based on artifacts
      if (analyzedContent.artifacts && analyzedContent.artifacts.length > 0) {
        // Example: Highlight based on first artifact type
        const artifact = analyzedContent.artifacts[0];
        let highlightFace;
        
        switch(artifact.type) {
          case 'lip_sync':
            highlightFace = 1; // front face
            break;
          case 'face_warp':
            highlightFace = 4; // right face
            break;
          case 'audio_splice':
            highlightFace = 2; // bottom face
            break;
          default:
            highlightFace = 0;
        }
        
        const face = faces[highlightFace];
        ctx.beginPath();
        const startPoint = projectedPoints[face[0]];
        ctx.moveTo(startPoint[0], startPoint[1]);
        
        for (let i = 1; i < face.length; i++) {
          const point = projectedPoints[face[i]];
          ctx.lineTo(point[0], point[1]);
        }
        
        ctx.closePath();
        ctx.fillStyle = `rgba(239, 68, 68, ${0.1 + (artifact.confidence/200)})`; // Red with opacity based on confidence
        ctx.fill();
        
        // Pulsating highlight effect
        const pulseOpacity = 0.3 + 0.2 * Math.sin(Date.now() / 500);
        ctx.strokeStyle = `rgba(239, 68, 68, ${pulseOpacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Update rotation for next frame
      rotation += 0.005;
    };
    
    // Animation loop
    const animate = () => {
      drawCube();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [analyzedContent]);

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="relative border-b border-gray-200 dark:border-gray-800">
        <div className="absolute -left-1 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500/30"></div>
        
        <CardTitle className="text-lg flex items-center pl-3">
          <div className="mr-3 p-1.5 bg-indigo-500/20 rounded-md border border-indigo-500/30 backdrop-blur-sm">
            <Box className="h-4 w-4 text-indigo-400" />
          </div>
          <span className="text-gradient-purple">3D Content Analysis</span>
          
          <div className="ml-auto">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* 3D visualization */}
          <div className="md:w-1/2 flex items-center justify-center p-4">
            <canvas 
              ref={canvasRef} 
              width={300} 
              height={300}
              className="w-full max-w-[300px]"
            />
          </div>
          
          {/* Analysis details */}
          <div className="md:w-1/2 p-4 md:border-l border-gray-100 dark:border-gray-800/80">
            <h3 className="font-medium mb-2 line-clamp-1">
              {analyzedContent.name}
            </h3>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3">
                <div className="text-xs text-muted-foreground mb-1">Manipulation Score</div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {analyzedContent.manipulationScore}%
                </div>
              </div>
              
              <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-3">
                <div className="text-xs text-muted-foreground mb-1">Authenticity</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {analyzedContent.authenticity}%
                </div>
              </div>
            </div>
            
            {/* Dimensions radar chart */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Analysis Dimensions</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(analyzedContent.dimensions).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <div className="flex justify-between items-center text-xs">
                      <span className="capitalize">{key}</span>
                      <span className="font-medium">{value}%</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                          background: `linear-gradient(to right, ${
                            value > 70 ? '#ef4444' : '#3b82f6'
                          }, ${
                            value > 70 ? '#f97316' : '#6366f1'
                          })`
                        }}
                        className="h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Detected artifacts */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Detected Artifacts</h4>
              {analyzedContent.artifacts.map((artifact, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between mb-2 last:mb-0 p-2 rounded bg-red-50/50 dark:bg-red-900/10"
                >
                  <div>
                    <Badge variant="tech" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 mb-1">
                      {artifact.type.replace('_', ' ')}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      Timecode: {artifact.timeCode}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {artifact.confidence}%
                  </div>
                </div>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              <Button variant="outline" size="sm">
                <Eye className="mr-1 h-3.5 w-3.5" />
                View Details
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentAnalysis3D;
