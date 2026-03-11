import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
      {/* Background dark gradient e Glow central dinâmico */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a101a_0%,transparent_80%)] pointer-events-none" />
      
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[300px] md:h-[500px] bg-quark-green blur-[150px] md:blur-[200px] rounded-[100%] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-32 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 md:mb-10 group cursor-pointer hover:bg-white/10 transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-quark-yellow animate-pulse" />
          <span className="text-[11px] md:text-[13px] font-medium text-slate-300 group-hover:text-white transition-colors">
            Conheça o novo padrão de energia solar 
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-[5.5rem] font-bold tracking-tight text-white mb-6 md:mb-8 leading-[1.05] max-w-5xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          Sua energia não <br className="hidden sm:block" />
          precisa ser um{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-quark-green to-quark-yellow">
            aluguel.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-400 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Assuma hoje o controle e pare de financiar o lucro da concessionária. A independência energética que você merece, com a tecnologia do amanhã.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('wizard-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-quark-darker font-medium text-base md:text-lg rounded-full overflow-hidden cursor-pointer"
          >
            {/* Efeito Glow Interno */}
            <div className="absolute inset-0 bg-gradient-to-r from-quark-green/20 to-quark-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 font-bold">Simular Economia Agora</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <button
            onClick={() => document.getElementById('pain-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-medium text-base md:text-lg rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          >
            Ver como funciona
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 flex items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        >
           <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
             <ShieldCheck className="w-5 h-5 text-quark-green" />
             <span>Mais de 1.200 sistemas confiados em todo o Brasil</span>
           </div>
        </motion.div>
      </div>
      
      {/* Decorative Bottom Line Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
