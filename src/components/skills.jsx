import { PiFileCSharpDuotone, PiFileSqlDuotone } from "react-icons/pi";
import { SiCplusplus, SiQiskit, SiNumpy } from "react-icons/si";
import { FaJava, FaPython, FaRust } from "react-icons/fa";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiJavascript, SiNextdotjs, SiTailwindcss, SiTypescript, SiExpress } from "react-icons/si";

export default function Skills() {
  const skills = [
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3Alt />, name: "CSS" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiCplusplus />, name: "C++" },
    { icon: <PiFileCSharpDuotone />, name: "C#" },
    { icon: <FaRust />, name: "Rust" },
    { icon: <SiQiskit />, name: "Qiskit" },
    { icon: <SiNumpy />, name: "NumPy" },
    { icon: <FaPython />, name: "Python" },
    { icon: <PiFileSqlDuotone />, name: "SQL" },
  ];

  return (
    <section className="w-full max-w-5/8 py-3 md:px-2 lg:px-20 border rounded-2xl  mx-auto">
      <h2 className="text-2xl text-center mb-5 text-green-950 ">Skills</h2>
      <div className="grid grid-cols-8 gap-3 justify-items-center">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center group transition-transform duration-300 hover:scale-110 mb-2"
          >
            <div className="text-green-950 text-4xl group-hover:text-green-700 transition-colors duration-300">
              {skill.icon}
            </div>
            <p className="mt-2 text-sm text-green-950 font-medium">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
