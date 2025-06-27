import { useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import StatsCards from './components/dashboard/StatsCards';
import ApexActivityChart from './components/dashboard/ApexActivityChart';
import { useStore } from './store/useStore';
import { useAuthStore } from './store/authStore';
import { motion } from 'framer-motion';
import LoginPage from './pages/LoginPage';

function App() {
  const { fetchOrders, fetchProducts, fetchOfficines } = useStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Initialize data on app load only if authenticated
    if (isAuthenticated) {
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
    }
  }, [fetchOrders, fetchProducts, fetchOfficines, isAuthenticated]);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show dashboard if authenticated
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 w-full max-w-full overflow-hidden h-full flex flex-col"
      >
        {/* Stats Cards - Compact mais efficace */}
        <div className="mb-2">
          <StatsCards />
        </div>

        {/* Nouveau graphique ApexCharts */}
        <div className="flex-1 min-h-0 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="p-4 sm:p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                Activité sur 12 mois - Vue d'ensemble
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Données en temps réel
              </div>
            </div>
            <div className="h-full min-h-[340px]">
              <ApexActivityChart />
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default App;