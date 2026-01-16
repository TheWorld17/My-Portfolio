import React, { useEffect, Suspense, lazy, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy load heavy sections
const Portfolio = lazy(() => import('./components/Portfolio'));
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

// Robust Reveal Component to handle animations safely
interface RevealSectionProps {
  children?: React.ReactNode;
  className?: string;
}

const RevealSection = ({ children, className = "" }: RevealSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Optimization: Once revealed, disconnect to save resources
        if (ref.current) observer.unobserve(ref.current);
      }
    }, {
      threshold: 0.1,
      rootMargin: "50px"
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      // Added will-change-transform to hint browser about upcoming animation
      // Removed generic 'transition-all' in favor of specific properties to avoid layout thrashing
      className={`transform transition-opacity transition-transform duration-1000 ease-out ${className} ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12 will-change-[opacity,transform]'
      }`}
    >
      {children}
    </div>
  );
};

const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center bg-black border-b border-purple-900/10">
    <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent animate-spin rounded-full"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-purple-600 selection:text-white overflow-x-hidden">
      <Header />
      
      <main>
        <section id="home">
          <Hero />
        </section>

        <Suspense fallback={<SectionLoader />}>
          <section id="work" className="py-24 px-6 md:px-12 lg:px-24 border-b border-purple-900/10">
            <RevealSection>
              <Portfolio />
            </RevealSection>
          </section>

          <section id="services" className="py-24 px-6 md:px-12 lg:px-24 bg-[#020005] border-b border-purple-900/10">
            <RevealSection>
              <Services />
            </RevealSection>
          </section>

          <section id="about" className="py-24 px-6 md:px-12 lg:px-24 border-b border-purple-900/10">
            <RevealSection>
              <About />
            </RevealSection>
          </section>

          <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-[#020005]">
            <RevealSection>
              <Contact />
            </RevealSection>
          </section>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;