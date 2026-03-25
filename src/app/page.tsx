"use client";

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { StatsTicker } from '@/components/ui/StatsTicker';
import { Rocket, Shield, Cpu, Zap, ChevronRight, Globe, Layers, Activity } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden selection:bg-emerald-500/30">
      <StatsTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10 space-y-24">
        
        {/* Elite OS Hero Section */}
        <section className="text-center space-y-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
             <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-4 group cursor-default">
                <Zap className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 italic">2026 Sustainable Tech Standard</span>
             </div>
             
             <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9]">
               AGENTIC <br />
               <span className="bg-gradient-to-r from-emerald-500 to-sky-400 bg-clip-text text-transparent animate-gradient-shift">
                 EDUCATION.
               </span>
             </h1>
             
             <p className="max-w-2xl mx-auto text-slate-400 font-medium text-lg leading-relaxed">
               Transitioning curriculum design into an elite dual-portal ecosystem. <br />
               <span className="text-white/60 font-mono text-sm tracking-tight">Vercel Standard Hub for SDG Modular Synthesis.</span>
             </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-6"
          >
             <Link href="/teacher" className="group h-14 px-10 bg-white text-slate-950 rounded-2xl flex items-center space-x-3 font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-white/5">
                <span>Architect Mode</span>
                <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </Link>
             <Link href="/student" className="group h-14 px-10 glass rounded-2xl flex items-center space-x-3 font-black text-xs uppercase tracking-widest hover:border-white/20 transition-all">
                <span>Sandbox Entry</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </motion.div>
        </section>

        {/* Dynamic Bento Grid Layout */}
        <section className="grid grid-cols-12 gap-6 pb-24">
          
          {/* Main Architect Feature - Large Bento Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-7 h-[480px] glass p-12 flex flex-col justify-between group border-beam cursor-default"
          >
             <div className="space-y-4">
                <Globe className="w-10 h-10 text-emerald-500 mb-6" />
                <h3 className="text-4xl font-black tracking-tighter italic">Teacher Architect.</h3>
                <p className="text-slate-400 leading-relaxed max-w-sm">
                  AI-driven modular synthesis for SDG curriculum design. Generate high-fidelity Python roadmaps in seconds.
                </p>
             </div>
             <div className="flex items-center space-x-4 pt-8">
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-900 flex items-center justify-center">
                        <span className="text-[8px] font-bold">0{i}</span>
                     </div>
                   ))}
                </div>
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">2,400+ Active Curriculums</span>
             </div>
          </motion.div>

          {/* Sandbox Feature - Small Bento Card */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="col-span-12 lg:col-span-5 h-[480px] glass p-12 flex flex-col bg-emerald-500/5 group hover:bg-emerald-500/[0.08] transition-colors overflow-hidden relative"
          >
             <div className="space-y-4 relative z-10">
                <Cpu className="w-10 h-10 text-emerald-500 mb-6" strokeWidth={1.5} />
                <h3 className="text-4xl font-black tracking-tighter italic">Modular Lab.</h3>
                <p className="text-slate-400 leading-relaxed">
                  Deep immersion sandbox with Monaco Editor and real-time Digital Twin telemetry feedback.
                </p>
             </div>
             <div className="mt-12 group-hover:scale-110 transition-transform duration-1000">
                <div className="w-full aspect-video bg-slate-950 rounded-2xl border border-white/5 relative overflow-hidden p-4">
                   <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                   </div>
                   <div className="space-y-2">
                      <div className="h-1 w-3/4 bg-white/10 rounded-full" />
                      <div className="h-1 w-1/2 bg-white/10 rounded-full" />
                      <div className="h-1 w-2/3 bg-emerald-500/20 rounded-full" />
                   </div>
                </div>
             </div>
             
             <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-emerald-500/10 blur-[80px]" />
          </motion.div>

          {/* System Telemetry - Bottom Wide Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 glass p-10 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0"
          >
             <div className="flex items-center space-x-8">
                <div className="space-y-1">
                   <p className="text-[10px] uppercase font-black tracking-widest text-emerald-500">Global Impact</p>
                   <p className="text-3xl font-black italic tracking-tighter leading-none">HIGH_ENTROPY</p>
                </div>
                <div className="w-[1px] h-12 bg-white/10 hidden md:block" />
                <div className="space-y-1">
                   <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Active SDK</p>
                   <p className="text-3xl font-black italic tracking-tighter leading-none font-mono">GEMINI_1.5_PRO</p>
                </div>
             </div>

             <div className="flex items-center space-x-12">
                <div className="flex items-center space-x-3">
                   <Activity className="w-4 h-4 text-emerald-500" />
                   <span className="font-mono text-[10px] text-slate-400">LATENCY: 12ms</span>
                </div>
                <div className="flex items-center space-x-3">
                   <Layers className="w-4 h-4 text-emerald-500" />
                   <span className="font-mono text-[10px] text-slate-400">NODES: 1,240</span>
                </div>
             </div>
          </motion.div>

        </section>
      </main>

      {/* Background Gradient Decorative orbs */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-sky-500/5 blur-[120px] pointer-events-none rounded-full" />
    </div>
  );
}
