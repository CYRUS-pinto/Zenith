"use client";

import { useSDGStore } from '@/services/storage/sdg-store';
import { Users, CheckCircle2, Circle, Clock } from 'lucide-react';

export function ClassroomRadar() {
  const { studentProgress, currentRoadmap } = useSDGStore();

  if (!currentRoadmap) return null;

  return (
    <div className="p-8 bg-slate-900 border border-white/5 rounded-[2.5rem] space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black uppercase italic tracking-tighter text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" />
            Classroom Radar
          </h3>
          <p className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Global Student Completion Rates</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">Live Sync Alpha</span>
        </div>
      </div>

      <div className="space-y-6">
        {currentRoadmap.modules.map((mod, idx) => {
          const progress = studentProgress.find(p => p.moduleId === mod.id);
          const isCompleted = progress?.status === 'COMPLETED';
          const isUnlocked = progress?.status === 'UNLOCKED';

          return (
            <div key={mod.id} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {mod.title}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                  {isCompleted ? '100% Sync' : isUnlocked ? 'In Progress' : '0% Locked'}
                </span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${
                    isCompleted ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 
                    isUnlocked ? 'bg-emerald-500/30' : 'bg-transparent'
                  }`}
                  style={{ width: isCompleted ? '100%' : isUnlocked ? '45%' : '0%' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 flex items-center space-x-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <div className="space-y-0.5">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Avg Completion</p>
            <p className="text-sm font-black text-white italic">78.4%</p>
          </div>
        </div>
        <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 flex items-center space-x-3">
          <Clock className="w-4 h-4 text-amber-500" />
          <div className="space-y-0.5">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Time</p>
            <p className="text-sm font-black text-white italic">14.2m</p>
          </div>
        </div>
      </div>
    </div>
  );
}
