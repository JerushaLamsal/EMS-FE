import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Gradient Border Top */}
      <div className="h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.1)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1)_0%,transparent_50%),radial-gradient(circle_at_90%_20%,rgba(251,146,60,0.1)_0%,transparent_50%)]"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                🇳🇵
              </div>
              <h3 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  HamroEvents
                </span>
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Connecting Nepal through unforgettable events, cultural celebrations, and meaningful experiences.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="text-lg">📱</span>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="text-lg">📧</span>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="text-lg">📞</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <span className="w-2 h-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></span>
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="group flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-300">
                  <div className="w-8 h-8 bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <span className="text-sm">🏠</span>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/events" className="group flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-300">
                  <div className="w-8 h-8 bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <span className="text-sm">🎉</span>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Browse Events</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="group flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-300">
                  <div className="w-8 h-8 bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <span className="text-sm">📜</span>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-300">
                  <div className="w-8 h-8 bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <span className="text-sm">📞</span>
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <span className="w-2 h-6 bg-gradient-to-b from-pink-400 to-orange-400 rounded-full"></span>
              <span>Popular Events</span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-slate-300">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🎆</span>
                </div>
                <span>Cultural Festivals</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-300">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🎤</span>
                </div>
                <span>Music Concerts</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-300">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-sm">💼</span>
                </div>
                <span>Business Events</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-300">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-sm">🎨</span>
                </div>
                <span>Art Exhibitions</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-300">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-sm">⚽</span>
                </div>
                <span>Sports Events</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <span className="w-2 h-6 bg-gradient-to-b from-orange-400 to-purple-400 rounded-full"></span>
              <span>Get in Touch</span>
            </h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📧</span>
                </div>
                <div className="text-slate-300">
                  <p className="font-medium">Email Us</p>
                  <p className="text-sm">contactat.jerusha@gmail.com</p>
                  <p className="text-sm">rakshyagr@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📞</span>
                </div>
                <div className="text-slate-300">
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm">+977 9813774974</p>
                  <p className="text-sm">+977 9825110782</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📍</span>
                </div>
                <div className="text-slate-300">
                  <p className="font-medium">Visit Us</p>
                  <p className="text-sm">Newroad, Pokhara</p>
                  <p className="text-sm">Nepal 33700</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Stay Updated with Hamro Events
              </span>
            </h4>
            <p className="text-slate-300 mb-6">Get notified about the latest cultural events, festivals, and celebrations happening across Nepal.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 focus:outline-none transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm flex items-center space-x-2">
              <span>© 2025 HamroEvents. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-white hover:underline transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white hover:underline transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white hover:underline transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-white hover:underline transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
