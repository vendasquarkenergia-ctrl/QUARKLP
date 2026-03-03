import { motion, AnimatePresence } from 'motion/react';
import type { ReactNode } from 'react';

type AnalysisMessage = {
    icon: ReactNode;
    text: string;
};

type AnalysisLoaderProps = {
    title: string;
    messages: AnalysisMessage[];
    currentStep: number;
};

export default function AnalysisLoader({ title, messages, currentStep }: AnalysisLoaderProps) {
    return (
        <motion.div
            key="analyzing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
        >
            <div className="relative w-24 h-24 mx-auto mb-8">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 border-t-2 border-r-2 border-quark-green rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-2 border-b-2 border-l-2 border-quark-yellow rounded-full opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                        >
                            {messages[currentStep]?.icon}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>

            <AnimatePresence mode="wait">
                <motion.p
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-slate-400 font-mono text-sm"
                >
                    {messages[currentStep]?.text}
                </motion.p>
            </AnimatePresence>
        </motion.div>
    );
}
