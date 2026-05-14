import React, { useState, useEffect } from 'react';
import { LayoutDashboard, TrendingUp, Package, Clock, ArrowUpRight, Search, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { Shipment } from '../types';
import { getAllShipments } from '../services/mockData';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', shipments: 4 },
  { name: 'Tue', shipments: 7 },
  { name: 'Wed', shipments: 5 },
  { name: 'Thu', shipments: 8 },
  { name: 'Fri', shipments: 12 },
  { name: 'Sat', shipments: 6 },
  { name: 'Sun', shipments: 3 },
];

export default function Dashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [search, setSearch] = useState('');
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setShipments(getAllShipments());
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="pt-32 min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-brand-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restricted Access</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Personal cargo management requires a secure session. Please log in to view your shipment console and analytics.
          </p>
          <button 
            onClick={() => {
              // Trigger login modal logic if we had a global state for it, 
              // for now let's just use home which has the button.
              // Actually, I'll just tell them to use the navbar button.
            }}
            className="w-full btn-primary"
          >
            Log In to Continue
          </button>
        </div>
      </div>
    );
  }

  const filteredShipments = shipments.filter(s => 
    s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
    s.receiver.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-24 pb-24 px-4 min-h-screen bg-dark-950">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-brand-500 mb-2">
              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></div>
              <span className="font-bold tracking-[0.3em] text-[9px] uppercase">Operational Interface</span>
            </div>
            <h1 className="text-4xl font-light text-white tracking-tight">Console <span className="font-bold">v1.2</span></h1>
            <p className="text-white/30 text-xs mt-1">Logged: <span className="text-white/60 uppercase tracking-wider">{user?.name}</span></p>
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search vault archives..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 py-3 pl-12 pr-4 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500 transition-colors placeholder:text-white/10"
              />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Vaults', value: shipments.filter(s => s.status !== 'delivered').length, icon: Package, color: 'text-brand-500', bg: 'bg-brand-500/10' },
            { label: 'Global Latency', value: '2.4 days', icon: Clock, color: 'text-white/60', bg: 'bg-white/5' },
            { label: 'Archive Rate', value: '100%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
            { label: 'Network Load', value: '+12.5%', icon: ArrowUpRight, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.02] p-8 rounded-2xl border border-white/5"
            >
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-6`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="label-caps mb-2">{stat.label}</p>
              <p className="text-3xl font-light text-white tracking-tighter">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white/40">Recent Transactions</h3>
              <span className="text-[10px] text-brand-500 uppercase font-black tracking-widest">Real-time Stream</span>
            </div>

            {filteredShipments.length === 0 ? (
              <div className="bg-white/[0.01] p-20 text-center rounded-3xl border border-dashed border-white/5">
                <Package className="w-12 h-12 text-white/5 mx-auto mb-6" />
                <p className="text-white/20 text-xs font-light uppercase tracking-widest">Manifest Empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredShipments.map((shipment, i) => (
                  <motion.div 
                    key={shipment.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-brand-500/30 transition-all group"
                  >
                    <Link to={`/track/${shipment.trackingNumber}`} className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                      <div className="flex items-center space-x-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors ${shipment.status === 'delivered' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10' : 'bg-brand-500/5 text-brand-500 border-brand-500/10'}`}>
                          <Package className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-mono font-bold text-white/30 group-hover:text-brand-500 transition-colors uppercase tracking-widest">{shipment.trackingNumber}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded border font-black uppercase tracking-widest ${
                              shipment.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/10' : 
                              shipment.status === 'in_transit' ? 'bg-brand-500/10 text-brand-500 border-brand-500/10' : 
                              'bg-amber-500/10 text-amber-500 border-amber-500/10'
                            }`}>
                              {shipment.status.replace('_', ' ')}
                            </span>
                          </div>
                          <h4 className="text-xl font-light text-white tracking-tight">{shipment.receiver.name}</h4>
                          <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] font-medium">{shipment.receiver.city} HUB › {shipment.receiver.country}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <p className="text-sm font-light text-white/60 mb-1">Arrival Est.</p>
                        <p className="text-xs font-bold text-white/20 font-mono italic">{new Date(shipment.estimatedDelivery).toLocaleDateString('en-GB')}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Volume Chart */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white/40">Throughput Аналиtics</h3>
            </div>
            <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl h-[340px] flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorShipments" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                      itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                    />
                    <Area 
                      type="stepAfter" 
                      dataKey="shipments" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorShipments)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 flex justify-between label-caps text-[9px] px-2 opacity-50">
                <span>MON</span>
                <span>WED</span>
                <span>FRI</span>
                <span>SUN</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-12 space-y-4">
              <button className="w-full flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 group-hover:text-brand-500 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">Export Vault Logs</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 group-hover:text-amber-500 transition-colors">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">Transaction History</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
