import React, { useState } from 'react';
import { Search, ArrowRight, Shield, Globe, Clock, Package } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/track/${trackingNumber}`);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000" 
            alt="Logistics background" 
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-950/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 text-brand-500 mb-8">
              <div className="w-3 h-3 bg-brand-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.5)]"></div>
              <span className="font-semibold tracking-[0.4em] text-[10px] uppercase">Elite Logistics Portal</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-thin text-white tracking-tighter leading-[0.9] mb-8">
              Universal <br />
              <span className="font-bold text-white/90">Velocity.</span>
            </h1>
            <p className="text-lg text-white/40 mb-12 leading-relaxed font-light max-w-xl">
              Experience absolute precision in global transit. We provide white-glove logistics for the most demanding global trade operations.
            </p>

            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5 group-focus-within:text-brand-500 transition-colors" />
                <input 
                  type="text" 
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter Tracking ID (e.g. VL-482-99)"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-brand-500 transition-all font-mono text-sm placeholder:text-white/10"
                />
              </div>
              <button type="submit" className="bg-white hover:bg-neutral-200 text-black font-black uppercase tracking-widest text-xs px-10 py-5 rounded-xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95">
                TRACK
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-dark-900 py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { val: '220+', label: 'Global Hubs' },
              { val: '5.2M', label: 'Air Tonnage' },
              { val: '99.9%', label: 'Transit Success' },
              { val: '12ms', label: 'API Latency' }
            ].map((stat, i) => (
              <div key={stat.label} className="text-center md:text-left border-l border-white/5 pl-8 first:border-0 md:first:border-l">
                <p className="text-4xl font-light text-white mb-1 tracking-tighter">{stat.val}</p>
                <p className="label-caps">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-dark-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-brand-500 font-bold tracking-[0.3em] text-[10px] uppercase block mb-4">Operations</span>
              <h2 className="text-4xl font-light text-white tracking-tight">The Archival Standard of <br />Global Logistics Management</h2>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed font-light">
              We deploy proprietary routing algorithms and secure transit protocols for high-value assets across all six continents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Shield, 
                title: 'Security Vaults', 
                desc: 'End-to-end encryption for shipment metadata and physical security for all sensitive cargo.' 
              },
              { 
                icon: Globe, 
                title: 'Network Optimization', 
                desc: 'Real-time adjustment of transit paths based on global trade humidity and terminal congestion.' 
              },
              { 
                icon: Clock, 
                title: 'Absolute Timing', 
                desc: 'Precision delivery windows with five-nines reliability for time-critical industrial components.' 
              }
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] p-10 rounded-2xl border border-white/5 hover:border-brand-500/20 transition-all group"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-10 text-white/40 group-hover:text-brand-500 transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed font-light">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
