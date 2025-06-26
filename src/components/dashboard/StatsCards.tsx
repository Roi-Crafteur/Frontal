import React from "react";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";
import { BarChart3, ShoppingCart, Package, TrendingUp, Euro } from "lucide-react";

export default function StatsCards() {
  const statsItems = [
    {
      title: "Aujourd'hui : 25/06/2025",
      description: "Jusqu'à 13:55:32",
      link: "#",
      icon: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />,
      stats: [
        { value: "23", label: "commandes" },
        { value: "20", label: "lignes" },
        { value: "94", label: "unités" }
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
        { value: "98%", label: "disponibilité" }
      ]
    },
    {
      title: "Performance",
      description: "Indicateurs clés",
      link: "#",
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />,
      stats: [
        { value: "1,247", label: "Commandes", change: "+12%" },
        { value: "€89,432", label: "CA", change: "+8%" }
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 dark:text-white mb-2 sm:mb-3">
        Commandes à la journée
      </h2>
      <HoverEffect 
        items={statsItems} 
        className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 py-1 sm:py-2" 
      />
    </div>
  );
}