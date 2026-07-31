import Skills from './skills.jsx';
import Spotify from './spotify.jsx';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    },
  },
};

export default function Hero() {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto px-4 sm:px-6 pt-16 pb-20 flex flex-col gap-12 text-green-950"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Name / Subtitle Header */}
      <motion.section variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight">
          Nishna Aerabati
        </h1>
        <p className="font-light text-base sm:text-xl dark:text-gray-400">
          cs + physics @ UIUC
        </p>
      </motion.section>

      {/* Minimal About Me Paragraph Section */}
      <motion.section variants={itemVariants} className="space-y-4 text-center sm:text-left">
        <h2 className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-semibold">
          About Me
        </h2>
        <div className="space-y-3 text-sm sm:text-base leading-relaxed font-light dark:text-gray-300">
          <p>
            I study Computer Science and Physics at the University of Illinois Urbana-Champaign (UIUC).
            My work focuses on quantum information science, scientific computing, and hardware optimization.
          </p>
          <p>
            Currently, I research at the <span className="font-normal text-emerald-700 dark:text-emerald-300">Pfaff Quantum Circuit Lab</span>, 
            developing machine learning models for quantum control based on readout data from superconducting hardware.
          </p>
          <p>
            This summer, I&apos;m interning at <span className="font-normal text-emerald-700 dark:text-emerald-300">Fermilab</span> in the Quantum Simulation group, 
            assisting with quantum circuit simulations and ground-state energy estimation algorithms for high-energy physics.
          </p>
        </div>
      </motion.section>

      {/* Experience & Research Highlights with Hover Glow Effect */}
      <motion.section variants={itemVariants} className="space-y-4">
        <h2 className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-semibold text-center sm:text-left">
          Research & Experience
        </h2>
        <div className="flex flex-col gap-3">
          <div className="p-4 rounded-xl border border-transparent hover:border-green-950/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_12px_rgba(34,197,94,0.25)] bg-green-950/[0.02]">
            <p className="text-sm font-light leading-relaxed dark:text-gray-300">
              <strong className="font-medium text-green-950 dark:text-emerald-300">Fermilab Quantum Simulation Intern:</strong> Assisting in simulating quantum circuits and developing algorithms for ground state energy estimation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-transparent hover:border-green-950/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_12px_rgba(34,197,94,0.25)] bg-green-950/[0.02]">
            <p className="text-sm font-light leading-relaxed dark:text-gray-300">
              <strong className="font-medium text-green-950 dark:text-emerald-300">Pfaff Quantum Circuit Lab:</strong> Developing ML-driven methods for quantum control and readout parameter optimization on superconducting hardware.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-transparent hover:border-green-950/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_12px_rgba(34,197,94,0.25)] bg-green-950/[0.02]">
            <p className="text-sm font-light leading-relaxed dark:text-gray-300">
              <strong className="font-medium text-green-950 dark:text-emerald-300">Open Source (Cirq / Qiskit):</strong> Contributed optimizations, bug fixes, and feature enhancements to open-source quantum computing frameworks.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-transparent hover:border-green-950/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_12px_rgba(34,197,94,0.25)] bg-green-950/[0.02]">
            <p className="text-sm font-light leading-relaxed dark:text-gray-300">
              <strong className="font-medium text-green-950 dark:text-emerald-300">UChicago PL Research Lab:</strong> Applied ZX Calculus techniques toward quantum circuit compilation and gate reduction.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Untouched Bottom Section: Skills & Spotify */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="w-full transition-all duration-300 hover:scale-[1.01]">
          <Skills />
        </div>

        <div className="w-full transition-all duration-300 hover:scale-[1.01] self-stretch">
          <Spotify />
        </div>
      </motion.section>
    </motion.div>
  );
}