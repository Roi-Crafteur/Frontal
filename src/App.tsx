import React, { useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import PremiumHeader from './components/layout/PremiumHeader';
import PremiumStatsCards from './components/dashboard/PremiumStatsCards';
import PremiumActivityChart from './components/dashboard/PremiumActivityChart';
import PremiumQuickActions from './components/dashboard/PremiumQuickActions';
import PremiumRecentActivity from './components/dashboard/PremiumRecentActivity';
import { useStore } from './store/useStore';
import { motion } from 'framer-motion';

function App() {
  const { 
    fetchOrders, 
    fetchProducts, 
    fetchOfficines, 
    fetchUsers,
    addNotification,
    theme 
  } = useStore();

  useEffect(() => {
    // Initialize data on app load
    const initializeData = async () => {
      await Promise.all([
        fetchOrders(),
        fetchProducts(),
        fetchOfficines(),
        fetchUsers()
      ]);
      
      // Add welcome notification
      addNotification({
        type: 'success',
        title: 'Bienvenue !',
        message: 'Plateforme Premium de Gestion Pharmaceutique initialisée avec succès.',
        read: false
      });
    };

    initializeData();
  }, [fetchOrders, fetchProducts, fetchOfficines, fetchUsers, addNotification]);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <DashboardLayout>
        {/* Premium Header */}
        <PremiumHeader />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen"
        >
          {/* Page Title */}
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4"
            >
              Visualisation de votre activité
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <span className="font-medium">PharmaML</span>
              <span>/</span>
              <span className="text-teal-600 dark:text-teal-400 font-semibold">Tableau de Bord Premium</span>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <PremiumQuickActions />

          {/* Stats Cards */}
          <PremiumStatsCards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Activity Chart - Takes 2 columns */}
            <div className="lg:col-span-2">
              <PremiumActivityChart />
            </div>
            
            {/* Recent Activity - Takes 1 column */}
            <div className="lg:col-span-1">
              <PremiumRecentActivity />
            </div>
          </div>

          {/* Additional Premium Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Performance Globale", 
                value: "98.5%", 
                change: "+2.1%", 
                color: "text-green-600",
                gradient: "from-green-500 to-green-600",
                description: "Taux de satisfaction client"
              },
              { 
                title: "Chiffre d'Affaires", 
                value: "€89,432", 
                change: "+8.3%", 
                color: "text-blue-600",
                gradient: "from-blue-500 to-blue-600",
                description: "Revenus du mois"
              },
              { 
                title: "Commandes Traitées", 
                value: "1,247", 
                change: "+12.5%", 
                color: "text-purple-600",
                gradient: "from-purple-500 to-purple-600",
                description: "Total mensuel"
              },
              { 
                title: "Temps de Réponse", 
                value: "0.8s", 
                change: "-15%", 
                color: "text-teal-600",
                gradient: "from-teal-500 to-teal-600",
                description: "Moyenne système"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group relative overflow-hidden"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:border-teal-200 dark:hover:border-teal-700">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </h4>
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.color} bg-opacity-10`}
                      >
                        {stat.change}
                      </motion.span>
                    </div>
                    
                    <div className="mb-2">
                      <span className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.description}
                    </p>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center py-8 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 INFOSOFT - Plateforme Premium de Gestion Pharmaceutique
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Excellence technique • Design premium • Innovation pharmaceutique
            </p>
          </motion.div>
        </motion.div>
      </DashboardLayout>
    </div>
  );
}

export default App;