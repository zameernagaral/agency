"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { useParams } from "next/navigation";

const projectData = {
  title: "FinTech Dashboard",
  category: "Web Application",
  description:
    "A complete overhaul of a legacy financial platform, focused on clarity, speed, and conversion.",
  challenge:
    "The existing platform was slow, visually cluttered, and users dropped off during onboarding.",
  solution:
    "We rebuilt the frontend using Next.js, simplified user flows, and introduced a scalable design system.",
  results: [
    "40% increase in user retention",
    "2× faster load times",
    "15% increase in conversion",
  ],
  stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Supabase"],
};

export default function ProjectDetail() {
  const params = useParams();

  return (
    <article className="relative py-28 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-400/20 blur-3xl rounded-full" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-blue-400/20 blur-3xl rounded-full" />

      {/* Back */}
      <Link
        href="/portfolio"
        className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors mb-10"
      >
        <FiArrowLeft className="mr-2" />
        Back to Work
      </Link>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          {projectData.category}
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold mt-4 mb-6 leading-tight">
          {projectData.title}
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
          {projectData.description}
        </p>
      </motion.section>

      {/* HERO VISUAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative w-full aspect-video rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 mb-24 shadow-xl"
      >
        {/* Fake depth layer */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      </motion.div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* MAIN STORY */}
        <div className="lg:col-span-2 space-y-20">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-5">The Challenge</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {projectData.challenge}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-5">The Solution</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {projectData.solution}
            </p>
          </motion.section>

          {/* RESULTS */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-8">Key Results</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {projectData.results.map((result, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, rotateX: 8, rotateY: -8 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl [transform-style:preserve-3d]"
                >
                  <FiCheck className="text-green-500 mb-3 text-xl" />
                  <p className="font-semibold">{result}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* SIDEBAR */}
        <motion.aside
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
        >
          <div className="sticky top-28 bg-white border border-gray-100 rounded-3xl p-6 shadow-lg">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
              Tech Stack
            </h4>

            <div className="flex flex-wrap gap-3">
              {projectData.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </article>
  );
}
