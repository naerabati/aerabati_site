import Skills from './skills.jsx';
import Spotify from './spotify.jsx';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.30,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 2.0, 
      ease: [0.16, 1, 0.3, 1] 
    },
  },
};

const experiences = [
  {
    id: 1,
    title: 'Fermilab Quantum Simulation Intern',
    company: 'Fermilab',
    date: 'May 2025 - Aug 2025',
    description: 'Assisted in simulating quantum circuits and developing algorithms for ground state energy estimation.',
  },
  {
    id: 2,
    title: 'Undergraduate Researcher',
    company: 'Pfaff Quantum Circuit Lab',
    date: 'Sept 2024 - Present',
    description: 'Worked on developing a machine learning model for quantum control based on readout data.',
  },
  {
    id: 3,
    title: 'Open Source Contributor',
    company: 'Cirq / Qiskit',
    date: 'May 2021 - Aug 2024',
    description: 'Contributed bug fixes, optimizations, and new features.',
  },
  {
    id: 4,
    title: 'Student Researcher @ UChicago PL Research Lab',
    company: 'UChicago CS Department',
    date: 'Aug 2023 - May 2024',
    description: 'Applied ZX Calculus for quantum circuit optimization.',
  },
];

export default function Hero() {
  return (
    <motion.div
      className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-20 pb-20 flex flex-col gap-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={itemVariants} className="text-green-950 text-center space-y-2">
        <h1 className="text-6xl sm:text-5xl md:text-7xl font-light tracking-tight">
           Nishna Aerabati
        </h1>
        <p className="font-light text-base md:text-2xl sm:text-xl dark:text-gray-400">
           cs + physics @ UIUC
        </p>
      </motion.section>

      {/* Narrative Bio / Research Section */}
      <motion.section variants={itemVariants} className="text-green-950 text-left space-y-3">
        <h2 className="text-xl sm:text-2xl font-light">About & Research</h2>
        <p className="text-sm sm:text-base leading-relaxed dark:text-gray-300 font-light">
          I explore quantum sciences with a focus on scientific computing and hardware optimization. 
          My recent work spans quantum circuit optimizations via ZX Calculus, machine learning for 
          quantum control on superconducting hardware, neutrino ground state preparations (VQE, DMRG, Hartree-Fock), 
          and open-source contributions to Cirq and Qiskit.
        </p>
      </motion.section>

      {/* Experience Section */}
      <motion.section variants={itemVariants} className="text-green-950 space-y-6 text-left">
        <h2 className="text-xl sm:text-2xl font-light">Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-5 border border-green-950 rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_12px_rgba(34,197,94,0.3)] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-semibold leading-snug mb-1">{exp.title}</h3>
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-0.5">{exp.company}</p>
                <p className="text-[11px] text-gray-400 mb-2">{exp.date}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Bottom Grid with Natural Item Alignment */}
      <motion.section variants={itemVariants} className="text-green-950 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
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