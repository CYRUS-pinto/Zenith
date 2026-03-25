"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeatmapProps {
  studentsCount?: number;
}

export function ClassroomHeatmap({ studentsCount = 20 }: HeatmapProps) {
  const [data, setData] = useState<{ id: number; progress: number }[]>([]);

  useEffect(() => {
    // Generate data only on client to avoid hydration mismatch
    setData(Array.from({ length: studentsCount }).map((_, i) => ({
      id: i,
      progress: Math.floor(Math.random() * 100),
    })));
  }, [studentsCount]);

  if (data.length === 0) return <div className="h-48 flex items-center justify-center text-[10px] text-slate-500 uppercase tracking-widest italic">Initializing Telemetry...</div>;

  return (
    <div className="p-8 bg-slate-900 border border-white/5 rounded-[3rem] space-y-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Classroom Radar</h3>
        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 italic">Sequential Telemetry</span>
      </div>
      
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        {data.map((student) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative"
          >
            <div 
              className={`w-full aspect-square rounded-lg border border-white/5 transition-all duration-700 ${
                student.progress > 80 ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' :
                student.progress > 40 ? 'bg-emerald-500/40 border-emerald-500/20' :
                'bg-slate-950/50'
              }`}
            />
            
            {/* Tooltip-like effect */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-slate-950 border border-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-2xl">
               <span className="text-[8px] font-black text-white whitespace-nowrap">ID_{student.id} | {student.progress}%</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-600 px-2 italic">
        <span>Idle</span>
        <span>Active</span>
        <span>Impact Ready</span>
      </div>
    </div>
  );
}
