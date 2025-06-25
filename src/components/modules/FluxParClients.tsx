import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  ShoppingCart, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  CheckCircle,
  XCircle,
  Package,
  Euro,
  Clock,
  Building,
  ArrowRight,
  FileText,
  Truck
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";

interface OfficineFlux {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  orderCount: number;
  totalItems: number;
  totalAmount: number;
  lastOrderDate: Date;
  status: 'pending' | 'partial' | 'complete';
  isSelected: boolean;
}

export default function FluxParClients() {
  const [officineFlux, setOfficineFlux] = useState<OfficineFlux[]>([
    {
      id: '1',
      name: 'Pharmacie Central',
      address: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      orderCount: 3,
      totalItems: 15,
      totalAmount: 450.75,
      lastOrderDate: new Date(Date.now() - 3600000), // 1 heure
      status: 'pending',
      isSelected: true
    },
    {
      id: '2',
      name: 'Pharmacie du Marché',
      address: '456 Avenue des Champs',
      city: 'Lyon',
      postalCode: '69001',
      orderCount: 2,
      totalItems: 8,
      totalAmount: 215.30,
      lastOrderDate: new Date(Date.now() - 7200000), // 2 heures
      status: 'pending',
      isSelected: true
    },
    {
      id: '3',
      name: 'Pharmacie de la Gare',
      address: '789 Boulevard de la Gare',
      city: 'Marseille',
      postalCode: '13001',
      orderCount: 1,
      totalItems: 4,
      totalAmount: 89.95,
      lastOrderDate: new Date(Date.now() - 10800000), // 3 heures
      status: 'pending',
      isSelected: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('25/06/2025');
  const [dateTo, setDateTo] = useState('25/06/2025');

  // Statistiques pour les cartes
  const statsItems = [
    {
      title: "Commandes à Regrouper",
      description: "Flux en attente",
      link: "#",
      icon: <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      stats: [
        { value: officineFlux.reduce((sum, o) => sum + o.orderCount, 0), label: "commandes" },
        { value: officineFlux.length, label: "officines" },
        { value: "€" + officineFlux.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2), label: "montant total" }
      ]
    },
    {
      title: "Articles à Livrer",
      description: "Produits commandés",
      link: "#",
      icon: <Package className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
      stats: [
        { value: officineFlux.reduce((sum, o) => sum + o.totalItems, 0), label: "articles" },
        { value: Math.round(officineFlux.reduce((sum, o) => sum + o.totalItems, 0) / officineFlux.reduce((sum, o) => sum + o.orderCount, 0)), label: "moy. par commande" },
        { value: Math.round(officineFlux.reduce((sum, o) => sum + o.totalItems, 0) / officineFlux.length), label: "moy. par officine" }
      ]
    },
    {
      title: "Préparation",
      description: "Statut des flux",
      link: "#",
      icon: <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />,
      stats: [
        { value: officineFlux.filter(o => o.status === 'pending').length, label: "en attente" },
        { value: officineFlux.filter(o => o.status === 'partial').length, label: "partiels" },
        { value: officineFlux.filter(o => o.status === 'complete').length, label: "complets" }
      ]
    }
  ];

  const filteredOfficines = officineFlux.filter(officine => {
    const matchesSearch = officine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officine.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || officine.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-blue-600 bg-blue-100';
      case 'partial': return 'text-orange-600 bg-orange-100';
      case 'complete': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'partial': return 'Partiel';
      case 'complete': return 'Complet';
      default: return status;
    }
  };

  const handleSelectAll = () => {
    const allSelected = filteredOfficines.every(o => o.isSelected);
    setOfficineFlux(prev => prev.map(o => 
      filteredOfficines.some(fo => fo.id === o.id) ? { ...o, isSelected: !allSelected } : o
    ));
  };

  const handleSelectOfficine = (id: string) => {
    setOfficineFlux(prev => prev.map(o => 
      o.id === id ? { ...o, isSelected: !o.isSelected } : o
    ));
  };

  const handleExportAll = () => {
    console.log('Exporter tous les flux');
    // Logique d'export de tous les flux
  };

  const handleExportSelected = () => {
    const selectedOfficines = officineFlux.filter(o => o.isSelected);
    console.log(`Exporter ${selectedOfficines.length} flux sélectionnés`);
    // Logique d'export des flux sélectionnés
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Flux par Clients
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Regroupez les commandes par officine pour optimiser la préparation
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Vue d'ensemble des flux
        </h2>
        <HoverEffect 
          items={statsItems} 
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 py-2 sm:py-4 lg:py-6" 
        />
      </div>

      {/* Barre d'actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher une officine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="partial">Partiels</option>
            <option value="complete">Complets</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white w-32"
            />
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white w-32"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportSelected}
            disabled={!officineFlux.some(o => o.isSelected)}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Exporter sélection</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportAll}
            className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Exporter tout</span>
          </motion.button>
        </div>
      </div>

      {/* Liste des flux par officine */}
      <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden">
          {/* En-tête */}
          <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                Flux regroupés par officine
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  {filteredOfficines.every(o => o.isSelected) ? 'Tout désélectionner' : 'Tout sélectionner'}
                </button>
                <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                  {filteredOfficines.length} officines
                </span>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-3 sm:p-4">
            {filteredOfficines.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Building className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Aucun flux trouvé
                </h3>
                <p className="text-sm text-gray-500">
                  Aucune officine ne correspond à vos critères de recherche.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {/* Version mobile - Cards */}
                <div className="block lg:hidden">
                  {filteredOfficines.map((officine, index) => (
                    <motion.div
                      key={officine.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <input
                            type="checkbox"
                            checked={officine.isSelected}
                            onChange={() => handleSelectOfficine(officine.id)}
                            className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 dark:text-white text-sm sm:text-base line-clamp-2">
                              {officine.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              {officine.address}, {officine.postalCode} {officine.city}
                            </p>
                          </div>
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(officine.status)}`}>
                          {getStatusLabel(officine.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div>
                          <span className="text-gray-500">Commandes:</span>
                          <p className="text-gray-800 dark:text-white font-medium">
                            {officine.orderCount}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Articles:</span>
                          <p className="text-gray-800 dark:text-white">
                            {officine.totalItems}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Montant:</span>
                          <p className="text-gray-800 dark:text-white font-medium">
                            €{officine.totalAmount.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Dernière commande:</span>
                          <p className="text-gray-800 dark:text-white">
                            {officine.lastOrderDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-1 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded text-xs font-medium"
                        >
                          <Download className="w-3 h-3" />
                          <span>Exporter</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Version desktop - Tableau */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">
                          <input
                            type="checkbox"
                            checked={filteredOfficines.every(o => o.isSelected)}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                          />
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Officine</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Commandes</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Articles</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Montant</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Dernière commande</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Statut</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOfficines.map((officine, index) => (
                        <motion.tr
                          key={officine.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <input
                              type="checkbox"
                              checked={officine.isSelected}
                              onChange={() => handleSelectOfficine(officine.id)}
                              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-gray-800 dark:text-white text-sm font-medium">
                                {officine.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {officine.address}, {officine.postalCode} {officine.city}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm font-medium">
                            {officine.orderCount}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                            {officine.totalItems}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm font-medium">
                            €{officine.totalAmount.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                            {officine.lastOrderDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(officine.status)}`}>
                              {getStatusLabel(officine.status)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Exporter"
                            >
                              <Download className="w-4 h-4" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Pied de tableau */}
          <div className="bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Affichage de {filteredOfficines.length} officine(s) sur {officineFlux.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">{officineFlux.filter(o => o.isSelected).length}</span> officine(s) sélectionnée(s)
              </div>
            </div>
          </div>
        </div>
      </BackgroundGradient>

      {/* Informations supplémentaires */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm">
        <div className="flex items-start space-x-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              À propos des flux par clients
            </h4>
            <p className="text-blue-700 dark:text-blue-300">
              Cette fonctionnalité permet de regrouper toutes les commandes en attente d'une même officine en un seul flux. 
              Cela facilite la préparation logistique et optimise les livraisons. Après export, les commandes seront marquées comme traitées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}