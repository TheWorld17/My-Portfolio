
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-24 px-6 md:px-12 lg:px-24 bg-black border-t border-zinc-900/30 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-20">
          <div className="w-full">
            {/* Fixed text sizing for mobile to prevent overflow */}
            <h2 className="text-[13vw] md:text-[14vw] font-[900] tracking-tighter uppercase leading-[0.8] mb-10 md:mb-16 text-[#080808] select-none italic pointer-events-none break-all md:break-normal">
              VYKERYK<span className="text-purple-950/20">.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
              <div className="flex flex-col gap-4 sm:gap-6">
                <span className="mono text-[10px] text-purple-600 uppercase tracking-[0.3em] font-black italic">Communication</span>
                <div className="flex flex-col gap-3">
                  <a href="https://www.linkedin.com/in/roman-vykeryk-b8a133336/" target="_blank" rel="noopener noreferrer" className="text-base sm:text-lg font-black text-zinc-400 hover:text-white transition-all uppercase tracking-tighter italic">LinkedIn</a>
                  <a href="https://freelancehunt.com/freelancer/TheWorld99.html" target="_blank" rel="noopener noreferrer" className="text-base sm:text-lg font-black text-zinc-400 hover:text-white transition-all uppercase tracking-tighter italic">Freelancehunt</a>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:gap-6">
                <span className="mono text-[10px] text-purple-600 uppercase tracking-[0.3em] font-black italic">Logbook</span>
                <p className="text-xs sm:text-sm font-medium text-zinc-500 italic leading-tight">
                  © {currentYear} ROMAN VYKERYK.<br/>
                  ALL SYSTEMS NOMINAL.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
            {/* 
              Fix: Jitter removed. 
              1. Removed 'transition-all' from parent button to stop layout shifts.
              2. Changed line animation to use 'scale-x' instead of changing width.
              3. Changed text color to zinc-400 for better mobile visibility.
            */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mono text-[10px] tracking-[0.4em] flex items-center gap-4 group text-zinc-400 hover:text-purple-400 font-black italic py-4"
            >
              UPWARD 
              <span className="w-16 h-[2px] bg-zinc-800 origin-left transition-transform duration-500 ease-out group-hover:bg-purple-600 group-hover:scale-x-150"></span>
            </button>
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-zinc-800 font-black uppercase tracking-[0.6em] italic whitespace-nowrap">V.03-STABLE</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-950/5 blur-[120px] rounded-full pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
