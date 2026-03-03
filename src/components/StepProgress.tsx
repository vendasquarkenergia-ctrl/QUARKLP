import { motion } from 'motion/react';

type StepProgressProps = {
    currentStep: number;
    totalSteps: number;
    stepLabel?: string;
};

export default function StepProgress({ currentStep, totalSteps, stepLabel = 'Passo' }: StepProgressProps) {
    const percent = Math.round(((currentStep + 1) / totalSteps) * 100);

    return (
        <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-quark-green font-mono text-xs md:text-sm uppercase tracking-wider font-semibold">
                    {stepLabel} {currentStep + 1} de {totalSteps}
                </span>
                <span className="text-slate-500 font-mono text-xs md:text-sm">{percent}% Concluído</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-quark-yellow to-quark-green"
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </div>
    );
}
