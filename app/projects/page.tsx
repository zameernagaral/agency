"use client";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link
import TiltCard from "../components/TiltCard";
import { supabase } from '@/app/lib/supabase'; // Import from your new file

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen pt-32 px-6 pb-20 selection:bg-blue-100">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Selected Work</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 tracking-tight text-gray-900">
            Showcase
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-[400px]"
            >
              {/* WRAP THE CARD IN A LINK */}
              <Link href={`/projects/${project.id}`} className="block h-full">
                <TiltCard className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                       <span className="text-xs font-bold border border-gray-200 px-3 py-1 rounded-full uppercase text-gray-500 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                         {project.category}
                       </span>
                       <h3 className="text-3xl font-bold mt-6 mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                         {project.title}
                       </h3>
                       <p className="text-gray-500 leading-relaxed text-sm line-clamp-3">
                         {project.description}
                       </p>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 group-hover:translate-x-2 transition-transform">
                      View Case Study <span className="text-xl">→</span>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}