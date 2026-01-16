
import React, { memo } from 'react';

// 1. Move static data outside component to avoid recreation on every render
const SERVICES_DATA = [
  {
    title: "Web Landing Pages",
    features: [
      "Conversion-focused UI/UX",
      "Lead Capture Architecture",
      "CRM & API Integrations",
      "Next-gen Performance",
      "Search Visibility Strategy",
      "Hardened Security Protocols"
    ],
    delivery: "3–7 days",
    price: "$25–100",
    id: "MODULE-01",
    description: "High-performance digital entry points designed to convert traffic into revenue. Built for speed, aesthetics, and user retention."
  },
  {
    title: "Cisco Networking",
    features: [
      "Packet Tracer Simulation",
      "VLAN & Network Segmentation",
      "Routing Protocol Optimization",
      "IP Address Planning (VLSM)",
      "Automated DHCP Configs",
      "Security-First Troubleshooting"
    ],
    delivery: "2–7 days",
    price: "$50–150",
    id: "MODULE-02",
    description: "Enterprise-grade network architecture ensuring security, scalability, and uptime. Optimized for complex traffic flows."
  }
];

// 2. Extract Card into a Memoized Component
const ServiceCard = memo(({ service }: { service: typeof SERVICES_DATA[0] }) => {
  // Pre-calculate split logic once per card mount
  const titleParts = service.title.split(' ');

  return (
    <div className="group relative p-[1px] transition-all duration-500 transform will-change-transform">
      {/* Animated Gradient Border - Optimized with opacity transition */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-800 group-hover:from-purple-600 group-hover:via-purple-900 group-hover:to-purple-600 transition-opacity duration-700 opacity-50 group-hover:opacity-100"></div>

      {/* Card Content */}
      <div className="relative h-full bg-[#050505] p-8 md:p-12 flex flex-col overflow-hidden">
          
          {/* Decorative Grid - CSS only, no JS impact */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>
          
          {/* Glow effect - GPU accelerated opacity transition */}
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-purple-900/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none will-change-[opacity]"></div>

          <div className="relative z-10 mb-10 flex justify-between items-start border-b border-white/5 pb-6">
              <span className="mono text-[10px] text-zinc-500 group-hover:text-purple-400 transition-colors font-black tracking-widest bg-zinc-900/50 px-3 py-1 border border-zinc-800 group-hover:border-purple-500/30">{service.id}</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-zinc-800 group-hover:bg-purple-500 transition-colors"></div>
                <div className="w-1 h-1 bg-zinc-800 group-hover:bg-purple-500 transition-colors delay-75"></div>
                <div className="w-1 h-1 bg-zinc-800 group-hover:bg-purple-500 transition-colors delay-100"></div>
              </div>
          </div>

          <div className="relative z-10 mb-8">
             <h3 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase italic leading-[0.9] text-white mb-6">
               {titleParts.map((word, i) => (
                 <span key={`${service.id}-word-${i}`} className={i === 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 block mb-1" : "text-zinc-700 group-hover:text-white transition-colors duration-500 block"}>
                   {word}
                 </span>
               ))}
             </h3>
             <p className="text-zinc-500 text-sm leading-relaxed max-w-sm border-l-2 border-purple-900/20 pl-4 group-hover:border-purple-500 transition-colors duration-500">
               {service.description}
             </p>
          </div>

          <ul className="relative z-10 space-y-4 mb-12">
            {service.features.map((feature, idx) => (
              <li key={`${service.id}-feat-${idx}`} className="flex items-center gap-4 text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300">
                <div className="w-1 h-1 bg-purple-600 rounded-full shadow-[0_0_8px_rgba(147,51,234,0.5)] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-xs font-bold uppercase tracking-wide">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="relative z-10 mt-auto grid grid-cols-2 gap-px bg-zinc-900/30 border border-zinc-900/50">
             <div className="bg-[#080808] p-5 group-hover:bg-[#0a0510] transition-colors duration-500">
                <p className="mono text-[9px] text-zinc-600 uppercase font-black mb-2 tracking-widest">Efficiency</p>
                <p className="text-xl font-black italic text-white">{service.delivery}</p>
             </div>
             <div className="bg-[#080808] p-5 group-hover:bg-[#0a0510] transition-colors duration-500 border-l border-zinc-900/30">
                <p className="mono text-[9px] text-zinc-600 uppercase font-black mb-2 tracking-widest">Rate</p>
                <p className="text-xl font-black italic text-purple-500 group-hover:text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]">{service.price}</p>
             </div>
          </div>
      </div>
    </div>
  );
});

const Services: React.FC = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto relative">
      <div className="mb-24 relative z-10">
        <span className="mono text-[10px] text-purple-600 tracking-[0.5em] uppercase mb-4 block font-black italic">Core Modules</span>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-white mix-blend-difference">Services</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
        {SERVICES_DATA.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

// 3. Memoize the parent to prevent re-renders from App.tsx updates
export default memo(Services);
