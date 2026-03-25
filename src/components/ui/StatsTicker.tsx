"use client";

import { motion } from 'framer-motion';

export function StatsTicker() {
  const stats = [
    "SYSTEM STATUS: OPTIMIZED",
    "ACTIVE NODES: 1,240",
    "GLOBAL IMPACT: HIGH",
    "SYNC: STABLE",
    "AGENTIC CORES: ACTIVE",
    "ECC_HOOK: STRICT",
  ];

  return (
    <div className="w-full h-8 bg-emerald-500/5 border-b border-white/5 overflow-hidden flex items-center relative z-40">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center space-x-4 mx-8">
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-emerald-500/50 italic">{stat}</span>
            <div className="w-1 h-1 bg-emerald-500/20 rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
