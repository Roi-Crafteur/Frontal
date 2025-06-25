import React from "react";
import { motion } from "framer-motion";
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardDescription, PremiumCardContent } from "../ui/aceternity/premium-card";
import { useStore } from "../../store/useStore";
import { BarChart3, Package, Building2, TrendingUp } from "lucide-react";

export default function PremiumStatsCards() {
  const { stats } = useStore();

  const statsCards = [
    {
      title: "Aujourd'hui : 25/06/2025",
      description: "Jusqu'à 13:55:32",
      icon: <BarChart3 className="w-6 h-6 text-teal-600" />,
      gradient: "from-teal-500 to-teal-600",
      stats: [
        { value: stats.todayOrders.commands, label: "commandes" },
        { value: stats.todayOrders.lines, label: "lignes" },
        { value: stats.todayOrders.units, label: "unités" }
      ]
    },
    {
      title: "Hier : 24/06/2025",
      description: "Toute la journée",
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      gradient: "from-blue-500 to-blue-600",
      stats: [
        { value: stats.yesterdayOrders.commands, label: "commandes" },
        { value: stats.yesterdayOrders.lines, label: "lignes" },
        { value: stats.yesterdayOrders.units, label: "unités" }
      ]
    },
    {
      title: "Produits Actifs",
      description: "Catalogue complet",
      icon: <Package className="w-6 h-6 text-purple-600" />,
      gradient: "from-purple-500 to-purple-600",
      stats: [
        { value: stats.totalProducts.toLocaleString(), label: "articles" },
        { value: stats.totalOfficines, label: "officines" },
        { value: `${stats.availability}%`, label: "disponibilité" }
      ]
    }
  ];

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Commandes à la journée
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Visualisation en temps réel de votre activité pharmaceutique
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PremiumCard className="group relative overflow-hidden">
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <PremiumCardHeader>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${card.gradient} bg-opacity-10`}>
                    {card.icon}
                  </div>
                  <div>
                    <PremiumCardTitle className="text-lg">
                      {card.title}
                    </PremiumCardTitle>
                    <PremiumCardDescription>
                      {card.description}
                    </PremiumCardDescription>
                  </div>
                </div>
              </PremiumCardHeader>

              <PremiumCardContent>
                <div className="grid grid-cols-3 gap-4">
                  {card.stats.map((stat, statIndex) => (
                    <motion.div
                      key={statIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + statIndex * 0.1 }}
                      className="text-center"
                    >
                      <div className={`text-2xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </PremiumCardContent>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </PremiumCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}