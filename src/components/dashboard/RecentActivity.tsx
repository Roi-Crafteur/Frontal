import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Package, ShoppingCart, User, AlertCircle, RefreshCw } from "lucide-react";

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
  const [isRefreshing, setIsRefreshing] = useState(false);
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

  // 🔄 Initialisation et actualisation automatique
  useEffect(() => {
    // Initialiser avec quelques activités
    const initialActivities = Array.from({ length: 4 }, () => generateRandomActivity())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    setActivities(initialActivities);

    const refreshActivities = () => {
      setIsRefreshing(true);
      setLastUpdate(new Date());
      
      setTimeout(() => {
        // Ajouter une nouvelle activité et garder les 6 plus récentes
        const newActivity = generateRandomActivity();
        setActivities(prev => [newActivity, ...prev].slice(0, 6));
        setIsRefreshing(false);
      }, 1000);
    };

    // Actualisation toutes les 30 secondes
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

  const lastUpdateString = lastUpdate.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

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
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          <motion.div
            animate={{ 
              rotate: isRefreshing ? 360 : 0,
              scale: isRefreshing ? [1, 1.2, 1] : 1
            }}
            transition={{ 
              rotate: { duration: 1, ease: "linear", repeat: isRefreshing ? Infinity : 0 },
              scale: { duration: 0.6, repeat: isRefreshing ? Infinity : 0 }
            }}
            className={`${isRefreshing ? "text-teal-600" : "text-gray-400"}`}
          >
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.div>
        </div>
      </div>
      
      {/* Indicateur de dernière mise à jour */}
      <motion.div 
        className="text-xs text-gray-500 mb-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isRefreshing ? "Actualisation en cours..." : `Dernière MAJ: ${lastUpdateString}`}
      </motion.div>
      
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
                duration: 0.4,
                delay: index * 0.1,
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
                <motion.p 
                  className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white line-clamp-1"
                  layout
                >
                  {activity.title}
                </motion.p>
                <motion.p 
                  className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1"
                  layout
                >
                  {activity.description}
                </motion.p>
                <motion.p 
                  className="text-xs text-gray-500 mt-1"
                  layout
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

      {/* Barre de progression pour le prochain refresh */}
      <motion.div 
        className="mt-2 h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 30, // 30 secondes
            ease: "linear",
            repeat: Infinity
          }}
        />
      </motion.div>
    </motion.div>
  );
}