import React from "react";
import { motion } from "framer-motion";
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardContent } from "../ui/aceternity/premium-card";
import { Clock, Package, ShoppingCart, User, AlertCircle, TrendingUp, CheckCircle } from "lucide-react";

export default function PremiumRecentActivity() {
  const activities = [
    {
      id: 1,
      type: "order",
      icon: ShoppingCart,
      title: "Nouvelle commande reçue",
      description: "Pharmacie Central - 15 articles",
      time: "Il y a 5 minutes",
      color: "text-teal-600 bg-teal-100 dark:bg-teal-900/30",
      status: "success"
    },
    {
      id: 2,
      type: "product",
      icon: Package,
      title: "Stock mis à jour",
      description: "Doliprane 1000mg - 150 unités",
      time: "Il y a 12 minutes",
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
      status: "info"
    },
    {
      id: 3,
      type: "user",
      icon: User,
      title: "Nouvel utilisateur",
      description: "Marie Dubois - Gestionnaire",
      time: "Il y a 1 heure",
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
      status: "info"
    },
    {
      id: 4,
      type: "alert",
      icon: AlertCircle,
      title: "Alerte stock faible",
      description: "Amoxicilline 500mg - 5 unités restantes",
      time: "Il y a 2 heures",
      color: "text-red-600 bg-red-100 dark:bg-red-900/30",
      status: "warning"
    },
    {
      id: 5,
      type: "success",
      icon: CheckCircle,
      title: "Commande expédiée",
      description: "Pharmacie du Marché - Livraison confirmée",
      time: "Il y a 3 heures",
      color: "text-green-600 bg-green-100 dark:bg-green-900/30",
      status: "success"
    }
  ];

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'success':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'warning':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />;
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />;
      default:
        return <div className="w-2 h-2 bg-blue-500 rounded-full" />;
    }
  };

  return (
    <PremiumCard className="h-full">
      <PremiumCardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 bg-opacity-10">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <PremiumCardTitle className="text-xl">
              Activité Récente
            </PremiumCardTitle>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium"
          >
            <TrendingUp className="w-3 h-3" />
            <span>Live</span>
          </motion.div>
        </div>
      </PremiumCardHeader>
      
      <PremiumCardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group"
            >
              <div className={`p-2 rounded-lg ${activity.color} group-hover:scale-110 transition-transform duration-200`}>
                <activity.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {activity.title}
                  </p>
                  {getStatusIndicator(activity.status)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <button className="w-full py-2 text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium transition-colors hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg">
            Voir toute l'activité
          </button>
        </motion.div>
      </PremiumCardContent>
    </PremiumCard>
  );
}