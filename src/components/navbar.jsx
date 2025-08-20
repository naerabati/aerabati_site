import React from "react";
import { Link } from "react-router-dom";
import { SiLinkedin } from "react-icons/si";
import { SiGithub } from "react-icons/si";
import { MdEmail } from "react-icons/md";

const navItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "experience", label: "Experience", path: "/experience" },
  { id: "posts", label: "Posts", path: "/posts" },
];

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-opacity-70 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <ul className="flex space-x-8 ">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className="text-green-950 sm:text-sm md:text-md lg:text-lg hover:text-green-700 hover:shadow-[0_0_8px_#22c55e] transition-all duration-300 px-3 py-1 rounded-3xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social icons on the right */}
        <div className="flex items-center space-x-9 mt-1">
        <a
            href="https://www.linkedin.com/in/naerabati/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-950 hover:text-green-700 transition-all duration-300"
        >
           <SiLinkedin className="" size={24} />
        </a>

        <a
            href="https://github.com/naerabati"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-950 hover:text-green-700 transition-all duration-300"
        >
            <SiGithub size={24} /> 
        </a>

        <a
            href="mailto:nishnaaer@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-950 hover:text-green-700 transition-all duration-300"
        >
            <MdEmail size={28} /> 
        </a>      
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
