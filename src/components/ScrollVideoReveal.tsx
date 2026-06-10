import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function ScrollVideoReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Começa a animação quando o topo do componente atinge a parte inferior da janela (start end)
    // Termina a animação quando o centro do componente atinge o centro da janela (center center)
    offset: ["start end", "center center"]
  });

  // Escala vai de 0.8 até 1.0 (zoom in no container)
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  // Opacidade vai de 0.4 até 1.0
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-10 md:py-20 flex justify-center items-center overflow-hidden"
    >
      <motion.div 
        style={{ scale, opacity }}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 aspect-video sm:aspect-[21/9] lg:aspect-[16/9] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl shadow-quark-green/20 border border-white/10 relative group"
      >
        <video 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          {/* O arquivo do vídeo deve estar na pasta "public" do projeto */}
          <source src="/seu-video.mp4" type="video/mp4" />
          <p className="text-white text-center pt-20">Seu navegador não suporta a reprodução deste vídeo.</p>
        </video>
        
        {/* Overlay gradient sutil para manter contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-quark-darker/60 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </section>
  );
}
