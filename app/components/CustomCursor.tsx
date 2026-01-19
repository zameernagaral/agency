"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }); // Start off-screen
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements (links, buttons, or inputs)
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Small Dot (Disappears on hover) */}
      <motion.div
        // Changed from w-4 h-4 to w-2 h-2 (8px)
        className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 4, // Centering offset adjusted for new size
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Outer Ring (Smaller base size, subtler expansion) */}
      <motion.div
        // Changed from w-8 h-8 to w-6 h-6 (24px)
        className="fixed top-0 left-0 w-6 h-6 border border-black rounded-full pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12, // Centering offset adjusted for new size
          y: mousePosition.y - 12,
          scale: isHovering ? 1.8 : 1, // Reduced hover scale from 2.5 to 1.8
          backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)"
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
}