import { useEffect, useState } from "react";
import ParticleWorldMap from "./effects/worldmap/ParticleWorldMap";

export default function SapiensMeaning({ onDismiss }) {
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== " " && event.code !== "Space") return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(target.tagName)
      ) {
        return;
      }
      event.preventDefault();
      handleEnter();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleEnter = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setIsSliding(true);
    setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 750);
  };

  return (
    <div
      aria-labelledby="landing-name-heading"
      className={`fixed inset-0 z-50 h-screen w-screen min-h-full min-w-full overflow-hidden bg-[#071712] transform transition-transform duration-[750ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isSliding ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Background Canvas */}
      <div className="absolute inset-0 h-full w-full">
        <ParticleWorldMap />
      </div>

      {/* Center Front Title */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1
          id="landing-name-heading"
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#FAF6EE]"
        >
          Nishna Aerabati
        </h1>
        {/* Added pl-[0.28em] and font-mono for precise alignment balance */}
        <p className="mt-4 font-mono text-xs sm:text-sm tracking-[0.28em] pl-[0.28em] text-[#FAF6EE]/80 uppercase">
          cs + physics @ UIUC
        </p>
      </div>

      {/* Start Button */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-6 pb-10 sm:pb-12 gap-2">
        <button
          type="button"
          onClick={handleEnter}
          className="pointer-events-auto select-none font-mono text-[11px] uppercase tracking-[0.22em] pl-[0.22em] text-[#FAF6EE]/60 outline-none transition-colors duration-200 hover:text-[#FAF6EE] flex items-center justify-center gap-2"
        >
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-[#FAF6EE]/10 border border-[#FAF6EE]/20 rounded font-sans tracking-normal">
            SPACE
          </kbd>
          <span>or Click to enter</span>
        </button>
      </div>
    </div>
  );
}