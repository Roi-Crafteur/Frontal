import React, { useEffect } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import StatsCards from './components/dashboard/StatsCards';
import ActivityChart from './components/dashboard/ActivityChart';
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
        className="space-y-3 sm:space-y-4 w-full max-w-full overflow-hidden h-full flex flex-col"
      >
        {/* Stats Cards - Compact */}
        <div className="flex-shrink-0">
          <StatsCards />
        </div>

        {/* Main Content Grid - Flexible height */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 flex-1 min-h-0">
          {/* Activity Chart - Takes 2 columns on XL screens */}
          <div className="xl:col-span-2 min-h-0 h-full">
            <ActivityChart />
          </div>
          
          {/* Recent Activity - Takes 1 column */}
          <div className="xl:col-span-1 min-h-0 h-full">
            <RecentActivity />
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

export default App;