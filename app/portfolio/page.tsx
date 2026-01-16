"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface Project {
  id: number;
  title: string;
  category: string;
  imageColor: string;
  slug: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web App",
    imageColor: "from-blue-100 to-blue-200",
    slug: "fintech-dashboard",
  },
  {
    id: 2,
    title: "Modern E-commerce",
    category: "Shopify",
    imageColor: "from-purple-100 to-purple-200",
    slug: "modern-ecommerce",
  },
  {
    id: 3,
    title: "SaaS Landing Page",
    category: "Web Design",
    imageColor: "from-green-100 to-green-200",
    slug: "saas-landing",
  },
  {
    id: 4,
    title: "AI Startup Identity",
    category: "Branding",
    imageColor: "from-orange-100 to-orange-200",
    slug: "ai-identity",
  },
];

export default function Portfolio() {
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
        className="mb-20 max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Selected{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Work
          </span>
        </h1>
        <p className="text-xl text-gray-600">
          Real products. Real outcomes. Built for startups that move fast.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ rotateX: 8, rotateY: -8, scale: 1.02 }}
            className="group relative [transform-style:preserve-3d]"
          >
            <Link href={`/portfolio/${project.slug}`}>
              {/* Card */}
              <div className="relative rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden">
                
                {/* Image */}
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${project.imageColor} relative overflow-hidden`}
                >
                  {/* Parallax overlay */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-black/5"
                  />

                  {/* View label */}
                  <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-white/80 backdrop-blur text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    View case study →
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex justify-between items-end">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold mt-1 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-all"
                  >
                    <FiArrowRight className="text-lg" />
                  </motion.div>
                </div>

                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
