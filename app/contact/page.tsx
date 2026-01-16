"use client";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiArrowUpRight } from "react-icons/fi";

export default function Contact() {
  return (
    <section className="relative py-28 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* LEFT — COPY */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
            Let’s build something{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              unforgettable
            </span>.
          </h1>

          <p className="text-xl text-gray-600 mb-14 leading-relaxed">
            Got an idea, a startup, or a half-baked concept scribbled in Notes?
            Perfect. We thrive there.
          </p>

          <div className="space-y-8">
            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 text-xl">
                <FiMail />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email us</p>
                <p className="font-semibold">shorttalks@gmail.com</p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 text-xl">
                <FiMapPin />
              </div>
              <div>
                <p className="text-sm text-gray-500">Based in</p>
                <p className="font-semibold">Bengaluru, India</p>
              </div>
            </motion.div>
          </div>

          <p className="mt-14 text-sm text-gray-400">
            ⚡ We usually reply within 24 hours. No bots. No sales spam.
          </p>
        </motion.div>

        {/* RIGHT — FORM */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 [transform-style:preserve-3d]"
        >
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Tell us about your project
              </label>
              <textarea
                rows={5}
                placeholder="What are you building? Timeline? Goals?"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.04, rotateX: 8, rotateY: -8 }}
              transition={{ type: "spring", stiffness: 250 }}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Send message
              <FiArrowUpRight />
            </motion.button>
          </div>

          {/* subtle card glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
        </motion.form>
      </div>
    </section>
  );
}
