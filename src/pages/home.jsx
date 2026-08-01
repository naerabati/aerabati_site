import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/hero.jsx";
import Footer from "../components/footer.jsx";
import SapiensMeaning from "../components/SapiensMeaning.jsx";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showIntro, setShowIntro] = useState(() => {
    // If the navigation state asks to skip, skip it for this render
    if (location.state?.skipIntro) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    // Clear state after reading so manual browser reloads always trigger the intro
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