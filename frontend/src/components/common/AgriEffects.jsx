import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AgriEffects = () => {
  const [elements, setElements] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const icons = ['🌾', '🌿', '🌱', '🍃', '🌻', '🌽', '🚜', '🍎', '🥕'];
    const newElements = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      left: Math.random() * 100,
      initialY: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 20 + Math.random() * 30,
      size: 15 + Math.random() * 35,
      opacity: 0.03 + Math.random() * 0.08,
      rotationSpeed: Math.random() * 2 - 1,
    }));
    setElements(newElements);

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Falling Elements with 3D Parallax */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: [null, 1200],
            opacity: [0, el.opacity, el.opacity, 0],
            rotate: [0, 360 * el.rotationSpeed]
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
          style={{
            left: `${el.left}%`,
            fontSize: `${el.size}px`,
            x: mousePos.x * (el.size / 30), // Parallax based on size
            y: mousePos.y * (el.size / 30),
          }}
        >
          {el.icon}
        </motion.div>
      ))}

      {/* 3D Floating Gradient Spheres */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-40 w-[40rem] h-[40rem] bg-green-400/10 rounded-full blur-[120px]"
        style={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, -100, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-40 w-[45rem] h-[45rem] bg-emerald-400/10 rounded-full blur-[140px]"
        style={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
      />

      {/* Grid Pattern with Perspective */}
      <div
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * 0.1}deg) rotateY(${mousePos.x * -0.1}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      ></div>

      <style jsx global>{`
        body {
          cursor: default;
        }
      `}</style>
    </div>
  );
};

export default AgriEffects;
