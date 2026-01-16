// app/services/page.tsx
"use client";

import { motion } from "framer-motion";
import { FiCode, FiPenTool, FiVideo, FiArrowUpRight } from "react-icons/fi";
import { ReactNode } from "react";

interface Service {
  title: string;
  icon: ReactNode;
  description: string;
  subServices: string[];
  gradient: string;
}

const servicesData: Service[] = [
  {
    title: "Web & Tech",
    icon: <FiCode />,
    description:
      "High-performance digital products engineered for speed, scalability, and long-term growth.",
    subServices: ["Web Development", "App Development", "Technical SEO"],
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Design & Visual",
    icon: <FiPenTool />,
    description:
      "Visual systems that don’t just look good — they build trust and signal quality instantly.",
    subServices: ["UI/UX Design", "Graphic Design", "Thumbnails", "3D Animation"],
    gradient: "from-purple-500 to-pink-400",
  },
  {
    title: "Content & Growth",
    icon: <FiVideo />,
    description:
      "Content built to stop the scroll, tell your story, and convert attention into action.",
    subServices: ["Video Editing", "Copywriting", "Social Media Assets"],
    gradient: "from-orange-500 to-amber-400",
  },
];

export default function ServicesPage() {
  return (
    <section className="relative py-28 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-400/20 blur-3xl rounded-full" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-blue-400/20 blur-3xl rounded-full" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24 max-w-3xl mx-auto"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          What we{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            do best
          </span>
        </h1>
        <p className="text-xl text-gray-600">
          Everything you need to launch fast, look premium, and scale with
          confidence.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.03, rotateX: 8, rotateY: -8 }}
            className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all p-8 [transform-style:preserve-3d]"
          >
            {/* Glow */}
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}
            />

            {/* Icon */}
            <div className="mb-8 inline-flex p-4 rounded-2xl bg-gray-50 text-3xl group-hover:scale-110 transition-transform">
              <span
                className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
              >
                {service.icon}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {service.description}
            </p>

            {/* Sub services */}
            <ul className="space-y-3 mb-10">
              {service.subServices.map((sub) => (
                <li
                  key={sub}
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <span className="w-2 h-2 rounded-full bg-black mr-3" />
                  {sub}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex items-center text-sm font-semibold text-black group-hover:text-blue-600 transition-colors">
              Learn more
              <FiArrowUpRight className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
