import React from 'react';
import Footer from "../components/footer.jsx"

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
    description: 'Worked on developing a machine learning model for quantum control based on reaodut data ',
  },
  {
    id: 3,
    title: 'Open Source Contributor',
    company: 'Cirq / Qiskit',
    date: 'May 2021 - Aug 2024',
    description: 'Contributed bug fixes, optimizations, and new features',
  },
  {
    id: 4,
    title: 'Student Researcher @ UChicago Programming Languages Research Lab',
    company: 'UChicago CS Department',
    date: 'Aug 2023 - May 2024',
    description: 'ZX Calculus for circuit optimization',
  },
];

const Experience = () => {
    return (
      <div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl mb-12 text-center font-medium">Experience</h1>
  
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 font-inter">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 bg-[#fafafa] rounded-2xl shadow-sm shadow-green-950 hover:shadow-green-500 shadow-gray hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-shadow duration-300 "
            >
              <h2 className="text-xl font-semibold mb-2">{exp.title}</h2>
              <p className=" font-medium mb-1">{exp.company}</p>
              <p className="text-sm text-gray-500 mb-4">{exp.date}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
      </div>
    );
  };
  
  export default Experience;