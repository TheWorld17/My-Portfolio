
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const encode = (data: any) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setStatus('error');
      setErrorMessage('A valid email address is required.');
      return;
    }

    setStatus('sending');

    try {
      // FIX: Netlify requires form-name in the body matched with the hidden input
      // Added dynamic subject line so you know who is writing immediately
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          "subject": `Portfolio Inquiry from ${formData.name}`,
          ...formData
        })
      });

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage('Transmission failed. Check connection.');
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
        <div className="space-y-12">
          <div>
            <span className="mono text-[10px] text-purple-600 tracking-[0.5em] uppercase mb-4 block font-black italic">Collaboration</span>
            <h2 className="text-[15vw] lg:text-[120px] font-[900] tracking-tighter uppercase italic leading-[0.75] text-white">Start.<br /><span className="text-zinc-900">Today.</span></h2>
          </div>

          <p className="text-xl md:text-2xl text-zinc-500 font-light leading-snug max-w-md italic">
            Ready to deploy your next high-impact project? Reach out and let's optimize your digital presence.
          </p>

          <div className="space-y-8 pt-12 border-t border-zinc-900">
            <div className="flex flex-col gap-2">
              <span className="mono text-[10px] text-zinc-700 uppercase tracking-widest font-black">Email</span>
              <a href="mailto:broroman8@gmail.com" className="text-2xl md:text-3xl font-black italic text-white hover:text-purple-500 transition-colors tracking-tighter break-all">broroman8@gmail.com</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="mono text-[10px] text-zinc-700 uppercase tracking-widest font-black">Region</span>
              <span className="text-2xl md:text-3xl font-black italic text-zinc-400 tracking-tighter uppercase">Ukraine / Remote</span>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-purple-900/10 blur-[60px] rounded-full opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative bg-[#05010a] border border-zinc-900 p-8 md:p-12 transition-all duration-700 hover:border-purple-600/40">
            {status === 'success' && (
              <div className="absolute inset-0 bg-black z-10 flex flex-col items-center justify-center text-center p-12 animate-fade-in backdrop-blur-md">
                <div className="w-24 h-24 bg-purple-900/20 border border-purple-500 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                  <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-5xl font-black uppercase italic mb-4 tracking-tighter">Success.</h3>
                <p className="text-zinc-500 mb-10 max-w-[240px] leading-tight text-lg">Your signal was received. Anticipate a reply within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mono text-[10px] font-black uppercase tracking-widest border-b-2 border-purple-600 pb-2 hover:text-purple-400 transition-colors">Return to Form</button>
              </div>
            )}

            {/* Netlify Form */}
            <form
              name="contact"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* IMPORTANT: This hidden input is crucial for Netlify to link the AJAX request to the site form */}
              <input type="hidden" name="form-name" value="contact" />
              {/* Honeypot field for spam prevention */}
              <p style={{ display: 'none' }}>
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
              </p>

              <div className="group/field relative">
                <label className="mono text-[10px] text-zinc-600 uppercase tracking-widest block mb-2 font-black transition-colors group-focus-within/field:text-purple-500">Identity</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} placeholder="NAME / COMPANY"
                  className="w-full bg-transparent border-b-2 border-zinc-900 py-3 focus:border-purple-600 transition-all outline-none text-xl md:text-3xl font-black italic tracking-tighter placeholder:text-zinc-800 text-white"
                />
              </div>

              <div className="group/field relative">
                <label className="mono text-[10px] text-zinc-600 uppercase tracking-widest block mb-2 font-black transition-colors group-focus-within/field:text-purple-500">Signal (Email)</label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange} placeholder="EMAIL@DOMAIN.COM"
                  className="w-full bg-transparent border-b-2 border-zinc-900 py-3 focus:border-purple-600 transition-all outline-none text-xl md:text-3xl font-black italic tracking-tighter placeholder:text-zinc-800 text-white"
                />
              </div>

              <div className="group/field relative">
                <label className="mono text-[10px] text-zinc-600 uppercase tracking-widest block mb-2 font-black transition-colors group-focus-within/field:text-purple-500">Message</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} rows={2} placeholder="DESCRIBE YOUR VISION..."
                  className="w-full bg-transparent border-b-2 border-zinc-900 py-3 focus:border-purple-600 transition-all outline-none text-xl md:text-3xl font-black italic tracking-tighter placeholder:text-zinc-800 text-white resize-none"
                ></textarea>
              </div>

              {status === 'error' && <p className="text-red-600 text-[10px] font-black uppercase tracking-widest bg-red-950/20 p-4 border border-red-900">{errorMessage}</p>}

              <button
                type="submit" disabled={status === 'sending'}
                className="w-full py-6 bg-purple-700 text-white font-[900] uppercase tracking-[0.5em] text-[11px] transition-all relative overflow-hidden group/submit shadow-[0_10px_30px_rgba(126,34,206,0.2)] mt-4"
              >
                <span className="relative z-10 italic">{status === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover/submit:translate-y-0 transition-transform duration-700 mix-blend-difference"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
