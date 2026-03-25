"use client";

import { motion } from 'framer-motion';
import { Leaf, Droplets, CloudRain, Sun } from 'lucide-react';

interface DigitalTwinProps {
  completionPercentage: number;
}

export function DigitalTwin({ completionPercentage }: DigitalTwinProps) {
  return (
    <div className="w-full h-full p-8 flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
      
      {/* Dynamic Background Pulse */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1 + (completionPercentage / 200), 1],
          opacity: [0.1, 0.2 + (completionPercentage / 500), 0.1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-blue-500/20 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Animated Icon Cluster */}
        <div className="relative">
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="w-32 h-32 border border-blue-500/10 rounded-full flex items-center justify-center"
           >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Leaf className={`w-4 h-4 transition-colors duration-1000 ${completionPercentage > 30 ? 'text-emerald-500' : 'text-slate-700'}`} />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rotate-180">
                <Droplets className={`w-4 h-4 transition-colors duration-1000 ${completionPercentage > 60 ? 'text-blue-500' : 'text-slate-700'}`} />
              </div>
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 rotate-270">
                <Sun className={`w-4 h-4 transition-colors duration-1000 ${completionPercentage > 90 ? 'text-amber-500' : 'text-slate-700'}`} />
              </div>
           </motion.div>

           <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  filter: completionPercentage > 0 ? "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))" : "none"
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner"
              >
                <CloudRain className={`w-8 h-8 transition-colors duration-1000 ${completionPercentage > 0 ? 'text-blue-500' : 'text-slate-700'}`} />
              </motion.div>
           </div>
        </div>

        <div className="text-center space-y-1">
          <p className="text-3xl font-black italic tracking-tighter text-white">{completionPercentage}%</p>
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-500 leading-none italic">Entropy Balance</p>
        </div>
      </div>

      <div className="w-full h-[60px] bg-slate-950/50 border border-white/5 rounded-2xl p-4 mt-auto relative z-10 flex items-center space-x-3">
         <div className="w-1 h-full bg-blue-500/20 rounded-full" />
         <div className="flex-1 space-y-1">
            <p className="text-[7px] font-black uppercase text-slate-500 leading-none">Telemetry Output</p>
            <p className="text-[9px] font-bold text-white truncate leading-none">
              {completionPercentage === 0 ? "Waiting for manifest signals..." : 
               completionPercentage < 100 ? "Sequential logic merging..." : 
               "Ecosystem Impact Ready."}
            </p>
         </div>
      </div>
    </div>
  );
}
