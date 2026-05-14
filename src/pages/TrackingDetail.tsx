import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, MapPin, Clock, ArrowLeft, CheckCircle2, AlertCircle, Truck, Box, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { Shipment, TrackingUpdate } from '../types';
import { getShipmentByTracking } from '../services/mockData';

export default function TrackingDetail() {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const [shipment, setShipment] = useState<Shipment | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      if (trackingNumber) {
        setShipment(getShipmentByTracking(trackingNumber));
      }
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [trackingNumber]);

  if (isLoading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Scanning network...</p>
        </div>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full px-4 text-center">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipment Not Found</h2>
          <p className="text-gray-600 mb-8">We couldn't find a record for the tracking number <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{trackingNumber}</span>.</p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 className="w-5 h-5" />;
      case 'in_transit': return <Truck className="w-5 h-5" />;
      case 'pending': return <Box className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50 border-green-100';
      case 'in_transit': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'out_for_delivery': return 'text-purple-600 bg-purple-50 border-purple-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="pt-24 pb-24 px-4 min-h-screen bg-dark-950">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <Link to="/" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-brand-500 transition-colors mb-8 gap-2 group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Return to Terminal
          </Link>

          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 md:p-14 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
              <Globe className="w-80 h-80 rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-brand-500">
                    <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                    <span className="font-bold tracking-[0.3em] text-[10px] uppercase text-white/60">Live Manifest Tracking</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-thin tracking-tighter text-white">
                    {shipment.status.replace('_', ' ').toUpperCase()}
                  </h1>
                  <p className="font-mono text-xs text-white/30 uppercase tracking-[0.2em]">Archival ID: {shipment.trackingNumber}</p>
                </div>
                <div className="text-right">
                  <p className="label-caps mb-1">Expected Terminal Arrival</p>
                  <p className="text-2xl font-light text-white italic tracking-tight">{new Date(shipment.estimatedDelivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-4">
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: shipment.status === 'delivered' ? '100%' : '65%' }}
                    transition={{ duration: 1.5, ease: 'circOut' }}
                    className="h-full bg-brand-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                  />
                </div>
                <div className="flex justify-between label-caps text-[9px] opacity-40">
                  <span className={shipment.status === 'pending' || shipment.status === 'in_transit' || shipment.status === 'delivered' ? 'text-brand-500 opacity-100' : ''}>Registration</span>
                  <span className={shipment.status === 'in_transit' || shipment.status === 'delivered' ? 'text-brand-500 opacity-100' : ''}>Active Transit</span>
                  <span className={shipment.status === 'delivered' ? 'text-brand-500 opacity-100' : ''}>Archive Locked</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Timeline */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white/40 mb-10 pb-4 border-b border-white/5">Movement Stream</h3>
              
              <div className="space-y-0 relative">
                <div className="absolute left-6 top-8 bottom-8 w-px bg-white/5" />

                {shipment.updates.map((update, i) => (
                  <motion.div 
                    key={update.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-20 pb-16 last:pb-0 group"
                  >
                    <div className={`absolute left-0 w-12 h-12 rounded-xl flex items-center justify-center border z-10 transition-colors ${
                      update.status === 'delivered' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
                      'bg-white/5 border-white/10 text-white/40 group-first:text-brand-500 group-first:border-brand-500/20 group-first:bg-brand-500/5'
                    }`}>
                      {getStatusIcon(update.status)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-[0.1em] block mb-2">
                        {new Date(update.timestamp).toLocaleString()}
                      </span>
                      <h4 className="text-xl font-light text-white mb-2 tracking-tight">{update.description}</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2 font-bold">
                        <MapPin className="w-3 h-3 text-brand-500" />
                        {update.location} Terminal
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-white/40 mb-10 pb-4 border-b border-white/5">Manifest Data</h3>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <p className="label-caps">Principal Consignor</p>
                  <div>
                    <p className="text-lg font-light text-white tracking-tight">{shipment.sender.name}</p>
                    <p className="text-xs text-white/30 leading-relaxed font-light mt-1 uppercase tracking-wider">{shipment.sender.city}, {shipment.sender.country}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="label-caps">Ultimate Consignee</p>
                  <div>
                    <p className="text-lg font-light text-white tracking-tight">{shipment.receiver.name}</p>
                    <p className="text-xs text-white/30 leading-relaxed font-light mt-1 uppercase tracking-wider">{shipment.receiver.city}, {shipment.receiver.country}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div className="space-y-2">
                    <p className="label-caps">Net Mass</p>
                    <p className="text-sm font-mono text-white/60">{shipment.weight}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="label-caps">Configuration</p>
                    <p className="text-sm font-mono text-white/60">{shipment.dimensions}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-500/5 rounded-3xl p-8 border border-brand-500/10">
              <h4 className="text-[11px] font-bold text-brand-500 uppercase tracking-[0.2em] mb-4">Priority Support</h4>
              <p className="text-xs text-white/40 mb-8 font-light leading-relaxed">
                If your transit profile requires manual adjustment or customs overrides, our concierge desk is active.
              </p>
              <button className="w-full py-4 bg-brand-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-brand-400 transition-all active:scale-95">
                Contact Concierge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
