
import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import { projects } from '../data/projects';
import { ProjectCategory, Project } from '../types';

// 1. Memoized Card Component
const ProjectCard = memo(({ 
  project, 
  onClick 
}: { 
  project: Project; 
  onClick: (p: Project) => void 
}) => {
  return (
    <div 
      onClick={() => onClick(project)}
      className="group relative bg-[#010101] border border-zinc-900/50 flex flex-col justify-between transition-all duration-700 hover:border-purple-900/40 cursor-pointer overflow-hidden transform will-change-transform"
    >
      {/* Image Preview */}
      <div className="w-full h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent z-10 transition-colors duration-500"></div>
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform"
          />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
             <span className="mono text-[10px] text-zinc-700">NO IMAGE</span>
          </div>
        )}
      </div>
      
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-6">
          <span className="mono text-[9px] text-purple-500 tracking-[0.3em] uppercase py-1.5 px-3 bg-purple-950/20 border border-purple-900/20 font-black">
            {project.category === 'Web Development' ? 'WEB' : 'NET'}
          </span>
          <span className="text-2xl font-black italic text-zinc-800 group-hover:text-purple-600 transition-colors duration-500">
            {project.price}
          </span>
        </div>
        <h3 className="text-3xl font-black tracking-tighter mb-4 group-hover:text-white transition-colors uppercase leading-[0.9] italic">
          {project.title}
        </h3>
        <p className="text-zinc-600 leading-relaxed text-sm group-hover:text-zinc-400 transition-colors duration-500 line-clamp-2">
          {project.description}
        </p>
      </div>

      <div className="px-10 pb-10 mt-auto">
        <div className="pt-8 border-t border-zinc-900/30 flex items-center justify-between">
          <span className="mono text-[10px] text-zinc-800 font-bold tracking-widest uppercase italic">SIGNAL-{project.id}</span>
          <button className="flex items-center gap-4 text-[10px] font-black tracking-widest uppercase text-white overflow-hidden group/btn hover:text-purple-400 transition-colors">
            <span className="relative z-10 italic">Expand</span>
            <span className="w-10 h-[1px] bg-purple-900 group-hover/btn:w-16 group-hover/btn:bg-purple-600 transition-all duration-500"></span>
          </button>
        </div>
      </div>
    </div>
  );
});

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Optimized Filter Calculation
  const filteredProjects = useMemo(() => {
    return activeFilter === 'All' 
      ? projects 
      : projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  // 3. useCallback for handlers to maintain referential equality
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosing(false);
      setIsLightboxOpen(false);
    }, 500);
  }, []);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsLightboxOpen(false);
  }, []);

  const handleInquire = useCallback(() => {
    handleClose();
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const offset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 500);
  }, [handleClose]);

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-black relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-12">
        <div>
          <span className="mono text-[10px] text-purple-600 tracking-[0.5em] uppercase mb-4 block font-black italic">Recent Releases</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-white">Archive</h2>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4">
          {['All', 'Web Development', 'Network Administration'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-5 md:px-8 py-3 md:py-4 text-[10px] font-black uppercase tracking-widest border transition-all duration-500 rounded-none italic ${
                activeFilter === filter 
                ? 'bg-purple-900/40 text-white border-purple-600 shadow-[0_0_20px_rgba(107,33,168,0.2)]' 
                : 'bg-transparent text-zinc-700 border-zinc-900 hover:border-purple-900 hover:text-zinc-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900/10">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={handleProjectClick} 
          />
        ))}
      </div>

      {selectedProject && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div 
            className={`absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleClose}
          ></div>

          <div 
            className={`relative w-full max-w-6xl bg-[#030005] border border-zinc-800 shadow-[0_0_100px_rgba(88,28,135,0.2)] flex flex-col md:flex-row overflow-hidden max-h-[90vh] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isClosing ? 'translate-y-10 opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'
            }`}
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-purple-900/50 text-white rounded-full transition-all group border border-white/10 hover:border-purple-500"
            >
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div 
              className="w-full md:w-[65%] relative bg-[#050505] flex items-center justify-center overflow-hidden h-[40vh] md:h-auto border-b md:border-b-0 md:border-r border-zinc-900 group/image cursor-zoom-in"
              onClick={() => setIsLightboxOpen(true)}
            >
               {selectedProject.image ? (
                 <div className="w-full h-full flex items-center justify-center p-4 md:p-8 relative">
                   <img 
                     src={selectedProject.image} 
                     alt={selectedProject.title} 
                     className="w-full h-full object-contain object-center shadow-2xl transition-transform duration-500 group-hover/image:scale-[1.02]"
                   />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300 pointer-events-none">
                     <span className="bg-black/80 backdrop-blur-xl text-white px-4 py-2 rounded-none text-[10px] font-black uppercase tracking-widest border border-purple-500/30 flex items-center gap-2 transform translate-y-4 group-hover/image:translate-y-0 transition-transform">
                       <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                       Fullscreen
                     </span>
                   </div>
                 </div>
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                   <span className="mono text-xs text-zinc-700">NO VISUAL SIGNAL</span>
                 </div>
               )}
            </div>

            <div className="w-full md:w-[35%] p-6 md:p-10 flex flex-col overflow-y-auto bg-[#080212]">
              <div className="mb-auto">
                <div className="flex justify-between items-start mb-6">
                  <span className="mono text-[9px] text-purple-400 tracking-[0.3em] uppercase py-1.5 px-3 bg-purple-900/10 border border-purple-900/20 font-black">
                    {selectedProject.category}
                  </span>
                  <span className="text-3xl font-black italic text-purple-500">
                    {selectedProject.price}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic leading-[0.9] mb-6 text-white">
                  {selectedProject.title}
                </h2>

                <div className="w-20 h-1 bg-gradient-to-r from-purple-700 to-purple-900 mb-6"></div>

                <p className="text-zinc-300 leading-relaxed text-sm font-light mb-8">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                <div className="space-y-4 mb-8">
                  <h4 className="mono text-[10px] text-zinc-600 uppercase tracking-widest font-black">Project Specs</h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {(selectedProject.specs || ['Responsive Design', 'SEO Optimization', 'Fast Performance', 'Security Hardening']).map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-zinc-500 text-xs font-bold uppercase tracking-tight">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-none"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-900/50 flex flex-col gap-3">
                 {selectedProject.link && (
                   <a 
                     href={selectedProject.link} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="w-full py-4 bg-purple-900 hover:bg-purple-800 text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 border border-purple-700 hover:border-purple-500 text-center flex items-center justify-center gap-3 group"
                   >
                     <span className="italic">View Live Project</span>
                     <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                   </a>
                 )}
                 <button 
                   onClick={handleInquire}
                   className="w-full py-4 bg-transparent hover:bg-purple-900/20 text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 border border-purple-900/30 hover:border-purple-500"
                 >
                   Inquire About Similar
                 </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {isLightboxOpen && selectedProject?.image && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[10000] bg-black/98 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-[10001] p-2 group"
            onClick={() => setIsLightboxOpen(false)}
          >
            <svg className="w-10 h-10 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <img 
             src={selectedProject.image} 
             alt="Full Screen View" 
             className="max-w-full max-h-full object-contain shadow-[0_0_100px_rgba(0,0,0,0.5)] cursor-zoom-out"
             onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
          />
        </div>,
        document.body
      )}
    </div>
  );
};

export default memo(Portfolio);
