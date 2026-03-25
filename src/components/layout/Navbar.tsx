"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Globe, Activity } from 'lucide-react';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-3 glass rounded-full flex items-center space-x-12 shadow-2xl shadow-emerald-500/10 border-white/10"
    >
      <Link href="/" className="flex items-center space-x-3 group">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <span className="text-[10px] uppercase font-black tracking-widest text-white group-hover:text-emerald-500 transition-colors">Sustain-Ability</span>
      </Link>

      <div className="flex items-center space-x-8">
        <Link href="/teacher" className="uppercase-label text-slate-400 hover:text-white transition-colors">Architect</Link>
        <Link href="/student" className="uppercase-label text-slate-400 hover:text-white transition-colors">Sandbox</Link>
      </div>

      <div className="flex items-center space-x-4 pl-8 border-l border-white/10">
        <div className="flex items-center space-x-2">
           <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
           <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">OS v1.0.4</span>
        </div>
      </div>
    </motion.nav>
  );
}
