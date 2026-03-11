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
      const newLeadId = crypto.randomUUID();
      const leadData = {
        id: newLeadId,
        name: formData.name || 'Não informado',
        phone: formData.whatsapp || 'Não informado',
        city: 'Não informado',
        value: 0,
        monthlyConsumption: 0,
        status: 'Lead',
        assignee: 'Sistema',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [{
          id: Date.now().toString(),
          action: 'Criação',
          details: `Lead cadastrado via Landing Page (Manutenção). Tipo: ${formData.urgency || 'Não informado'}. Última manutenção: ${formData.last_maintenance || 'Não informado'}. Sintomas: ${formData.symptoms || 'Não informado'}. Inversor/Painéis: ${formData.structure || 'Não informado'}.`,
          timestamp: new Date().toISOString(),
          author: 'Landing Page'
        }]
      };

      await supabase.from('leads').upsert({
        id: newLeadId,
        data: leadData,
        updated_at: new Date().toISOString()
      });
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
    <section id="maintenance-form" className="py-24 md:py-32 px-4 md:px-6 relative bg-transparent">
      <div className="max-w-3xl mx-auto">
        {!isAnalyzing && (
          <StepProgress currentStep={step} totalSteps={steps.length} stepLabel="Etapa" />
        )}

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
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
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 md:p-6 text-base md:text-lg focus:outline-none focus:border-quark-green/50 focus:ring-1 focus:ring-quark-green/50 transition-all resize-none text-white placeholder:text-slate-500 font-sans"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full md:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-white text-black font-bold text-base md:text-lg hover:bg-white/90 transition-colors cursor-pointer"
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
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 md:p-6 text-base md:text-lg focus:outline-none focus:border-quark-green/50 transition-all text-white placeholder:text-slate-500 font-sans"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Seu WhatsApp (com DDD)"
                        value={formData.whatsapp || ''}
                        onChange={(e) => updateData('whatsapp', e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 md:p-6 text-base md:text-lg focus:outline-none focus:border-quark-green/50 transition-all text-white placeholder:text-slate-500 font-sans"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 md:gap-3 w-full px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-gradient-to-r from-quark-yellow to-quark-green text-quark-dark font-bold text-base md:text-lg shadow-[0_0_30px_rgba(0,210,106,0.2)] hover:shadow-[0_0_50px_rgba(0,210,106,0.4)] transition-all cursor-pointer"
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
