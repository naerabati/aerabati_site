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
    <div>
    <div className="px-4 sm:px-8 py-16 max-w-4xl mx-auto flex flex-col gap-8 pt-25">

        <h1 className="text-center text-5xl sm:text-6xl md:text-left md:text-7xl font-light tracking-tight">
          Nishna Aerabati
        </h1>
       
      <div className="max-w-2xl text-left sm:mb-15">
  
       
        <p className="text-center font-light text-xl sm:text-2xl md:text-left mb-8">
          cs + physics @ UIUC
        </p>
        <p className="text-center md:text-left text-lg max-w-2xl">
          I'm an undergraduate student at the University of Illinois,
          Urbana-Champaign majoring in computer science and physics.
        </p>
      
      </div>

     
      <div className="max-w-4xl text-left">
        <h2 className="text-3xl font-light pb-6 text-center md:text-left">Research</h2>
        <p className="pb-6 text-lg text-center md:text-left">
          I've been doing research in the Quantum Sciences field, and my work includes:
        </p>
        <div className="space-y-4">
            <div className="border-l-2 border-green-700 pl-6 animate-slide-in-left" style={{animationDelay: '0.5s'}}>
              <p >Quantum circuit optimizations via ZX Calculus</p>
            </div>
            <div className="border-l-2 border-green-700  pl-6 animate-slide-in-left" style={{animationDelay: '0.6s'}}>
              <p >Machine learning for quantum control based on superconducting hardware readout data</p>
            </div>
            <div className="border-l-2 border-green-700 pl-6 animate-slide-in-left" style={{animationDelay: '0.7s'}}>
              <p>Development of filters for superconducting hardware</p>
            </div>
            <div className="border-l-2  border-green-700 pl-6 animate-slide-in-left" style={{animationDelay: '0.8s'}}>
              <p >Quantum machine learning - developing ansatzes for entanglement detection</p>
            </div>
            <div className="border-l-2 border-green-700 pl-6 animate-slide-in-left" style={{animationDelay: '0.9s'}}>
              <p >Quantum simulations - Ground state preparation for neutrinos via VQE, DMRG, Hartree-fock</p>
            </div>
            <div className="border-l-2 border-green-700 pl-6 animate-slide-in-left" style={{animationDelay: '1.0s'}}>
              <p >Open source Cirq contributions</p>
            </div>
            <div className="border-l-2 border-green-700 pl-6 animate-slide-in-left" style={{animationDelay: '1.1s'}}>
              <p >Circuit benchmarking</p>
            </div>
          </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center item-center md:items-start gap-6 w-full px-10 md:px-0 lg:max-w-7/8 mt-10">
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

<style jsx>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-15px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-fade-in-up-delay-1 {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out 0.1s forwards;
  }

  .animate-fade-in-up-delay-2 {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out 0.2s forwards;
  }

  .animate-fade-in-up-delay-3 {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out 0.3s forwards;
  }

  .animate-fade-in-up-delay-4 {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out 0.4s forwards;
  }

  .animate-fade-in-up-delay-5 {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out 0.7s forwards;
  }

  .animate-fade-in-up-delay-6 {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out 0.8s forwards;
  }

  .animate-slide-in-left {
    opacity: 0;
    animation: slideInLeft 0.4s ease-out forwards;
  }
`}</style>
</div>
  );
}