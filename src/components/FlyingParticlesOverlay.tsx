import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export const FlyingParticlesOverlay: React.FC = () => {
  const { flyingParticles } = useCart();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {flyingParticles.map((particle) => {
          const deltaX = particle.targetX - particle.startX;
          const arcPeakY = Math.min(particle.startY, particle.targetY) - 80;

          return (
            <motion.div
              key={particle.id}
              initial={{
                x: particle.startX - 28,
                y: particle.startY - 28,
                scale: 0.8,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                x: [
                  particle.startX - 28,
                  particle.startX + deltaX * 0.4 - 28,
                  particle.targetX - 16,
                ],
                y: [
                  particle.startY - 28,
                  arcPeakY,
                  particle.targetY - 16,
                ],
                scale: [0.8, 1.15, 0.25],
                opacity: [1, 1, 0.1],
                rotate: [0, -12, 24],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.5, 1],
              }}
              className="absolute top-0 left-0 w-14 h-14 rounded-full overflow-hidden border-2 border-amber-300 shadow-2xl shadow-amber-400/70 bg-[#062319] gpu-accelerate z-50 flex items-center justify-center pointer-events-none"
              style={{
                willChange: 'transform, opacity',
              }}
            >
              <img
                src={particle.imageUrl}
                alt="Cart Add Particle"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full border border-white/40 animate-pulse pointer-events-none" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
