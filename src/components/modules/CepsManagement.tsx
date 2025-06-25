import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  FileText, 
  Download, 
  Search, 
  Filter,
  Calendar,
  Euro,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  RefreshCw,
  Eye,
  Edit
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";

interface CepsProduct {
  id: string;
  cip: string;
  libelle: string;
  exploitant: string;
  prixFournisseurHT: number;
  prixGrossisteHT: number;
  prixPublicTTC: number;
  dateApplication: Date;
  dateChangement?: Date;
  nouveauPrixFournisseur?: number;
  nouveauPrixGrossiste?: number;
  nouveauPrixPublic?: number;
  joursRestants?: number;
  isInvalid?: boolean;
  prixActuelVente?: number;
  joursRetard?: number;
}

export default function CepsManagement() {
  const [activeTab, setActiveTab] = useState<'evolutions' | 'invalides' | 'fullceps'>('evolutions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState('60');

  // Données simulées
  const [evolutionsData] = useState<CepsProduct[]>([
    {
      id: '1',
      cip: '3400930000001',
      libelle: 'DOLIPRANE 1000mg Comprimés',
      exploitant: 'SANOFI',
      prixFournisseurHT: 3.50,
      prixGrossisteHT: 4.20,
      prixPublicTTC: 5.80,
      dateApplication: new Date('2025-07-15'),
      nouveauPrixFournisseur: 3.75,
      nouveauPrixGrossiste: 4.50,
      nouveauPrixPublic: 6.20,
      joursRestants: 45,
      dateChangement: new Date('2025-07-15')
    },
    {
      id: '2',
      cip: '3400930000002',
      libelle: 'AMOXICILLINE 500mg Gélules',
      exploitant: 'BIOGARAN',
      prixFournisseurHT: 8.90,
      prixGrossisteHT: 10.68,
      prixPublicTTC: 14.75,
      dateApplication: new Date('2025-08-01'),
      nouveauPrixFournisseur: 8.50,
      nouveauPrixGrossiste: 10.20,
      nouveauPrixPublic: 14.10,
      joursRestants: 62,
      dateChangement: new Date('2025-08-01')
    }
  ]);

  const [invalidPricesData] = useState<CepsProduct[]>([
    {
      id: '3',
      cip: '3400930000003',
      libelle: 'ASPIRINE 500mg Comprimés',
      exploitant: 'BAYER',
      prixFournisseurHT: 4.25,
      prixGrossisteHT: 5.10,
      prixPublicTTC: 7.05,
      dateApplication: new Date('2025-05-01'),
      dateChangement: new Date('2025-05-01'),
      isInvalid: true,
      prixActuelVente: 7.50,
      joursRetard: 25
    }
  ]);

  const [fullCepsData] = useState<CepsProduct[]>([
    ...evolutionsData,
    ...invalidPricesData,
    {
      id: '4',
      cip: '3400930000004',
      libelle: 'PARACETAMOL 500mg Comprimés',
      exploitant: 'UPSA',
      prixFournisseurHT: 2.80,
      prixGrossisteHT: 3.36,
      prixPublicTTC: 4.65,
      dateApplication: new Date('2025-01-01')
    }
  ]);

  // Statistiques pour les cartes
  const statsItems = [
    {
      title: "Évolutions à venir",
      description: "Changements de prix prévus",
      link: "#",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      stats: [
        { value: evolutionsData.length, label: "produits" },
        { value: evolutionsData.filter(p => (p.joursRestants || 0) <= 30).length, label: "< 30 jours" },
        { value: evolutionsData.filter(p => (p.nouveauPrixFournisseur || 0) > (p.prixFournisseurHT || 0)).length, label: "hausses" }
      ]
    },
    {
      title: "Prix invalides",
      description: "Écarts avec tarifs officiels",
      link: "#",
      icon: <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />,
      stats: [
        { value: invalidPricesData.length, label: "produits" },
        { value: Math.round(invalidPricesData.reduce((sum, p) => sum + (p.joursRetard || 0), 0) / invalidPricesData.length), label: "jours moy." },
        { value: "€" + invalidPricesData.reduce((sum, p) => sum + Math.abs((p.prixActuelVente || 0) - p.prixGrossisteHT), 0).toFixed(2), label: "écart total" }
      ]
    },
    {
      title: "Base CEPS complète",
      description: "Répertoire officiel",
      link: "#",
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
      stats: [
        { value: fullCepsData.length.toLocaleString(), label: "références" },
        { value: "98%", label: "couverture" },
        { value: "Aujourd'hui", label: "dernière MAJ" }
      ]
    }
  ];

  const filteredData = () => {
    let data: CepsProduct[] = [];
    switch (activeTab) {
      case 'evolutions':
        data = evolutionsData;
        break;
      case 'invalides':
        data = invalidPricesData;
        break;
      case 'fullceps':
        data = fullCepsData;
        break;
    }

    if (searchTerm) {
      data = data.filter(product => 
        product.cip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.exploitant.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return data;
  };

  const handleSelectAll = () => {
    const currentData = filteredData();
    if (selectedProducts.length === currentData.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(currentData.map(p => p.id));
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleCorrectPrices = (selectedOnly: boolean = false) => {
    const productsToCorrect = selectedOnly 
      ? invalidPricesData.filter(p => selectedProducts.includes(p.id))
      : invalidPricesData;
    
    console.log(`Correction des prix pour ${productsToCorrect.length} produits`);
    // Ici on implémenterait la logique de correction
  };

  const getPriceVariationIcon = (current: number, future: number) => {
    if (future > current) {
      return <TrendingUp className="w-4 h-4 text-red-500" />;
    } else if (future < current) {
      return <TrendingDown className="w-4 h-4 text-green-500" />;
    }
    return <div className="w-4 h-4" />;
  };

  const exportData = (type: 'complet' | 'erreurs' | 'evolutions') => {
    console.log(`Export ${type} demandé`);
    // Ici on implémenterait la logique d'export
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Listes CEPS - Prix et Réglementations
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Gestion des tarifs réglementaires et évolutions de prix
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Vue d'ensemble CEPS
        </h2>
        <HoverEffect 
          items={statsItems} 
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 py-2 sm:py-4 lg:py-6" 
        />
      </div>

      {/* Onglets de navigation */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 border-b border-gray-200 dark:border-gray-700">
        {[
          { key: 'evolutions', label: 'Évolutions réglementaires', icon: TrendingUp },
          { key: 'invalides', label: 'Prix invalides', icon: AlertTriangle },
          { key: 'fullceps', label: 'Full CEPS', icon: FileText }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Barre d'actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher par CIP ou nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          
          {activeTab === 'evolutions' && (
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="30">30 prochains jours</option>
              <option value="60">60 prochains jours</option>
              <option value="90">90 prochains jours</option>
              <option value="all">Toutes les évolutions</option>
            </select>
          )}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {activeTab === 'invalides' && (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCorrectPrices(true)}
                disabled={selectedProducts.length === 0}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Corriger sélection</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCorrectPrices(false)}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Corriger tout</span>
              </motion.button>
            </>
          )}
          
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden">
          {/* En-tête du tableau */}
          <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                  {activeTab === 'evolutions' && 'Évolutions de prix à venir'}
                  {activeTab === 'invalides' && 'Produits avec prix invalides'}
                  {activeTab === 'fullceps' && 'Base CEPS complète'}
                </h3>
                <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                  {filteredData().length} produits
                </span>
              </div>
              
              {activeTab === 'invalides' && (
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  {selectedProducts.length === filteredData().length ? 'Tout désélectionner' : 'Tout sélectionner'}
                </button>
              )}
            </div>
          </div>

          {/* Contenu du tableau */}
          <div className="p-3 sm:p-4">
            {filteredData().length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Aucune donnée disponible
                </h3>
                <p className="text-sm text-gray-500">
                  Aucun produit ne correspond à vos critères de recherche.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {/* Version mobile - Cards */}
                <div className="block lg:hidden">
                  {filteredData().map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 dark:text-white text-sm sm:text-base line-clamp-2">
                            {product.libelle}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                            CIP: {product.cip} • {product.exploitant}
                          </p>
                        </div>
                        
                        {activeTab === 'invalides' && (
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleSelectProduct(product.id)}
                            className="ml-2 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                          />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                        {activeTab === 'evolutions' && (
                          <>
                            <div>
                              <span className="text-gray-500">Date application:</span>
                              <p className="text-gray-800 dark:text-white">
                                {product.dateApplication.toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Jours restants:</span>
                              <p className="text-gray-800 dark:text-white font-medium">
                                {product.joursRestants} jours
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Prix actuel:</span>
                              <p className="text-gray-800 dark:text-white">
                                €{product.prixFournisseurHT.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-gray-500">Nouveau prix:</span>
                              <p className="text-gray-800 dark:text-white font-medium">
                                €{product.nouveauPrixFournisseur?.toFixed(2)}
                              </p>
                              {product.nouveauPrixFournisseur && getPriceVariationIcon(product.prixFournisseurHT, product.nouveauPrixFournisseur)}
                            </div>
                          </>
                        )}
                        
                        {activeTab === 'invalides' && (
                          <>
                            <div>
                              <span className="text-gray-500">Date changement:</span>
                              <p className="text-gray-800 dark:text-white">
                                {product.dateChangement?.toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Retard:</span>
                              <p className="text-red-600 font-medium">
                                {product.joursRetard} jours
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Prix théorique:</span>
                              <p className="text-gray-800 dark:text-white">
                                €{product.prixGrossisteHT.toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Votre prix:</span>
                              <p className="text-gray-800 dark:text-white font-medium">
                                €{product.prixActuelVente?.toFixed(2)}
                              </p>
                            </div>
                          </>
                        )}
                        
                        {activeTab === 'fullceps' && (
                          <>
                            <div>
                              <span className="text-gray-500">Prix fournisseur:</span>
                              <p className="text-gray-800 dark:text-white">
                                €{product.prixFournisseurHT.toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Prix grossiste:</span>
                              <p className="text-gray-800 dark:text-white">
                                €{product.prixGrossisteHT.toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Prix public:</span>
                              <p className="text-gray-800 dark:text-white font-medium">
                                €{product.prixPublicTTC.toFixed(2)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Date application:</span>
                              <p className="text-gray-800 dark:text-white">
                                {product.dateApplication.toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Version desktop - Tableau */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        {activeTab === 'invalides' && (
                          <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">
                            <input
                              type="checkbox"
                              checked={selectedProducts.length === filteredData().length && filteredData().length > 0}
                              onChange={handleSelectAll}
                              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            />
                          </th>
                        )}
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">CIP</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Libellé</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Exploitant</th>
                        
                        {activeTab === 'evolutions' && (
                          <>
                            <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Date application</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Jours restants</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Prix actuel</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Nouveau prix</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Variation</th>
                          </>
                        )}
                        
                        {activeTab === 'invalides' && (
                          <>
                            <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Date changement</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Retard (jours)</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Prix théorique</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Votre prix</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Actions</th>
                          </>
                        )}
                        
                        {activeTab === 'fullceps' && (
                          <>
                            <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Prix fournisseur HT</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Prix grossiste HT</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Prix public TTC</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Date application</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData().map((product, index) => (
                        <motion.tr
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {activeTab === 'invalides' && (
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                checked={selectedProducts.includes(product.id)}
                                onChange={() => handleSelectProduct(product.id)}
                                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              />
                            </td>
                          )}
                          <td className="py-3 px-4 text-gray-800 dark:text-white text-sm font-mono">
                            {product.cip}
                          </td>
                          <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                            {product.libelle}
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm">
                            {product.exploitant}
                          </td>
                          
                          {activeTab === 'evolutions' && (
                            <>
                              <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                                {product.dateApplication.toLocaleDateString('fr-FR')}
                              </td>
                              <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm font-medium">
                                {product.joursRestants}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm">
                                €{product.prixFournisseurHT.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm font-medium">
                                €{product.nouveauPrixFournisseur?.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                {product.nouveauPrixFournisseur && getPriceVariationIcon(product.prixFournisseurHT, product.nouveauPrixFournisseur)}
                              </td>
                            </>
                          )}
                          
                          {activeTab === 'invalides' && (
                            <>
                              <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                                {product.dateChangement?.toLocaleDateString('fr-FR')}
                              </td>
                              <td className="py-3 px-4 text-center text-red-600 text-sm font-medium">
                                {product.joursRetard}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm">
                                €{product.prixGrossisteHT.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm font-medium">
                                €{product.prixActuelVente?.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                                  Corriger
                                </button>
                              </td>
                            </>
                          )}
                          
                          {activeTab === 'fullceps' && (
                            <>
                              <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm">
                                €{product.prixFournisseurHT.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm">
                                €{product.prixGrossisteHT.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm font-medium">
                                €{product.prixPublicTTC.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                                {product.dateApplication.toLocaleDateString('fr-FR')}
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
                Affichage de {filteredData().length} élément(s)
              </div>
              
              {activeTab === 'invalides' && selectedProducts.length > 0 && (
                <div className="text-xs sm:text-sm text-teal-600 font-medium">
                  {selectedProducts.length} produit(s) sélectionné(s)
                </div>
              )}
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
}