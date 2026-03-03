import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronRight, Cpu, Activity, ShieldCheck } from 'lucide-react';
import AnalysisLoader from './AnalysisLoader';
import StepProgress from './StepProgress';
import { supabase } from '../lib/supabase';

type MaintenanceFormProps = {
  onSubmit: () => void;
};

export default function MaintenanceForm({ onSubmit }: MaintenanceFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const updateData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(s => s + 1);

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      await supabase.from('landing_page_leads').insert([
        {
          name: formData.name || 'Não informado',
          whatsapp: formData.whatsapp || 'Não informado',
          flow_type: 'maintenance',
          last_maintenance: formData.last_maintenance || 'Não informado',
          symptoms: formData.symptoms || 'Não informado',
          inverter_and_panels: formData.structure || 'Não informado',
          property_type: formData.urgency || 'Não informado'
        }
      ]);
    } catch (error) {
      console.error('Erro ao salvar lead de manutenção:', error);
    }
  };

  useEffect(() => {
    if (isAnalyzing) {
      const timers = [
        setTimeout(() => setAnalysisStep(1), 1500),
        setTimeout(() => setAnalysisStep(2), 3000),
        setTimeout(() => { onSubmit(); }, 4500),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isAnalyzing, onSubmit]);

  const steps = [
    {
      id: 'last_maintenance',
      question: 'Há quanto tempo foi realizada a última limpeza ou revisão técnica no seu sistema?',
      type: 'choice',
      options: ['Menos de 6 meses', 'Entre 6 meses e 1 ano', 'Mais de 1 ano', 'Nunca foi feita'],
      onSelect: (val: string) => {
        updateData('last_maintenance', val);
        nextStep();
      },
    },
    {
      id: 'symptoms',
      question: 'Você notou uma queda brusca na geração ou o sistema apresenta algum alerta no inversor?',
      type: 'choice',
      options: ['Sim, queda na geração', 'Sim, luz vermelha/alerta no inversor', 'Não, apenas manutenção preventiva', 'Não sei avaliar'],
      onSelect: (val: string) => {
        updateData('symptoms', val);
        nextStep();
      },
    },
    {
      id: 'structure',
      question: 'Qual a marca do seu inversor e quantos painéis compõem sua usina?',
      type: 'textarea',
      placeholder: 'Ex: Inversor Growatt, 12 painéis.',
    },
    {
      id: 'urgency',
      question: 'A manutenção é para uma residência, comércio ou usina de solo?',
      type: 'choice',
      options: ['Residência', 'Comércio / Indústria', 'Usina de Solo'],
      onSelect: (val: string) => {
        updateData('urgency', val);
        nextStep();
      },
    },
    {
      id: 'contact',
      question: 'Informe seu Nome e WhatsApp. Nossa engenharia vai analisar esses dados para chegar no seu chat com o diagnóstico prévio pronto.',
      type: 'contact',
    },
  ];

  const currentStep = steps[step];

  const analysisMessages = [
    { icon: <Activity className="w-8 h-8 text-blue-400" />, text: 'Analisando histórico de falhas reportadas...' },
    { icon: <Cpu className="w-8 h-8 text-quark-yellow" />, text: 'Cruzando dados com especificações do inversor...' },
    { icon: <ShieldCheck className="w-8 h-8 text-quark-green" />, text: 'Gerando protocolo de diagnóstico prévio...' },
  ];

  return (
    <section id="maintenance-form" className="py-20 md:py-32 px-4 md:px-6 relative bg-[#0A0F1E]">
      <div className="max-w-3xl mx-auto">
        {!isAnalyzing && (
          <StepProgress currentStep={step} totalSteps={steps.length} stepLabel="Etapa" />
        )}

        <div className="bg-[#161B22] border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <AnalysisLoader
                title="Processando Diagnóstico"
                messages={analysisMessages}
                currentStep={analysisStep}
              />
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-xl md:text-3xl font-semibold tracking-tight mb-8 md:mb-10 text-white leading-snug">
                  {currentStep.question}
                </h3>

                {currentStep.type === 'choice' && (
                  <div className="grid gap-3">
                    {currentStep.options?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => currentStep.onSelect?.(opt)}
                        className="flex items-center justify-between w-full p-4 md:p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-quark-green/30 transition-all group text-left cursor-pointer"
                      >
                        <span className="text-base md:text-lg font-medium text-slate-300 group-hover:text-white transition-colors">{opt}</span>
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-slate-600 group-hover:text-quark-green transition-colors" />
                      </button>
                    ))}
                  </div>
                )}

                {currentStep.type === 'textarea' && (
                  <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-4 md:space-y-6">
                    <textarea
                      required
                      autoFocus
                      rows={4}
                      placeholder={currentStep.placeholder}
                      value={formData[currentStep.id] || ''}
                      onChange={(e) => updateData(currentStep.id, e.target.value)}
                      className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl p-4 md:p-5 text-base md:text-lg focus:outline-none focus:border-quark-green focus:ring-1 focus:ring-quark-green transition-all resize-none text-white placeholder:text-slate-600 font-sans"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full md:w-auto px-6 md:px-8 py-4 rounded-xl bg-white text-[#0A0F1E] font-bold text-sm md:text-base hover:bg-quark-green hover:text-[#0A0F1E] transition-colors cursor-pointer"
                    >
                      Próxima Etapa <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {currentStep.type === 'contact' && (
                  <form onSubmit={handleFinalSubmit} className="space-y-4 md:space-y-6">
                    <div className="space-y-3 md:space-y-4">
                      <input
                        type="text"
                        required
                        placeholder="Seu Nome Completo"
                        value={formData.name || ''}
                        onChange={(e) => updateData('name', e.target.value)}
                        className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl p-4 md:p-5 text-base md:text-lg focus:outline-none focus:border-quark-green transition-all text-white placeholder:text-slate-600 font-sans"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Seu WhatsApp (com DDD)"
                        value={formData.whatsapp || ''}
                        onChange={(e) => updateData('whatsapp', e.target.value)}
                        className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl p-4 md:p-5 text-base md:text-lg focus:outline-none focus:border-quark-green transition-all text-white placeholder:text-slate-600 font-sans"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 md:gap-3 w-full px-6 md:px-8 py-4 md:py-5 rounded-xl bg-quark-green text-[#0A0F1E] font-bold text-base md:text-lg hover:bg-[#00e676] transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Receber Diagnóstico Prévio
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
