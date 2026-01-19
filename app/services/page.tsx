"use client";
import { motion } from "framer-motion";
import { FiCode, FiPenTool, FiVideo, FiArrowUpRight } from "react-icons/fi";
import TiltCard from "../components/TiltCard"; // Import your 3D card

const servicesData = [
  {
    title: "Web & Tech",
    icon: <FiCode />,
    description: "High-performance digital products engineered for speed, scalability, and long-term growth.",
    tags: ["Next.js", "React", "SEO"],
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "Design & Visual",
    icon: <FiPenTool />,
    description: "Visual systems that don’t just look good — they build trust and signal quality instantly.",
    tags: ["UI/UX", "Branding", "3D"],
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    title: "Content & Growth",
    icon: <FiVideo />,
    description: "Content built to stop the scroll, tell your story, and convert attention into action.",
    tags: ["Copywriting", "Video", "Social"],
    color: "text-pink-600",
    bg: "bg-pink-50"
  },
];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-white selection:bg-purple-100 overflow-hidden">
      
      {/* FIXED BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-100/30 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-100/30 blur-[100px] rounded-full" />
      </div>

      <section className="relative z-10 pt-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-2 block">Our Expertise</span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-gray-900">
            What we <br/>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              do best.
            </span>
          </h1>
          <p className="text-xl text-gray-500">
            Everything you need to launch fast, look premium, and scale with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="h-full"
            >
              <TiltCard className="bg-white/60 backdrop-blur-md rounded-[2rem] p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all group h-full">
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center text-sm font-bold text-black group-hover:translate-x-2 transition-transform">
                  Learn more <FiArrowUpRight className="ml-1" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}