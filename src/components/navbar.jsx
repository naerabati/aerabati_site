import React from "react";
import { Link } from "react-router-dom";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { MdEmail } from "react-icons/md";

const navItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "posts", label: "Posts", path: "/posts" },
];

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-opacity-70 backdrop-blur-md px-6 py-4 pt-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                state={item.id === "home" ? { skipIntro: true } : undefined}
                className="text-green-950 text-base sm:text-lg md:text-xl hover:text-green-700  hover:shadow-[0_0_8px_#22c55e] transition-all duration-300 px-4 py-2 rounded-3xl font-normal"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons with Larger Circular Glow */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          <a
            href="https://www.linkedin.com/in/naerabati/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-green-950 hover:text-green-700 hover:shadow-[0_0_8px_#22c55e] transition-all duration-300 rounded-full flex items-center justify-center"
            aria-label="LinkedIn"
          >
            <SiLinkedin size={24} />
          </a>

          <a
            href="https://github.com/naerabati"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-green-950 hover:text-green-700 hover:shadow-[0_0_8px_#22c55e] transition-all duration-300 rounded-full flex items-center justify-center"
            aria-label="GitHub"
          >
            <SiGithub size={24} />
          </a>

          <a
            href="mailto:nishnaaer@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-green-950 hover:text-green-700 hover:shadow-[0_0_8px_#22c55e] transition-all duration-300 rounded-full flex items-center justify-center"
            aria-label="Email"
          >
            <MdEmail size={26} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;