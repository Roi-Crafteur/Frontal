import React from "react";
import { motion } from "framer-motion";
import { Clock, Package, ShoppingCart, User, AlertCircle } from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "order",
      icon: ShoppingCart,
      title: "Nouvelle commande reçue",
      description: "Pharmacie Central - 15 articles",
      time: "Il y a 5 minutes",
      color: "text-teal-600 bg-teal-100"
    },
    {
      id: 2,
      type: "product",
      icon: Package,
      title: "Stock mis à jour",
      description: "Doliprane 1000mg - 150 unités",
      time: "Il y a 12 minutes",
      color: "text-blue-600 bg-blue-100"
    },
    {
      id: 3,
      type: "user",
      icon: User,
      title: "Nouvel utilisateur",
      description: "Marie Dubois - Gestionnaire",
      time: "Il y a 1 heure",
      color: "text-purple-600 bg-purple-100"
    },
    {
      id: 4,
      type: "alert",
      icon: AlertCircle,
      title: "Alerte stock faible",
      description: "Amoxicilline 500mg - 5 unités restantes",
      time: "Il y a 2 heures",
      color: "text-red-600 bg-red-100"
    },
    {
      id: 5,
      type: "order",
      icon: ShoppingCart,
      title: "Commande expédiée",
      description: "Pharmacie du Marché - 8 articles",
      time: "Il y a 3 heures",
      color: "text-green-600 bg-green-100"
    },
    {
      id: 6,
      type: "product",
      icon: Package,
      title: "Nouveau produit ajouté",
      description: "Aspirine 500mg - Référence active",
      time: "Il y a 4 heures",
      color: "text-indigo-600 bg-indigo-100"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full h-full"
    >
      <BackgroundGradient className="rounded-2xl sm:rounded-3xl p-1 h-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
              Activité Récente
            </h3>
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </div>
          
          <div className="space-y-3 sm:space-y-4 flex-1 overflow-y-auto">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className={`p-1.5 sm:p-2 rounded-lg ${activity.color} flex-shrink-0`}>
                  <activity.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-1">
                    {activity.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-3 sm:mt-4 py-2 text-xs sm:text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4"
          >
            Voir toute l'activité
          </motion.button>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
}