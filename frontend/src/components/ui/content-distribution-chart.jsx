import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, BarChart2, PlusCircle, FilePlus2, FileImage, FileVideo, FileAudio, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';

const ContentDistributionChart = ({ className, data }) => {
  const canvasRef = useRef(null);
  const [activeSegment, setActiveSegment] = useState(null);
  const [viewMode, setViewMode] = useState('pie'); // 'pie' or 'bar'
  
  // Default data if none provided
  const defaultData = {
    total: 126,
    types: [
      { type: 'image', count: 48, color: '#3b82f6' },
      { type: 'video', count: 37, color: '#ef4444' },
      { type: 'audio', count: 23, color: '#f59e0b' },
      { type: 'document', count: 18, color: '#10b981' }
    ],
    period: 'Last 30 days'
  };
  
  const chartData = data || defaultData;
  
  // Get icon for content type
  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <FileVideo className="h-4 w-4" />;
      case 'image':
        return <FileImage className="h-4 w-4" />;
      case 'audio':
        return <FileAudio className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  // Draw pie chart
  useEffect(() => {
    if (viewMode !== 'pie') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate total value
    const total = chartData.types.reduce((sum, item) => sum + item.count, 0);
    
    // Draw segments
    let startAngle = -Math.PI / 2;
    
    chartData.types.forEach((item, index) => {
      // Calculate segment angles
      const segmentAngle = (item.count / total) * (Math.PI * 2);
      const endAngle = startAngle + segmentAngle;
      const isActive = activeSegment === index;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX, 
        centerY, 
        isActive ? radius + 8 : radius, 
        startAngle, 
        endAngle
      );
      ctx.closePath();
      
      // Fill segment
      ctx.fillStyle = item.color;
      ctx.fill();
      
      // Draw segment border
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.stroke();
      
      // Calculate angle for label
      const labelAngle = startAngle + segmentAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + Math.cos(labelAngle) * labelRadius;
      const labelY = centerY + Math.sin(labelAngle) * labelRadius;
      
      // Draw label if segment is large enough
      if (segmentAngle > 0.3) {
        ctx.font = isActive ? 'bold 14px Inter, sans-serif' : '12px Inter, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.count.toString(), labelX, labelY);
      }
      
      // Move to next segment
      startAngle = endAngle;
    });
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fill();
    
    // Draw total in center
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total.toString(), centerX, centerY - 12);
    
    // Draw "Total" label
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('Total Items', centerX, centerY + 12);
    
  }, [chartData, activeSegment, viewMode]);
  
  // Draw bar chart
  useEffect(() => {
    if (viewMode !== 'bar') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate max value for scaling
    const maxValue = Math.max(...chartData.types.map(item => item.count));
    const barCount = chartData.types.length;
    const barWidth = (width - padding * 2) / barCount - 20;
    
    // Draw X and Y axes
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();
    
    // Draw grid lines
    for (let i = 1; i <= 4; i++) {
      const y = height - padding - (i / 4) * (height - padding * 2);
      
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.setLineDash([2, 4]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw Y-axis labels
      const value = Math.round((i / 4) * maxValue);
      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toString(), padding - 10, y);
    }
    
    // Draw bars
    chartData.types.forEach((item, index) => {
      const barHeight = (item.count / maxValue) * (height - padding * 2);
      const barX = padding + index * ((width - padding * 2) / barCount) + 10;
      const barY = height - padding - barHeight;
      const isActive = activeSegment === index;
      
      // Draw bar shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(barX + 2, barY + 2, barWidth, barHeight);
      
      // Draw bar with gradient
      const gradient = ctx.createLinearGradient(barX, barY, barX, height - padding);
      gradient.addColorStop(0, item.color);
      gradient.addColorStop(1, adjustBrightness(item.color, -30));
      
      ctx.fillStyle = gradient;
      
      // Draw bar with rounded top
      ctx.beginPath();
      ctx.moveTo(barX, height - padding);
      ctx.lineTo(barX, barY + 4);
      ctx.arc(barX + 4, barY + 4, 4, Math.PI, Math.PI * 1.5);
      ctx.lineTo(barX + barWidth - 4, barY);
      ctx.arc(barX + barWidth - 4, barY + 4, 4, Math.PI * 1.5, Math.PI * 2);
      ctx.lineTo(barX + barWidth, height - padding);
      ctx.closePath();
      ctx.fill();
      
      // Add highlight if active
      if (isActive) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Draw value on top of bar
      ctx.font = isActive ? 'bold 12px Inter, sans-serif' : '11px Inter, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(item.count.toString(), barX + barWidth / 2, barY - 5);
      
      // Draw label under bar
      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.textBaseline = 'top';
      ctx.fillText(capitalizeFirstLetter(item.type), barX + barWidth / 2, height - padding + 5);
    });
    
  }, [chartData, activeSegment, viewMode]);
  
  // Handle canvas hover
  const handleCanvasHover = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // For pie chart
    if (viewMode === 'pie') {
      const radius = Math.min(width, height) / 2 - 20;
      const innerRadius = radius * 0.45;
      
      // Calculate distance from center
      const distanceFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      
      // Check if within donut area
      if (distanceFromCenter > innerRadius && distanceFromCenter < radius + 10) {
        // Calculate angle
        let angle = Math.atan2(y - centerY, x - centerX);
        if (angle < -Math.PI / 2) {
          angle += Math.PI * 2;
        }
        
        // Find segment
        let startAngle = -Math.PI / 2;
        const total = chartData.types.reduce((sum, item) => sum + item.count, 0);
        
        for (let i = 0; i < chartData.types.length; i++) {
          const segmentAngle = (chartData.types[i].count / total) * (Math.PI * 2);
          const endAngle = startAngle + segmentAngle;
          
          if (angle >= startAngle && angle <= endAngle) {
            setActiveSegment(i);
            return;
          }
          
          startAngle = endAngle;
        }
      } else {
        setActiveSegment(null);
      }
    } 
    // For bar chart
    else if (viewMode === 'bar') {
      const padding = 40;
      const barCount = chartData.types.length;
      const barWidth = (width - padding * 2) / barCount - 20;
      
      // Check if within bars area
      if (y < height - padding && y > padding / 2 && x > padding && x < width - padding) {
        const barIndex = Math.floor((x - padding) / ((width - padding * 2) / barCount));
        
        if (barIndex >= 0 && barIndex < chartData.types.length) {
          const barX = padding + barIndex * ((width - padding * 2) / barCount) + 10;
          
          // Check if within specific bar width
          if (x >= barX && x <= barX + barWidth) {
            setActiveSegment(barIndex);
            return;
          }
        }
      }
      
      setActiveSegment(null);
    }
  };
  
  // Helper function to adjust color brightness
  function adjustBrightness(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = Math.round(R * (100 + percent) / 100);
    G = Math.round(G * (100 + percent) / 100);
    B = Math.round(B * (100 + percent) / 100);

    R = Math.max(0, Math.min(255, R));
    G = Math.max(0, Math.min(255, G));
    B = Math.max(0, Math.min(255, B));

    return "#" + (R.toString(16).padStart(2, '0')) +
               (G.toString(16).padStart(2, '0')) +
               (B.toString(16).padStart(2, '0'));
  }
  
  // Helper to capitalize first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <Card className={className}>
      <CardHeader className="space-y-0 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md font-bold flex items-center">
            {viewMode === 'pie' ? (
              <PieChart className="h-5 w-5 mr-2 text-blue-500" />
            ) : (
              <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
            )}
            Content Distribution
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant={viewMode === 'pie' ? 'default' : 'outline'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('pie')}
            >
              <PieChart className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'bar' ? 'default' : 'outline'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('bar')}
            >
              <BarChart2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{chartData.period}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col md:flex-row items-center">
          <div 
            className="relative w-full md:w-2/3"
            onMouseMove={handleCanvasHover}
            onMouseLeave={() => setActiveSegment(null)}
          >
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>
          
          <div className="w-full md:w-1/3">
            <h4 className="text-sm font-medium mb-2">Type Breakdown</h4>
            <div className="space-y-2">
              {chartData.types.map((item, index) => (
                <motion.div
                  key={item.type}
                  whileHover={{ scale: 1.02 }}
                  className={`flex justify-between items-center p-2 rounded-md cursor-pointer transition-colors ${
                    activeSegment === index 
                      ? 'bg-accent border border-accent/50' 
                      : 'hover:bg-accent/50'
                  }`}
                  onMouseEnter={() => setActiveSegment(index)}
                  onMouseLeave={() => setActiveSegment(null)}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex items-center text-sm">
                      {getContentTypeIcon(item.type)}
                      <span className="ml-2 capitalize">{item.type}</span>
                    </div>
                  </div>
                  <div className="font-medium">
                    {item.count}
                    <span className="text-xs ml-1 text-muted-foreground">
                      ({Math.round((item.count / chartData.total) * 100)}%)
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <Button variant="outline" size="sm" className="w-full">
                <FilePlus2 className="w-3.5 h-3.5 mr-2" />
                Add Content
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentDistributionChart;
