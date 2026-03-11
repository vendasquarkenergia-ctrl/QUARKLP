import { motion } from 'motion/react';
import { CheckCircle, MessageCircle, Instagram, AlertCircle } from 'lucide-react';
import { WHATSAPP_URL, INSTAGRAM_URL } from '../lib/constants';

export default function MaintenanceThankYou() {
  return (
    <section className="min-h-[100svh] flex items-center justify-center px-4 md:px-6 py-24 relative overflow-hidden bg-transparent">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-quark-green/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto w-full text-center relative z-10">
        {/* Icon — mesmo nível visual do ThankYou solar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
          className="w-24 h-24 bg-gradient-to-br from-quark-yellow/20 to-quark-green/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-quark-green/30 shadow-[0_0_40px_rgba(0,210,106,0.2)]"
        >
          <CheckCircle className="w-12 h-12 text-quark-green" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 text-white">
            Protocolo Iniciado
          </h1>

          <p className="text-base md:text-xl text-slate-400 mb-10 leading-relaxed font-sans px-2">
            Nossos engenheiros estão revisando as especificações do seu inversor e histórico relatado.
          </p>

          {/* Notice de urgência — equalizado com o ThankYou solar */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-3xl p-8 mb-10 relative overflow-hidden text-left flex gap-6 items-start shadow-lg">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-500" />
            <AlertCircle className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold text-amber-400 mb-2">Atenção ao seu WhatsApp</h4>
              <p className="text-amber-500/80 font-medium leading-relaxed font-sans">
                Nossa equipe técnica já está a postos para agendar sua vistoria. O agendamento é imediato e as datas disponíveis para este mês são limitadas.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Próximo Passo</p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full md:w-auto mx-auto px-10 py-5 rounded-2xl bg-[#25D366] text-white font-bold text-lg hover:bg-[#20bd5a] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all"
            >
              <MessageCircle className="w-6 h-6" />
              Falar com Especialista em Manutenção
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full md:w-auto mx-auto px-10 py-5 rounded-2xl bg-white/[0.03] border border-white/5 text-white font-medium hover:bg-white/[0.06] transition-all"
            >
              <Instagram className="w-5 h-5" />
              Siga a Quark no Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
