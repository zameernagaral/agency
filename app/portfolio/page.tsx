"use client";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { motion } from "framer-motion";
import TiltCard from "../components/TiltCard";
import { FiGithub, FiTwitter, FiUser } from "react-icons/fi";
import { supabase } from '@/app/lib/supabase'; // Import from your new file

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      // Fetch profiles from Supabase
      const { data } = await supabase.from('profiles').select('*');
      if (data) setTeam(data);
    };
    fetchTeam();
  }, []);

  return (
    <div className="relative min-h-screen pt-32 px-6 pb-20 selection:bg-pink-100">
      
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-pink-100/40 blur-[80px] rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-blue-100/40 blur-[80px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-pink-600 mb-2 block">Our Squad</span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Meet the <br/>
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              minds.
            </span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.length === 0 ? (
            <p className="col-span-3 text-center text-gray-400">Loading team members...</p>
          ) : (
            team.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-[350px]"
              >
                <TiltCard className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-8 border border-white/60 shadow-lg hover:shadow-2xl transition-all group flex flex-col items-center text-center h-full justify-between">
                  
                  <div className="relative">
                    {/* Avatar Circle */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-white shadow-inner flex items-center justify-center text-4xl text-gray-300 mb-6 mx-auto overflow-hidden border-4 border-white">
                         {/* If avatar_url exists, show image, else show icon */}
                         {member.avatar_url ? (
                           <img src={member.avatar_url} alt={member.full_name} className="w-full h-full object-cover" />
                         ) : (
                           <FiUser />
                         )}
                    </div>
                    
                    {/* Role Badge (Admin or Member) */}
                    <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${member.role === 'admin' ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}>
                      {member.role || 'Member'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-1">{member.full_name || member.email?.split('@')[0] || "Team Member"}</h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {member.role === 'admin' ? 'Co-Founder & Lead' : 'Creative Developer'}
                    </p>
                  </div>

                  {/* Social Icons (Mocked for now) */}
                  <div className="flex gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <button className="w-8 h-8 rounded-full bg-gray-50 hover:bg-black hover:text-white flex items-center justify-center transition-colors"><FiTwitter /></button>
                    <button className="w-8 h-8 rounded-full bg-gray-50 hover:bg-black hover:text-white flex items-center justify-center transition-colors"><FiGithub /></button>
                  </div>

                </TiltCard>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}