"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
}

export function CodeEditor({ value, onChange, language = "python" }: CodeEditorProps) {
  return (
    <div className="h-full w-full bg-[#030712] border-beam relative overflow-hidden">
      <div className="h-12 bg-slate-950/50 flex items-center px-6 border-b border-white/5 justify-between relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-amber-500/50" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
          <span className="ml-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
            {language.toUpperCase()} Sandbox v1.0
          </span>
        </div>
        <div className="px-3 py-1 bg-emerald-500/10 rounded-full">
           <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">Auto-Save Active</span>
        </div>
      </div>
      <Editor
        height="100%"
        defaultLanguage={language}
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
          padding: { top: 20 }
        }}
      />
    </div>
  );
}
