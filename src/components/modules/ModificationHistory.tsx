import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  History, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Clock, 
  FileText,
  ArrowRight,
  ShoppingCart,
  Package,
  Edit,
  RefreshCw,
  Download,
  Eye
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";

interface Modification {
  id: string;
  type: 'order' | 'product' | 'officine' | 'user' | 'setting';
  action: 'create' | 'update' | 'delete';
  entityId: string;
  entityName: string;
  fieldName?: string;
  oldValue?: string;
  newValue?: string;
  userId: string;
  userName: string;
  timestamp: Date;
  details?: string;
}

export default function ModificationHistory() {
  const [modifications, setModifications] = useState<Modification[]>([
    {
      id: '1',
      type: 'order',
      action: 'update',
      entityId: 'CMD-2025-001',
      entityName: 'Commande Pharmacie Central',
      fieldName: 'quantité',
      oldValue: '10',
      newValue: '8',
      userId: '1',
      userName: 'POISOT Paul',
      timestamp: new Date(Date.now() - 3600000), // 1 heure
      details: 'Modification de la quantité du produit Doliprane 1000mg'
    },
    {
      id: '2',
      type: 'product',
      action: 'update',
      entityId: '3400930000001',
      entityName: 'Doliprane 1000mg',
      fieldName: 'stock',
      oldValue: '150',
      newValue: '145',
      userId: '1',
      userName: 'POISOT Paul',
      timestamp: new Date(Date.now() - 7200000), // 2 heures
      details: 'Mise à jour manuelle du stock'
    },
    {
      id: '3',
      type: 'officine',
      action: 'create',
      entityId: '3',
      entityName: 'Pharmacie de la Gare',
      userId: '2',
      userName: 'Marie Dubois',
      timestamp: new Date(Date.now() - 86400000), // 1 jour
      details: 'Création d\'une nouvelle officine'
    },
    {
      id: '4',
      type: 'user',
      action: 'update',
      entityId: '3',
      entityName: 'Jean Martin',
      fieldName: 'statut',
      oldValue: 'actif',
      newValue: 'inactif',
      userId: '1',
      userName: 'POISOT Paul',
      timestamp: new Date(Date.now() - 172800000), // 2 jours
      details: 'Désactivation du compte utilisateur'
    },
    {
      id: '5',
      type: 'setting',
      action: 'update',
      entityId: 'server',
      entityName: 'Paramètres serveur',
      fieldName: 'alertEmails',
      oldValue: 'admin@infosoft.fr',
      newValue: 'admin@infosoft.fr, support@infosoft.fr',
      userId: '1',
      userName: 'POISOT Paul',
      timestamp: new Date(Date.now() - 259200000), // 3 jours
      details: 'Ajout d\'une adresse email pour les alertes'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('18/06/2025');
  const [dateTo, setDateTo] = useState('25/06/2025');

  // Liste des utilisateurs uniques pour le filtre
  const uniqueUsers = Array.from(new Set(modifications.map(m => m.userName)));

  // Statistiques pour les cartes
  const statsItems = [
    {
      title: "Modifications Récentes",
      description: "Derniers 7 jours",
      link: "#",
      icon: <History className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      stats: [
        { value: modifications.length, label: "total" },
        { value: modifications.filter(m => m.timestamp > new Date(Date.now() - 86400000)).length, label: "dernières 24h" },
        { value: uniqueUsers.length, label: "utilisateurs" }
      ]
    },
    {
      title: "Types de Modifications",
      description: "Répartition par catégorie",
      link: "#",
      icon: <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />,
      stats: [
        { value: modifications.filter(m => m.type === 'order').length, label: "commandes" },
        { value: modifications.filter(m => m.type === 'product').length, label: "produits" },
        { value: modifications.filter(m => ['officine', 'user', 'setting'].includes(m.type)).length, label: "autres" }
      ]
    },
    {
      title: "Actions Effectuées",
      description: "Types d'opérations",
      link: "#",
      icon: <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
      stats: [
        { value: modifications.filter(m => m.action === 'create').length, label: "créations" },
        { value: modifications.filter(m => m.action === 'update').length, label: "mises à jour" },
        { value: modifications.filter(m => m.action === 'delete').length, label: "suppressions" }
      ]
    }
  ];

  const filteredModifications = modifications.filter(mod => {
    const matchesSearch = mod.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mod.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mod.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || mod.type === filterType;
    const matchesAction = filterAction === 'all' || mod.action === filterAction;
    const matchesUser = filterUser === 'all' || mod.userName === filterUser;
    
    // Filtrage par date
    const modDate = mod.timestamp;
    const fromParts = dateFrom.split('/');
    const toParts = dateTo.split('/');
    const fromDate = new Date(parseInt(fromParts[2]), parseInt(fromParts[1]) - 1, parseInt(fromParts[0]));
    const toDate = new Date(parseInt(toParts[2]), parseInt(toParts[1]) - 1, parseInt(toParts[0]));
    toDate.setHours(23, 59, 59, 999); // Fin de journée
    
    const matchesDate = modDate >= fromDate && modDate <= toDate;
    
    return matchesSearch && matchesType && matchesAction && matchesUser && matchesDate;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingCart className="w-4 h-4 text-blue-600" />;
      case 'product': return <Package className="w-4 h-4 text-green-600" />;
      case 'officine': return <User className="w-4 h-4 text-purple-600" />;
      case 'user': return <User className="w-4 h-4 text-orange-600" />;
      case 'setting': return <RefreshCw className="w-4 h-4 text-gray-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'order': return 'Commande';
      case 'product': return 'Produit';
      case 'officine': return 'Officine';
      case 'user': return 'Utilisateur';
      case 'setting': return 'Paramètre';
      default: return type;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'text-green-600 bg-green-100';
      case 'update': return 'text-blue-600 bg-blue-100';
      case 'delete': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'create': return 'Création';
      case 'update': return 'Modification';
      case 'delete': return 'Suppression';
      default: return action;
    }
  };

  const exportModifications = () => {
    console.log('Export des modifications');
    // Logique d'export
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Liste des Modifications
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Historique des changements effectués sur la plateforme
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Vue d'ensemble des modifications
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
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="all">Tous les types</option>
            <option value="order">Commandes</option>
            <option value="product">Produits</option>
            <option value="officine">Officines</option>
            <option value="user">Utilisateurs</option>
            <option value="setting">Paramètres</option>
          </select>
          
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="all">Toutes les actions</option>
            <option value="create">Créations</option>
            <option value="update">Modifications</option>
            <option value="delete">Suppressions</option>
          </select>
          
          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="all">Tous les utilisateurs</option>
            {uniqueUsers.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
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
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportModifications}
            className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </motion.button>
        </div>
      </div>

      {/* Liste des modifications */}
      <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden">
          {/* En-tête */}
          <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                Journal des modifications
              </h3>
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                {filteredModifications.length} entrées
              </span>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-3 sm:p-4">
            {filteredModifications.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <History className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Aucune modification trouvée
                </h3>
                <p className="text-sm text-gray-500">
                  Aucune modification ne correspond à vos critères de recherche.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {/* Version mobile - Timeline */}
                <div className="block lg:hidden">
                  <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-6">
                    {filteredModifications.map((mod, index) => (
                      <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative"
                      >
                        {/* Point sur la timeline */}
                        <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border-2 border-teal-500"></div>
                        
                        {/* Contenu */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(mod.type)}
                              <span className="text-sm font-medium text-gray-800 dark:text-white">
                                {getTypeLabel(mod.type)}
                              </span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(mod.action)}`}>
                              {getActionLabel(mod.action)}
                            </span>
                          </div>
                          
                          <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                            {mod.entityName}
                          </h4>
                          
                          {mod.fieldName && (
                            <div className="text-xs">
                              <span className="text-gray-500">Champ modifié:</span>
                              <span className="ml-1 text-gray-800 dark:text-white">{mod.fieldName}</span>
                              {mod.oldValue && mod.newValue && (
                                <div className="mt-1 flex items-center space-x-2">
                                  <span className="text-red-500 line-through">{mod.oldValue}</span>
                                  <ArrowRight className="w-3 h-3 text-gray-400" />
                                  <span className="text-green-500">{mod.newValue}</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{mod.userName}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{mod.timestamp.toLocaleString('fr-FR')}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Version desktop - Tableau */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Date & Heure</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Utilisateur</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Action</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Entité</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Champ</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Avant / Après</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredModifications.map((mod, index) => (
                        <motion.tr
                          key={mod.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                            {mod.timestamp.toLocaleString('fr-FR')}
                          </td>
                          <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                            {mod.userName}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(mod.type)}
                              <span className="text-gray-800 dark:text-white text-sm">
                                {getTypeLabel(mod.type)}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(mod.action)}`}>
                              {getActionLabel(mod.action)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                            <div>
                              <p className="font-medium">{mod.entityName}</p>
                              <p className="text-xs text-gray-500">ID: {mod.entityId}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                            {mod.fieldName || '-'}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {mod.oldValue && mod.newValue ? (
                              <div className="flex items-center space-x-2">
                                <span className="text-red-500 line-through">{mod.oldValue}</span>
                                <ArrowRight className="w-3 h-3 text-gray-400" />
                                <span className="text-green-500">{mod.newValue}</span>
                              </div>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Voir détails"
                            >
                              <Eye className="w-4 h-4" />
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
                Affichage de {filteredModifications.length} modification(s) sur {modifications.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Période: {dateFrom} - {dateTo}
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
              À propos de l'historique des modifications
            </h4>
            <p className="text-blue-700 dark:text-blue-300">
              Ce journal conserve une trace de toutes les modifications importantes effectuées sur la plateforme. 
              Il permet de suivre qui a modifié quoi et quand, assurant ainsi une traçabilité complète des actions.
              Les modifications sont conservées pendant 12 mois.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}