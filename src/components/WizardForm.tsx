import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Cpu, Satellite, FileText } from 'lucide-react';
import AnalysisLoader from './AnalysisLoader';
import StepProgress from './StepProgress';
import { supabase } from '../lib/supabase';

type WizardFormProps = {
  onSubmit: () => void;
};

export default function WizardForm({ onSubmit }: WizardFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const updateData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => Math.max(0, s - 1));

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      const newLeadId = crypto.randomUUID();
      const leadData = {
        id: newLeadId,
        name: formData.name || 'Não informado',
        phone: formData.whatsapp || 'Não informado',
        city: formData.situation || 'Não informado',
        value: 0,
        monthlyConsumption: 0,
        status: 'Lead',
        assignee: 'Sistema',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [{
          id: Date.now().toString(),
          action: 'Criação',
          details: `Lead cadastrado via Landing Page (Orçamento). Serviço: ${formData.service || 'Não informado'}. Problema: ${formData.problem || 'Não informado'}. Dor: ${formData.implication || 'Não informado'}. Expectativa: ${formData.needPayoff || 'Não informado'}.`,
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
      console.error('Erro ao salvar lead no Supabase:', error);
      // Silencioso para não travar a experiência do usuário
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
      id: 'service',
      question: 'O que você precisa resolver hoje?',
      type: 'choice',
      options: ['Orçamento de Energia Solar', 'Manutenção ou Limpeza'],
      onSelect: (val: string) => {
        updateData('service', val);
        if (val === 'Manutenção ou Limpeza') {
          setStep(5);
        } else {
          nextStep();
        }
      },
    },
    {
      id: 'situation',
      question: 'Para a gente começar: qual a sua cidade e qual o valor médio da sua conta de luz?',
      type: 'text',
      placeholder: 'Ex: São Paulo, R$ 800',
    },
    {
      id: 'problem',
      question: 'Legal. E como é o seu telhado hoje? Tem planos de comprar ar-condicionado ou carro elétrico logo?',
      type: 'textarea',
      placeholder: 'Ex: Telhado colonial. Quero colocar 2 ar-condicionados em breve...',
    },
    {
      id: 'implication',
      question: 'Sendo bem sincero: o que mais te incomoda hoje na sua conta de energia?',
      type: 'textarea',
      placeholder: 'Ex: O valor absurdo das taxas, os aumentos todo ano...',
    },
    {
      id: 'needPayoff',
      question: 'Se a gente conseguir resolver isso com um projeto sob medida, o que faria você fechar com a Quark?',
      type: 'textarea',
      placeholder: 'Ex: Preço justo, garantia, instalação rápida...',
    },
    {
      id: 'contact',
      question: 'Perfeito. Qual seu nome e WhatsApp para a nossa engenharia enviar o estudo?',
      type: 'contact',
    },
  ];

  const currentStep = steps[step];

  const analysisMessages = [
    { icon: <Satellite className="w-8 h-8 text-blue-400" />, text: 'Conectando a dados de satélite da sua região...' },
    { icon: <Cpu className="w-8 h-8 text-quark-yellow" />, text: 'Calculando incidência solar e dimensionamento...' },
    { icon: <FileText className="w-8 h-8 text-quark-green" />, text: 'Gerando pré-projeto e projeção financeira...' },
  ];

  // Steps intermediários (1 a 4) permitem voltar
  const canGoBack = !isAnalyzing && step > 0 && step < steps.length - 1 && currentStep.type !== 'choice';

  return (
    <section id="wizard-form" className="py-24 md:py-32 px-4 md:px-6 relative bg-transparent">
      <div className="max-w-3xl mx-auto">
        {!isAnalyzing && (
          <StepProgress currentStep={step} totalSteps={steps.length} />
        )}

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl md:rounded-[2.5rem] p-6 md:p-14 backdrop-blur-xl shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          {/* Subtle inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <AnalysisLoader
                title="Processando Dados"
                messages={analysisMessages}
                currentStep={analysisStep}
              />
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-2xl md:text-4xl font-semibold tracking-tight mb-8 md:mb-10 leading-snug">
                  {currentStep.question}
                </h3>

                {currentStep.type === 'choice' && (
                  <div className="grid gap-3 md:gap-4">
                    {currentStep.options?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => currentStep.onSelect?.(opt)}
                        className="flex items-center justify-between w-full p-4 md:p-6 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-quark-green/30 transition-all group text-left cursor-pointer"
                      >
                        <span className="text-lg md:text-xl font-medium">{opt}</span>
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-slate-500 group-hover:text-quark-green transition-colors" />
                      </button>
                    ))}
                  </div>
                )}

                {(currentStep.type === 'text' || currentStep.type === 'textarea') && (
                  <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-4 md:space-y-6">
                    {currentStep.type === 'text' ? (
                      <input
                        type="text"
                        required
                        autoFocus
                        placeholder={currentStep.placeholder}
                        value={formData[currentStep.id] || ''}
                        onChange={(e) => updateData(currentStep.id, e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 md:p-6 text-base md:text-lg focus:outline-none focus:border-quark-green/50 focus:ring-1 focus:ring-quark-green/50 transition-all text-white placeholder:text-slate-500 font-sans"
                      />
                    ) : (
                      <textarea
                        required
                        autoFocus
                        rows={4}
                        placeholder={currentStep.placeholder}
                        value={formData[currentStep.id] || ''}
                        onChange={(e) => updateData(currentStep.id, e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 md:p-6 text-base md:text-lg focus:outline-none focus:border-quark-green/50 focus:ring-1 focus:ring-quark-green/50 transition-all resize-none text-white placeholder:text-slate-500 font-sans"
                      />
                    )}
                    <div className="flex items-center gap-3">
                      {canGoBack && (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white transition-all cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 flex-1 md:flex-none md:w-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-white text-black font-bold text-base md:text-lg hover:bg-quark-green hover:text-white transition-colors cursor-pointer"
                      >
                        Continuar <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
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
                      className="flex items-center justify-center gap-2 md:gap-3 w-full px-6 md:px-8 py-4 md:py-6 rounded-2xl bg-gradient-to-r from-quark-yellow to-quark-green text-quark-dark font-bold text-lg md:text-xl shadow-[0_0_30px_rgba(0,210,106,0.2)] hover:shadow-[0_0_50px_rgba(0,210,106,0.4)] transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                      Solicitar Estudo de Viabilidade
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
