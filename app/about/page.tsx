"use client";
import { motion } from "framer-motion";
import ToolsGrid from "../components/ToolsGrid";
import Link from "next/link";
import TiltCard from "../components/TiltCard"; // Using your existing 3D card
import MagneticButton from "../components/MagneticButton"; // Using your existing button

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className="relative min-h-screen bg-white selection:bg-purple-100">
      
      {/* --- GLOBAL AMBIENT BACKGROUND (FIXED) --- */}
      {/* This ensures the gradient covers the WHOLE website as you scroll */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-purple-200/30 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-blue-200/30 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] right-[20%] w-[40vw] h-[40vw] bg-pink-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-extrabold mb-10 leading-[0.95] tracking-tight text-gray-900">
              We turn{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                chaos
              </span>{" "}
              <br /> into clarity.
            </h1>

            <div className="max-w-2xl">
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
                We’re a digital agency obsessed with helping startups look legit,
                feel premium, and convert users effortlessly.
              </p>

              <p className="text-lg text-gray-500 leading-relaxed">
                Design isn’t decoration. It’s psychology. Users decide in
                <span className="font-bold text-black border-b-2 border-purple-200 mx-1">0.05 seconds</span>
                whether to trust you. We engineer that moment.
              </p>
            </div>
          </motion.div>
        </section>

        {/* TOOLS CLUSTER */}
        <ToolsGrid />

        {/* STATS SECTION */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100/0 md:divide-gray-100">
            {[
              { value: "50+", label: "Projects Shipped" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "3x", label: "Avg ROI Boost" },
              { value: "24/7", label: "Founder Support" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4"
              >
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-b from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROCESS SECTION (With 3D TiltCards) */}
        <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-16"
          >
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">How we work</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "We reverse-engineer your goals, audience psychology, and competitors. Strategy before pixels.",
                color: "text-blue-500",
              },
              {
                step: "02",
                title: "Build & Iterate",
                desc: "Fast builds, weekly demos, zero surprises. You see progress in real time.",
                color: "text-purple-500",
              },
              {
                step: "03",
                title: "Launch & Scale",
                desc: "Deploy, optimize, and scale. We don’t disappear after launch.",
                color: "text-pink-500",
              },
            ].map((item, i) => (
              <div key={i} className="h-full">
                {/* Reusing your TiltCard component for consistency! */}
                <TiltCard className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 border border-white/50 shadow-xl hover:shadow-2xl transition-all">
                  <div className={`text-6xl font-black ${item.color} opacity-20 mb-6`}>
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </TiltCard>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              Ready to look like a <br/>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                serious startup?
              </span>
            </h3>
            <p className="text-gray-500 text-xl mb-12 max-w-2xl mx-auto">
              Stop losing customers to bad design. Let’s build something users trust instantly.
            </p>
            
            {/* Reusing your MagneticButton! */}
            <div className="flex justify-center">
              <Link href="/contact">
                <MagneticButton className="bg-black text-white hover:bg-gray-900 shadow-2xl">
                  Start Your Project
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </section>
        
      </div>
    </div>
  );
}