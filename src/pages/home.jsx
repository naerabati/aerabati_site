// src/pages/home.jsx
import React, { useState } from "react";
import Hero from "../components/hero.jsx";
import Footer from "../components/footer.jsx";
import SapiensMeaning from "../components/SapiensMeaning.jsx";

const Home = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-white text-gray-900">
      {/* Intro Slide Overlay */}
      {showIntro && <SapiensMeaning onDismiss={() => setShowIntro(false)} />}

      {/* Standard Home Content starting from the top */}
      <div className="min-h-screen flex flex-col justify-between">
        <Hero />
        <Footer />
      </div>
    </div>
  );
};

export default Home;