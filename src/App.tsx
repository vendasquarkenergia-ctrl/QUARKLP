import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PainSection from './components/PainSection';
import WizardForm from './components/WizardForm';
import ThankYou from './components/ThankYou';

import MaintenanceHero from './components/MaintenanceHero';
import MaintenanceBenefits from './components/MaintenanceBenefits';
import MaintenanceForm from './components/MaintenanceForm';
import MaintenanceThankYou from './components/MaintenanceThankYou';

export default function App() {
  const [flow, setFlow] = useState<'solar' | 'maintenance'>('maintenance');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFlowChange = (newFlow: 'solar' | 'maintenance') => {
    setFlow(newFlow);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-quark-dark text-slate-50 font-sans selection:bg-quark-green selection:text-quark-dark flex flex-col relative">
      <Header flow={flow} setFlow={handleFlowChange} />

      {flow === 'solar' ? (
        !isSubmitted ? (
          <>
            <Hero />
            <PainSection />
            <WizardForm onSubmit={() => setIsSubmitted(true)} />
          </>
        ) : (
          <ThankYou />
        )
      ) : (
        !isSubmitted ? (
          <>
            <MaintenanceHero />
            <MaintenanceBenefits />
            <MaintenanceForm onSubmit={() => setIsSubmitted(true)} />
          </>
        ) : (
          <MaintenanceThankYou />
        )
      )}
    </div>
  );
}


