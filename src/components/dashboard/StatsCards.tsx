import React, { useState, useEffect } from "react";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";
import { BarChart3, ShoppingCart, Package, TrendingUp, Euro, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StatsCards() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // 🔄 HOT RELOAD - Actualisation automatique toutes les 30 secondes
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    const refreshStats = () => {
      setIsRefreshing(true);
      setLastUpdate(new Date());
      
      // Simuler une actualisation des données
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    };

    // Mise à jour de l'heure chaque seconde
    const timeInterval = setInterval(updateTime, 1000);
    
    // Actualisation des stats toutes les 30 secondes
    const statsInterval = setInterval(refreshStats, 30000);

    // Nettoyage
    return () => {
      clearInterval(timeInterval);
      clearInterval(statsInterval);
    };
  }, []);

  // 📅 Formatage des dates et heures en temps réel
  const currentDate = currentTime.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTimeString = currentTime.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  const lastUpdateString = lastUpdate.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  // 📊 Données dynamiques avec variations légères pour simuler l'activité
  const getRandomVariation = (base: number, variation: number = 2) => {
    const random = Math.floor(Math.random() * (variation * 2 + 1)) - variation;
    return Math.max(0, base + random);
  };

  const statsItems = [
    {
      title: "Aujourd'hui : " + currentDate,
      description: (
        <div className="flex items-center space-x-2">
          <span>Jusqu'à {currentTimeString}</span>
          <AnimatePresence>
            {isRefreshing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 360,
                  transition: {
                    rotate: {
                      duration: 1,
                      ease: "linear",
                      repeat: Infinity
                    }
                  }
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-teal-600"
              >
                <RefreshCw className="w-3 h-3" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ),
      link: "#",
      icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />,
      stats: [
        { value: getRandomVariation(23).toString(), label: "commandes" },
        { value: getRandomVariation(20).toString(), label: "lignes" },
        { value: getRandomVariation(94, 5).toString(), label: "unités" }
      ]
    },
    {
      title: "Hier : 24/06/2025",
      description: "Toute la journée",
      link: "#",
      icon: <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />,
      stats: [
        { value: "137", label: "commandes" },
        { value: "127", label: "lignes" },
        { value: "89", label: "unités" }
      ]
    },
    {
      title: "Produits Actifs",
      description: "Catalogue complet",
      link: "#",
      icon: <Package className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />,
      stats: [
        { value: "52 231", label: "articles" },
        { value: "354", label: "officines" },
        { value: getRandomVariation(98, 1) + "%", label: "disponibilité" }
      ]
    },
    {
      title: "Performance",
      description: (
        <div className="flex flex-col">
          <span>Indicateurs clés</span>
          <motion.span 
            className="text-xs text-gray-500 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            MAJ: {lastUpdateString}
          </motion.span>
        </div>
      ),
      link: "#",
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />,
      stats: [
        { 
          value: getRandomVariation(1247, 10).toLocaleString(), 
          label: "Commandes", 
          change: `+${getRandomVariation(12, 3)}%` 
        },
        { 
          value: `€${getRandomVariation(89432, 500).toLocaleString()}`, 
          label: "CA", 
          change: `+${getRandomVariation(8, 2)}%` 
        }
      ]
    }
  ];

  return (
    <motion.div
      key={lastUpdate.getTime()} // Force re-render avec animation
      initial={{ opacity: 0.8, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white text-center flex-1">
          Visualisation de votre activité :
        </h2>
        
        {/* Indicateur de dernière mise à jour */}
        <motion.div 
          className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ 
              scale: isRefreshing ? [1, 1.2, 1] : 1,
              rotate: isRefreshing ? 360 : 0
            }}
            transition={{ 
              scale: { duration: 0.6, repeat: isRefreshing ? Infinity : 0 },
              rotate: { duration: 1, ease: "linear", repeat: isRefreshing ? Infinity : 0 }
            }}
            className={isRefreshing ? "text-teal-600" : "text-gray-400"}
          >
            <RefreshCw className="w-3 h-3" />
          </motion.div>
          <span>
            {isRefreshing ? "Actualisation..." : `MAJ: ${lastUpdateString}`}
          </span>
        </motion.div>
      </div>
      
      <motion.div
        layout
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <HoverEffect 
          items={statsItems} 
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 py-1 sm:py-2" 
        />
      </motion.div>
      
      {/* Barre de progression pour le prochain refresh */}
      <motion.div 
        className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
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