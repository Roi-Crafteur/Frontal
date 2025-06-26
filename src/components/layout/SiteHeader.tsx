import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  Globe, 
  Clock, 
  ChevronDown,
  LogOut,
  Shield,
  Palette,
  RefreshCw
} from "lucide-react";
import { useStore } from "../../store/useStore";

export default function SiteHeader() {
  const { currentUser, setActiveModule } = useStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 🕒 Mise à jour de l'heure en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentTimeString = currentTime.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
  
  const currentDate = currentTime.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const userMenuItems = [
    { 
      label: 'Mon Compte', 
      icon: User, 
      action: () => {
        setActiveModule('profile');
        setShowUserMenu(false);
      }
    },
    { 
      label: 'Paramètres Serveur', 
      icon: Settings, 
      action: () => {
        setActiveModule('settings');
        setShowUserMenu(false);
      }
    },
    { 
      label: 'Préférences', 
      icon: Palette, 
      action: () => {
        setActiveModule('preferences');
        setShowUserMenu(false);
      }
    },
    { 
      label: 'Sécurité', 
      icon: Shield, 
      action: () => {
        setActiveModule('security');
        setShowUserMenu(false);
      }
    },
    { 
      label: 'Déconnexion', 
      icon: LogOut, 
      action: () => {
        // Logique de déconnexion
        console.log('Déconnexion...');
        setShowUserMenu(false);
      }, 
      danger: true 
    },
  ];

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
              <motion.div 
                className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <span className="text-white font-bold text-lg">i</span>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  INFOSOFT
                </h1>
                <p className="text-xs text-teal-100">
                  Optimisez·Simplifiez·Performez
                </p>
              </div>
            </div>
          </div>

          {/* Center - Empty space */}
          <div className="flex-1"></div>

          {/* Right side - Actions and user menu */}
          <div className="flex items-center space-x-4">
            {/* Date and time avec animation */}
            <div className="hidden xl:flex items-center space-x-4 text-sm text-teal-100">
              <motion.div 
                className="flex items-center space-x-2"
                key={currentTimeString} // Force re-render pour animation
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 60, ease: "linear", repeat: Infinity },
                    scale: { duration: 2, ease: "easeInOut", repeat: Infinity }
                  }}
                >
                  <Clock className="w-4 h-4" />
                </motion.div>
                <motion.span
                  key={currentTimeString}
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentTimeString}
                </motion.span>
              </motion.div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveModule('notifications');
                }}
                className="relative p-2 text-teal-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <motion.span 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                >
                  3
                </motion.span>
              </motion.button>

              {/* Mobile search button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-2 text-teal-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                title="Rechercher"
              >
                <Search className="w-5 h-5" />
              </motion.button>
            </div>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <User className="h-4 w-4 text-white" />
                  </motion.div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-white">
                      {currentUser?.name || 'POISOT Paul'}
                    </div>
                    <div className="text-xs text-teal-200">
                      {currentUser?.role || 'Administrateur'}
                    </div>
                  </div>
                </div>
                
                <motion.div
                  animate={{ rotate: showUserMenu ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-teal-200" />
                </motion.div>
              </motion.button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    {/* User info header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">
                            {currentUser?.name || 'POISOT Paul'}
                          </div>
                          <div className="text-xs text-teal-100">
                            {currentUser?.email || 'paul.poisot@infosoft.fr'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-2">
                      {userMenuItems.map((item, index) => (
                        <motion.button
                          key={index}
                          onClick={item.action}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${
                            item.danger 
                              ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.1 }}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}