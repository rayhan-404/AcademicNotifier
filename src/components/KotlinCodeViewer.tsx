import React, { useState } from 'react';
import { kotlinFiles } from '../data/kotlinCode';

interface KotlinCodeViewerProps {
  onToast: (msg: string) => void;
}

export default function KotlinCodeViewer({ onToast }: KotlinCodeViewerProps) {
  const [selectedFile, setSelectedFile] = useState<number>(0);
  const [copiedFileIndex, setCopiedFileIndex] = useState<number | null>(null);

  const activeFile = kotlinFiles[selectedFile];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopiedFileIndex(selectedFile);
    onToast(`Copied ${activeFile.name} to clipboard!`);
    setTimeout(() => setCopiedFileIndex(null), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-xl overflow-hidden min-h-[720px]">
      {/* Tab panel header */}
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-green-400 text-[20px]">code</span>
              Kotlin Native Code Converter
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Jetpack Compose equivalents for the provided university companion design
          </p>
        </div>

        {/* Copy current file button */}
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-bold text-slate-200 transition-all border border-slate-750 active:scale-95 shrink-0 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[16px]">
            {copiedFileIndex === selectedFile ? 'assignment_turned_in' : 'content_copy'}
          </span>
          {copiedFileIndex === selectedFile ? 'Copied Code!' : 'Copy Code'}
        </button>
      </div>

      {/* Main split tab screen */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Left Side File Selector */}
        <div className="w-full lg:w-64 bg-slate-950/40 border-b lg:border-b-0 lg:border-r border-slate-800 flex lg:flex-col overflow-x-auto lg:overflow-y-auto no-scrollbar shrink-0 p-3 gap-1.5">
          {kotlinFiles.map((file, idx) => {
            const isSelected = idx === selectedFile;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFile(idx)}
                className={`w-full text-left px-3.5 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap lg:whitespace-normal shrink-0 lg:shrink ${
                  isSelected
                    ? 'bg-slate-800/80 border border-slate-700 shadow text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                }`}
              >
                <span className="material-symbols-outlined text-green-500 text-[18px]">
                  {file.name.endsWith('Theme.kt') ? 'palette' : 'text_snippet'}
                </span>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-xs truncate">{file.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium hidden lg:block truncate mt-0.5">
                    {file.name.replace('.kt', '')}
                  </span>
                </div>
              </button>
            );
          })}

          <div className="hidden lg:block mt-auto space-y-3">
            <div className="p-3 bg-slate-900/30 rounded-xl border border-slate-800/50">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Conversion Rules
              </span>
              <p className="text-[10px] text-slate-500 leading-normal">
                HTML Neumorphic shadow classes map to the drawn Paint shadow configurations defined in <code className="text-green-400 font-mono">NeumorphicTheme.kt</code>.
              </p>
            </div>

            <div className="p-3.5 bg-green-950/25 rounded-xl border border-green-900/40 text-left">
              <span className="text-[11px] font-extrabold text-green-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <span className="material-symbols-outlined text-[15px] font-bold">folder_zip</span>
                Android Studio Project Ready
              </span>
              <p className="text-[10.5px] text-slate-300 leading-relaxed mb-2.5">
                A fully-structured, compiling Android Studio Gradle project has been built in your workspace folder at <code className="text-green-400 font-mono">/android-app</code>.
              </p>
              <button
                onClick={() => onToast('Select Export -> ZIP or push to GitHub in the Settings menu to download your project!')}
                className="w-full py-1.5 px-3 rounded-lg bg-green-700 hover:bg-green-650 active:scale-[0.98] transition-all text-[10.5px] font-bold text-white flex items-center justify-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-[14px]">download</span>
                How to Download Project
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Code Window */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
          {/* File description card */}
          <div className="p-4 bg-slate-950/20 border-b border-slate-800/50 flex flex-col gap-1.5 text-left">
            <span className="text-[11px] font-bold text-green-400 uppercase tracking-wider">
              File Architecture: {activeFile.name}
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              {activeFile.description}
            </p>
          </div>

          {/* Scrolling code box */}
          <div className="flex-1 overflow-auto p-5 font-mono text-xs text-left bg-slate-950/30 no-scrollbar max-h-[460px] lg:max-h-none">
            <pre className="text-slate-300 whitespace-pre leading-relaxed select-text">
              {activeFile.code}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
