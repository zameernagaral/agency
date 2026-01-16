// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";

type NavLink = {
  name: string;
  href: string;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks: NavLink[] = [
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed w-full z-50 transition-all ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm"
            : "bg-white/70 backdrop-blur-md"
        } border-b border-gray-100`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight"
          >
            AGENCY
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              .
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-gray-700 hover:text-black transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all group-hover:w-full" />
              </Link>
            ))}

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 8, rotateY: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="[transform-style:preserve-3d]"
            >
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-xl transition-all"
              >
                Let’s Talk
                <FiArrowUpRight />
              </Link>
            </motion.div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-2xl"
          >
            <FiMenu />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black text-white flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-5">
              <span className="text-xl font-bold">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-3xl"
              >
                <FiX />
              </button>
            </div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col justify-center flex-1 px-6 gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-bold hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-10 inline-flex items-center gap-2 text-lg font-semibold"
              >
                Start a project <FiArrowUpRight />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
