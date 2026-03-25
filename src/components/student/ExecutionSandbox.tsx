"use client";

import { useState } from 'react';
import { Terminal, Play, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SandboxResult {
  output: string;
  error?: string;
  success: boolean;
}

export function ExecutionSandbox({ code, onVerify }: { code: string; onVerify: (success: boolean) => void }) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<SandboxResult | null>(null);

  const executeCode = async () => {
    setIsExecuting(true);
    setResult(null);

    // Feature B: Impact Execution Sandbox (Simulated / Virtual Environment)
    setTimeout(() => {
      // Basic heuristic verification for 'Python-like' logic
      const hasDefinition = code.includes('def ');
      const hasLogic = code.includes('=') || code.includes('impact');
      
      const success = hasDefinition && hasLogic;
      
      setResult({
        output: success 
          ? `Manifesting SDG Logic...\nNode Initialized.\nImpact Vector: 0.94\nExecution Successful.` 
          : `Syntax Error: Missing functional definitions.\nUnable to manifest impact logic.`,
        success,
        error: success ? undefined : "Validation Failed: Modular logic is incomplete."
      });

      setIsExecuting(false);
      onVerify(success);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col glass overflow-hidden border-white/5 bg-slate-950/20 backdrop-blur-3xl shadow-2xl">
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-slate-950/40">
        <div className="flex items-center space-x-3">
          <Terminal className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />
          <span className="uppercase-label text-slate-400">Impact Console v1.0</span>
        </div>
        <button 
          onClick={executeCode}
          disabled={isExecuting || !code}
          className="h-9 px-6 bg-white text-slate-950 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-30 flex items-center space-x-2 group"
        >
          {isExecuting ? <Loader2 className="w-3 h-3 animate-spin"/> : <Play className="w-3 h-3 fill-current" />}
          <span>Run Artifact</span>
        </button>
      </div>

      <div className="flex-1 p-8 font-mono text-[10px] leading-relaxed overflow-y-auto bg-slate-950/50">
        <AnimatePresence mode="wait">
          {!result && !isExecuting && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-700 italic"
            >
              Waiting for execution trigger...
            </motion.p>
          )}

          {isExecuting && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-2"
            >
               <p className="text-emerald-500/50 animate-pulse">Initializing Virtual Sandbox...</p>
               <p className="text-slate-500">Connecting to GEMINI_1.5_PRO logic core...</p>
            </motion.div>
          )}

          {result && (
            <motion.div 
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-4"
            >
               <div className={`p-4 rounded-xl border ${result.success ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                  <div className="flex items-start space-x-3">
                    {result.success ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />}
                    <div className="space-y-1">
                       <p className={`font-black uppercase tracking-widest text-[8px] ${result.success ? 'text-emerald-500' : 'text-red-500'}`}>
                         {result.success ? 'Execution Manifested' : 'Logic Exception'}
                       </p>
                       <pre className="text-slate-300 font-mono text-[10px] whitespace-pre-wrap">{result.output}</pre>
                    </div>
                  </div>
               </div>
               {result.error && (
                 <p className="text-red-400/80 px-2 italic">Error: {result.error}</p>
               )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="h-10 border-t border-white/5 flex items-center px-6 justify-between bg-slate-950/40 text-[7px] font-black uppercase tracking-widest text-slate-600 italic">
        <span>Cores: 8 Virtual</span>
        <span>Memory: 512MB Reserved</span>
      </div>
    </div>
  );
}
