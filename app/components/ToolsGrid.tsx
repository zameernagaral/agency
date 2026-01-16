"use client";

import { motion } from "framer-motion";
import {
  SiFigma,
  SiNotion,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";

export default function ToolsGrid() {
  const tools = [
    { name: "Figma", icon: SiFigma, color: "from-pink-500 to-purple-500" },
    { name: "Notion", icon: SiNotion, color: "from-gray-700 to-black" },
    { name: "Next.js", icon: SiNextdotjs, color: "from-black to-gray-600" },
    { name: "Tailwind", icon: SiTailwindcss, color: "from-sky-400 to-cyan-500" },
  ];

  return (
    <section className="relative py-20 border-y border-gray-100 bg-white overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 w-[500px] h-[200px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold text-gray-400 uppercase tracking-[0.25em] mb-12"
        >
          Powered by modern tools
        </motion.p>

        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {tools.map((tool, i) => {
            const Icon = tool.icon;

            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.15,
                  rotateX: 12,
                  rotateY: -12,
                }}
                className="group relative"
              >
                {/* Glow */}
                <div
                  className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${tool.color}`}
                />

                {/* Icon */}
                <div className="relative text-4xl md:text-5xl text-gray-400 group-hover:text-black transition-all duration-300 grayscale group-hover:grayscale-0 [transform-style:preserve-3d]">
                  <Icon />
                </div>

                {/* Label */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {tool.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
