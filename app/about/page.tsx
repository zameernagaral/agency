"use client";
import { motion } from "framer-motion";
import ToolsGrid from "../components/ToolsGrid";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative py-28 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
            We turn{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              chaos
            </span>{" "}
            into clarity.
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            We’re a digital agency obsessed with helping startups look legit,
            feel premium, and convert users effortlessly.
          </p>

          <p className="text-xl text-gray-600 leading-relaxed">
            Design isn’t decoration. It’s psychology. Users decide in
            <span className="font-semibold text-black"> 0.05 seconds</span>
            whether to trust you. We engineer that moment.
          </p>
        </motion.div>

        {/* Floating blur blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
      </section>

      {/* TOOLS */}
      <ToolsGrid />

      {/* STATS */}
      <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "0", label: "Projects shipped" },
            { value: "100%", label: "Client satisfaction" },
            { value: "1x", label: "Avg conversion boost" },
            { value: "24/7", label: "Founder support" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-gray-500 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-28 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16"
        >
          How we work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Discovery",
              desc: "We reverse-engineer your goals, audience psychology, and competitors. Strategy before pixels.",
            },
            {
              step: "02",
              title: "Build & Iterate",
              desc: "Fast builds, weekly demos, zero surprises. You see progress in real time.",
            },
            {
              step: "03",
              title: "Launch & Scale",
              desc: "Deploy, optimize, and scale. We don’t disappear after launch.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
              className="group relative p-8 rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 [transform-style:preserve-3d]"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="text-5xl font-black text-blue-100 mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-4xl font-extrabold mb-6">
            Ready to look like a{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              serious startup?
            </span>
          </h3>
          <p className="text-gray-600 text-lg mb-10">
            Let’s build something users trust instantly.
          </p>
          <Link href="/contact" className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-xl transition-all">
            Get in touch
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
