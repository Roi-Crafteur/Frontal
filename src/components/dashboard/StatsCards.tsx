import React, { useState, useEffect } from "react";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";
import { BarChart3, ShoppingCart, Package, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const yesterdayDate = new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('fr-FR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

export default function StatsCards() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // 🔄 HOT RELOAD INVISIBLE - Actualisation automatique toutes les 30 secondes
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    const refreshStats = () => {
      setLastUpdate(new Date());
      // Actualisation silencieuse des données
    };

    // Mise à jour de l'heure chaque seconde
    const timeInterval = setInterval(updateTime, 1000);
    
    // Actualisation des stats toutes les 30 secondes (INVISIBLE)
    const statsInterval = setInterval(refreshStats, 30000);

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

  // 📊 Données dynamiques avec variations légères pour simuler l'activité
  const getRandomVariation = (base: number, variation: number = 2) => {
    const random = Math.floor(Math.random() * (variation * 2 + 1)) - variation;
    return Math.max(0, base + random);
  };

  const statsItems = [
    {
      title: "Aujourd'hui : " + currentDate,
      description: `Jusqu'à ${currentTimeString}`,
      link: "#",
      icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />,
      stats: [
        { value: getRandomVariation(23).toString(), label: "commandes" },
        { value: getRandomVariation(20).toString(), label: "lignes" },
        { value: getRandomVariation(94, 5).toString(), label: "unités" }
      ]
    },
    {
      title: "Hier : " + yesterdayDate,
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
      description: "Indicateurs clés",
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
      initial={{ opacity: 0.9, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4,
        ease: "easeOut"
      }}
    >
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white text-center flex-1">
          Visualisation de votre activité :
        </h2>
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
    </motion.div>
  );
}