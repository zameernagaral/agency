// app/page.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

/* Container stagger */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

/* Item reveal */
const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      
      {/* Ambient glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-400/20 blur-3xl rounded-full" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-blue-400/20 blur-3xl rounded-full" />

      <motion.div
        className="relative text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6"
        >
          Digital Design Studio
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8"
        >
          We build digital products for{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              startups & creators
            </span>
          </span>
          .
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          We combine design, technology, and content to help brands look premium
          and convert attention into action.
        </motion.p>

      {/* CTAs */}
<motion.div
  variants={itemVariants}
  className="flex flex-col sm:flex-row gap-5 justify-center"
>
  {/* Primary CTA */}
  <motion.div
    whileHover={{ scale: 1.06, rotateX: 8, rotateY: -8 }}
    transition={{ type: "spring", stiffness: 260 }}
    className="[transform-style:preserve-3d]"
  >
    <Link
      href="/portfolio"
      className="flex items-center justify-center gap-2 px-9 py-4 rounded-full font-bold text-lg
                 bg-black text-white shadow-lg hover:shadow-2xl transition-all"
    >
      View our work
      <FiArrowUpRight />
    </Link>
  </motion.div>

  {/* Secondary CTA — SAME PHYSICS, LOWER PRIORITY */}
  <motion.div
    whileHover={{ scale: 1.04, rotateX: 6, rotateY: -6 }}
    transition={{ type: "spring", stiffness: 240 }}
    className="[transform-style:preserve-3d]"
  >
    <Link
      href="/services"
      className="flex items-center justify-center gap-2 px-9 py-4 rounded-full font-bold text-lg
                 bg-white text-black border border-gray-200
                 hover:border-black hover:bg-gray-50 transition-all"
    >
      Our services
    </Link>
  </motion.div>
</motion.div>


        {/* Trust micro-copy */}
        <motion.p
          variants={itemVariants}
          className="mt-12 text-sm text-gray-400"
        >
          Trusted by early-stage founders & fast-moving teams
        </motion.p>
      </motion.div>
    </section>
  );
}
