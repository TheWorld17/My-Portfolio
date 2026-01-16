
import React from 'react';
import Silk from './Silk';

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-start px-6 md:px-12 lg:px-24 overflow-hidden pt-20 bg-black">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <Silk 
            speed={15.1}
            scale={1.4}
            color="#7b1cce"
            noiseIntensity={0.2}
            rotation={4.4}
          />
        </div>
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(88,28,135,0.05)_0%,_transparent_60%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-0 select-none">
          {/* Optimized text sizes for mobile */}
          <h1 className="text-[14vw] md:text-[11vw] leading-[0.8] font-[900] tracking-tighter text-white uppercase italic">
            CREATIVE
          </h1>
          <div className="flex items-center gap-4 md:gap-10">
            <div className="w-12 md:w-40 h-[2px] bg-gradient-to-r from-purple-900 to-transparent mt-2 md:mt-4"></div>
            <h1 className="text-[14vw] md:text-[11vw] leading-[0.8] font-[900] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#2e1065] to-[#0a0a0a] uppercase italic pr-8 md:pr-12">
              DEVELOPER
            </h1>
          </div>
        </div>

        <div className="mt-12 md:mt-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 w-full">
          <div className="flex flex-col gap-6 md:gap-8 max-w-2xl">
            <p className="mono text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] text-purple-400 uppercase font-black flex items-center gap-4">
              <span className="w-8 md:w-12 h-[1px] bg-purple-600"></span>
              CORE DIGITAL INFRASTRUCTURE
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-zinc-400 leading-[1.2] md:leading-[1.1]">
              Roman Vykeryk — Building high-impact <span className="text-white italic font-[900]">landing pages</span> and bulletproof <span className="text-white italic font-[900]">Cisco networks</span>.
            </h2>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-10">
            <p className="text-sm md:text-base text-zinc-500 max-w-[360px] lg:text-right leading-relaxed italic">
              Bridging high-end digital aesthetics with enterprise-grade network security.
            </p>
            <button 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="group relative px-10 py-5 md:px-12 md:py-6 bg-[#1a0b2e] border border-purple-900/30 text-white font-[900] uppercase tracking-[0.25em] text-[10px] md:text-[11px] overflow-hidden transition-all duration-500 hover:border-purple-600 shadow-[0_0_40px_rgba(88,28,135,0.1)] hover:shadow-[0_0_60px_rgba(88,28,135,0.3)]"
            >
              <span className="relative z-10 italic">Initiate Signal</span>
              <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>
        </div>

        <div className="mt-20 md:mt-40">
          <a 
            href="#work" 
            onClick={(e) => scrollToSection(e, 'work')}
            className="mono text-[10px] tracking-[0.4em] text-zinc-600 hover:text-purple-400 transition-all flex items-center gap-4 group font-black cursor-pointer"
          >
            <span className="h-[2px] w-12 bg-zinc-900 group-hover:w-20 group-hover:bg-purple-900 transition-all duration-700"></span>
            SCROLL TO EXPLORE
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
