import { useState } from 'react';
import Skills from './skills.jsx';
import Spotify from './spotify.jsx';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  const TerminalVisual = () => (
    <div className="w-full h-64 bg-gray-900 rounded-xl p-6 font-mono text-sm">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="text-green-400">$ cd nishna</div>
        <div className="text-white">hopefully sleeping</div>
        <div className="text-green-500">$ ls hobbies</div>
        <div className="text-white">spending hours picking a font</div>
        <div className="text-green-400">$ git pull</div>
        <div className="text-white">research in progress_</div>
      </div>
    </div>
  );

  const CodeVisual = () => (
    <div className="w-full h-64 bg-gray-900 rounded-xl p-6 overflow-hidden">
      <div className="space-y-3 font-mono text-sm">
        <div className="text-purple-400">
          <span className="text-pink-400">const</span> researcher = &#123;
        </div>
        <div className="text-blue-400 ml-4">
          name: <span className="text-green-400">'Nishna'</span>,
        </div>
        <div className="text-blue-400 ml-4">
          field: <span className="text-green-400">'Quantum Sciences'</span>,
        </div>
        <div className="text-blue-400 ml-4">
          current focus: <span className="text-green-400">'Ground State Preparation'</span>
        </div>
        <div className="text-purple-400">&#125;</div>
        <div className="text-gray-500 text-xs">// scientific computing</div>
      </div>
    </div>
  );

  const visual = isHovered ? <CodeVisual /> : <TerminalVisual />;

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 gap-12 mt-35">

      <div className="max-w-xl text-left mb-10">
        <h1 className="pb-2 text-3xl sm:text-4xl md:text-5xl font-medium text-center md:text-left">
          Nishna Aerabati
        </h1>
        <p className="text-xl sm:text-2xl md:text-lg font-medium pb-3 text-center md:text-left">
          cs + physics @ UIUC
        </p>
        <p className="text-base sm:text-md text-center md:text-left">
          I'm an undergraduate student at the University of Illinois,
          Urbana-Champaign majoring in computer science and physics.
        </p>
      </div>

     
      <div className="max-w-xl text-left">
        <h2 className="text-2xl font-medium pb-6 text-center md:text-left">Research</h2>
        <p className="pb-6 text-lg text-center md:text-left">
          I've been doing research in the Quantum Sciences field, and my work includes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-base sm:text-md">
          <li>Quantum circuit optimizations via ZX Calculus</li>
          <li>Machine learning for quantum control based on superconducting hardware readout data</li>
          <li>Development of filters for superconducting hardware</li>
          <li>Quantum machine learning - developing ansatzes for entanglement detection</li>
          <li>Quantum simulations - Ground state preparation for neutrinos via VQE, DMRG, Hartree-fock</li>
          <li>Open source Cirq contributions</li>
          <li>Circuit benchmarking</li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row justify-center md:items-start gap-6 w-full sm:max-w-6/8  lg:max-w-4/8 mt-10">
        <div className="w-full md:w-1/2"><Skills /></div>

        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <div
            className="cursor-pointer transition-all duration-700 transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {visual}
          </div>
          <div><Spotify /></div>
        </div>
      </div>

    </div>
  );
}