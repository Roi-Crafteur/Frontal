import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Package, ShoppingCart, User, AlertCircle } from "lucide-react";

interface Activity {
  id: string;
  type: "order" | "product" | "user" | "alert";
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  time: string;
  timestamp: Date;
  color: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // 🔄 Génération d'activités simulées
  const generateRandomActivity = (): Activity => {
    const activityTypes = [
      {
        type: "order" as const,
        icon: ShoppingCart,
        titles: [
          "Nouvelle commande reçue",
          "Commande validée",
          "Commande expédiée",
          "Commande livrée"
        ],
        descriptions: [
          "Pharmacie Central - 15 articles",
          "Pharmacie du Marché - 8 articles",
          "Pharmacie de la Gare - 12 articles",
          "Pharmacie Saint-Michel - 6 articles"
        ],
        color: "text-teal-600 bg-teal-100"
      },
      {
        type: "product" as const,
        icon: Package,
        titles: [
          "Stock mis à jour",
          "Nouveau produit ajouté",
          "Prix modifié",
          "Seuil atteint"
        ],
        descriptions: [
          "Doliprane 1000mg - 150 unités",
          "Amoxicilline 500mg - 89 unités",
          "Aspirine 500mg - 45 unités",
          "Paracétamol 500mg - 200 unités"
        ],
        color: "text-blue-600 bg-blue-100"
      },
      {
        type: "user" as const,
        icon: User,
        titles: [
          "Nouvel utilisateur",
          "Connexion utilisateur",
          "Modification profil",
          "Changement de rôle"
        ],
        descriptions: [
          "Marie Dubois - Gestionnaire",
          "Jean Martin - Consultant",
          "Sophie Bernard - Utilisateur",
          "Pierre Moreau - Gestionnaire"
        ],
        color: "text-purple-600 bg-purple-100"
      },
      {
        type: "alert" as const,
        icon: AlertCircle,
        titles: [
          "Alerte stock faible",
          "Produit indisponible",
          "Erreur système",
          "Maintenance programmée"
        ],
        descriptions: [
          "Amoxicilline 500mg - 5 unités restantes",
          "Aspirine 500mg - rupture de stock",
          "Connexion base de données",
          "Mise à jour prévue à 22h00"
        ],
        color: "text-red-600 bg-red-100"
      }
    ];

    const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const randomTitle = randomType.titles[Math.floor(Math.random() * randomType.titles.length)];
    const randomDescription = randomType.descriptions[Math.floor(Math.random() * randomType.descriptions.length)];
    
    const now = new Date();
    const minutesAgo = Math.floor(Math.random() * 120) + 1; // 1 à 120 minutes
    const timestamp = new Date(now.getTime() - minutesAgo * 60000);
    
    const timeString = minutesAgo < 60 
      ? `Il y a ${minutesAgo} minute${minutesAgo > 1 ? 's' : ''}`
      : `Il y a ${Math.floor(minutesAgo / 60)} heure${Math.floor(minutesAgo / 60) > 1 ? 's' : ''}`;

    return {
      id: `activity-${Date.now()}-${Math.random()}`,
      type: randomType.type,
      icon: randomType.icon,
      title: randomTitle,
      description: randomDescription,
      time: timeString,
      timestamp,
      color: randomType.color
    };
  };

  // 🔄 Initialisation et actualisation automatique INVISIBLE
  useEffect(() => {
    // Initialiser avec quelques activités
    const initialActivities = Array.from({ length: 4 }, () => generateRandomActivity())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    setActivities(initialActivities);

    const refreshActivities = () => {
      setLastUpdate(new Date());
      
      // Ajouter une nouvelle activité et garder les 6 plus récentes (SILENCIEUX)
      const newActivity = generateRandomActivity();
      setActivities(prev => [newActivity, ...prev].slice(0, 6));
    };

    // Actualisation toutes les 30 secondes (INVISIBLE)
    const interval = setInterval(refreshActivities, 30000);

    return () => clearInterval(interval);
  }, []);

  // 🕒 Mise à jour des temps relatifs toutes les minutes
  useEffect(() => {
    const updateTimes = () => {
      setActivities(prev => prev.map(activity => {
        const now = new Date();
        const diffMinutes = Math.floor((now.getTime() - activity.timestamp.getTime()) / 60000);
        
        const timeString = diffMinutes < 60 
          ? `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`
          : `Il y a ${Math.floor(diffMinutes / 60)} heure${Math.floor(diffMinutes / 60) > 1 ? 's' : ''}`;
        
        return { ...activity, time: timeString };
      }));
    };

    const timeInterval = setInterval(updateTimes, 60000); // Chaque minute
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg h-full flex flex-col"
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">
          Activité Récente
        </h3>
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
      </div>
      
      <div className="space-y-2 sm:space-y-3 flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <motion.div 
                className={`p-1 sm:p-1.5 rounded-lg ${activity.color} flex-shrink-0`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <activity.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white line-clamp-1">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">
                  {activity.description}
                </p>
                <motion.p 
                  className="text-xs text-gray-500 mt-1"
                  key={activity.time} // Force re-render quand le temps change
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {activity.time}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-3 py-2 text-xs sm:text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
        layout
      >
        Voir toute l'activité
      </motion.button>
    </motion.div>
  );
}