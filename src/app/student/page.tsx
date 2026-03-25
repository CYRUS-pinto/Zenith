"use client";

import { useState, useEffect } from 'react';
import { 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Zap,
  Target,
  Wind,
  Layers,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSDGStore } from '@/services/storage/sdg-store';
import { CodeEditor } from '@/components/student/CodeEditor';
import { MergeManager } from '@/lib/MergeManager';
import { DigitalTwin } from '@/components/student/DigitalTwin';
import { ExecutionSandbox } from '@/components/student/ExecutionSandbox';
import { firebaseService } from '@/services/firebase/firebase-service';
import { Navbar } from '@/components/layout/Navbar';
import { StatsTicker } from '@/components/ui/StatsTicker';

export default function StudentLab() {
  const { currentRoadmap, setRoadmap, studentProgress, updateProgress, unlockNextModule } = useSDGStore();
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [localCode, setLocalCode] = useState('');
  const [showMerge, setShowMerge] = useState(false);
  const [isMerging, setIsMerging] = useState(false);

  // Sync with Firebase
  useEffect(() => {
    const unsubscribe = firebaseService.subscribeToRoadmap('global-class', (roadmap) => {
      setRoadmap(roadmap);
    });
    return () => unsubscribe();
  }, [setRoadmap]);

  // Initialize first module
  useEffect(() => {
    if (currentRoadmap && currentRoadmap.modules.length > 0 && !activeModuleId) {
      setActiveModuleId(currentRoadmap.modules[0].id);
      const initialProgress = studentProgress.find(p => p.moduleId === currentRoadmap.modules[0].id);
      setLocalCode(initialProgress?.savedCode || '');
    }
  }, [currentRoadmap, activeModuleId, studentProgress]);

  // Update local code when switching modules
  useEffect(() => {
    if (activeModuleId) {
      const p = studentProgress.find(p => p.moduleId === activeModuleId);
      setLocalCode(p?.savedCode || '');
    }
  }, [activeModuleId, studentProgress]);

  const handleVerifySuccess = (success: boolean) => {
    if (success && activeModuleId) {
      updateProgress(activeModuleId, 'COMPLETED', localCode);
      unlockNextModule(activeModuleId);
    }
  };

  const handleFinalMerge = () => {
    setIsMerging(true);
    setTimeout(() => {
      setShowMerge(true);
      setIsMerging(false);
    }, 3000);
  };

  const activeModule = currentRoadmap?.modules.find(m => m.id === activeModuleId);
  const completionPercentage = currentRoadmap ? 
    Math.round((studentProgress.filter(p => p.status === 'COMPLETED').length / currentRoadmap.modules.length) * 100) : 0;

  if (!currentRoadmap) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-12 overflow-hidden relative">
        <div className="text-center space-y-8 relative z-10">
          <div className="w-20 h-20 border border-white/5 rounded-3xl flex items-center justify-center mx-auto animate-pulse bg-slate-900/50">
            <Cpu className="w-10 h-10 text-emerald-500" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">Waiting for Manifest.</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-relaxed max-w-xs mx-auto text-center italic">
              Your Teacher Architect is currently synthesizing the Elite SDG Roadmap. 
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30 overflow-hidden flex flex-col">
      <StatsTicker />
      <Navbar />

      <div className="flex-1 flex pt-24 overflow-hidden">
        
        {/* Left Module Sidebar (Bento OS Style) */}
        <aside className="w-96 border-r border-white/5 bg-slate-950/30 p-10 space-y-12 overflow-y-auto">
          <div className="space-y-1">
             <div className="flex items-center space-x-2 text-emerald-500 mb-2">
                <Target className="w-4 h-4" />
                <span className="uppercase-label">Instructional Nodes</span>
             </div>
             <h3 className="text-2xl font-black italic tracking-tighter uppercase">{currentRoadmap.courseTitle}</h3>
             <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] italic">Progress Matrix: {completionPercentage}% Balanced</p>
          </div>

          <div className="space-y-4">
            {currentRoadmap.modules.map((mod, idx) => {
              const progress = studentProgress.find(p => p.moduleId === mod.id);
              const isLocked = progress?.status === 'LOCKED';
              const isActive = activeModuleId === mod.id;

              return (
                <button
                  key={mod.id}
                  disabled={isLocked}
                  onClick={() => setActiveModuleId(mod.id)}
                  className={`w-full p-6 text-left rounded-3xl transition-all border group relative ${
                    isActive ? 'bg-emerald-500/5 border-emerald-500/50 shadow-2xl shadow-emerald-500/10' : 
                    isLocked ? 'opacity-30 cursor-not-allowed border-white/5 bg-transparent' : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-emerald-500' : 'text-slate-600'}`}>NODE_0{idx+1}</span>
                      {progress?.status === 'COMPLETED' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : 
                       isLocked ? <Target className="w-3 h-3 text-slate-800" /> : <Wind className="w-3 h-3 text-blue-500" />}
                    </div>
                    <h4 className={`text-xs font-black italic uppercase leading-tight ${isActive ? 'text-white' : 'text-slate-400'}`}>{mod.title}</h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Impact Gauge Ticker at footer of sidebar */}
          <div className="pt-12">
             <div className="p-6 glass border-emerald-500/10 bg-emerald-500/[0.02] space-y-4">
                <span className="uppercase-label text-emerald-500/50">Entropy Gauge</span>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${completionPercentage}%` }}
                     className="h-full bg-emerald-500"
                   />
                </div>
                <p className="text-[8px] font-black uppercase tracking-widest text-slate-600 text-center italic">Ready for Final Merge</p>
             </div>
          </div>
        </aside>

        {/* Center Sandbox Area (Bento OS Style) */}
        <main className="flex-1 flex overflow-hidden">
          
          {/* Main Editor Center */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-white/5 bg-slate-950/40 relative">
             <div className="h-16 border-b border-white/5 flex items-center justify-between px-10 bg-slate-950/50 relative z-10 shrink-0">
                <div className="flex items-center space-x-3 text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                  <span className="text-[10px] font-black uppercase tracking-widest font-mono italic">Sandbox: Manifesting Logic</span>
                </div>
                {completionPercentage === 100 && (
                   <button 
                     onClick={handleFinalMerge}
                     className="h-9 px-6 bg-white text-slate-950 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center space-x-2"
                   >
                     <Zap className="w-3 h-3 fill-current" />
                     <span>Final Merge</span>
                   </button>
                )}
             </div>

             <div className="flex-1 relative">
                <CodeEditor value={localCode} onChange={setLocalCode} />
             </div>
          </div>

          {/* Right Column: Execution & Feedback (Bento OS Style) */}
          <aside className="w-[480px] flex flex-col bg-slate-950 overflow-hidden relative">
             
             {/* Dynamic Feed / Digital Twin Bento Card */}
             <div className="flex-1 h-3/5 border-b border-white/5 overflow-hidden">
                <DigitalTwin completionPercentage={completionPercentage} />
             </div>

             {/* Execution Sandbox / Console Bento Card */}
             <div className="flex-1 h-2/5 min-h-[300px]">
                <ExecutionSandbox code={localCode} onVerify={handleVerifySuccess} />
             </div>

          </aside>
        </main>
      </div>

      {/* Persistence / Status Bar */}
      <footer className="h-10 border-t border-white/5 flex items-center justify-between px-10 bg-slate-950 shrink-0 z-30">
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 italic">Sync Active: NODE_ARCHITECT_v4</span>
             </div>
          </div>
          <div className="flex items-center space-x-6">
             <span className="text-[8px] font-black uppercase tracking-widest text-slate-700 italic">Auth: CYRUS_ELITE</span>
             <span className="text-[8px] font-black uppercase tracking-widest text-slate-700 italic">Context: 24%</span>
          </div>
      </footer>

      {/* Final Merge Modal */}
      <AnimatePresence>
        {showMerge && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-12"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-5xl h-full max-h-[800px] glass border-emerald-500/20 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="h-24 border-b border-white/5 px-16 flex items-center justify-between bg-slate-950/50">
                <div className="space-y-1">
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">THE <span className="text-emerald-500">MANIFESTO.</span></h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">Verified SDG_LOGIC_BLOCK_049</p>
                </div>
                <button 
                  onClick={() => setShowMerge(false)}
                  className="w-12 h-12 rounded-full glass hover:bg-white hover:text-slate-950 transition-all group"
                >
                  <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              <div className="flex-1 p-16 overflow-y-auto bg-slate-950/20">
                <div className="p-12 glass border-white/5 shadow-inner relative group bg-slate-950/50">
                  <pre className="text-xs font-mono text-slate-400 leading-relaxed selection:bg-emerald-500/30">
                    {MergeManager.mergeImpactArtifact(currentRoadmap, studentProgress)}
                  </pre>
                  <div className="absolute top-10 right-10 flex items-center space-x-3 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full scale-75 lg:scale-100 origin-right transition-transform">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic">Impact Ledger Ready</span>
                  </div>
                </div>
              </div>
              <div className="h-24 border-t border-white/5 px-16 flex items-center justify-between shrink-0 bg-slate-950 uppercase-label text-slate-500">
                <span>Verification ID: {currentRoadmap.id.toUpperCase()}</span>
                <button className="h-12 px-12 bg-emerald-500 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
                  Publish Logic
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
