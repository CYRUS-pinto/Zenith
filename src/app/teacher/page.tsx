"use client";

import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  Terminal, 
  Target,
  Wind,
  Activity,
  Layers,
  Search,
  Zap,
  Cpu,
  Globe,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSDGStore } from '@/services/storage/sdg-store';
import { firebaseService } from '@/services/firebase/firebase-service';
import { geminiService } from '@/services/ai/gemini-service';
import { Navbar } from '@/components/layout/Navbar';
import { StatsTicker } from '@/components/ui/StatsTicker';
import { ClassroomHeatmap } from '@/components/teacher/ClassroomHeatmap';

export default function TeacherArchitect() {
  const [subject, setSubject] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { currentRoadmap, setRoadmap } = useSDGStore();

  const handleGenerate = async () => {
    if (!subject) return;
    setIsGenerating(true);
    try {
      const result = await geminiService.generateSDGRoadmap(subject);
      setRoadmap(result);
      // Sync to Firebase
      await firebaseService.pushRoadmap('global-class', result);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <StatsTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10 grid grid-cols-12 gap-8">
        
        {/* Left Column: Architect Controls (Bento Style) */}
        <section className="col-span-12 lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 space-y-8 border-beam"
          >
            <div className="space-y-2">
               <div className="flex items-center space-x-2 text-emerald-500">
                  <Cpu className="w-4 h-4" />
                  <span className="uppercase-label">Logic Engine V4</span>
               </div>
               <h2 className="text-4xl font-black italic tracking-tighter">ARTIFACT ARCHITECT.</h2>
               <p className="text-sm text-slate-400 leading-relaxed font-medium">
                 Manifest complex SDG roadmaps through AI-driven modular synthesis.
               </p>
            </div>

            <div className="space-y-6">
               <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Course Domain (e.g. Physics)"
                    className="w-full h-16 bg-slate-950 border border-white/5 rounded-2xl pl-14 pr-6 text-sm font-bold focus:border-emerald-500/50 focus:outline-none transition-all placeholder:text-slate-700"
                  />
               </div>

               <button 
                 onClick={handleGenerate}
                 disabled={isGenerating || !subject}
                 className="w-full h-16 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-white/5 flex items-center justify-center space-x-3 disabled:opacity-30 group"
               >
                 {isGenerating ? (
                   <Loader2 className="w-5 h-5 animate-spin" />
                 ) : (
                   <>
                     <span>Generate Artifact</span>
                     <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" />
                   </>
                 )}
               </button>
            </div>
          </motion.div>

          {/* Activity Stream Bento Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 space-y-6"
          >
             <div className="flex items-center justify-between">
                <span className="uppercase-label text-slate-500">Live Telemetry</span>
                <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
             </div>
             <div className="space-y-4">
                {[
                  { msg: "Agentic Loop Initialized", time: "2m", color: "emerald" },
                  { msg: "Targeting Goal 15: Life on Land", time: "12m", color: "blue" },
                  { msg: "Logic Synthesis Offline", time: "Idle", color: "slate" }
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-slate-400">{log.msg}</span>
                    <span className="text-slate-600 italic uppercase tracking-tighter">{log.time}</span>
                  </div>
                ))}
             </div>
          </motion.div>
        </section>

        {/* Right Column: Visualization & Heatmap (Bento Style) */}
        <section className="col-span-12 lg:col-span-8 space-y-8">
           
           <AnimatePresence mode="wait">
             {currentRoadmap ? (
               <motion.div 
                 key="roadmap"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 className="space-y-8"
               >
                 {/* Main Roadmap Bento Card */}
                 <div className="glass p-12 space-y-12 relative overflow-hidden">
                    <div className="flex items-start justify-between relative z-10">
                       <div className="space-y-4">
                          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                             <Target className="w-3 h-3 text-emerald-500" />
                             <span className="text-[8px] font-black uppercase text-emerald-500 tracking-widest leading-none">Mapped SDG Target</span>
                          </div>
                          <h3 className="text-6xl font-black italic tracking-tighter uppercase leading-none">{currentRoadmap.primarySDG.name}</h3>
                       </div>
                       <div className="w-16 h-16 bg-slate-950 border border-white/5 rounded-2xl flex items-center justify-center shadow-inner">
                          <span className="text-2xl font-black text-emerald-500">{currentRoadmap.primarySDG.id}</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                       {currentRoadmap.modules.map((mod, i) => (
                         <div key={i} className="p-6 bg-slate-950/50 border border-white/5 rounded-3xl space-y-6 hover:border-emerald-500/30 transition-colors group">
                           <div className="w-10 h-10 bg-slate-900 border border-white/5 rounded-xl flex items-center justify-center text-[10px] font-black group-hover:bg-emerald-500 transition-colors group-hover:text-slate-950">
                             M{i+1}
                           </div>
                           <div className="space-y-2">
                             <h4 className="text-sm font-black italic uppercase leading-tight">{mod.title}</h4>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{mod.type}</p>
                           </div>
                         </div>
                       ))}
                    </div>

                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] pointer-events-none" />
                 </div>

                 {/* Classroom Heatmap Bento Card */}
                 <ClassroomHeatmap />
               </motion.div>
             ) : (
               <motion.div 
                 key="waiting"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="h-[600px] glass flex flex-col items-center justify-center space-y-8 bg-slate-900/10 border-dashed border-white/10"
               >
                 <div className="w-20 h-20 border-2 border-slate-800 rounded-[2.5rem] flex items-center justify-center animate-pulse">
                    <Globe className="w-8 h-8 text-slate-700" />
                 </div>
                 <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black italic tracking-tighter text-slate-500">Waiting for Manifest Signals.</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-700 leading-relaxed max-w-xs mx-auto">
                      Define a course domain above to synthesize the educational roadmap through the agentic loop.
                    </p>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

        </section>
      </main>

      {/* Background Decor */}
      <div className="fixed top-1/2 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] pointer-events-none" />
    </div>
  );
}
