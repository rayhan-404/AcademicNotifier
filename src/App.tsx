import React, { useState } from 'react';
import { TabType } from './types';
import AppPreview from './components/AppPreview';
import KotlinCodeViewer from './components/KotlinCodeViewer';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('routine');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'kotlin'>('preview');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col antialiased text-on-surface">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-5 py-2.5 rounded-full font-semibold text-xs shadow-2xl z-50 animate-bounce border border-slate-700 flex items-center gap-2">
          <span className="material-symbols-outlined text-green-400 text-[18px]">verified</span>
          {toastMessage}
        </div>
      )}

      {/* Main Top Header Banner */}
      <div className="w-full bg-surface border-b border-surface-container py-5 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-surface shadow-[-4px_-4px_10px_rgba(255,255,255,0.95),4px_4px_10px_rgba(163,177,198,0.5)] flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[32px]">smartphone_cool</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight">UniSync Design Workstation</h1>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-[10px] tracking-wide">
                  WEB & KOTLIN CO-PREVIEW
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                Full pixel-perfect conversion of the HTML academic companion layout to standard native Android Jetpack Compose code.
              </p>
            </div>
          </div>

          {/* Toggle buttons for small screens */}
          <div className="flex items-center p-1 bg-surface-container-low rounded-xl md:hidden">
            <button
              onClick={() => setViewMode('preview')}
              className={`flex-1 py-1.5 px-4 rounded-lg font-bold text-xs transition-all ${
                viewMode === 'preview'
                  ? 'bg-surface text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              📱 Preview
            </button>
            <button
              onClick={() => setViewMode('kotlin')}
              className={`flex-1 py-1.5 px-4 rounded-lg font-bold text-xs transition-all ${
                viewMode === 'kotlin'
                  ? 'bg-surface text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              💻 Kotlin Code
            </button>
          </div>
        </div>
      </div>

      {/* Main split work area */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-stretch min-h-0">
        {/* LEFT COMPONENT: Smartphone Iframe Simulator */}
        <div className={`flex-1 lg:flex-none lg:w-[450px] flex flex-col items-center justify-center ${viewMode === 'preview' ? 'block' : 'hidden md:block'}`}>
          <div className="w-full">
            <div className="hidden lg:block text-center mb-4">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                Interactive Companion Simulation
              </span>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Switch tabs and toggle alarm triggers to test real-time states!
              </p>
            </div>
            
            <AppPreview
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onToast={triggerToast}
            />
          </div>
        </div>

        {/* RIGHT COMPONENT: Native Kotlin Conversion Panels */}
        <div className={`flex-1 min-w-0 ${viewMode === 'kotlin' ? 'block' : 'hidden md:block'}`}>
          <div className="h-full flex flex-col justify-center">
            <div className="hidden lg:block mb-4">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block text-left">
                Native Android Kotlin Architecture
              </span>
              <p className="text-xs text-on-surface-variant mt-0.5 text-left">
                Production-ready code matching the Neumorphic styling tokens precisely.
              </p>
            </div>
            <KotlinCodeViewer onToast={triggerToast} />
          </div>
        </div>
      </div>
    </div>
  );
}
