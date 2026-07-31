import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/hero.jsx";
import Footer from "../components/footer.jsx";
import SapiensMeaning from "../components/SapiensMeaning.jsx";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if skipIntro was set via Navbar navigation
  const shouldSkip = location.state?.skipIntro ?? false;
  const [showIntro, setShowIntro] = useState(!shouldSkip);

  useEffect(() => {
    // If state was present, clear it immediately so a subsequent reload forces the intro to show again
    if (location.state?.skipIntro) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-white text-gray-900">
      {/* Intro Slide Overlay */}
      {showIntro && <SapiensMeaning onDismiss={() => setShowIntro(false)} />}

      {/* Standard Home Content */}
      <div className="min-h-screen flex flex-col justify-between">
        <Hero />
        <Footer />
      </div>
    </div>
  );
};

export default Home;