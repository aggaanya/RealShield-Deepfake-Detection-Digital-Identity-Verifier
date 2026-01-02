import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ThreatsMap = ({ className, threatData = [], height = 220 }) => {
  const canvasRef = useRef(null);
  
  // Default threat data if none provided
  const defaultThreats = [
    { id: 1, lat: 37.7749, lng: -122.4194, magnitude: 8, location: 'San Francisco, USA' },
    { id: 2, lat: 40.7128, lng: -74.0060, magnitude: 15, location: 'New York, USA' },
    { id: 3, lat: 51.5074, lng: -0.1278, magnitude: 12, location: 'London, UK' },
    { id: 4, lat: 28.6139, lng: 77.2090, magnitude: 9, location: 'New Delhi, India' },
    { id: 5, lat: 39.9042, lng: 116.4074, magnitude: 14, location: 'Beijing, China' },
    { id: 6, lat: -33.8688, lng: 151.2093, magnitude: 7, location: 'Sydney, Australia' },
    { id: 7, lat: 55.7558, lng: 37.6173, magnitude: 10, location: 'Moscow, Russia' },
    { id: 8, lat: -23.5505, lng: -46.6333, magnitude: 11, location: 'São Paulo, Brazil' },
  ];

  const threats = threatData.length > 0 ? threatData : defaultThreats;
  
  // Convert lat/lng to x/y coordinates for the map
  const coordToPos = (lat, lng, width, height) => {
    // Simple mercator projection
    const x = (lng + 180) * (width / 360);
    const latRad = lat * Math.PI / 180;
    const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    const y = (height / 2) - (width * mercN / (2 * Math.PI));
    return { x, y };
  };
  
  // Draw the world map with threats
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw world map outline (simplified)
    ctx.strokeStyle = 'rgba(99, 179, 237, 0.3)';
    ctx.lineWidth = 0.5;
    
    // Draw grid lines
    ctx.beginPath();
    for (let i = 0; i <= 6; i++) {
      const x = (i / 6) * width;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    
    for (let i = 0; i <= 3; i++) {
      const y = (i / 3) * height;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
    
    // Draw simplified continents (very basic shapes)
    ctx.beginPath();
    // North America (simplified)
    ctx.moveTo((width/360) * 50, (height/180) * 50);
    ctx.lineTo((width/360) * 100, (height/180) * 30);
    ctx.lineTo((width/360) * 120, (height/180) * 70);
    ctx.lineTo((width/360) * 80, (height/180) * 80);
    ctx.closePath();
    
    // Europe & Asia (simplified)
    ctx.moveTo((width/360) * 140, (height/180) * 30);
    ctx.lineTo((width/360) * 250, (height/180) * 40);
    ctx.lineTo((width/360) * 290, (height/180) * 100);
    ctx.lineTo((width/360) * 180, (height/180) * 90);
    ctx.closePath();
    
    // Africa (simplified)
    ctx.moveTo((width/360) * 160, (height/180) * 60);
    ctx.lineTo((width/360) * 180, (height/180) * 60);
    ctx.lineTo((width/360) * 190, (height/180) * 100);
    ctx.lineTo((width/360) * 150, (height/180) * 110);
    ctx.closePath();
    
    // South America (simplified)
    ctx.moveTo((width/360) * 100, (height/180) * 90);
    ctx.lineTo((width/360) * 120, (height/180) * 90);
    ctx.lineTo((width/360) * 110, (height/180) * 130);
    ctx.lineTo((width/360) * 90, (height/180) * 120);
    ctx.closePath();
    
    // Australia (simplified)
    ctx.moveTo((width/360) * 250, (height/180) * 100);
    ctx.lineTo((width/360) * 290, (height/180) * 110);
    ctx.lineTo((width/360) * 280, (height/180) * 130);
    ctx.lineTo((width/360) * 250, (height/180) * 120);
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(99, 179, 237, 0.1)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(99, 179, 237, 0.4)';
    ctx.stroke();
  }, []);
  
  return (
    <div className={`relative ${className}`} style={{ height: `${height}px` }}>
      {/* Background canvas for world map */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
        width="600" 
        height="300" 
      />
      
      {/* SVG layer for threats */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 300"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Connection lines between threats */}
        {threats.slice(0, -1).map((threat, i) => {
          const start = coordToPos(threat.lat, threat.lng, 600, 300);
          const end = coordToPos(
            threats[i + 1].lat, 
            threats[i + 1].lng, 
            600, 
            300
          );
          
          return (
            <path
              key={`line-${i}`}
              d={`M${start.x},${start.y} C${(start.x + end.x)/2},${start.y - 30} ${(start.x + end.x)/2},${end.y + 30} ${end.x},${end.y}`}
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          );
        })}
        
        {/* Threat indicators */}
        {threats.map((threat, index) => {
          const { x, y } = coordToPos(threat.lat, threat.lng, 600, 300);
          const size = Math.min(20, Math.max(10, threat.magnitude));
          
          return (
            <React.Fragment key={threat.id}>
              {/* Pulsing background */}
              <motion.circle
                cx={x}
                cy={y}
                initial={{ r: size * 0.8, opacity: 0.7 }}
                animate={{ 
                  r: [size * 0.8, size * 1.5, size * 0.8], 
                  opacity: [0.3, 0.1, 0.3] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2 + (index % 3),
                  ease: "easeInOut"
                }}
                fill="rgba(239, 68, 68, 0.2)"
              />
              
              {/* Threat dot */}
              <motion.circle
                cx={x}
                cy={y}
                r={size * 0.45}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                fill="rgba(239, 68, 68, 0.9)"
                stroke="#fff"
                strokeWidth="1"
              />
              
              {/* Showing only some labels to avoid clutter */}
              {(index % 3 === 0 || index === 0) && (
                <g>
                  <rect
                    x={x + 10}
                    y={y - 15}
                    width={threat.location.length * 5 + 10}
                    height="20"
                    rx="3"
                    fill="rgba(0, 0, 0, 0.7)"
                  />
                  <text
                    x={x + 15}
                    y={y}
                    fontSize="10"
                    fill="#fff"
                  >
                    {threat.location}
                  </text>
                </g>
              )}
            </React.Fragment>
          );
        })}
      </svg>
      
      <div className="absolute bottom-2 right-3 text-xs font-mono bg-black/50 text-white px-2 py-1 rounded backdrop-blur-sm">
        Real-time threat detection
      </div>
    </div>
  );
};

export default ThreatsMap;
