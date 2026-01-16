
import React, { useState, useEffect, useRef, useCallback, memo } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);

  // Static constant for nav links
  const NAV_LINKS = useRef([
    { name: 'HOME', href: '#home', num: '01' },
    { name: 'WORK', href: '#work', num: '02' },
    { name: 'SERVICES', href: '#services', num: '03' },
    { name: 'ABOUT', href: '#about', num: '04' },
    { name: 'CONTACT', href: '#contact', num: '05' },
  ]).current;

  useEffect(() => {
    const handleScroll = () => {
      // Throttle via requestAnimationFrame
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Determine if header should be visible (Headroom logic)
        // Only update if state actually changes to avoid re-renders
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false); 
        } else {
          setIsVisible(true);
        }
        
        setIsScrolled(currentScrollY > 50);
        lastScrollY.current = currentScrollY;

        // Update active section
        // Optimization: Use logic to avoid reading layout if not needed, 
        // but here we need it. Checking sections involves layout read.
        // We limit this logic to the animation frame.
        const sections = ['home', 'work', 'services', 'about', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Expanded range to prevent flickering active state
            return rect.top >= -200 && rect.top <= window.innerHeight / 2;
          }
          return false;
        });
        if (current) setActiveSection(current);

        rafId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-[100] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled ? 'bg-[#05010a]/90 backdrop-blur-xl py-4 border-b border-purple-900/20 shadow-2xl' : 'bg-transparent py-8'
        } will-change-transform`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#home" className="text-2xl font-black tracking-tighter group flex items-center gap-1" onClick={(e) => handleLinkClick(e, '#home')}>
            ROMAN<span className="text-purple-600 group-hover:text-white transition-colors">.</span>V
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`mono text-[10px] tracking-[0.3em] transition-colors duration-300 flex items-center gap-1 hover:text-purple-500 font-black ${
                  activeSection === link.href.replace('#', '') ? 'text-purple-600' : 'text-zinc-600'
                }`}
              >
                <span className="opacity-30">/{link.num}</span>
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative z-[110] w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-4 flex flex-col justify-between items-end">
              <span className={`h-[2px] bg-white transition-all duration-500 ease-out ${isMenuOpen ? 'w-6 translate-y-[7px] -rotate-45' : 'w-6'}`}></span>
              <span className={`h-[2px] bg-purple-600 transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-0 scale-x-0' : 'w-4'}`}></span>
              <span className={`h-[2px] bg-white transition-all duration-500 ease-out ${isMenuOpen ? 'w-6 -translate-y-[7px] rotate-45' : 'w-6'}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#05010a] z-[105] md:hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        {/* Background Decor */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(107,33,168,0.1)_0%,_transparent_60%)]"></div>
        
        {/* Close Button Inside Overlay (Explicit 'X') */}
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-6 p-4 text-white hover:text-purple-500 transition-colors z-20 group"
          aria-label="Close Menu"
        >
          <svg className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-start justify-center h-full px-12 space-y-8 relative z-10">
          <div className="mono text-[10px] text-purple-600 tracking-[0.5em] mb-4 font-black italic">NAVIGATION</div>
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="group flex items-baseline gap-4"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="mono text-xs text-zinc-800 font-bold">0{index + 1}</span>
              <span className={`text-5xl font-[900] tracking-tighter uppercase italic transition-colors duration-300 ${
                activeSection === link.href.replace('#', '') ? 'text-purple-600' : 'text-zinc-800 group-hover:text-white'
              }`}>
                {link.name}
              </span>
            </a>
          ))}
          
          <div className="pt-12 border-t border-zinc-900 w-full max-w-xs">
            <p className="mono text-[10px] text-zinc-600 uppercase tracking-widest mb-4">Social Signal</p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/roman-vykeryk-b8a133336/" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest hover:text-purple-500 transition-colors">LinkedIn</a>
              <a href="https://freelancehunt.com/freelancer/TheWorld99.html" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest hover:text-purple-500 transition-colors">Freelancehunt</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Header);
