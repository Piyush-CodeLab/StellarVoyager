
import React, { useRef, useEffect, useState } from 'react';

const StarMapCanvas = ({ stars, constellations, onStarClick, userLocation, isARMode }) => {
  const canvasRef = useRef(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.fillStyle = '#0F0F1F';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw background stars
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const size = Math.random() * 1.5;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw constellation lines
    ctx.strokeStyle = '#6B5B95';
    ctx.lineWidth = 1;
    constellations.forEach(constellation => {
      constellation.lines.forEach(line => {
        const star1 = stars.find(s => s.name === line.from);
        const star2 = stars.find(s => s.name === line.to);
        
        if (star1 && star2) {
          const x1 = (star1.ra / 360) * rect.width;
          const y1 = ((90 - star1.dec) / 180) * rect.height;
          const x2 = (star2.ra / 360) * rect.width;
          const y2 = ((90 - star2.dec) / 180) * rect.height;
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      });
    });

    // Draw stars
    stars.forEach((star, index) => {
      const x = (star.ra / 360) * rect.width;
      const y = ((90 - star.dec) / 180) * rect.height;
      const size = Math.max(2, 8 - star.magnitude);
      
      // Highlight if selected or hovered
      const isHovered = selectedStar === index;
      
      ctx.fillStyle = isHovered ? '#00B7EB' : '#FFD700';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow effect for bright stars
      if (star.magnitude < 2) {
        ctx.fillStyle = `rgba(255, 215, 0, 0.3)`;
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw star name for bright stars or hovered star
      if (star.magnitude < 1.5 || isHovered) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText(star.name, x, y - size - 5);
      }
    });

    // Draw location indicator
    if (userLocation.lat && userLocation.lng) {
      const locX = rect.width - 60;
      const locY = 30;
      
      ctx.fillStyle = '#00B7EB';
      ctx.font = '10px Orbitron';
      ctx.textAlign = 'right';
      ctx.fillText(`${userLocation.lat.toFixed(1)}°, ${userLocation.lng.toFixed(1)}°`, locX, locY);
    }

  }, [stars, constellations, selectedStar, userLocation]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    
    // Find hovered star
    let foundStar = null;
    stars.forEach((star, index) => {
      const starX = (star.ra / 360) * rect.width;
      const starY = ((90 - star.dec) / 180) * rect.height;
      const distance = Math.sqrt((x - starX) ** 2 + (y - starY) ** 2);
      
      if (distance < 15) {
        foundStar = index;
      }
    });
    
    setSelectedStar(foundStar);
    canvas.style.cursor = foundStar !== null ? 'pointer' : 'default';
  };

  const handleClick = (e) => {
    if (selectedStar !== null) {
      onStarClick(stars[selectedStar]);
    }
  };

  // AR Mode placeholder
  if (isARMode) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/50">
        <div className="text-center text-white">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#6B5B95]/20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7EB]"></div>
          </div>
          <h3 className="text-xl font-bold mb-2 font-['Orbitron']">AR Mode</h3>
          <p className="text-gray-400">AR functionality would be implemented with AR.js</p>
          <p className="text-sm text-gray-500 mt-2">Point your device at the sky to see constellations overlaid</p>
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-crosshair"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default StarMapCanvas;
