import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { ImageDown, BarChart2, Scan, PlusCircle, ZoomIn, ZoomOut, Check, X, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

const ForensicComparisonViewer = ({ className, imageData }) => {
  const [activeMode, setActiveMode] = useState('sideBySide');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [showMetadata, setShowMetadata] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  
  const originalCanvasRef = useRef(null);
  const modifiedCanvasRef = useRef(null);
  const sliderRef = useRef(null);
  
  // Default image data if none provided
  const defaultImageData = {
    original: {
      title: 'Original Image',
      url: 'https://images.unsplash.com/photo-1541873676-a18131494184',
      metadata: {
        dimensions: '3000 x 2000',
        format: 'JPEG',
        camera: 'Sony Alpha A7III',
        timestamp: '2023-05-15 14:32:01',
        location: 'New Delhi, India',
        hash: 'ef253c8734e6d8992214a642c89bcd23'
      }
    },
    modified: {
      title: 'Analyzed Image',
      url: 'https://images.unsplash.com/photo-1541873676-a18131494184',
      metadata: {
        dimensions: '3000 x 2000',
        format: 'JPEG',
        camera: 'Unknown',
        timestamp: '2023-05-16 09:12:45', 
        location: 'Unknown',
        hash: '68fd2c3a41e249c1b59e7d326da136e2'
      }
    },
    differences: [
      {
        id: 'diff1',
        x: 65, // percentage
        y: 40, // percentage
        description: 'Object added in post-processing'
      },
      {
        id: 'diff2',
        x: 25,
        y: 60,
        description: 'Background manipulation detected'
      },
      {
        id: 'diff3',
        x: 80,
        y: 20,
        description: 'Lighting inconsistency'
      }
    ],
    forensicReport: {
      manipulationConfidence: 94.2,
      analysisMethod: 'DeepForensics AI',
      processingTime: '32 seconds',
      detectedArtifacts: [
        'JPEG compression inconsistency',
        'Object boundary artifacts',
        'Shadow direction mismatch',
        'Noise pattern irregularity'
      ]
    }
  };
  
  const data = imageData || defaultImageData;
  
  // Handle image loading
  useEffect(() => {
    const loadImages = async () => {
      try {
        const originalImg = new Image();
        const modifiedImg = new Image();
        
        originalImg.crossOrigin = 'Anonymous';
        modifiedImg.crossOrigin = 'Anonymous';
        
        // Add timestamp parameter to bypass cache and simulate different images
        originalImg.src = `${data.original.url}?w=600&auto=format&fit=crop&q=80&timestamp=orig`;
        modifiedImg.src = `${data.modified.url}?w=600&auto=format&fit=crop&q=80&timestamp=mod`;
        
        await Promise.all([
          new Promise(resolve => originalImg.onload = resolve),
          new Promise(resolve => modifiedImg.onload = resolve)
        ]);
        
        // Draw the original image
        const originalCanvas = originalCanvasRef.current;
        if (originalCanvas) {
          const ctx = originalCanvas.getContext('2d');
          originalCanvas.width = originalImg.width;
          originalCanvas.height = originalImg.height;
          ctx.drawImage(originalImg, 0, 0);
        }
        
        // Draw the modified image
        const modifiedCanvas = modifiedCanvasRef.current;
        if (modifiedCanvas) {
          const ctx = modifiedCanvas.getContext('2d');
          modifiedCanvas.width = modifiedImg.width;
          modifiedCanvas.height = modifiedImg.height;
          ctx.drawImage(modifiedImg, 0, 0);
          
          // Add simulated manipulation highlights for the demo
          if (data.differences) {
            data.differences.forEach(diff => {
              const x = diff.x * modifiedCanvas.width / 100;
              const y = diff.y * modifiedCanvas.height / 100;
              
              ctx.beginPath();
              ctx.arc(x, y, 15, 0, Math.PI * 2);
              ctx.strokeStyle = 'rgba(244, 63, 94, 0.8)';
              ctx.lineWidth = 2;
              ctx.stroke();
            });
          }
        }
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };
    
    loadImages();
  }, [data]);
  
  // Handle slider movement for the swipe comparison
  const handleSliderChange = (e) => {
    const slider = sliderRef.current;
    if (slider) {
      slider.style.width = `${e.target.value}%`;
    }
  };
  
  // Handle mouse movement for the magnifier
  const handleMouseMove = (e) => {
    if (activeMode !== 'magnify') return;
    
    const canvas = modifiedCanvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPosition({ x, y });
  };
  
  const handleMarkerClick = (marker) => {
    setActiveMarker(activeMarker?.id === marker.id ? null : marker);
  };
  
  const handleZoom = (direction) => {
    setZoomLevel(prevZoom => {
      const newZoom = direction === 'in' ? prevZoom + 0.25 : prevZoom - 0.25;
      return Math.max(1, Math.min(3, newZoom));
    });
  };
  
  return (
    <Card className={className}>
      <CardHeader className="space-y-0 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md font-bold flex items-center">
            <Scan className="h-5 w-5 mr-2 text-blue-500" />
            Forensic Analysis
          </CardTitle>
          <div className="flex gap-1">
            <Badge 
              variant={data.forensicReport.manipulationConfidence > 90 ? "destructive" : "outline"} 
              className="text-xs"
            >
              {data.forensicReport.manipulationConfidence}% Manipulation
            </Badge>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowMetadata(!showMetadata)}
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-3 border-b bg-muted/30">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                variant={activeMode === 'sideBySide' ? 'default' : 'outline'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setActiveMode('sideBySide')}
              >
                Side by Side
              </Button>
              <Button
                variant={activeMode === 'swipe' ? 'default' : 'outline'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setActiveMode('swipe')}
              >
                Swipe Compare
              </Button>
              <Button
                variant={activeMode === 'magnify' ? 'default' : 'outline'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setActiveMode('magnify')}
              >
                Magnify
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7"
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= 1}
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </Button>
              <span className="text-xs">{Math.round(zoomLevel * 100)}%</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7"
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Image comparison area */}
        <div 
          className="relative overflow-hidden"
          style={{ height: activeMode === 'sideBySide' ? '400px' : '350px' }}
          onMouseMove={handleMouseMove}
        >
          {activeMode === 'sideBySide' && (
            <div className="grid grid-cols-2 gap-2 p-3 h-full">
              <div className="relative overflow-hidden rounded border">
                <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                  {data.original.title}
                </div>
                <div 
                  className="overflow-auto h-full"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left'
                  }}
                >
                  <canvas ref={originalCanvasRef} />
                </div>
              </div>
              <div className="relative overflow-hidden rounded border">
                <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                  {data.modified.title}
                </div>
                <div 
                  className="overflow-auto h-full"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left'
                  }}
                >
                  <canvas ref={modifiedCanvasRef} />
                  
                  {/* Markers */}
                  {data.differences.map((diff) => (
                    <div
                      key={diff.id}
                      className="absolute w-5 h-5 cursor-pointer"
                      style={{
                        left: `${diff.x}%`,
                        top: `${diff.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => handleMarkerClick(diff)}
                    >
                      <div className={`
                        flex items-center justify-center w-5 h-5 rounded-full
                        ${activeMarker?.id === diff.id 
                          ? 'bg-red-500 text-white' 
                          : 'bg-red-500/20 border border-red-500'}
                      `}>
                        <PlusCircle className="h-3 w-3" />
                      </div>
                    </div>
                  ))}
                  
                  {/* Marker tooltip */}
                  <AnimatePresence>
                    {activeMarker && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bg-background/90 backdrop-blur-sm border shadow-lg rounded-md p-2 z-10"
                        style={{
                          left: `${activeMarker.x}%`,
                          top: `${activeMarker.y + 5}%`,
                          transform: 'translateX(-50%)',
                          maxWidth: '180px'
                        }}
                      >
                        <p className="text-xs">{activeMarker.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
          
          {activeMode === 'swipe' && (
            <div className="relative h-full p-3">
              <div className="rounded overflow-hidden border h-full">
                {/* Original image (background) */}
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left'
                  }}
                >
                  <canvas ref={originalCanvasRef} className="w-full h-auto" />
                </div>
                
                {/* Modified image (foreground with slider) */}
                <div 
                  ref={sliderRef} 
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ 
                    width: '50%',
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left'
                  }}
                >
                  <canvas ref={modifiedCanvasRef} className="w-full h-auto" />
                </div>
                
                {/* Slider control */}
                <input 
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="absolute inset-y-0 w-full opacity-0 cursor-ew-resize"
                  onChange={handleSliderChange}
                />
                
                {/* Slider handle */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-blue-500 pointer-events-none"
                  style={{ left: '50%' }}
                >
                  <div 
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center"
                  >
                    <ArrowLeft className="h-3 w-3 -ml-0.5" />
                    <ArrowRight className="h-3 w-3 -mr-0.5" />
                  </div>
                </div>
                
                {/* Labels */}
                <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                  {data.original.title}
                </div>
                <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                  {data.modified.title}
                </div>
              </div>
            </div>
          )}
          
          {activeMode === 'magnify' && (
            <div className="relative h-full p-3">
              <div className="rounded overflow-hidden border h-full">
                {/* Original image */}
                <div 
                  className="absolute inset-0 overflow-auto"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top left'
                  }}
                >
                  <canvas ref={originalCanvasRef} className="w-full h-auto" />
                </div>
                
                {/* Magnifier */}
                <div 
                  className="absolute w-32 h-32 border-2 border-blue-500 rounded-full overflow-hidden shadow-lg cursor-move"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div 
                    className="absolute"
                    style={{
                      transform: `scale(${zoomLevel * 1.5}) translate(-${position.x / (zoomLevel * 1.5)}%, -${position.y / (zoomLevel * 1.5)}%)`,
                      transformOrigin: 'center',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <canvas ref={modifiedCanvasRef} className="min-w-full min-h-full" />
                  </div>
                  
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-full opacity-25 pointer-events-none"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {showMetadata && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t p-3"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Metadata comparison */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center">
                    <ImageDown className="h-4 w-4 mr-1" />
                    Metadata Analysis
                  </h4>
                  
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="font-medium">Property</div>
                    <div className="font-medium">Original</div>
                    <div className="font-medium">Modified</div>
                    
                    {Object.entries(data.original.metadata).map(([key, value]) => (
                      <React.Fragment key={key}>
                        <div className="text-muted-foreground capitalize">{key}</div>
                        <div>{value}</div>
                        <div className="flex items-center">
                          {data.modified.metadata[key]}
                          {data.original.metadata[key] !== data.modified.metadata[key] && (
                            <span className="ml-1 text-red-500">
                              <X className="h-3 w-3" />
                            </span>
                          )}
                          {data.original.metadata[key] === data.modified.metadata[key] && (
                            <span className="ml-1 text-green-500">
                              <Check className="h-3 w-3" />
                            </span>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                {/* Forensic findings */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center">
                    <Scan className="h-4 w-4 mr-1" />
                    Analysis Findings
                  </h4>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Confidence</span>
                      <span className="font-medium">{data.forensicReport.manipulationConfidence}%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Method</span>
                      <span className="font-medium">{data.forensicReport.analysisMethod}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Processing Time</span>
                      <span className="font-medium">{data.forensicReport.processingTime}</span>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Detected Artifacts</span>
                      <div className="mt-1 space-y-1">
                        {data.forensicReport.detectedArtifacts.map((artifact, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center p-1.5 rounded-sm bg-red-500/10"
                          >
                            <X className="h-3 w-3 mr-1 text-red-500" />
                            <span>{artifact}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="p-3 border-t">
          <div className="flex justify-between items-center">
            <div className="text-xs flex items-center text-muted-foreground">
              <RefreshCw className="h-3 w-3 mr-1" />
              Last updated: 2 minutes ago
            </div>
            <div>
              <Button size="sm" variant="outline" className="h-7 text-xs">
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForensicComparisonViewer;
