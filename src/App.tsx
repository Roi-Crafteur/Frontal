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
        className="space-y-8 p-6"
      >
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
          >
            Visualisation de votre activité
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ActivityChart />
          </div>
          
          {/* Recent Activity - Takes 1 column */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                {stat.title}
              </h4>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  {stat.value}
                </span>
                <span className={`text-sm font-medium ${stat.color}`}>
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