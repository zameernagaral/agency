"use client";
import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { motion } from "framer-motion";
import { FiUser, FiCheckCircle, FiLayout, FiLogOut, FiTrash2, FiImage } from "react-icons/fi";
import { supabase } from '@/app/lib/supabase'; // Import from your new file

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Data State
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectCategory, setProjectCategory] = useState("Web Dev");
  const [assigneeEmail, setAssigneeEmail] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  
  const [myTasks, setMyTasks] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]); // New: Projects List

  // 1. Check Login
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUserRole(session.user.id);
    });
  }, []);

  // 2. Fetch Role & Data
  const fetchUserRole = async (userId: string) => {
    const { data } = await supabase.from('profiles').select('role').eq('id', userId).single();
    if (data) {
      setRole(data.role);
      if (data.role === 'member') fetchMyTasks(userId);
      if (data.role === 'admin') {
        fetchMessages();
        fetchProjects(); // Admin fetches projects
      }
    } else {
      setRole("member");
      fetchMyTasks(userId);
    }
  };

  const fetchMyTasks = async (userId: string) => {
      const { data } = await supabase.from('tasks').select('*').eq('assigned_to', userId);
      if(data) setMyTasks(data);
  }

  const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
      if(data) setMessages(data);
  }

  const fetchProjects = async () => {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if(data) setProjects(data);
  }

  // 3. Actions
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else {
        setSession(data.session);
        fetchUserRole(data.session!.user.id);
    }
    setLoading(false);
  };

  const addProject = async () => {
    if (!projectTitle || !projectDesc) return alert("Please fill fields");
    const { error } = await supabase.from('projects').insert({
      title: projectTitle, description: projectDesc, category: projectCategory,
      image_url: "https://via.placeholder.com/600x400" 
    });
    if (error) alert(error.message);
    else { 
      alert("Project Live! 🚀"); 
      setProjectTitle(""); 
      setProjectDesc("");
      fetchProjects(); // Refresh list
    }
  };

  const deleteProject = async (id: number) => {
    if(!confirm("Delete this project from the website?")) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjects(projects.filter(p => p.id !== id));
    else alert(error.message);
  };

  const assignTask = async () => {
    const { data: userData } = await supabase.from('profiles').select('id').eq('email', assigneeEmail).single();
    if (!userData) return alert("User not found");
    const { error } = await supabase.from('tasks').insert({
        title: newTaskTitle, assigned_to: userData.id, created_by: session.user.id
    });
    if (error) alert(error.message);
    else { alert("Task Assigned!"); setNewTaskTitle(""); }
  };

  const deleteMessage = async (id: number) => {
    if(!confirm("Delete this message?")) return;
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (!error) setMessages(messages.filter(m => m.id !== id));
  };

  // --- UI: LOGIN SCREEN ---
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleLogin} 
          className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Agency Admin</h2>
            <p className="text-gray-500 text-sm">Enter credentials to access dashboard</p>
          </div>
          <div className="space-y-4">
            <input className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all" type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition-all" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button disabled={loading} className="w-full bg-black text-white p-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all">
              {loading ? "Accessing..." : "Enter Dashboard"}
            </button>
          </div>
        </motion.form>
      </div>
    );
  }

  if (!role) return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;

  // --- UI: ADMIN DASHBOARD ---
  if (role === 'admin') {
    return (
      <div className="min-h-screen pt-28 px-6 pb-20 max-w-7xl mx-auto selection:bg-blue-100">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Command Center</p>
              <h1 className="text-4xl font-bold">Welcome back, Admin.</h1>
            </div>
            <button onClick={() => supabase.auth.signOut().then(() => setSession(null))} className="flex items-center gap-2 px-5 py-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-full text-sm font-bold transition-colors">
               <FiLogOut /> Logout
            </button>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-8 border-b border-gray-100 pb-1">
            <button onClick={() => setActiveTab('overview')} className={`pb-3 px-2 text-sm font-bold transition-colors ${activeTab === 'overview' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-black'}`}>Overview</button>
            <button onClick={() => setActiveTab('projects')} className={`pb-3 px-2 text-sm font-bold transition-colors ${activeTab === 'projects' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-black'}`}>Projects</button>
            <button onClick={() => setActiveTab('inbox')} className={`pb-3 px-2 text-sm font-bold transition-colors ${activeTab === 'inbox' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-black'}`}>
                Inbox 
                {messages.length > 0 && <span className="ml-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{messages.length}</span>}
            </button>
        </div>

        {/* CONTENT AREA */}
        <div className="min-h-[400px]">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl"><FiUser /></div>
                           <h2 className="text-xl font-bold">Assign Tasks</h2>
                        </div>
                        <div className="space-y-4">
                          <input className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-blue-500 border transition-all" placeholder="Task Title" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} />
                          <input className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-blue-500 border transition-all" placeholder="Assignee Email" value={assigneeEmail} onChange={e => setAssigneeEmail(e.target.value)} />
                          <button onClick={assignTask} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">Assign Task</button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* TAB 2: PROJECTS (Updated with List) */}
            {activeTab === 'projects' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* ADD FORM */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-xl"><FiLayout /></div>
                           <h2 className="text-xl font-bold">Add Project</h2>
                        </div>
                        <div className="space-y-4">
                          <input className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-purple-500 border transition-all" placeholder="Project Title" value={projectTitle} onChange={e => setProjectTitle(e.target.value)} />
                          <div className="grid grid-cols-2 gap-4">
                            <select className="p-4 bg-gray-50 rounded-xl" value={projectCategory} onChange={e => setProjectCategory(e.target.value)}>
                                <option>Web Dev</option><option>Design</option><option>Marketing</option>
                            </select>
                          </div>
                          <textarea className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-purple-500 border transition-all" rows={3} placeholder="Short Description..." value={projectDesc} onChange={e => setProjectDesc(e.target.value)} />
                          <button onClick={addProject} className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">Publish</button>
                        </div>
                    </motion.div>

                    {/* PROJECT LIST */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-4">Live Projects ({projects.length})</h3>
                        {projects.length === 0 && <p className="text-gray-400">No projects yet.</p>}
                        {projects.map((p) => (
                            <div key={p.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center group hover:shadow-md transition-all">
                                <div>
                                    <h4 className="font-bold">{p.title}</h4>
                                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded mt-1 inline-block">{p.category}</span>
                                </div>
                                <button onClick={() => deleteProject(p.id)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                    <FiTrash2 />
                                </button>
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}

            {/* TAB 3: INBOX */}
            {activeTab === 'inbox' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-3xl">
                    {messages.length === 0 ? <p className="text-gray-400">No messages.</p> : messages.map((msg) => (
                        <div key={msg.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-lg">{msg.name}</h3>
                                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold">{msg.email}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{msg.message}</p>
                            </div>
                            <button onClick={() => deleteMessage(msg.id)} className="self-center p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"><FiTrash2 /></button>
                        </div>
                    ))}
                </motion.div>
            )}

        </div>
      </div>
    );
  }

  // --- UI: MEMBER DASHBOARD ---
  return (
    <div className="min-h-screen pt-28 px-6 pb-20 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold">My Workspace</h1>
          <p className="text-gray-500 mt-2">Here are your active tasks.</p>
        </div>
        <button onClick={() => supabase.auth.signOut().then(() => setSession(null))} className="text-sm font-bold text-red-500 hover:text-red-700">Logout</button>
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {myTasks.length === 0 ? <div className="p-12 text-center text-gray-400">No active tasks.</div> : (
           <div className="divide-y divide-gray-100">
              {myTasks.map(task => (
                <div key={task.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                   <div className="flex items-center gap-4">
                      <FiCheckCircle className="text-2xl text-gray-300" />
                      <span className="font-medium text-lg">{task.title}</span>
                   </div>
                   <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wider rounded-full">Pending</span>
                </div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
}