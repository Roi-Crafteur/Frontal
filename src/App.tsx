import React, { useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import StatsCards from './components/dashboard/StatsCards';
import ActivityChart from './components/dashboard/ActivityChart';
import RecentActivity from './components/dashboard/RecentActivity';
import { useStore } from './store/useStore';
import { motion } from 'framer-motion';

function App() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅';
    if (hour < 18) return '☀️';
    return '🌙';
  };

  const { fetchOrders, fetchProducts, fetchOfficines } = useStore();

  useEffect(() => {
    // Initialize data on app load
    const initializeData = async () => {
      try {
        await Promise.all([
          fetchOrders(),
          fetchProducts(),
          fetchOfficines()
        ]);
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, [fetchOrders, fetchProducts, fetchOfficines]);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 sm:space-y-6 lg:space-y-8 w-full max-w-full overflow-hidden pb-8"
      >
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2"
          >
            Visualisation de votre activité
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
          >
            <span>{getGreeting()}</span>
            <span> (utilisateur) </span>
            <span>sur votre</span>
            <span className="text-teal-600 dark:text-teal-400 font-medium">frontal</span>
            <span>de commandes</span>
            <span>{getGreetingEmoji()}</span>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Header pour la section graphique et activité */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
            Analyse et Activité
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Suivi des performances et activités récentes
          </p>
        </div>

        {/* Main Content Grid - Même taille pour les deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8">
          {/* Activity Chart */}
          <div className="w-full">
            <ActivityChart />
          </div>
          
          {/* Recent Activity */}
          <div className="w-full">
            <RecentActivity />
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default App;