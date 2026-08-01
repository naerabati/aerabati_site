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
      className="w-full max-w-[720px] mx-auto px-4 sm:px-6 pt-12 pb-16 flex flex-col gap-12 text-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Name / Subtitle Header - Centered */}
      <motion.section variants={itemVariants} className="text-center space-y-2 pb-2">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-green-950 dark:text-white">
          Nishna Aerabati
        </h1>
        <p className="font-normal text-base sm:text-xl text-emerald-800 dark:text-emerald-300">
          cs + physics + math @ UIUC
        </p>
      </motion.section>

      {/* Minimal About Me Section - Larger Sizing + Updated Coloring */}
      <motion.section variants={itemVariants} className="space-y-4 text-left">
        <h2 className="text-xs uppercase tracking-widest text-green-950 dark:text-green-400 font-bold">
          About Me
        </h2>
        <div className="space-y-5 text-base sm:text-lg leading-relaxed font-extralight text-gray-800/90 dark:text-gray-200">
          <p>
            Hi, I&apos;m Nishna. I study Computer Science and Physics at the University of Illinois Urbana-Champaign (UIUC) with a minor in Mathematics. My work focuses on quantum information science, scientific computing, and algorithm optimization.
          </p>
          <p>
            Currently, I&apos;m a part of the lab{" "}
            <a
              href="https://github.com/hepqis-uiuc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-green-950 underline decoration-green-800/30 hover:decoration-green-800 transition-colors dark:text-green-300"
            >
              HEP-QIS @ UIUC
            </a>{" "}
            (Quantum Computing for High Energy Physics) under Dr. Draper, developing Python-based simulations of lattice gauge theories tailored for fault-tolerant quantum architectures.
          </p>
          <p>
            This summer, I&apos;m interning at{" "}
            <a
              href="https://sqmscenter.fnal.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-green-950 underline decoration-green-800/30 hover:decoration-green-800 transition-colors dark:text-green-300"
            >
              Fermilab
            </a>{" "}
            in the SQMS center, assisting with quantum circuit simulations and ground-state energy estimation algorithms for high-energy physics.
          </p>
        </div>
      </motion.section>

      {/* Experience & Research Highlights - Sleek Minimal Tabs */}
      <motion.section variants={itemVariants} className="space-y-4 text-left">
        <h2 className="text-xs uppercase tracking-widest text-green-950 dark:text-green-400 font-bold">
          Research & Experience
        </h2>

        <div className="flex flex-col gap-2.5">
          <div className="px-4 py-3.5 rounded-xl border border-green-950/10 hover:border-green-800/30 transition-all duration-300 hover:scale-[1.008] hover:shadow-[0_0_12px_rgba(34,197,94,0.15)] bg-green-950/[0.015]">
            <p className="text-sm sm:text-base font-normal leading-relaxed text-gray-800/90 dark:text-gray-200">
              <a
                href="https://github.com/hepqis-uiuc"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold font-stretch-200% text-green-950 tracking-wide underline decoration-green-800/30 hover:decoration-green-800 transition-colors dark:text-green-300"
              >
                HEP-QIS @ UIUC Lab:
              </a>{" "}
              Developing fault-tolerant Python simulations for lattice gauge theories in high-energy physics.
            </p>
          </div>

          <div className="px-4 py-3.5 rounded-xl border border-green-950/10 hover:border-green-800/30 transition-all duration-300 hover:scale-[1.008] hover:shadow-[0_0_12px_rgba(34,197,94,0.15)] bg-green-950/[0.015]">
            <p className="text-sm sm:text-base font-normal leading-relaxed text-gray-800/90 dark:text-gray-200">
              <a
                href="https://github.com/b-goldsmith/syk-simulation"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold font-stretch-200% text-green-950 tracking-wide underline decoration-green-800/30 hover:decoration-green-800 transition-colors dark:text-green-300"
              >
                PsiQuantum:
              </a>{" "}
              Worked on Construct (an open-access software platform) by building a Sachdev-Ye-Kitaev (SYK) model simulation via different techniques.
            </p>
          </div>

          <div className="px-4 py-3.5 rounded-xl border border-green-950/10 hover:border-green-800/30 transition-all duration-300 hover:scale-[1.008] hover:shadow-[0_0_12px_rgba(34,197,94,0.15)] bg-green-950/[0.015]">
            <p className="text-sm sm:text-base font-normal leading-relaxed text-gray-800/90 dark:text-gray-200">
              <a
                href="https://sqmscenter.fnal.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold font-stretch-200% text-green-950 tracking-wide underline decoration-green-800/30 hover:decoration-green-800 transition-colors dark:text-green-300"
              >
                Simulation Intern @ Fermilab:
              </a>{" "}
              Developing algorithms for ground-state energy estimation at Fermilab's SQMS center.
            </p>
          </div>

          <div className="px-4 py-3.5 rounded-xl border border-green-950/10 hover:border-green-800/30 transition-all duration-300 hover:scale-[1.008] hover:shadow-[0_0_12px_rgba(34,197,94,0.15)] bg-green-950/[0.015]">
            <p className="text-sm sm:text-base font-normal leading-relaxed text-gray-800/90 dark:text-gray-200">
              <a
                href="https://pfaff.physics.illinois.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold font-stretch-200% text-green-950 tracking-wide underline decoration-green-800/30 hover:decoration-green-800 transition-colors dark:text-green-300"
              >
                Pfaff Quantum Circuit Lab @ UIUC:
              </a>{" "}
              Developed ML methods for quantum control optimization on superconducting quantum hardware.
            </p>
          </div>

          <div className="px-4 py-3.5 rounded-xl border border-green-950/10 hover:border-green-800/30 transition-all duration-300 hover:scale-[1.008] hover:shadow-[0_0_12px_rgba(34,197,94,0.15)] bg-green-950/[0.015]">
            <p className="text-sm sm:text-base font-normal leading-relaxed text-gray-800/90 dark:text-gray-200">
              <span className="font-semibold font-stretch-200% text-green-950 tracking-wide dark:text-green-300">
                Google Quantum AI:
              </span>{" "}
              Contributed optimizations, bug fixes, and feature enhancements to the Cirq programming language.
            </p>
          </div>

          <div className="px-4 py-3.5 rounded-xl border border-green-950/10 hover:border-green-800/30 transition-all duration-300 hover:scale-[1.008] hover:shadow-[0_0_12px_rgba(34,197,94,0.15)] bg-green-950/[0.015]">
            <p className="text-sm sm:text-base font-normal leading-relaxed text-gray-800/90 dark:text-gray-200">
              <a
                href="https://chiqp.cs.uchicago.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold font-stretch-200% text-green-950 tracking-wide underline decoration-green-800/30 hover:decoration-green-800 transition-colors dark:text-green-300"
              >
                ChiQP Lab @ UChicago:
              </a>{" "}
              Applied ZX-Calculus techniques toward quantum circuit compilation and gate reduction.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Skills & Spotify Widgets */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left pt-2">
        <Skills />
        <Spotify />
      </motion.section>
    </motion.div>
  );
}