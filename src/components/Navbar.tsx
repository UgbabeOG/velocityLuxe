import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, Search, LayoutDashboard, Send, User, LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login, logout, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');

  const navItems = [
    { name: 'Track', path: '/', icon: Search },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    setShowLoginModal(false);
    navigate('/dashboard');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                  <Package className="text-black w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-[0.2em] text-white uppercase hidden sm:block leading-none">
                    Velocity Luxe
                  </span>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest hidden sm:block">Logistics</span>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-200 ${
                      isActive ? 'text-brand-500' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-40'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-white/40 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{user?.name}</span>
                    <span className="text-[9px] text-brand-500 uppercase tracking-widest">Elite Tier</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-red-400 transition-colors"
                    title="Log out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-2 bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-all active:scale-95 flex items-center gap-2"
                >
                  <User className="w-3 h-3 opacity-50" />
                  Access Portal
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-dark-900 border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3 text-brand-500">
                    <div className="w-3 h-3 bg-brand-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.5)]"></div>
                    <span className="font-bold tracking-[0.3em] text-xs uppercase text-white">Velocity Luxe</span>
                  </div>
                  <button onClick={() => setShowLoginModal(false)} className="p-2 text-white/20 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <h2 className="text-2xl font-light tracking-tight text-white mb-2">Internal Access</h2>
                <p className="text-white/40 text-xs tracking-wide mb-8">Authorised logistics personnel only.</p>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="label-caps">Corporate Email</label>
                    <input 
                      required 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vane.a@velocityluxe.com" 
                      className="input-field" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label-caps">Access Token</label>
                    <input 
                      required 
                      type="password" 
                      placeholder="••••••••" 
                      className="input-field" 
                    />
                  </div>
                  <button type="submit" className="w-full btn-amber py-4 mt-4 shadow-lg shadow-brand-500/10 uppercase tracking-widest text-[11px]">
                    Confirm Identity
                  </button>
                </form>

                <div className="mt-10 pt-8 border-t border-white/5 text-center">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] leading-relaxed">
                    By accessing this vault, you consent to secure data logging and high-precision routing governance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
