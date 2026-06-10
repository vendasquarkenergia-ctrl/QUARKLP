import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function HouseScrollTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // A animação começa quando o topo da imagem entra na parte de baixo da tela
    // e termina quando o centro da imagem chega no centro da tela.
    offset: ["start end", "center center"]
  });

  const overlayOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <section 
      ref={containerRef} 
      // Removida a altura de 250vh e o sticky. Agora ele flui naturalmente na página.
      // A margem negativa puxa ele levemente para cima para integrar com o Hero.
      className="relative w-full bg-quark-darker pb-20 -mt-10 md:-mt-20 px-4 sm:px-6 lg:px-8 z-20 flex justify-center"
    >
        <motion.div 
          style={{ scale }}
          className="relative w-full max-w-7xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl shadow-quark-green/20 border border-white/10"
        >
          {/* FOTO 1: A BASE (Casa Vazia e Escura) */}
          <img 
            src="/casa-vazia.jpg" 
            alt="Casa vazia ao entardecer" 
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* FOTO 2: O EFEITO (Casa com Painéis e Dinheiro) que surge por cima */}
          <motion.img 
            src="/casa-paineis.jpeg" 
            alt="Casa com energia instalada" 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradiente sutil nas bordas para misturar com o fundo escuro do site */}
          <div className="absolute inset-0 bg-gradient-to-t from-quark-darker/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>
    </section>
  );
}
