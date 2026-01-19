"use client";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiCheck, FiLayers } from "react-icons/fi";
import { useParams } from "next/navigation";
import { supabase } from '@/app/lib/supabase'; // Import from your new file

export default function ProjectDetail() {
  const { id } = useParams(); // Get the ID from the URL
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      // Fetch the single project matching the ID
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
      
      if (data) setProject(data);
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading Case Study...</div>;
  if (!project) return <div className="h-screen flex items-center justify-center">Project not found.</div>;

  return (
    <article className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Glows (Fixed to match About Page) */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 blur-[100px] rounded-full" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/40 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-black transition-colors mb-12 group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Work
        </Link>

        {/* HERO HEADER */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest">
              {project.category}
            </span>
            <span className="text-gray-400 text-sm">/ 2024</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-gray-900">
            {project.title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </motion.section>

        {/* HERO IMAGE PLACEHOLDER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full aspect-video rounded-3xl bg-gray-100 border border-gray-200 mb-24 shadow-2xl overflow-hidden group"
        >
            {/* If you had real images in Supabase, you'd use <img src={project.image_url} /> here */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                {/* Fallback visual */}
                <FiLayers className="text-6xl opacity-20" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Startups often struggle to communicate their value clearly. For <strong>{project.title}</strong>, the goal was to strip away the noise and focus purely on conversion and user trust. The existing solution was fragmented and visually outdated.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold mb-4">The Solution</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                We engineered a bespoke solution using Next.js and Supabase. By focusing on a "content-first" architecture, we ensured that load times were instant and the user journey was frictionless.
              </p>
            </motion.div>
          </div>

          {/* SIDEBAR DETAILS */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg sticky top-32">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                Project Stats
              </h4>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><FiCheck /></div>
                    <span className="font-medium text-gray-700">Mobile Optimized</span>
                </li>
                <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><FiCheck /></div>
                    <span className="font-medium text-gray-700">SEO Ready</span>
                </li>
                <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><FiCheck /></div>
                    <span className="font-medium text-gray-700">Fast Performance</span>
                </li>
              </ul>

              <div className="pt-6 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                    {['Next.js', 'React', 'Supabase', 'Tailwind'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs font-semibold text-gray-600">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
            </div>
          </motion.aside>

        </div>
      </div>
    </article>
  );
}