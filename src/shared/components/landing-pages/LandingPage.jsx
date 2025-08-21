import React from 'react';
import Home from './Home';
import Features from './Features';
import Pricing from './Pricing';
import About from './About';
import Contact from './Contact';

const LandingPage = () => {
  return (
    <div className="pt-14"> {/* Padding to account for fixed toolbar */}
      <section id="home">
        <Home />
      </section>
      
      <section id="features" className="bg-gray-50">
        <Features />
      </section>
      
      <section id="pricing">
        <Pricing />
      </section>
      
      <section id="about" className="bg-gray-50">
        <About />
      </section>
      
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default LandingPage;