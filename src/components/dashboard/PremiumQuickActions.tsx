import React from "react";
import { motion } from "framer-motion";
import { PremiumButton } from "../ui/aceternity/premium-button";
import { 
  Plus, 
  Upload, 
  Download, 
  FileText, 
  Settings, 
  Users,
  Package,
  Building2,
  BarChart3,
  Search
} from "lucide-react";

export default function PremiumQuickActions() {
  const actions = [
    { 
      icon: <Plus className="w-5 h-5" />, 
      label: "Nouvelle Commande", 
      variant: "primary" as const,
      description: "Créer une nouvelle commande"
    },
    { 
      icon: <Upload className="w-5 h-5" />, 
      label: "Import Données", 
      variant: "secondary" as const,
      description: "Importer des données"
    },
    { 
      icon: <Download className="w-5 h-5" />, 
      label: "Export Rapport", 
      variant: "outline" as const,
      description: "Exporter un rapport"
    },
    { 
      icon: <Package className="w-5 h-5" />, 
      label: "Gestion Stock", 
      variant: "outline" as const,
      description: "Gérer les stocks"
    },
    { 
      icon: <Building2 className="w-5 h-5" />, 
      label: "Officines", 
      variant: "outline" as const,
      description: "Gérer les officines"
    },
    { 
      icon: <BarChart3 className="w-5 h-5" />, 
      label: "Rapports", 
      variant: "outline" as const,
      description: "Consulter les rapports"
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
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Actions Rapides
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Accès direct aux fonctionnalités principales
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group"
          >
            <PremiumButton
              variant={action.variant}
              className="w-full h-auto flex-col space-y-2 p-4 group-hover:shadow-lg transition-all duration-200"
              title={action.description}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {action.icon}
              </motion.div>
              <span className="text-xs font-medium text-center leading-tight">
                {action.label}
              </span>
            </PremiumButton>
          </motion.div>
        ))}
      </div>
    </div>
  );
}