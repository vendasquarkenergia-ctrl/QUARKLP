import { motion } from 'motion/react';
import { ShieldCheck, Zap, TrendingUp, Activity } from 'lucide-react';

export default function MaintenanceBenefits() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 bg-transparent relative border-t border-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            O que fazemos pelo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quark-yellow to-quark-green">
              seu sistema
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
            Protocolo técnico completo para devolver ao seu sistema a performance do dia da instalação — ou melhor.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
        >
          {/* Bento Item 1 - Large */}
          <motion.div
            variants={item}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="md:col-span-8 bg-white/[0.02] border border-white/[0.05] p-6 md:p-10 rounded-3xl flex flex-col justify-between hover:bg-white/[0.04] hover:border-quark-green/20 backdrop-blur-xl transition-colors cursor-default"
          >
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-quark-green mb-4 md:mb-6" />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Segurança Operacional</h3>
              <p className="text-sm md:text-base text-slate-400 font-sans leading-relaxed">
                Prevenção contra microfissuras, superaquecimento e falhas no inversor. Protegemos seu investimento contra danos irreversíveis que podem custar milhares de reais.
              </p>
            </div>
          </motion.div>

          {/* Bento Item 2 - Small */}
          <motion.div
            variants={item}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="md:col-span-4 bg-white/[0.02] border border-white/[0.05] p-6 md:p-10 rounded-3xl flex flex-col justify-between hover:bg-white/[0.04] hover:border-quark-yellow/20 backdrop-blur-xl transition-colors cursor-default"
          >
            <Zap className="w-8 h-8 md:w-10 md:h-10 text-quark-yellow mb-4 md:mb-6" />
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Eficiência Máxima</h3>
              <p className="text-sm text-slate-400 font-sans leading-relaxed">
                Remoção de sujidade incrustada que bloqueia a captação solar.
              </p>
            </div>
          </motion.div>

          {/* Bento Item 3 - Small */}
          <motion.div
            variants={item}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="md:col-span-4 bg-white/[0.02] border border-white/[0.05] p-6 md:p-10 rounded-3xl flex flex-col justify-between hover:bg-white/[0.04] hover:border-quark-green/20 backdrop-blur-xl transition-colors cursor-default"
          >
            <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-quark-green mb-4 md:mb-6" />
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">ROI Acelerado</h3>
              <p className="text-sm text-slate-400 font-sans leading-relaxed">
                Retorno do investimento garantido ao manter a geração no pico.
              </p>
            </div>
          </motion.div>

          {/* Bento Item 4 - Large */}
          <motion.div
            variants={item}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="md:col-span-8 bg-white/[0.02] border border-white/[0.05] p-6 md:p-10 rounded-3xl flex flex-col justify-between hover:bg-white/[0.04] hover:border-quark-yellow/20 backdrop-blur-xl transition-colors cursor-default"
          >
            <Activity className="w-8 h-8 md:w-10 md:h-10 text-quark-yellow mb-4 md:mb-6" />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Diagnóstico Preciso</h3>
              <p className="text-sm md:text-base text-slate-400 font-sans leading-relaxed">
                Análise termográfica e elétrica completa. Identificamos anomalias antes que elas se tornem problemas graves, garantindo a longevidade do seu sistema.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
