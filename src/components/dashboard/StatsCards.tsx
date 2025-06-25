import React from "react";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";
import { BarChart3, ShoppingCart, Package, TrendingUp } from "lucide-react";

export default function StatsCards() {
  const statsItems = [
    {
      title: "Aujourd'hui : 25/06/2025",
      description: "Jusqu'à 13:55:32",
      link: "#",
      icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />,
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
      icon: <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />,
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
      icon: <Package className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />,
      stats: [
        { value: "52 231", label: "articles" },
        { value: "354", label: "officines" },
        { value: "98%", label: "disponibilité" }
      ]
    }
  ];

  return (
    <div className="mb-4 sm:mb-6 lg:mb-8">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
        Commandes à la journée
      </h2>
      <HoverEffect 
        items={statsItems} 
        className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 py-2 sm:py-4 lg:py-6" 
      />
    </div>
  );
}