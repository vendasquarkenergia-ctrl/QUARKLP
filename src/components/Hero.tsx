import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Animação suavizada para dispositivos móveis: termina com 25% de scroll da seção
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  // O conteúdo some de forma mais gradual (com 20% de scroll)
  const contentY = useTransform(scrollYProgress, [0, 0.25], [0, 40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      {/* ── IMAGEM BASE: Casa Vazia (escura) ─────────────────────── */}
      <div className="absolute inset-0">
        <img
          src="/casa-vazia.jpg"
          alt="Casa de alto padrão ao entardecer"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradiente escuro por cima da foto para o texto ficar legível */}
        <div className="absolute inset-0 bg-gradient-to-b from-quark-darker/70 via-quark-darker/40 to-quark-darker/90" />
        {/* Vinheta nas laterais */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(1,4,9,0.7)_100%)]" />
      </div>

      {/* ── IMAGEM OVERLAY: Casa com painéis + efeito de dinheiro ── */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0"
      >
        <img
          src="/casa-paineis.jpeg"
          alt="Casa com energia solar instalada"
          className="w-full h-full object-cover object-center"
        />
        {/* Mesmos gradientes por cima */}
        <div className="absolute inset-0 bg-gradient-to-b from-quark-darker/70 via-quark-darker/40 to-quark-darker/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(1,4,9,0.7)_100%)]" />
      </motion.div>

      {/* ── CONTEÚDO DE TEXTO ────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-40 md:pb-32 flex flex-col items-center text-center"
      >
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-8 md:mb-10 group cursor-pointer hover:bg-white/10 transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-quark-yellow animate-pulse" />
          <span className="text-[11px] md:text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors">
            Conheça o novo padrão de energia solar
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tight text-white mb-6 md:mb-8 leading-[1.05] max-w-5xl drop-shadow-2xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          Sua energia não{' '}
          <br className="hidden sm:block" />
          precisa ser um{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-quark-green to-quark-yellow">
            aluguel.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-lg"
        >
          Assuma hoje o controle e pare de financiar o lucro da concessionária.
          A independência energética que você merece, com a tecnologia do amanhã.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('wizard-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-quark-darker font-bold text-base md:text-lg rounded-full overflow-hidden cursor-pointer shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-quark-green/20 to-quark-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">Simular Economia Agora</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <button
            onClick={() => document.getElementById('pain-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-medium text-base md:text-lg rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            Ver como funciona
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-14 flex items-center justify-center gap-6 opacity-70 hover:opacity-100 transition-all duration-500"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <ShieldCheck className="w-5 h-5 text-quark-green" />
            <span>Mais de 1.200 sistemas confiados em todo o Brasil</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Seta de scroll visual */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Role para baixo</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Linha decorativa no fundo */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
