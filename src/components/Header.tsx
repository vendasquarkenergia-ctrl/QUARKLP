import { Zap, Settings } from 'lucide-react';
import { motion } from 'motion/react';

type HeaderProps = {
  flow: 'solar' | 'maintenance';
  setFlow: (flow: 'solar' | 'maintenance') => void;
};

export default function Header({ flow, setFlow }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 bg-transparent pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-3 bg-[#010409]/70 backdrop-blur-2xl border border-white/[0.05] rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3 md:gap-4 shrink-0 cursor-pointer group" onClick={() => setFlow('solar')}>
            <svg viewBox="0 0 100 100" className="w-9 h-9 md:w-11 md:h-11 transition-transform group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="quark-grad" x1="20" y1="20" x2="85" y2="85" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FCEE21"/>
                  <stop offset="100%" stopColor="#00D26A"/>
                </linearGradient>
                <clipPath id="leaf-bottom">
                  <path d="M 30 30 C 15 55, 40 85, 75 75 L 30 30 Z" />
                </clipPath>
              </defs>
              
              <g clipPath="url(#leaf-bottom)" stroke="url(#quark-grad)" strokeWidth="2.5">
                <line x1="10" y1="30" x2="60" y2="80" />
                <line x1="0" y1="40" x2="50" y2="90" />
                <line x1="10" y1="60" x2="50" y2="20" />
                <line x1="20" y1="70" x2="60" y2="30" />
                <line x1="30" y1="80" x2="70" y2="40" />
                <line x1="40" y1="90" x2="80" y2="50" />
              </g>

              <path d="M 20 20 L 45 20 C 75 20, 85 45, 75 75" fill="none" stroke="url(#quark-grad)" strokeWidth="7" strokeLinecap="round" />
              <path d="M 30 30 C 15 55, 40 85, 75 75" fill="none" stroke="url(#quark-grad)" strokeWidth="7" strokeLinecap="round" />
              <line x1="20" y1="20" x2="75" y2="75" stroke="url(#quark-grad)" strokeWidth="7" strokeLinecap="round" />
              <line x1="65" y1="65" x2="85" y2="85" stroke="url(#quark-grad)" strokeWidth="7" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <span className="text-xl md:text-2xl font-bold tracking-tight text-white leading-none font-sans">Quark</span>
                <svg className="w-3 h-3 md:w-4 md:h-4 ml-1 text-quark-yellow" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-[10px] md:text-[12px] font-medium text-white/70 lowercase leading-none mt-1 pr-4 md:pr-5">energia</span>
            </div>
          </div>

          <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-full p-1 flex items-center shrink-0">
            {[
              { id: 'solar', label: 'Instalação Solar', labelMobile: 'Solar', icon: Zap },
              { id: 'maintenance', label: 'Manutenção', labelMobile: 'Revisão', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = flow === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setFlow(item.id as 'solar' | 'maintenance')}
                  className={`relative z-10 flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-colors cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="header-active-tab"
                      className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.1]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 relative z-20 transition-colors ${isActive ? (item.id === 'solar' ? 'text-quark-yellow' : 'text-quark-green') : ''}`} />
                  <span className="hidden sm:inline relative z-20">{item.label}</span>
                  <span className="sm:hidden relative z-20">{item.labelMobile}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

