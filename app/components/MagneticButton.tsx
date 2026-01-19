"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

// 1. We defined 'className' here as an optional string (?)
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; 
}

export default function MagneticButton({ children, onClick, className }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      // 2. We pass that className to the actual button element here
      className={`px-8 py-4 rounded-full font-bold text-lg transition-colors ${className || ""}`}
    >
      {children}
    </motion.button>
  );
}