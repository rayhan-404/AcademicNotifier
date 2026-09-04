import React, { useState, useEffect } from 'react';
import { TabType, ClassItem, CommunityPost, LeaderboardUser } from '../types';

interface AppPreviewProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onToast: (msg: string) => void;
}

export default function AppPreview({ activeTab, setActiveTab, onToast }: AppPreviewProps) {
  // ---- ROUTINE SCREEN STATE ----
  const [selectedDay, setSelectedDay] = useState<string>('Wed 23');
  const [copied, setCopied] = useState<boolean>(false);

  // ---- TIMER SCREEN STATE ----
  const [timeLeft, setTimeLeft] = useState<number>(4 * 60 + 28);
  const totalSeconds = 4 * 60 + 28;
  const timerPercentage = Math.min(100, Math.max(0, (timeLeft / totalSeconds) * 100));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 4 * 60 + 28; // Reset to simulate continuous clock
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')} : ${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
  };

  // ---- ALERTS SCREEN STATE ----
  const [overrideSilent, setOverrideSilent] = useState<boolean>(true);
  const [timingPills, setTimingPills] = useState({
    min30: false,
    min15: true,
    min5: true,
    atStart: false
  });
  const [stage2Active, setStage2Active] = useState<boolean>(true);
  const [stage3Active, setStage3Active] = useState<boolean>(true);
  const [batteryOptimization, setBatteryOptimization] = useState<boolean>(true);
  const [offlineScheduler, setOfflineScheduler] = useState<boolean>(true);

  // ---- COMMUNITY SCREEN STATE ----
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All Topics');
  const [helpfulCount, setHelpfulCount] = useState<number>(12);
  const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);
  const [starRating, setStarRating] = useState<number>(5);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CSE-21B');
    setCopied(true);
    onToast('Copied cohort stream code "CSE-21B"!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpvote = () => {
    if (hasUpvoted) {
      setHelpfulCount(prev => prev - 1);
      setHasUpvoted(false);
    } else {
      setHelpfulCount(prev => prev + 1);
      setHasUpvoted(true);
      onToast('Doubt upvoted! Thank you for supporting peer solutions.');
    }
  };

  return (
    <div className="w-full flex justify-center py-6 px-2 bg-surface select-none">
      {/* Smartphone frame container */}
      <div className="w-full max-w-[420px] bg-surface rounded-[40px] overflow-hidden flex flex-col relative border-8 border-surface-container shadow-[-16px_-16px_36px_rgba(255,255,255,0.95),16px_16px_36px_rgba(163,177,198,0.5)] min-h-[820px]">
        {/* Dynamic Notch / Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-on-background rounded-b-2xl z-50 flex items-center justify-around px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
          <div className="w-12 h-1.5 bg-slate-950 rounded-full"></div>
          <div className="w-2 h-2 rounded-full bg-blue-900/50"></div>
        </div>

        {/* Status Bar */}
        <div className="pt-7 px-6 pb-1.5 flex items-center justify-between text-[10px] font-bold text-on-surface-variant z-40 select-none bg-surface">
          <span>09:41 AM</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[13px]">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-[13px]">wifi</span>
            <span className="material-symbols-outlined text-[15px]">battery_6_bar</span>
          </div>
        </div>

        {/* --- HEADER --- */}
        <header className="pt-2 px-5 pb-3 bg-surface shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_4px_12px_rgba(163,177,198,0.35)] z-40">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Neumorphic logo mark */}
              <div className="p-1 rounded-xl bg-surface shadow-[-3px_-3px_7px_rgba(255,255,255,0.95),3px_3px_7px_rgba(163,177,198,0.5)] flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  school
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-headline-sm text-headline-sm text-on-surface leading-none font-extrabold">UniSync</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-[10px] font-bold flex items-center gap-0.5 shadow-[-2px_-2px_4px_rgba(255,255,255,0.8),2px_2px_4px_rgba(163,177,198,0.4)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                    Live
                  </span>
                </div>
                <span className="font-label-sm text-[11px] text-on-surface-variant font-medium capitalize">
                  {activeTab === 'routine' ? 'Routine' : activeTab === 'timer' ? 'Timer' : activeTab === 'alerts' ? 'Alerts Pipeline' : 'Community Hub'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToast('Notifications are synced with CR channel')}
                aria-label="Notifications"
                className="w-10 h-10 rounded-full bg-surface shadow-[-3px_-3px_7px_rgba(255,255,255,0.95),3px_3px_7px_rgba(163,177,198,0.5)] active:shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">notifications</span>
              </button>
              <div className="w-10 h-10 rounded-full p-0.5 bg-surface shadow-[-3px_-3px_7px_rgba(255,255,255,0.95),3px_3px_7px_rgba(163,177,198,0.5)] flex items-center justify-center">
                <div className="w-full h-full rounded-full p-0.5 bg-gradient-to-tr from-primary to-tertiary-container flex items-center justify-center">
                  <img
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- MAIN SCROLL CONTENT --- */}
        <main className="flex-1 bg-surface overflow-y-auto px-4 py-4 pb-24 no-scrollbar max-h-[660px]">
          {/* ==============================================
              ROUTINE TAB
              ============================================== */}
          {activeTab === 'routine' && (
            <div className="flex flex-col gap-4">
              {/* CR Sync Banner */}
              <section className="rounded-xl p-4 bg-surface shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)]">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                      <span className="font-label-sm text-[11px] font-bold text-on-secondary-fixed">CR Sync Live</span>
                    </div>
                    <span className="font-body-sm text-[12px] text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">sync</span>
                      Synced 15m ago
                    </span>
                  </div>

                  {/* Cohort Code */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">school</span>
                      <div>
                        <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider block">Cohort Stream</span>
                        <span className="font-headline-sm text-headline-sm text-primary tracking-wide">CSE-21B</span>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="w-9 h-9 rounded-lg bg-surface shadow-[-3px_-3px_6px_rgba(255,255,255,0.9),3px_3px_6px_rgba(163,177,198,0.5)] active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6)] flex items-center justify-center text-on-surface-variant hover:text-primary transition-all"
                    >
                      <span className={`material-symbols-outlined text-[18px] ${copied ? 'text-secondary font-bold' : ''}`}>
                        {copied ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>

                  {/* Broadcast row */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => onToast('Broadcast trigger available only for batch CR office')}
                      className="py-2 px-3 rounded-xl bg-surface shadow-[-4px_-4px_8px_rgba(255,255,255,0.9),4px_4px_8px_rgba(163,177,198,0.45)] active:shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5)] flex items-center justify-center gap-1.5 transition-all text-on-surface hover:translate-y-[-1px]"
                    >
                      <span className="w-6 h-6 rounded-lg bg-tertiary flex items-center justify-center text-on-tertiary shadow-[0px_4px_8px_rgba(107,56,212,0.35)]">
                        <span className="material-symbols-outlined text-[13px]">campaign</span>
                      </span>
                      <span className="font-label-md text-[12px] font-bold">Broadcast</span>
                    </button>
                    <button
                      onClick={() => onToast('Opening CR collaboration hub')}
                      className="py-2 px-3 rounded-xl bg-surface shadow-[-4px_-4px_8px_rgba(255,255,255,0.9),4px_4px_8px_rgba(163,177,198,0.45)] active:shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5)] flex items-center justify-center gap-1.5 transition-all text-on-surface hover:translate-y-[-1px]"
                    >
                      <span className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-[0px_4px_8px_rgba(0,88,190,0.35)]">
                        <span className="material-symbols-outlined text-[13px]">hub</span>
                      </span>
                      <span className="font-label-md text-[12px] font-bold">CR Hub</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Day Selector Strip */}
              <section className="space-y-2">
                <div className="p-1 rounded-full bg-surface shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] flex items-center justify-between">
                  <button className="flex-1 py-1.5 rounded-full font-label-md text-[12px] font-bold text-primary bg-surface shadow-[-3px_-3px_6px_rgba(255,255,255,0.9),3px_3px_6px_rgba(163,177,198,0.5)]">
                    Weekly Routine
                  </button>
                  <button
                    onClick={() => onToast('Class Test calendar is loading...')}
                    className="flex-1 py-1.5 rounded-full font-label-md text-[12px] text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-1"
                  >
                    Class Tests
                    <span className="px-1.5 py-0.2 rounded-full bg-error text-on-error font-label-sm text-[10px] font-bold shadow-[0_2px_4px_rgba(186,26,26,0.4)]">1</span>
                  </button>
                </div>

                {/* Day selector strip */}
                <div className="flex items-center justify-between gap-1 overflow-x-auto py-2">
                  {[
                    { key: 'Mon 21', l: 'M', d: '21' },
                    { key: 'Tue 22', l: 'T', d: '22' },
                    { key: 'Wed 23', l: 'W', d: '23' },
                    { key: 'Thu 24', l: 'T', d: '24' },
                    { key: 'Fri 25', l: 'F', d: '25' },
                    { key: 'Sat 26', l: 'S', d: '26' },
                    { key: 'Sun 27', l: 'S', d: '27' },
                  ].map((day) => {
                    const isActive = day.key === selectedDay;
                    return (
                      <button
                        key={day.key}
                        onClick={() => {
                          setSelectedDay(day.key);
                          onToast(`Showing schedule for ${day.key}`);
                        }}
                        className={`flex flex-col items-center justify-center min-w-[44px] py-2 rounded-xl transition-all ${
                          isActive
                            ? 'bg-surface shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.95)] text-primary font-bold'
                            : 'bg-surface shadow-[-3px_-3px_6px_rgba(255,255,255,0.9),3px_3px_6px_rgba(163,177,198,0.45)] text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        <span className="font-label-sm text-[11px]">{day.l}</span>
                        <span className={`font-title-md text-title-md ${isActive ? 'text-primary-container font-extrabold' : ''}`}>
                          {day.d}
                        </span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shadow-[0_0_6px_rgba(0,88,190,0.8)]"></span>}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Lecture list */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-title-md text-on-surface font-extrabold">Today's Lecture Series</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] font-bold">3 Classes</span>
                  </div>
                  <span className="font-label-sm text-[11px] text-on-surface-variant">Wednesday, Oct 23</span>
                </div>

                {/* Class Card 1 */}
                <div className="relative rounded-xl p-4 bg-surface shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)] transition-all hover:translate-y-[-2px]">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-[12px] font-bold text-primary flex items-center gap-1 bg-primary-fixed px-2 py-0.5 rounded-md shadow-[inset_1px_1px_2px_rgba(163,177,198,0.2)]">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        09:30 - 11:00 AM
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold flex items-center gap-1 shadow-[0_2px_4px_rgba(5,150,105,0.15)]">
                        <span className="material-symbols-outlined text-[13px] font-bold">verified</span>
                        CR Verified
                      </span>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">CSE-311: DBMS</h3>
                        <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">Theory</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Professor Raihan Ahmed</p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-primary">meeting_room</span>
                        <span className="font-label-md text-[11px] font-semibold text-on-surface">Room 402 (Building 2)</span>
                      </div>
                      <button
                        onClick={() => onToast('Mapping route to Room 402...')}
                        className="w-8 h-8 rounded-full bg-surface shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.5)] active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6)] flex items-center justify-center text-primary transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">navigation</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Class Card 2 */}
                <div className="relative rounded-xl p-4 bg-surface shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)] transition-all hover:translate-y-[-2px]">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-[12px] font-bold text-secondary flex items-center gap-1 bg-secondary-fixed px-2 py-0.5 rounded-md shadow-[inset_1px_1px_2px_rgba(163,177,198,0.2)]">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        11:15 - 01:15 PM
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-[10px] font-bold shadow-[0_2px_4px_rgba(5,150,105,0.15)]">
                        Lab Practical
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">CSE-312: Database Lab</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">TAs: Fahim & Shuvo</p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-secondary">desktop_windows</span>
                        <span className="font-label-md text-[11px] font-semibold text-on-surface">Lab Room 3 (40 PCs)</span>
                      </div>
                      <button
                        onClick={() => onToast('Initialising database client compiler...')}
                        className="w-8 h-8 rounded-full bg-surface shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.5)] active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6)] flex items-center justify-center text-secondary transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">terminal</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Class Card 3 */}
                <div className="relative rounded-xl p-4 bg-surface shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)] transition-all hover:translate-y-[-2px]">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-[12px] font-bold text-tertiary flex items-center gap-1 bg-tertiary-fixed px-2 py-0.5 rounded-md shadow-[inset_1px_1px_2px_rgba(163,177,198,0.2)]">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        02:00 - 03:30 PM
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] font-bold shadow-[0_2px_4px_rgba(124,58,237,0.15)]">
                        Mathematics
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-extrabold">MAT-205: Numerical Methods</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Dr. Aminul Islam</p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-tertiary">calculate</span>
                        <span className="font-label-md text-[11px] font-semibold text-on-surface">Room 301 (Academic)</span>
                      </div>
                      <button
                        onClick={() => onToast('Loading formula sheets & tables...')}
                        className="w-8 h-8 rounded-full bg-surface shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.5)] active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6)] flex items-center justify-center text-tertiary transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px]">functions</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>


              {/* Floating Trigger button replacement */}
              <button
                onClick={() => onToast('Adding a personal offline task to routine...')}
                className="w-full py-3.5 px-4 rounded-2xl bg-surface shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)] active:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6)] flex items-center justify-center gap-2 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-[0_4px_8px_rgba(0,88,190,0.4)]">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </div>
                <span className="font-title-md text-title-md font-bold text-primary">Add Personal Task</span>
              </button>
            </div>
          )}

          {/* ==============================================
              TIMER TAB
              ============================================== */}
          {activeTab === 'timer' && (
            <div className="flex flex-col gap-4">
              {/* Top live sync bar */}
              <section className="w-full">
                <div className="w-full rounded-2xl p-2 flex items-center justify-between shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.95)]">
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded-full bg-surface shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.45)] flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                      </span>
                      <span className="font-label-sm text-[10px] font-bold text-on-surface">#CSE-21B CR Live</span>
                    </div>
                    <span className="font-body-sm text-[11px] text-on-surface-variant font-medium">Sync Active</span>
                  </div>
                  <div className="flex items-center gap-1 pr-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">sync</span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant">1m ago</span>
                  </div>
                </div>
              </section>

              {/* Main Circular Timer Dial */}
              <section className="w-full rounded-3xl p-6 flex flex-col items-center shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)]">
                {/* Outer Neumorphic Circle */}
                <div className="relative w-56 h-56 rounded-full flex items-center justify-center p-2.5 shadow-[-8px_-8px_16px_rgba(255,255,255,0.95),8px_8px_16px_rgba(163,177,198,0.55)]">
                  {/* Sweep conic-like gradient */}
                  <div
                    className="w-full h-full rounded-full p-2.5 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.95)] flex items-center justify-center"
                    style={{
                      background: `conic-gradient(from 180deg at 50% 50%, #1d4ed8 0%, #1d4ed8 ${timerPercentage}%, #cbd5e1 ${timerPercentage}%, #cbd5e1 100%)`,
                    }}
                  >
                    {/* Floating Hub Inner Core */}
                    <div className="w-full h-full rounded-full bg-surface shadow-[-5px_-5px_10px_rgba(255,255,255,0.9),5px_5px_10px_rgba(163,177,198,0.5)] flex flex-col items-center justify-center text-center p-3">
                      <div className="px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-[9px] font-bold tracking-wider shadow-[0_3px_8px_rgba(186,26,26,0.35)] mb-1">
                        NEXT CLASS IN
                      </div>
                      <div className="font-headline-lg-mobile text-[22px] leading-tight font-extrabold tracking-tight text-on-surface">
                        {formatCountdown(timeLeft)}
                      </div>
                      <div className="mt-1 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-surface-container-high text-primary font-label-sm text-[10px] font-bold shadow-[inset_1px_1px_3px_rgba(163,177,198,0.4)]">
                        <span className="material-symbols-outlined text-[12px]">meeting_room</span>
                        <span>Room 402, Dept CS</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lecture details */}
                <div className="w-full text-center mt-4">
                  <h2 className="font-headline-sm text-[16px] text-on-surface font-extrabold">CSE-311: Database Systems</h2>
                  <p className="font-body-sm text-[12px] text-on-surface-variant font-medium mt-0.5 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-tertiary">person</span>
                    Prof. Raihan Ahmed • Section B
                  </p>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3 w-full mt-4">
                  <button
                    onClick={() => onToast('Opening interactive map to Room 402...')}
                    className="py-2 px-2.5 rounded-xl flex items-center justify-center gap-2 text-on-surface font-label-md text-[12px] font-bold shadow-[-4px_-4px_8px_rgba(255,255,255,0.95),4px_4px_8px_rgba(163,177,198,0.5)] active:shadow-[inset_2px_2px_5px_rgba(163,177,198,0.6)]"
                  >
                    <span className="w-6 h-6 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shadow-[0_2px_6px_rgba(0,88,190,0.25)]">
                      <span className="material-symbols-outlined text-[15px]">near_me</span>
                    </span>
                    <span>Find Room</span>
                  </button>
                  <button
                    onClick={() => onToast('Opening Lecture 14 reference notes...')}
                    className="py-2 px-2.5 rounded-xl flex items-center justify-center gap-2 text-on-surface font-label-md text-[12px] font-bold shadow-[-4px_-4px_8px_rgba(255,255,255,0.95),4px_4px_8px_rgba(163,177,198,0.5)] active:shadow-[inset_2px_2px_5px_rgba(163,177,198,0.6)]"
                  >
                    <span className="w-6 h-6 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-[0_2px_6px_rgba(107,56,212,0.25)]">
                      <span className="material-symbols-outlined text-[15px]">menu_book</span>
                    </span>
                    <span>Lec 14 Notes</span>
                  </button>
                </div>
              </section>

              {/* Stats Grid */}
              <section className="grid grid-cols-3 gap-2 w-full">
                <div className="rounded-2xl p-2.5 flex flex-col items-center text-center shadow-[-5px_-5px_10px_rgba(255,255,255,0.95),5px_5px_10px_rgba(163,177,198,0.5)] bg-surface">
                  <span className="font-label-sm text-[9px] text-on-surface-variant uppercase tracking-wider font-extrabold">Today</span>
                  <span className="font-headline-sm text-[18px] text-on-surface font-extrabold mt-0.5">4</span>
                  <span className="mt-1 px-1.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[9px] font-bold shadow-[0_2px_6px_rgba(33,112,228,0.3)]">
                    Classes
                  </span>
                </div>
                <div className="rounded-2xl p-2.5 flex flex-col items-center text-center shadow-[-5px_-5px_10px_rgba(255,255,255,0.95),5px_5px_10px_rgba(163,177,198,0.5)] bg-surface">
                  <span className="font-label-sm text-[9px] text-on-surface-variant uppercase tracking-wider font-extrabold">Exams</span>
                  <span className="font-headline-sm text-[18px] text-on-surface font-extrabold mt-0.5">1 CT</span>
                  <span className="mt-1 px-1.5 py-0.5 rounded-full bg-tertiary text-on-tertiary font-label-sm text-[9px] font-bold shadow-[0_2px_6px_rgba(107,56,212,0.3)]">
                    Tomorrow
                  </span>
                </div>
                <div className="rounded-2xl p-2.5 flex flex-col items-center text-center shadow-[-5px_-5px_10px_rgba(255,255,255,0.95),5px_5px_10px_rgba(163,177,198,0.5)] bg-surface">
                  <span className="font-label-sm text-[9px] text-on-surface-variant uppercase tracking-wider font-extrabold">Pending</span>
                  <span className="font-headline-sm text-[18px] text-on-surface font-extrabold mt-0.5">2</span>
                  <span className="mt-1 px-1.5 py-0.5 rounded-full bg-error text-on-error font-label-sm text-[9px] font-bold shadow-[0_2px_6px_rgba(186,26,26,0.3)]">
                    Due Soon
                  </span>
                </div>
              </section>

              {/* CR Announcement Card */}
              <section className="w-full">
                <div className="rounded-2xl p-3 flex items-start gap-3 shadow-[-5px_-5px_11px_rgba(255,255,255,0.95),5px_5px_11px_rgba(163,177,198,0.5)] bg-surface">
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center shadow-[0_4px_10px_rgba(107,56,212,0.35)]">
                    <span className="material-symbols-outlined text-[18px]">campaign</span>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-title-md text-[13px] text-on-surface font-extrabold truncate">CR Urgent Notice</span>
                      <span className="font-label-sm text-[9px] text-tertiary font-extrabold shrink-0">Pinned</span>
                    </div>
                    <p className="font-body-md text-[12px] text-on-surface-variant mt-0.5 leading-snug">
                      DBMS Lab shifted to <strong className="text-on-surface">Server Lab 3</strong> due to projector maintenance. Bring laptops!
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ==============================================
              ALERTS TAB
              ============================================== */}
          {activeTab === 'alerts' && (
            <div className="flex flex-col gap-4">
              {/* Alert Engine Header */}
              <div className="w-full rounded-2xl bg-surface p-4 shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)] flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-surface shadow-[-4px_-4px_10px_rgba(255,255,255,0.95),4px_4px_10px_rgba(163,177,198,0.5)] flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    </div>
                    <div>
                      <h2 className="font-headline-sm text-[14px] text-on-surface font-extrabold">Alert Engine</h2>
                      <p className="font-body-sm text-[11px] text-on-surface-variant">Real-time scheduling</p>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-secondary text-on-secondary shadow-[0px_8px_16px_rgba(0,108,73,0.3)] flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-ping"></span>
                    <span className="font-label-sm text-[9px] font-bold tracking-wider uppercase">Active</span>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="rounded-xl bg-surface shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.95)] p-2 flex flex-col items-center text-center">
                    <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(10,185,129,0.8)] mb-1"></span>
                    <span className="font-label-sm text-[9px] font-bold text-on-surface">Push API</span>
                    <span className="font-label-sm text-[9px] text-secondary font-extrabold">Online</span>
                  </div>
                  <div className="rounded-xl bg-surface shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.95)] p-2 flex flex-col items-center text-center">
                    <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(107,56,212,0.8)] mb-1"></span>
                    <span className="font-label-sm text-[9px] font-bold text-on-surface">Audio Haptic</span>
                    <span className="font-label-sm text-[9px] text-tertiary font-extrabold">Priority</span>
                  </div>
                  <div className="rounded-xl bg-surface shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.95)] p-2 flex flex-col items-center text-center">
                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,88,190,0.8)] mb-1"></span>
                    <span className="font-label-sm text-[9px] font-bold text-on-surface">Offline DB</span>
                    <span className="font-label-sm text-[9px] text-primary font-extrabold">Cached</span>
                  </div>
                </div>
              </div>

              {/* Class Bell Triggers */}
              <div className="w-full rounded-2xl bg-surface p-4 shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">notifications_paused</span>
                    <h3 className="font-title-md text-[13px] text-on-surface font-extrabold">Class Bell Triggers</h3>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface-variant font-bold">Global</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {[
                    { key: 'min30', label: '30 min before' },
                    { key: 'min15', label: '15 min before', isPrimary: true },
                    { key: 'min5', label: '5 min before', isTertiary: true },
                    { key: 'atStart', label: 'At start time' },
                  ].map((p) => {
                    const active = timingPills[p.key as keyof typeof timingPills];
                    return (
                      <button
                        key={p.key}
                        onClick={() => {
                          setTimingPills(prev => ({ ...prev, [p.key]: !active }));
                          onToast(`Trigger for "${p.label}" ${!active ? 'enabled' : 'disabled'}`);
                        }}
                        className={`h-11 px-2.5 rounded-xl transition-all flex items-center justify-between text-left ${
                          active
                            ? 'bg-surface shadow-[inset_3px_3px_6px_rgba(163,177,198,0.6),inset_-3px_-3px_6px_rgba(255,255,255,0.9)]'
                            : 'bg-surface shadow-[-4px_-4px_8px_rgba(255,255,255,0.95),4px_4px_8px_rgba(163,177,198,0.5)] active:scale-[0.98]'
                        }`}
                      >
                        <span className={`font-body-md text-[11px] ${active ? 'font-bold text-primary' : 'font-semibold text-on-surface'}`}>
                          {p.label}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${
                          active 
                            ? p.isTertiary 
                              ? 'bg-tertiary-container shadow-[0_0_6px_rgba(132,85,239,0.8)]' 
                              : 'bg-primary shadow-[0_0_6px_rgba(0,88,190,0.8)]'
                            : 'bg-outline-variant'
                        }`}></span>
                      </button>
                    );
                  })}
                </div>

                {/* Switch Row */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-surface shadow-[-3px_-3px_6px_rgba(255,255,255,0.95),3px_3px_6px_rgba(163,177,198,0.5)] flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    </div>
                    <div>
                      <div className="font-label-md text-[11px] text-on-surface font-bold">Override Silent Profile</div>
                      <div className="font-body-sm text-[10px] text-on-surface-variant leading-none">Loud chime if muted</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setOverrideSilent(!overrideSilent);
                      onToast(`Mute override ${!overrideSilent ? 'enabled' : 'disabled'}`);
                    }}
                    className={`w-12 h-7 rounded-full p-0.5 flex items-center transition-colors shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5)] ${
                      overrideSilent ? 'bg-surface-container-highest' : 'bg-surface-container'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 shadow-md ${
                        overrideSilent ? 'translate-x-5 bg-tertiary text-on-tertiary' : 'translate-x-0 bg-outline'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[10px] font-bold">
                        {overrideSilent ? 'check' : 'close'}
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Multi-Stage Reminders */}
              <div className="w-full rounded-2xl bg-surface shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)] overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 flex items-center justify-between text-white shadow-[0_4px_12px_rgba(245,158,11,0.3)]">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
                    <span className="font-label-md text-[11px] uppercase tracking-wider font-bold">CT Tomorrow • 10:30 AM</span>
                  </div>
                  <span className="font-label-sm text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-bold">CSE-315</span>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-title-md text-[13px] text-on-surface font-extrabold leading-none">Algorithms & Complexity CT</h3>
                  
                  {/* Stage 1 */}
                  <div className="p-2.5 rounded-xl bg-surface shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] flex items-center justify-between opacity-80">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px]">done_all</span>
                      </div>
                      <div>
                        <div className="font-body-md text-[11px] font-bold text-on-surface">Stage 1: 1 Day Before</div>
                        <div className="font-body-sm text-[9px] text-secondary font-bold">Delivered Yesterday</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-[9px] font-bold">Sent</span>
                  </div>

                  {/* Stage 2 Switch */}
                  <div className="p-2.5 rounded-xl bg-surface shadow-[-4px_-4px_8px_rgba(255,255,255,0.95),4px_4px_8px_rgba(163,177,198,0.5)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px]">bedtime</span>
                      </div>
                      <div>
                        <div className="font-body-md text-[11px] font-bold text-on-surface">Stage 2: 12 Hours Before</div>
                        <div className="font-body-sm text-[9px] text-tertiary font-bold">Tonight • 9:00 PM</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setStage2Active(!stage2Active);
                        onToast(`Stage 2 Reminder ${!stage2Active ? 'armed' : 'disarmed'}`);
                      }}
                      className={`w-12 h-7 rounded-full p-0.5 flex items-center transition-colors shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5)] ${
                        stage2Active ? 'bg-surface-container-highest' : 'bg-surface-container'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 shadow-md ${
                          stage2Active ? 'translate-x-5 bg-tertiary text-on-tertiary' : 'translate-x-0 bg-outline'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[10px] font-bold">
                          {stage2Active ? 'check' : 'close'}
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Stage 3 Switch */}
                  <div className="p-2.5 rounded-xl bg-surface shadow-[-4px_-4px_8px_rgba(255,255,255,0.95),4px_4px_8px_rgba(163,177,198,0.5)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-error text-on-error flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px]">timer</span>
                      </div>
                      <div>
                        <div className="font-body-md text-[11px] font-bold text-on-surface">Stage 3: 2 Hours Before</div>
                        <div className="font-body-sm text-[9px] text-error font-bold">Tomorrow • 8:30 AM</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setStage3Active(!stage3Active);
                        onToast(`Stage 3 Revise alert ${!stage3Active ? 'armed' : 'disarmed'}`);
                      }}
                      className={`w-12 h-7 rounded-full p-0.5 flex items-center transition-colors shadow-[inset_2px_2px_4px_rgba(163,177,198,0.5)] ${
                        stage3Active ? 'bg-surface-container-highest' : 'bg-surface-container'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 shadow-md ${
                          stage3Active ? 'translate-x-5 bg-error text-on-error' : 'translate-x-0 bg-outline'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[10px] font-bold">
                          {stage3Active ? 'check' : 'close'}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mock Screen Notification Simulator Banner */}
              <div className="w-full rounded-2xl bg-surface p-4 shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-tertiary text-[20px]">phone_iphone</span>
                    <h3 className="font-title-md text-[13px] text-on-surface font-extrabold">Heads-up Simulator</h3>
                  </div>
                  <span className="font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">UI test</span>
                </div>

                <div className="rounded-xl bg-surface shadow-[inset_4px_4px_9px_rgba(163,177,198,0.5),inset_-4px_-4px_9px_rgba(255,255,255,0.95)] p-2">
                  <div className="rounded-lg bg-surface shadow-[-4px_-4px_10px_rgba(255,255,255,0.95),4px_4px_12px_rgba(163,177,198,0.6)] p-3 space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center text-white shadow-[0_2px_6px_rgba(0,88,190,0.4)]">
                          <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>alarm</span>
                        </div>
                        <span className="font-label-sm text-[10px] font-bold text-on-surface tracking-wider">UNISYNC</span>
                        <span className="font-label-sm text-[10px] text-on-surface-variant">• Now</span>
                      </div>
                      <span className="material-symbols-outlined text-outline text-[14px]">expand_more</span>
                    </div>

                    <div>
                      <div className="font-title-md text-[12px] text-on-surface font-extrabold leading-none">Class Alert: DBMS in 5 mins!</div>
                      <p className="font-body-sm text-[11px] text-on-surface-variant mt-1 leading-snug">
                        Prof. Raihan's Database Systems starts soon in Room 402. Bring laptops!
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onToast('Alert snoozed for 3 minutes')}
                        className="h-8 rounded-lg bg-surface shadow-[-2px_-2px_5px_rgba(255,255,255,0.95),2px_2px_5px_rgba(163,177,198,0.5)] active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6)] text-[11px] text-on-surface font-bold flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[13px]">snooze</span>
                        Snooze 3m
                      </button>
                      <button
                        onClick={() => onToast('Checked in! Marked present in Room 402.')}
                        className="h-8 rounded-lg bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-[11px] shadow-[0_3px_8px_rgba(0,88,190,0.4)] flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[13px]">pin_drop</span>
                        I'm here
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================
              COMMUNITY TAB
              ============================================== */}
          {activeTab === 'community' && (
            <div className="flex flex-col gap-4">
              {/* Scholar Status */}
              <section className="w-full rounded-xl p-4 bg-surface shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-surface shadow-[-3px_-3px_8px_rgba(255,255,255,0.95),3px_3px_8px_rgba(163,177,198,0.5)] flex items-center justify-center text-amber-500">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-headline-sm text-[15px] text-on-surface font-extrabold leading-none">4.8</span>
                      <span className="font-label-md text-[11px] text-on-surface-variant">Rating</span>
                    </div>
                    <span className="font-body-sm text-[10px] text-on-surface-variant font-bold leading-none">14 Verified solutions</span>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-bold flex items-center gap-1 shadow-[0_3px_8px_rgba(108,248,187,0.45)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                  Level 3 Scholar
                </div>
              </section>

              {/* Search & topic filter */}
              <section className="w-full flex flex-col gap-2">
                <div className="w-full flex items-center gap-2">
                  <div className="flex-1 h-11 rounded-xl bg-surface px-3 flex items-center gap-2 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.9)]">
                    <span className="material-symbols-outlined text-outline text-[18px]">search</span>
                    <input
                      className="w-full bg-transparent font-body-md text-[12px] text-on-surface placeholder:text-outline focus:outline-none"
                      placeholder="Search doubts, lab problems..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => onToast('Filters applied!')}
                    className="w-11 h-11 rounded-xl bg-surface flex items-center justify-center text-primary shadow-[-3px_-3px_7px_rgba(255,255,255,0.95),3px_3px_7px_rgba(163,177,198,0.5)] active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6)]"
                  >
                    <span className="material-symbols-outlined text-[18px]">tune</span>
                  </button>
                </div>

                {/* Horizontal topic chips */}
                <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                  {['All Topics', '#Algorithms', '#DBMS Lab', '#Circuits'].map((topic) => {
                    const active = topic === selectedTopic;
                    return (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`px-3 py-1.5 rounded-full font-label-md text-[11px] whitespace-nowrap transition-all ${
                          active
                            ? 'bg-surface text-primary font-bold shadow-[inset_2px_2px_4px_rgba(163,177,198,0.55),inset_-2px_-2px_4px_rgba(255,255,255,0.95)]'
                            : 'bg-surface text-on-surface-variant shadow-[-3px_-3px_6px_rgba(255,255,255,0.95),3px_3px_6px_rgba(163,177,198,0.45)]'
                        }`}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Action hub */}
              <section className="w-full grid grid-cols-2 gap-2">
                <button
                  onClick={() => onToast('Opening doubt compose draft...')}
                  className="h-11 rounded-xl bg-surface shadow-[-3px_-3px_7px_rgba(255,255,255,0.95),3px_3px_7px_rgba(163,177,198,0.5)] active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6)] flex items-center justify-center gap-1 text-tertiary font-bold text-[12px]"
                >
                  <span className="material-symbols-outlined text-[18px] font-bold">add_circle</span>
                  <span>Post Doubt</span>
                </button>
                <button
                  onClick={() => onToast('Opening camera solver lens...')}
                  className="h-11 rounded-xl bg-surface shadow-[-3px_-3px_7px_rgba(255,255,255,0.95),3px_3px_7px_rgba(163,177,198,0.5)] active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6)] flex items-center justify-center gap-1 text-primary font-bold text-[12px]"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  <span>Snap Problem</span>
                </button>
              </section>

              {/* Leaderboard Cards */}
              <section className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-amber-500 text-[18px]">military_tech</span>
                    <span className="font-title-md text-[13px] text-on-surface font-extrabold">Top Helpers This Month</span>
                  </div>
                  <button onClick={() => onToast('Showing full rank list')} className="font-label-sm text-[10px] text-primary font-bold">
                    View Rank 100
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* #1 Shafi */}
                  <div className="rounded-xl p-2 bg-surface shadow-[-3px_-3px_7px_rgba(255,255,255,0.95),3px_3px_7px_rgba(163,177,198,0.55)] flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-1 px-1.5 py-0.5 rounded-b bg-amber-400 text-[9px] font-extrabold text-on-surface">
                      #1
                    </div>
                    <div className="w-10 h-10 rounded-full p-0.5 bg-surface shadow-[-2px_-2px_4px_rgba(255,255,255,0.95),2px_2px_4px_rgba(163,177,198,0.5)] mt-1 mb-1">
                      <img className="w-full h-full rounded-full object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&fit=crop&q=80" />
                    </div>
                    <span className="text-[11px] font-extrabold text-on-surface truncate w-full">Shafi K.</span>
                    <span className="text-[9px] font-bold text-amber-600">⭐ 4.9</span>
                    <span className="text-[9px] text-on-surface-variant font-medium mt-0.5">42 solved</span>
                  </div>

                  {/* #2 Anika */}
                  <div className="rounded-xl p-2 bg-surface shadow-[-3px_-3px_7px_rgba(255,255,255,0.95),3px_3px_7px_rgba(163,177,198,0.55)] flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-1 px-1.5 py-0.5 rounded-b bg-primary-fixed-dim text-[9px] font-extrabold text-on-surface">
                      #2
                    </div>
                    <div className="w-10 h-10 rounded-full p-0.5 bg-surface shadow-[-2px_-2px_4px_rgba(255,255,255,0.95),2px_2px_4px_rgba(163,177,198,0.5)] mt-1 mb-1">
                      <img className="w-full h-full rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80" />
                    </div>
                    <span className="text-[11px] font-extrabold text-on-surface truncate w-full">Anika R.</span>
                    <span className="text-[9px] font-bold text-amber-600">⭐ 4.8</span>
                    <span className="text-[9px] text-on-surface-variant font-medium mt-0.5">38 solved</span>
                  </div>

                  {/* #3 Tanvir */}
                  <div className="rounded-xl p-2 bg-surface shadow-[-3px_-3px_7px_rgba(255,255,255,0.95),3px_3px_7px_rgba(163,177,198,0.55)] flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-1 px-1.5 py-0.5 rounded-b bg-orange-400 text-white text-[9px] font-extrabold">
                      #3
                    </div>
                    <div className="w-10 h-10 rounded-full p-0.5 bg-surface shadow-[-2px_-2px_4px_rgba(255,255,255,0.95),2px_2px_4px_rgba(163,177,198,0.5)] mt-1 mb-1">
                      <img className="w-full h-full rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80" />
                    </div>
                    <span className="text-[11px] font-extrabold text-on-surface truncate w-full">Tanvir H.</span>
                    <span className="text-[9px] font-bold text-amber-600">⭐ 4.8</span>
                    <span className="text-[9px] text-on-surface-variant font-medium mt-0.5">31 solved</span>
                  </div>
                </div>
              </section>

              {/* Thread Posts */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-[13px] text-on-surface font-extrabold">Community Feed</span>
                  <span className="text-[11px] text-on-surface-variant font-bold">Sorted: Unsolved First</span>
                </div>

                {/* Post Item */}
                <article className="w-full rounded-2xl p-4 bg-surface shadow-[-6px_-6px_14px_rgba(255,255,255,0.95),6px_6px_14px_rgba(163,177,198,0.6)] flex flex-col gap-3 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-surface shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.5)] p-0.5">
                        <img className="w-full h-full rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&q=80" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-[11px] text-on-surface font-extrabold">Nafis Rahman</span>
                        <span className="font-body-sm text-[9px] text-on-surface-variant leading-none">18m ago • Section B</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface text-tertiary font-label-sm text-[10px] font-bold shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)]">
                      #Algorithms
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-[14px] text-on-surface font-extrabold leading-snug">
                    Can someone explain Dijkstra's algorithm edge case where negative edge weights appear?
                  </h3>
                  <p className="font-body-md text-[11px] text-on-surface-variant leading-relaxed">
                    Our professor mentioned that the greedy property fails because once a node is marked visited, it assumes the shortest distance is finalized. What is the standard algorithmic remedy for this?
                  </p>

                  {/* Solution Box Inset */}
                  <div className="w-full rounded-xl p-3 bg-surface shadow-[inset_3px_3px_7px_rgba(163,177,198,0.5),inset_-3px_-3px_7px_rgba(255,255,255,0.9)] flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
                        <span className="font-label-md text-[11px] text-on-surface font-extrabold">Top Solution by Shafi</span>
                        <span className="font-label-sm text-[10px] text-amber-600 font-bold">⭐ 4.9</span>
                      </div>
                      <span className="font-label-sm text-[9px] text-secondary font-extrabold">ACCEPTED</span>
                    </div>

                    <p className="font-body-sm text-[10px] text-on-surface-variant leading-relaxed">
                      Dijkstra blindly assumes weights ≥ 0. For negative edge cycles or negative edges, pivot to the <strong>Bellman-Ford Algorithm</strong>:
                    </p>

                    <pre className="w-full p-2 rounded bg-surface-container-high font-mono text-[9px] text-on-surface overflow-x-auto shadow-[inset_1.5px_1.5px_3px_rgba(163,177,198,0.4)] leading-tight text-left">
{`for i in range(V - 1):
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w`}
                    </pre>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={handleUpvote}
                      className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 font-bold text-[11px] transition-all ${
                        hasUpvoted
                          ? 'bg-surface shadow-[inset_2px_2px_4px_rgba(163,177,198,0.6)] text-secondary'
                          : 'bg-surface shadow-[-3px_-3px_7px_rgba(255,255,255,0.95),3px_3px_7px_rgba(163,177,198,0.5)] text-primary active:scale-95'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        thumb_up
                      </span>
                      <span>{helpfulCount} Helpful</span>
                    </button>

                    {/* Interactive stars */}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setStarRating(s);
                            onToast(`Rated Shafi's solution ${s} Star${s > 1 ? 's' : ''}!`);
                          }}
                          className={`hover:scale-125 transition-transform ${s <= starRating ? 'text-amber-500' : 'text-slate-300'}`}
                        >
                          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              </section>
            </div>
          )}
        </main>

        {/* --- BOTTOM NAVIGATION BAR --- */}
        <nav className="absolute bottom-0 w-full z-40 bg-surface shadow-[-4px_-4px_12px_rgba(255,255,255,0.95),4px_4px_14px_rgba(163,177,198,0.5)] pb-5">
          <div className="h-16 flex items-center justify-around px-2">
            {[
              { id: 'routine', icon: 'calendar_today', label: 'Routine' },
              { id: 'timer', icon: 'hourglass_top', label: 'Timer' },
              { id: 'alerts', icon: 'notifications_active', label: 'Alerts' },
              { id: 'community', icon: 'forum', label: 'Community' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all ${
                    isActive
                      ? 'shadow-[inset_2.5px_2.5px_5px_rgba(163,177,198,0.5),inset_-2.5px_-2.5px_5px_rgba(255,255,255,0.95)] text-primary font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                  <span className="font-label-sm text-[10px] font-semibold mt-0.5">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
