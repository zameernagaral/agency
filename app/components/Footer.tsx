"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiInstagram, FiTwitter, FiLinkedin, FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-white border-t border-gray-100 py-16 md:py-24 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="relative px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-14">
        
        {/* BRAND */}
        <div className="max-w-sm">
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight inline-flex items-center gap-1"
          >
            AGENCY
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              .
            </span>
          </Link>

          <p className="mt-5 text-gray-500 text-sm leading-relaxed">
            We design & build digital products that feel premium, move fast,
            and convert users into believers.
          </p>

          {/* Mini CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-black group"
          >
            Start a project
            <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* LINKS */}
        <div className="flex gap-16 flex-wrap">
          <div>
            <h4 className="font-bold mb-5">Sitemap</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Work", href: "/portfolio" },
                { label: "Contact", href: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="relative group hover:text-black transition-colors"
                  >
                    {item.label}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIALS */}
          <div>
            <h4 className="font-bold mb-5">Socials</h4>
            <div className="flex gap-4">
              {[FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{
                    rotateX: 12,
                    rotateY: -12,
                    scale: 1.1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:text-white hover:bg-black shadow-sm hover:shadow-xl [transform-style:preserve-3d]"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative mt-16 border-t border-gray-100 pt-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} AGENCY. Built with taste, not templates.
      </div>
    </motion.footer>
  );
}
