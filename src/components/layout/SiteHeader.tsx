import React from "react";
import { motion } from "framer-motion";
import { Bell, Search, Settings, User, Globe, Clock } from "lucide-react";

export default function SiteHeader() {
  const currentTime = new Date().toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-2xl z-50"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-white font-bold text-lg">i</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  INFOSOFT
                </h1>
                <p className="text-xs text-teal-100">
                  Plateforme Pharmaceutique
                </p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-200 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher dans la plateforme..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/30 focus:border-white/30 text-white placeholder-teal-200 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Right side - Actions and info */}
          <div className="flex items-center space-x-4">
            {/* Date and time */}
            <div className="hidden lg:flex items-center space-x-4 text-sm text-teal-100">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{currentTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span className="capitalize">{currentDate}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-teal-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-teal-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                title="Paramètres"
              >
                <Settings className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-teal-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                title="Profil"
              >
                <User className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Mobile search button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-teal-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
              title="Rechercher"
            >
              <Search className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}