"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Team', href: '/portfolio' },
  { name: 'Admin', href: '/admin' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  
  // Transform scroll value to width/padding changes
  const width = useTransform(scrollY, [0, 100], ["100%", "80%"]);
  const top = useTransform(scrollY, [0, 100], ["0px", "20px"]);
  const backdrop = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const bg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]);
  const border = useTransform(scrollY, [0, 100], ["rgba(0,0,0,0)", "rgba(0,0,0,0.05)"]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav 
        style={{ width, top, backdropFilter: backdrop, background: bg, borderColor: border }}
        className="pointer-events-auto border border-transparent px-6 py-4 rounded-full flex items-center justify-between max-w-5xl mx-auto transition-all duration-300"
      >
        <Link href="/" className="font-bold text-xl tracking-tighter">
          AGENCY<span className="text-blue-600">.</span>
        </Link>

        <div className="flex items-center gap-1 bg-gray-100/50 p-1 rounded-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white shadow-sm rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 mix-blend-multiply">{link.name}</span>
              </Link>
            );
          })}
        </div>

        <Link href="/contact" className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-transform">
          Let's Talk
        </Link>
      </motion.nav>
    </div>
  );
}