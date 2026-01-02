import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Activity, Zap, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Info } from 'lucide-react';

const AnomalyDetectionChart = ({ className, data, maxDataPoints = 30, refreshInterval = 3000 }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const canvasRef = useRef(null);
  
  // Default data if none provided
  const generateDefaultData = () => {
    const baseData = [];
    const anomalyPoints = [5, 12, 20, 27]; // Indices where anomalies will occur
    
    for (let i = 0; i < maxDataPoints; i++) {
      // Normal data with some noise
      let value = 30 + Math.cos(i * 0.2) * 10 + Math.random() * 5;
      
      // Apply anomaly if at designated point
      if (anomalyPoints.includes(i)) {
        value = value + (Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 10);
      }
      
      baseData.push({
        id: `point-${i}`,
        timestamp: new Date(Date.now() - (maxDataPoints - i) * refreshInterval),
        value: value,
        isAnomaly: anomalyPoints.includes(i)
      });
    }
    
    return baseData;
  };
  
  // Initialize chart data
  useEffect(() => {
    const initialData = data || generateDefaultData();
    setChartData(initialData);
    
    // Extract anomalies
    const detected = initialData.filter(point => point.isAnomaly);
    setAnomalies(detected);
  }, [data]);
  
  // Update data at interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!data) { // Only auto-update if we're using mock data
        setChartData(prevData => {
          // Shift all points left
          const newData = [...prevData.slice(1)];
          
          // Create new point
          const lastPoint = prevData[prevData.length - 1];
          const lastTimestamp = lastPoint.timestamp;
          const lastValue = lastPoint.value;
          
          // Determine if this will be an anomaly (10% chance)
          const isAnomaly = Math.random() < 0.1;
          
          // Calculate new value with trend continuation but some randomness
          let newValue = lastValue + (Math.random() * 6 - 3);
          
          // If anomaly, make a significant deviation
          if (isAnomaly) {
            newValue = lastValue + (Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 10);
          }
          
          // Keep within reasonable bounds
          newValue = Math.max(10, Math.min(80, newValue));
          
          // Add new point
          const newPoint = {
            id: `point-${Date.now()}`,
            timestamp: new Date(lastTimestamp.getTime() + refreshInterval),
            value: newValue,
            isAnomaly
          };
          newData.push(newPoint);
          
          // Update anomalies if needed
          if (isAnomaly) {
            setAnomalies(prev => [...prev, newPoint]);
          }
          
          return newData;
        });
      }
    }, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [data, refreshInterval]);
  
  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || chartData.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Get min and max values for scaling
    const values = chartData.map(d => d.value);
    const minValue = Math.min(...values) * 0.9;
    const maxValue = Math.max(...values) * 1.1;
    const valueRange = maxValue - minValue;
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(99, 179, 237, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = height - (i / 4) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Calculate point positions
    const points = chartData.map((point, index) => {
      const x = (index / (chartData.length - 1)) * width;
      const y = height - ((point.value - minValue) / valueRange) * height;
      return { x, y, ...point };
    });
    
    // Draw normal line
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    
    ctx.stroke();
    
    // Draw anomaly points
    points.filter(p => p.isAnomaly).forEach(point => {
      // Glow effect
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, 15
      );
      gradient.addColorStop(0, 'rgba(244, 63, 94, 0.8)');
      gradient.addColorStop(1, 'rgba(244, 63, 94, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
      ctx.fill();
      
      // Point
      ctx.fillStyle = 'rgba(244, 63, 94, 1)';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw area under the line
    ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
    ctx.beginPath();
    ctx.moveTo(points[0].x, height);
    
    points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    
    ctx.lineTo(points[points.length - 1].x, height);
    ctx.closePath();
    ctx.fill();
    
    // Draw normal points
    points.filter(p => !p.isAnomaly).forEach(point => {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw hovered point
    if (hoveredPoint !== null) {
      const point = points[hoveredPoint];
      
      ctx.strokeStyle = point.isAnomaly ? 'rgba(244, 63, 94, 1)' : 'rgba(56, 189, 248, 1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw tooltip
      const tooltipWidth = 100;
      const tooltipHeight = 40;
      const tooltipX = Math.min(width - tooltipWidth, Math.max(0, point.x - tooltipWidth / 2));
      const tooltipY = Math.max(0, point.y - tooltipHeight - 10);
      
      // Draw tooltip background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.beginPath();
      ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5);
      ctx.fill();
      
      // Draw tooltip text
      ctx.fillStyle = '#ffffff';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      
      // Format time
      const time = point.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      ctx.fillText(time, tooltipX + tooltipWidth / 2, tooltipY + 15);
      
      // Format value
      ctx.fillText(`Value: ${point.value.toFixed(1)}`, tooltipX + tooltipWidth / 2, tooltipY + 30);
      
      // Draw connecting line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(point.x, point.y - 5);
      ctx.lineTo(point.x, tooltipY + tooltipHeight);
      ctx.stroke();
    }
  }, [chartData, hoveredPoint]);
  
  // Handle mouse movement for tooltips
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = canvas.width;
    
    // Find closest point
    const pointIndex = Math.min(
      chartData.length - 1,
      Math.max(0, Math.round((x / width) * (chartData.length - 1)))
    );
    
    setHoveredPoint(pointIndex);
  };
  
  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };
  
  // Format time range
  const getTimeRangeText = () => {
    if (chartData.length < 2) return '';
    const oldest = chartData[0].timestamp;
    const newest = chartData[chartData.length - 1].timestamp;
    
    const formatTime = (date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    
    return `${formatTime(oldest)} - ${formatTime(newest)}`;
  };
  
  return (
    <Card className={className}>
      <CardHeader className="space-y-0 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-md font-bold flex items-center">
              <Activity className="h-5 w-5 mr-2 text-blue-500" />
              Realtime Anomaly Detection
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">{getTimeRangeText()}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className="bg-red-500/10 text-red-500 border-red-500/20"
            >
              <Zap className="h-3 w-3 mr-1" />
              {anomalies.length} Anomalies
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <div 
          className="relative h-[180px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={300}
            className="w-full h-full"
          />
        </div>
        
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="border-t mt-2 pt-3">
                <h4 className="text-sm font-medium mb-2">Detected Anomalies</h4>
                
                {anomalies.length > 0 ? (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {anomalies.map((anomaly, idx) => (
                      <div 
                        key={anomaly.id} 
                        className="flex items-center justify-between p-2 rounded-md bg-red-500/5 border border-red-500/20"
                      >
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                          <div>
                            <p className="text-xs font-medium">Anomalous Value: {anomaly.value.toFixed(1)}</p>
                            <p className="text-xs text-muted-foreground">
                              {anomaly.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                second: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Badge variant="outline" className={idx < 2 ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-orange-500/10 border-orange-500/20 text-orange-500"}>
                            {idx < 2 ? "Critical" : "Warning"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-4 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    No anomalies detected in this time period
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-3 pt-2 border-t text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Info className="h-3 w-3 mr-1" />
                    Analysis based on pattern recognition and historical trends
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    View Full Report
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default AnomalyDetectionChart;
