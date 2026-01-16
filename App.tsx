
import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-purple-600 selection:text-white overflow-x-hidden">
      <Header />
      
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="work" className="py-24 px-6 md:px-12 lg:px-24 border-b border-purple-900/10">
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
            <Portfolio />
          </div>
        </section>

        <section id="services" className="py-24 px-6 md:px-12 lg:px-24 bg-[#020005] border-b border-purple-900/10">
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
            <Services />
          </div>
        </section>

        <section id="about" className="py-24 px-6 md:px-12 lg:px-24 border-b border-purple-900/10">
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
            <About />
          </div>
        </section>

        <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-[#020005]">
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
            <Contact />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
