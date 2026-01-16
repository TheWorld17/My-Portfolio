
import React from 'react';

const About: React.FC = () => {
  const skills = [
    "Modern HTML / CSS / Tailwind",
    "React & TypeScript Ecosystem",
    "Conversion-Driven Dev",
    "Network Infrastructure",
    "Linux Systems (RHEL/Ubuntu)",
    "Cisco IOS / CLI",
    "VLAN & STP Architectures",
    "Advanced Subnetting"
  ];

  const languages = [
    { name: "Ukrainian", level: "Native Proficiency" },
    { name: "English", level: "Intermediate (B2)" },
    { name: "Polish", level: "Intermediate (B1)" }
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
        <div className="relative">
          <div className="sticky top-32">
            <span className="mono text-[10px] text-purple-600 tracking-[0.5em] uppercase mb-4 block font-black italic">Biography</span>
            <h2 className="text-7xl md:text-8xl font-[900] tracking-tighter uppercase italic mb-10 text-zinc-100">Roman.</h2>
            
            <div className="space-y-8 text-xl font-light text-zinc-400 leading-relaxed max-w-xl">
              <p>
                I am a hybrid specialist operating at the intersection of <span className="text-purple-500 italic font-black">web architecture</span> and <span className="text-purple-500 italic font-black">network engineering</span>.
              </p>
              <p>
                My approach combines the creative agility of a front-end developer with the analytical rigor of a Cisco-trained network administrator.
              </p>
              <p className="text-zinc-500 text-base md:text-lg italic border-l-2 border-purple-900 pl-6 bg-purple-900/5 py-4">
                "Infrastructure is the backbone of digital expression. My mission is to ensure that backbone is both beautiful and bulletproof."
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-24">
          <div>
            <h3 className="mono text-[10px] text-purple-600 tracking-[0.4em] uppercase mb-10 font-black border-b border-zinc-900 pb-4 italic">Technical Stack</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-5 p-6 bg-[#080212] border border-zinc-900/50 hover:border-purple-800 transition-all duration-500 group">
                  <span className="mono text-[10px] text-zinc-800 group-hover:text-purple-600 transition-colors">{(idx + 1).toString().padStart(2, '0')}</span>
                  <span className="font-black text-sm tracking-tight uppercase italic group-hover:text-white transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mono text-[10px] text-purple-600 tracking-[0.4em] uppercase mb-10 font-black border-b border-zinc-900 pb-4 italic">Communication</h3>
            <div className="space-y-6">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:justify-between md:items-center group border-b border-zinc-900/50 pb-6">
                  <span className="text-4xl md:text-5xl font-[900] italic tracking-tighter group-hover:text-purple-600 transition-all duration-700 uppercase">{lang.name}</span>
                  <span className="mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-black mt-2 md:mt-0">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
