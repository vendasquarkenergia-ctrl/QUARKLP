import { motion } from 'motion/react';
import { Zap, ShieldCheck, ChevronDown } from 'lucide-react';

// Partículas estáticas definidas fora do componente para evitar re-cálculo
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() < 0.5 ? 1 : 2,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 4,
  opacity: 0.15 + Math.random() * 0.35,
}));

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Partículas animadas */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{ opacity: [p.opacity, p.opacity * 0.2, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-quark-green/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex-1 flex items-center justify-center px-4 md:px-6 pt-28 pb-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 md:mb-8">
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-quark-yellow" />
              <span className="text-xs md:text-sm font-medium tracking-wide text-slate-300 uppercase">Liberdade Energética</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 md:mb-8 leading-[1.1]">
              Sua conta de luz não precisa ser um{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-quark-yellow to-quark-green">
                aluguel eterno.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-slate-400 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed font-sans px-2">
              Todo ano a mesma história: a tarifa sobe e você paga a conta. Assuma o controle da sua energia e pare de financiar o lucro da concessionária.
            </p>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-quark-green/10 border border-quark-green/20 mb-10 md:mb-12"
            >
              <ShieldCheck className="w-4 h-4 text-quark-green shrink-0" />
              <span className="text-xs md:text-sm font-semibold text-quark-green">
                +1.200 sistemas instalados em todo o Brasil
              </span>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('wizard-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl md:rounded-full bg-gradient-to-r from-quark-yellow to-quark-green text-quark-dark font-bold text-lg shadow-[0_0_40px_rgba(0,210,106,0.3)] hover:shadow-[0_0_60px_rgba(0,210,106,0.5)] transition-all cursor-pointer"
              >
                Quero Minha Alforria
              </motion.button>

              <button
                onClick={() => document.getElementById('pain-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors cursor-pointer group"
              >
                Ver como funciona
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
