"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiInstagram, FiTwitter, FiLinkedin, FiArrowUpRight, FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-gray-100 pt-20 pb-10 overflow-hidden">
      
      {/* Ambient Footer Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-gray-50 to-transparent -z-10" />

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-14 mb-20">
        
        {/* BRAND COLUMN */}
        <div className="max-w-sm">
          <Link href="/" className="text-3xl font-black tracking-tighter inline-flex items-center gap-1">
            AGENCY<span className="text-blue-600">.</span>
          </Link>

          <p className="mt-6 text-gray-500 text-sm leading-relaxed">
            We design & build digital products that feel premium, move fast,
            and convert users into believers.
          </p>

          <Link href="/contact" className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-black group">
            Start a project
            <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* LINKS COLUMN */}
        <div className="flex gap-16 flex-wrap">
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Sitemap</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-600">
              {['Home', 'Services', 'Projects', 'Team', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase() === 'team' ? 'portfolio' : item.toLowerCase()}`} className="hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIALS */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">Socials</h4>
            <div className="flex gap-4">
              {[FiTwitter, FiInstagram, FiLinkedin, FiGithub].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5 }}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all shadow-sm"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-100 pt-8 text-center">
        <p className="text-xs font-semibold text-gray-400">
          © {new Date().getFullYear()} AGENCY. Built with Next.js & Supabase.
        </p>
      </div>
    </footer>
  );
}