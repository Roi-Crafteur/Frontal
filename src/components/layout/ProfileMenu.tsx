import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronUp, 
  ChevronDown,
  Shield,
  Bell,
  Palette,
  Database
} from "lucide-react";
import { useStore } from "../../store/useStore";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveModule, currentUser } = useStore();
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      label: "Mon Compte",
      icon: User,
      onClick: () => {
        setActiveModule('profile');
        setIsOpen(false);
      }
    },
    {
      label: "Paramètres Serveur",
      icon: Settings,
      onClick: () => {
        setActiveModule('settings');
        setIsOpen(false);
      }
    },
    {
      label: "Préférences",
      icon: Palette,
      onClick: () => {
        setActiveModule('preferences');
        setIsOpen(false);
      }
    },
    {
      label: "Sécurité",
      icon: Shield,
      onClick: () => {
        setActiveModule('security');
        setIsOpen(false);
      }
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Bouton du profil */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-teal-600 transition-colors group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-teal-400 flex items-center justify-center">
            <User className="h-4 w-4 text-teal-900" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">
              {currentUser?.name || 'POISOT Paul'}
            </div>
            <div className="text-xs text-teal-200">
              {currentUser?.role || 'Administrateur'}
            </div>
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUp className="h-4 w-4 text-teal-200" />
        </motion.div>
      </motion.button>

      {/* Menu déroulant */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {/* En-tête du menu */}
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

            {/* Items du menu */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.1 }}
                >
                  <item.icon className="h-4 w-4 text-gray-500" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
              
              {/* Séparateur */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              
              {/* Déconnexion */}
              <motion.button
                onClick={() => {
                  // Logique de déconnexion
                  console.log('Déconnexion...');
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.1 }}
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}