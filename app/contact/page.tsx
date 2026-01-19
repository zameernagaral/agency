"use client";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { supabase } from '@/app/lib/supabase'; // Import from your new file

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('messages').insert({
      name: formData.name,
      email: formData.email,
      message: formData.message
    });

    setLoading(false);
    if (error) {
      alert("Error sending message. Please try again.");
    } else {
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="relative min-h-screen bg-white selection:bg-blue-100 overflow-hidden">
      
      {/* FIXED BACKGROUND GLOW */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-purple-100/40 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-blue-100/40 blur-[100px] rounded-full" />
      </div>

      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* LEFT: INFO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl font-black mb-8 leading-tight tracking-tight">
              Let’s build something <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                unforgettable.
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
              Got an idea, a startup, or a half-baked concept scribbled in Notes?
              Perfect. We thrive there.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-blue-600 text-xl">
                  <FiMail />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Email us</p>
                  <p className="font-semibold text-lg">hello@agency.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-blue-600 text-xl">
                  <FiMapPin />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Based in</p>
                  <p className="font-semibold text-lg">Bengaluru, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-2xl border border-white/50">
              {sent ? (
                <div className="h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">
                    <FiCheck />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-8 text-sm font-bold underline">Send another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold ml-1 mb-2 text-gray-500">Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 border-2 transition-all outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold ml-1 mb-2 text-gray-500">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 border-2 transition-all outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold ml-1 mb-2 text-gray-500">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 border-2 transition-all outline-none font-medium resize-none"
                    />
                  </div>

                  <button
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    {!loading && <FiArrowUpRight />}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}