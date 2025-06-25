import React from "react";
import { motion } from "framer-motion";
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardContent } from "../ui/aceternity/premium-card";
import { TrendingUp, Activity } from "lucide-react";

export default function PremiumActivityChart() {
  // Generate sample data points for the chart
  const generatePath = (points: number[], color: string, opacity: number = 1) => {
    const width = 800;
    const height = 200;
    const stepX = width / (points.length - 1);
    
    let path = `M 0 ${height - (points[0] / 3000) * height}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = i * stepX;
      const y = height - (points[i] / 3000) * height;
      path += ` L ${x} ${y}`;
    }
    
    // Close the path to create filled area
    path += ` L ${width} ${height} L 0 ${height} Z`;
    
    return (
      <path
        d={path}
        fill={color}
        fillOpacity={opacity}
        stroke="none"
      />
    );
  };

  // Sample data for 24 months
  const commandesData = [
    2800, 1800, 2900, 2500, 2700, 2300, 2400, 2800, 2600, 2900, 
    1700, 2500, 2400, 2600, 2200, 1800, 2300, 2100, 1600, 2400, 
    2200, 2000, 2300, 2500
  ];
  
  const requetesData = [
    1000, 800, 1100, 900, 1000, 850, 900, 1050, 950, 1100,
    750, 950, 900, 950, 800, 750, 850, 800, 700, 900,
    850, 800, 850, 950
  ];

  const months = [
    'avr. 2023', 'mai 2023', 'juin 2023', 'juil. 2023', 'août 2023', 'sept. 2023',
    'oct. 2023', 'nov. 2023', 'déc. 2023', 'janv. 2024', 'févr. 2024', 'mars 2024',
    'avr. 2024', 'mai 2024', 'juin 2024', 'juil. 2024', 'août 2024', 'sept. 2024',
    'oct. 2024', 'nov. 2024', 'déc. 2024', 'janv. 2025', 'févr. 2025', 'mars 2025'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <PremiumCard className="group relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <PremiumCardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 bg-opacity-10">
                <Activity className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <PremiumCardTitle className="text-2xl">
                  Activité sur 24 mois
                </PremiumCardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Évolution des commandes et requêtes traitées
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full shadow-sm"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Commandes traitées
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-sm"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Requêtes traitées
                </span>
              </div>
            </div>
          </div>
        </PremiumCardHeader>

        <PremiumCardContent>
          <div className="relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 pr-4 font-medium">
              <span>3000</span>
              <span>2500</span>
              <span>2000</span>
              <span>1500</span>
              <span>1000</span>
              <span>500</span>
            </div>

            {/* Chart */}
            <div className="ml-12">
              <motion.svg 
                viewBox="0 0 800 200" 
                className="w-full h-48"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={i * 40}
                    x2="800"
                    y2={i * 40}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-gray-200 dark:text-gray-700"
                  />
                ))}
                
                {/* Data areas */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {generatePath(commandesData, 'url(#gradient1)', 0.7)}
                  {generatePath(requetesData, 'url(#gradient2)', 0.5)}
                </motion.g>
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fb7185" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#fb7185" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f87171" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#f87171" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* X-axis labels */}
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-4 font-medium">
                {months.filter((_, i) => i % 4 === 0).map((month, i) => (
                  <span key={i}>{month}</span>
                ))}
              </div>
            </div>
          </div>
        </PremiumCardContent>

        {/* Performance Indicator */}
        <div className="absolute top-4 right-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium"
          >
            <TrendingUp className="w-3 h-3" />
            <span>+12.5%</span>
          </motion.div>
        </div>
      </PremiumCard>
    </motion.div>
  );
}