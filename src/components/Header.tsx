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
            <img
              src="/logo.png"
              alt="Quark Energia"
              className="h-9 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                // Fallback: esconde a img e mostra o texto se o arquivo não existir ainda
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const sibling = target.nextElementSibling as HTMLElement;
                if (sibling) sibling.style.display = 'flex';
              }}
            />
            {/* Fallback de texto (visível somente se /logo.png não existir) */}
            <div className="items-center gap-1 hidden">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white leading-none font-sans">Quark</span>
              <svg className="w-3 h-3 md:w-4 md:h-4 text-quark-yellow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
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

