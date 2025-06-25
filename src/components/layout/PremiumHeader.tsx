import React from "react";
import { motion } from "framer-motion";
import { useStore } from "../../store/useStore";
import { NotificationCenter } from "../ui/aceternity/notification-center";
import { PremiumButton } from "../ui/aceternity/premium-button";
import { Moon, Sun, User, LogOut, Settings } from "lucide-react";

export default function PremiumHeader() {
  const { currentUser, theme, toggleTheme, logout } = useStore();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Welcome Message */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Bienvenue sur votre frontal de commandes
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Plateforme Premium de Gestion Pharmaceutique
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <PremiumButton
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            icon={theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            className="p-2"
            title={`Passer au thème ${theme === 'light' ? 'sombre' : 'clair'}`}
          >
          </PremiumButton>

          {/* Notifications */}
          <NotificationCenter />

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {currentUser?.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {currentUser?.role}
              </p>
            </div>
            
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Settings */}
          <PremiumButton
            variant="ghost"
            size="sm"
            icon={<Settings className="w-4 h-4" />}
            className="p-2"
            title="Paramètres"
          >
          </PremiumButton>

          {/* Logout */}
          <PremiumButton
            variant="outline"
            size="sm"
            onClick={logout}
            icon={<LogOut className="w-4 h-4" />}
            className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
          >
            <span className="hidden md:inline">Déconnexion</span>
          </PremiumButton>
        </div>
      </div>
    </motion.header>
  );
}