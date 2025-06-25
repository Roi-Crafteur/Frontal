import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Package, 
  MessageSquare, 
  Link, 
  Search, 
  Filter,
  Download,
  Calendar,
  Eye,
  FileText,
  ShoppingCart,
  XCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";

interface ListItem {
  id: string;
  cip: string;
  libelle: string;
  quantite?: number;
  nombreOfficines?: number;
  nombreCommandes?: number;
  stock?: number;
  seuil?: number;
  commentaire?: string;
  cipRemplacant?: string;
  libelleRemplacant?: string;
  cipAssocie?: string;
  libelleAssocie?: string;
  periode?: string;
  quotaMax?: number;
  dateCommande?: Date;
}

export default function ListsManagement() {
  const [activeTab, setActiveTab] = useState<'hitparade' | 'contingentes' | 'remplaces' | 'commentaires' | 'stockseuil' | 'associations'>('hitparade');
  const [hitParadeView, setHitParadeView] = useState<'livres' | 'nonhonores' | 'inconnus' | 'stockseuil'>('livres');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('01/05/2025');
  const [dateTo, setDateTo] = useState('31/05/2025');

  // Données simulées pour chaque liste
  const [produitsLivres] = useState<ListItem[]>([
    {
      id: '1',
      cip: '3400930000001',
      libelle: 'DOLIPRANE 1000mg Comprimés',
      quantite: 150,
      nombreOfficines: 25,
      nombreCommandes: 45
    },
    {
      id: '2',
      cip: '3400930000002',
      libelle: 'AMOXICILLINE 500mg Gélules',
      quantite: 89,
      nombreOfficines: 18,
      nombreCommandes: 32
    }
  ]);

  const [produitsNonHonores] = useState<ListItem[]>([
    {
      id: '3',
      cip: '3400930000003',
      libelle: 'ASPIRINE 500mg Comprimés',
      quantite: 25,
      nombreOfficines: 8,
      nombreCommandes: 12
    }
  ]);

  const [produitsInconnus] = useState<ListItem[]>([
    {
      id: '4',
      cip: '',
      libelle: 'PRODUIT INCONNU REF ABC123',
      quantite: 5,
      nombreOfficines: 2,
      nombreCommandes: 3
    }
  ]);

  const [produitsStockSeuil] = useState<ListItem[]>([
    {
      id: '5',
      cip: '3400930000005',
      libelle: 'PARACETAMOL 500mg Comprimés',
      stock: 3,
      seuil: 10,
      quantite: 3
    }
  ]);

  const [produitsContingentes] = useState<ListItem[]>([
    {
      id: '6',
      cip: '3400930000006',
      libelle: 'PRODUIT CONTINGENTÉ A',
      periode: 'Hebdomadaire',
      quotaMax: 50,
      quantite: 35
    }
  ]);

  const [produitsRemplaces] = useState<ListItem[]>([
    {
      id: '7',
      cip: '3400930000007',
      libelle: 'ANCIEN PRODUIT',
      cipRemplacant: '3400930000008',
      libelleRemplacant: 'NOUVEAU PRODUIT'
    }
  ]);

  const [produitsCommentaires] = useState<ListItem[]>([
    {
      id: '8',
      cip: '3400930000009',
      libelle: 'PRODUIT AVEC COMMENTAIRE',
      commentaire: 'Conserver au frais - Ne pas exposer à la lumière'
    }
  ]);

  const [associations] = useState<ListItem[]>([
    {
      id: '9',
      cip: '3400930000010',
      libelle: 'PRODUIT PRINCIPAL',
      cipAssocie: '3400930000011',
      libelleAssocie: 'NOTICE ASSOCIÉE'
    }
  ]);

  // Statistiques pour les cartes
  const statsItems = [
    {
      title: "Hit-Parade",
      description: "Statistiques de ventes",
      link: "#",
      icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      stats: [
        { value: produitsLivres.length, label: "livrés" },
        { value: produitsNonHonores.length, label: "non honorés" },
        { value: produitsInconnus.length, label: "inconnus" }
      ]
    },
    {
      title: "Produits spéciaux",
      description: "Contingentés et remplacés",
      link: "#",
      icon: <Package className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />,
      stats: [
        { value: produitsContingentes.length, label: "contingentés" },
        { value: produitsRemplaces.length, label: "remplacés" },
        { value: associations.length, label: "associations" }
      ]
    },
    {
      title: "Alertes stock",
      description: "Produits sous seuil",
      link: "#",
      icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />,
      stats: [
        { value: produitsStockSeuil.length, label: "sous seuil" },
        { value: produitsCommentaires.length, label: "avec commentaires" },
        { value: "Temps réel", label: "mise à jour" }
      ]
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'hitparade':
        switch (hitParadeView) {
          case 'livres': return produitsLivres;
          case 'nonhonores': return produitsNonHonores;
          case 'inconnus': return produitsInconnus;
          case 'stockseuil': return produitsStockSeuil;
          default: return produitsLivres;
        }
      case 'contingentes': return produitsContingentes;
      case 'remplaces': return produitsRemplaces;
      case 'commentaires': return produitsCommentaires;
      case 'stockseuil': return produitsStockSeuil;
      case 'associations': return associations;
      default: return [];
    }
  };

  const filteredData = getCurrentData().filter(item => 
    item.cip.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.libelle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportData = (format: 'csv' | 'excel' | 'pdf') => {
    console.log(`Export ${format} demandé pour ${activeTab}`);
    // Ici on implémenterait la logique d'export
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Listes et Statistiques
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Analyses et rapports sur l'activité pharmaceutique
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Vue d'ensemble des listes
        </h2>
        <HoverEffect 
          items={statsItems} 
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 py-2 sm:py-4 lg:py-6" 
        />
      </div>

      {/* Onglets de navigation */}
      <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {[
          { key: 'hitparade', label: 'Hit-Parade', icon: BarChart3 },
          { key: 'contingentes', label: 'Contingentés', icon: Package },
          { key: 'remplaces', label: 'Remplacés', icon: TrendingUp },
          { key: 'commentaires', label: 'Commentaires', icon: MessageSquare },
          { key: 'stockseuil', label: 'Stock sous seuil', icon: AlertTriangle },
          { key: 'associations', label: 'Associations', icon: Link }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Sous-onglets pour Hit-Parade */}
      {activeTab === 'hitparade' && (
        <div className="flex flex-wrap gap-1 sm:gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
          {[
            { key: 'livres', label: 'Produits livrés', icon: CheckCircle },
            { key: 'nonhonores', label: 'Non honorés', icon: XCircle },
            { key: 'inconnus', label: 'Inconnus', icon: AlertTriangle },
            { key: 'stockseuil', label: 'Stock ≤ seuil', icon: Package }
          ].map((subTab) => (
            <button
              key={subTab.key}
              onClick={() => setHitParadeView(subTab.key as any)}
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                hitParadeView === subTab.key
                  ? 'bg-white dark:bg-gray-700 text-teal-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <subTab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{subTab.label}</span>
              <span className="sm:hidden">{subTab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Contrôles de période et recherche */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {(activeTab === 'hitparade' || activeTab === 'stockseuil') && (
            <>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Période:</span>
              </div>
              <input
                type="text"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white w-32"
                placeholder="01/05/2025"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">à</span>
              <input
                type="text"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white w-32"
                placeholder="31/05/2025"
              />
            </>
          )}
          
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
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => exportData('csv')}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => exportData('excel')}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Excel</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => exportData('pdf')}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </motion.button>
        </div>
      </div>

      {/* Contenu principal */}
      <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden">
          {/* En-tête */}
          <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                {activeTab === 'hitparade' && hitParadeView === 'livres' && 'Produits livrés'}
                {activeTab === 'hitparade' && hitParadeView === 'nonhonores' && 'Produits non honorés'}
                {activeTab === 'hitparade' && hitParadeView === 'inconnus' && 'Produits inconnus'}
                {activeTab === 'hitparade' && hitParadeView === 'stockseuil' && 'Produits stock ≤ seuil'}
                {activeTab === 'contingentes' && 'Produits contingentés'}
                {activeTab === 'remplaces' && 'Produits remplacés'}
                {activeTab === 'commentaires' && 'Produits avec commentaires'}
                {activeTab === 'stockseuil' && 'Stock sous seuil'}
                {activeTab === 'associations' && 'Associations de produits'}
              </h3>
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                {filteredData.length} éléments
              </span>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-3 sm:p-4">
            {filteredData.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Aucune donnée disponible
                </h3>
                <p className="text-sm text-gray-500">
                  Aucun élément ne correspond à vos critères pour cette période.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {/* Version mobile - Cards */}
                <div className="block lg:hidden">
                  {filteredData.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 dark:text-white text-sm sm:text-base line-clamp-2">
                            {item.libelle}
                          </h4>
                          {item.cip && (
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-mono">
                              CIP: {item.cip}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                        {item.quantite !== undefined && (
                          <div>
                            <span className="text-gray-500">Quantité:</span>
                            <p className="text-gray-800 dark:text-white font-medium">
                              {item.quantite}
                            </p>
                          </div>
                        )}
                        
                        {item.nombreOfficines !== undefined && (
                          <div>
                            <span className="text-gray-500">Officines:</span>
                            <p className="text-gray-800 dark:text-white">
                              {item.nombreOfficines}
                            </p>
                          </div>
                        )}
                        
                        {item.nombreCommandes !== undefined && (
                          <div>
                            <span className="text-gray-500">Commandes:</span>
                            <p className="text-gray-800 dark:text-white">
                              {item.nombreCommandes}
                            </p>
                          </div>
                        )}
                        
                        {item.stock !== undefined && (
                          <div>
                            <span className="text-gray-500">Stock:</span>
                            <p className={`font-medium ${item.stock <= (item.seuil || 0) ? 'text-red-600' : 'text-gray-800 dark:text-white'}`}>
                              {item.stock} / {item.seuil}
                            </p>
                          </div>
                        )}
                        
                        {item.periode && (
                          <div>
                            <span className="text-gray-500">Période:</span>
                            <p className="text-gray-800 dark:text-white">
                              {item.periode}
                            </p>
                          </div>
                        )}
                        
                        {item.quotaMax && (
                          <div>
                            <span className="text-gray-500">Quota max:</span>
                            <p className="text-gray-800 dark:text-white">
                              {item.quotaMax}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {item.commentaire && (
                        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs sm:text-sm">
                          <span className="text-blue-600 font-medium">Commentaire: </span>
                          <span className="text-blue-800 dark:text-blue-200">{item.commentaire}</span>
                        </div>
                      )}
                      
                      {item.libelleRemplacant && (
                        <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-xs sm:text-sm">
                          <span className="text-orange-600 font-medium">Remplacé par: </span>
                          <span className="text-orange-800 dark:text-orange-200">{item.libelleRemplacant}</span>
                        </div>
                      )}
                      
                      {item.libelleAssocie && (
                        <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs sm:text-sm">
                          <span className="text-green-600 font-medium">Associé: </span>
                          <span className="text-green-800 dark:text-green-200">{item.libelleAssocie}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Version desktop - Tableau */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">CIP</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Libellé</th>
                        
                        {(activeTab === 'hitparade' || activeTab === 'stockseuil') && (
                          <>
                            <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Quantité</th>
                            {activeTab === 'hitparade' && (
                              <>
                                <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Officines</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Commandes</th>
                              </>
                            )}
                            {(activeTab === 'stockseuil' || hitParadeView === 'stockseuil') && (
                              <>
                                <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Stock</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Seuil</th>
                              </>
                            )}
                          </>
                        )}
                        
                        {activeTab === 'contingentes' && (
                          <>
                            <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Période</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Quota max</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Commandé</th>
                          </>
                        )}
                        
                        {activeTab === 'remplaces' && (
                          <>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">CIP remplaçant</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Libellé remplaçant</th>
                          </>
                        )}
                        
                        {activeTab === 'commentaires' && (
                          <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Commentaire</th>
                        )}
                        
                        {activeTab === 'associations' && (
                          <>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">CIP associé</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Libellé associé</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="py-3 px-4 text-gray-800 dark:text-white text-sm font-mono">
                            {item.cip || '-'}
                          </td>
                          <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                            {item.libelle}
                          </td>
                          
                          {(activeTab === 'hitparade' || activeTab === 'stockseuil') && (
                            <>
                              <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm font-medium">
                                {item.quantite}
                              </td>
                              {activeTab === 'hitparade' && (
                                <>
                                  <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                                    {item.nombreOfficines}
                                  </td>
                                  <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                                    {item.nombreCommandes}
                                  </td>
                                </>
                              )}
                              {(activeTab === 'stockseuil' || hitParadeView === 'stockseuil') && (
                                <>
                                  <td className={`py-3 px-4 text-center text-sm font-medium ${
                                    (item.stock || 0) <= (item.seuil || 0) ? 'text-red-600' : 'text-gray-800 dark:text-white'
                                  }`}>
                                    {item.stock}
                                  </td>
                                  <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                                    {item.seuil}
                                  </td>
                                </>
                              )}
                            </>
                          )}
                          
                          {activeTab === 'contingentes' && (
                            <>
                              <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                                {item.periode}
                              </td>
                              <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                                {item.quotaMax}
                              </td>
                              <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm font-medium">
                                {item.quantite}
                              </td>
                            </>
                          )}
                          
                          {activeTab === 'remplaces' && (
                            <>
                              <td className="py-3 px-4 text-gray-800 dark:text-white text-sm font-mono">
                                {item.cipRemplacant}
                              </td>
                              <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                                {item.libelleRemplacant}
                              </td>
                            </>
                          )}
                          
                          {activeTab === 'commentaires' && (
                            <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                              {item.commentaire}
                            </td>
                          )}
                          
                          {activeTab === 'associations' && (
                            <>
                              <td className="py-3 px-4 text-gray-800 dark:text-white text-sm font-mono">
                                {item.cipAssocie}
                              </td>
                              <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                                {item.libelleAssocie}
                              </td>
                            </>
                          )}
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
                Affichage de {filteredData.length} élément(s)
                {(activeTab === 'hitparade' || activeTab === 'stockseuil') && (
                  <span className="ml-2">• Période: {dateFrom} - {dateTo}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
}