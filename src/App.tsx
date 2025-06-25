import React, { useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import StatsCards from './components/dashboard/StatsCards';
import ActivityChart from './components/dashboard/ActivityChart';
import QuickActions from './components/dashboard/QuickActions';
import RecentActivity from './components/dashboard/RecentActivity';
import { useStore } from './store/useStore';
import { motion } from 'framer-motion';

function App() {
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
        className="space-y-4 sm:space-y-6 lg:space-y-8 w-full max-w-full overflow-hidden"
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
            <span>PharmaML</span>
            <span>/</span>
            <span className="text-teal-600 dark:text-teal-400 font-medium">Tableau de Bord</span>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Activity Chart - Takes 2 columns on XL screens */}
          <div className="xl:col-span-2">
            <ActivityChart />
          </div>
          
          {/* Recent Activity - Takes 1 column */}
          <div className="xl:col-span-1">
            <RecentActivity />
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {[
            { title: "Commandes Totales", value: "1,247", change: "+12%", color: "text-teal-600" },
            { title: "Chiffre d'Affaires", value: "€89,432", change: "+8%", color: "text-green-600" },
            { title: "Clients Actifs", value: "354", change: "+5%", color: "text-blue-600" },
            { title: "Taux de Satisfaction", value: "98.5%", change: "+2%", color: "text-purple-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h4 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 leading-tight">
                {stat.title}
              </h4>
              <div className="flex items-end justify-between">
                <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 dark:text-white leading-tight">
                  {stat.value}
                </span>
                <span className={`text-xs sm:text-sm font-medium ${stat.color} leading-tight`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default App;