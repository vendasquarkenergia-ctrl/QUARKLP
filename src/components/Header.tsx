import { Zap, Settings } from 'lucide-react';

type HeaderProps = {
  flow: 'solar' | 'maintenance';
  setFlow: (flow: 'solar' | 'maintenance') => void;
};

export default function Header({ flow, setFlow }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4 bg-quark-dark/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 md:gap-4 shrink-0 cursor-pointer" onClick={() => setFlow('solar')}>
          <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="quark-grad" x1="20" y1="20" x2="85" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FCEE21"/>
                <stop offset="100%" stopColor="#00D26A"/>
              </linearGradient>
              <clipPath id="leaf-bottom">
                <path d="M 30 30 C 15 55, 40 85, 75 75 L 30 30 Z" />
              </clipPath>
            </defs>
            
            {/* Grid inside bottom-left curve */}
            <g clipPath="url(#leaf-bottom)" stroke="url(#quark-grad)" strokeWidth="2.5">
              {/* Parallel to stem */}
              <line x1="10" y1="30" x2="60" y2="80" />
              <line x1="0" y1="40" x2="50" y2="90" />
              {/* Perpendicular to stem */}
              <line x1="10" y1="60" x2="50" y2="20" />
              <line x1="20" y1="70" x2="60" y2="30" />
              <line x1="30" y1="80" x2="70" y2="40" />
              <line x1="40" y1="90" x2="80" y2="50" />
            </g>

            {/* Main shapes */}
            <path d="M 20 20 L 45 20 C 75 20, 85 45, 75 75" fill="none" stroke="url(#quark-grad)" strokeWidth="7" strokeLinecap="round" />
            <path d="M 30 30 C 15 55, 40 85, 75 75" fill="none" stroke="url(#quark-grad)" strokeWidth="7" strokeLinecap="round" />
            <line x1="20" y1="20" x2="75" y2="75" stroke="url(#quark-grad)" strokeWidth="7" strokeLinecap="round" />
            <line x1="65" y1="65" x2="85" y2="85" stroke="url(#quark-grad)" strokeWidth="7" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <span className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-none font-sans">Quark</span>
              <svg className="w-3 h-3 md:w-4 md:h-4 ml-1 text-[#FCEE21]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-[11px] md:text-[13px] font-medium text-white/90 lowercase leading-none mt-1 pr-5">energia</span>
          </div>
        </div>

        <div className="bg-[#161B22]/90 border border-white/10 rounded-full p-1 flex gap-1 shrink-0">
          <button 
            onClick={() => setFlow('solar')}
            className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer ${flow === 'solar' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Instalação Solar</span>
            <span className="sm:hidden">Solar</span>
          </button>
          <button 
            onClick={() => setFlow('maintenance')}
            className={`flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer ${flow === 'maintenance' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            <Settings className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Manutenção</span>
            <span className="sm:hidden">Revisão</span>
          </button>
        </div>
      </div>
    </header>
  );
}

