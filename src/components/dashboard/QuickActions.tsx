import React from "react";
import { motion } from "framer-motion";
import { Plus, Upload, Download, FileText, Settings, Users } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { icon: Plus, label: "Nouvelle Commande", color: "bg-teal-500 hover:bg-teal-600" },
    { icon: Upload, label: "Import Données", color: "bg-blue-500 hover:bg-blue-600" },
    { icon: Download, label: "Export Rapport", color: "bg-green-500 hover:bg-green-600" },
    { icon: FileText, label: "Documents", color: "bg-purple-500 hover:bg-purple-600" },
    { icon: Settings, label: "Paramètres", color: "bg-gray-500 hover:bg-gray-600" },
    { icon: Users, label: "Utilisateurs", color: "bg-orange-500 hover:bg-orange-600" },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Actions Rapides
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${action.color} text-white p-4 rounded-xl shadow-lg transition-all duration-200 flex flex-col items-center space-y-2 group`}
          >
            <action.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-center">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}