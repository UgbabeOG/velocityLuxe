import React from 'react';
import { Package, Globe, Shield, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-2 text-white mb-6">
            <Package className="w-8 h-8 text-brand-500" />
            <span className="text-xl font-bold tracking-tight">SwiftStream</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Global logistics reinvented. Fast, secure, and transparent shipping solutions for businesses and individuals worldwide.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Services</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Express International</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Standard Worldwide</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Freight Solutions</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Customs Clearance</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About SwiftStream</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Support</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="w-4 h-4 text-brand-500" />
              <span>+1 (800) SWIFT-88</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Globe className="w-4 h-4 text-brand-500" />
              <span>International Support</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Shield className="w-4 h-4 text-brand-500" />
              <span>Privacy & Security</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>© 2024 SwiftStream Logistics. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
