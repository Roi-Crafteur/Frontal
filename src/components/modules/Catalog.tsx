import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  Info,
  RefreshCw,
  BarChart3,
  TrendingUp,
  TrendingDown,
  ShoppingCart
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";

interface CatalogFormat {
  id: string;
  name: string;
  description: string;
  fileType: 'csv' | 'excel';
  lastExport?: Date;
  columns: string[];
  hasHeader: boolean;
  separator: string;
  isDefault: boolean;
}

interface CatalogExport {
  id: string;
  formatId: string;
  formatName: string;
  fileName: string;
  fileSize: number;
  exportDate: Date;
  recordCount: number;
  status: 'completed' | 'failed';
  downloadCount: number;
}

export default function Catalog() {
  const [catalogFormats, setCatalogFormats] = useState<CatalogFormat[]>([
    {
      id: '1',
      name: 'Catalogue Complet',
      description: 'Export complet du catalogue avec tous les champs',
      fileType: 'csv',
      lastExport: new Date(Date.now() - 86400000), // Hier
      columns: ['CIP', 'Libellé', 'Prix tarif', 'Prix remisé', 'Stock', 'Seuil', 'Disponibilité', 'Colisage', 'Quota', 'CIP remplaçant', 'Commentaire', 'Alerte', 'Prix fournisseur', 'Remplaçant prioritaire', 'Accès restreint'],
      hasHeader: false,
      separator: ';',
      isDefault: true
    },
    {
      id: '2',
      name: 'Catalogue LGPI',
      description: 'Format spécifique pour le logiciel LGPI',
      fileType: 'csv',
      lastExport: new Date(Date.now() - 172800000), // 2 jours
      columns: ['EAN/CIP13', 'Libellé', 'Prix tarif', 'Prix net'],
      hasHeader: true,
      separator: ';',
      isDefault: false
    },
    {
      id: '3',
      name: 'Catalogue Isipharm',
      description: 'Format spécifique pour le logiciel Isipharm',
      fileType: 'csv',
      lastExport: new Date(Date.now() - 259200000), // 3 jours
      columns: ['CIP7', 'CIP13', 'EAN13', 'Libellé', 'Prix brut', 'Prix net', 'Gabarit', 'Gamme', 'Sous-gamme'],
      hasHeader: true,
      separator: ';',
      isDefault: false
    },
    {
      id: '4',
      name: 'Catalogue Winpharma',
      description: 'Format spécifique pour le logiciel Winpharma',
      fileType: 'excel',
      lastExport: new Date(Date.now() - 345600000), // 4 jours
      columns: ['CIP7', 'EAN13/CIP13', 'Libellé', 'TVA', 'Prix A HT', 'Remise', 'QtéMin', 'Colisage', 'Code labo', 'Nom labo'],
      hasHeader: true,
      separator: ';',
      isDefault: false
    }
  ]);

  const [recentExports, setRecentExports] = useState<CatalogExport[]>([
    {
      id: '1',
      formatId: '1',
      formatName: 'Catalogue Complet',
      fileName: 'catalogue_complet_20250624.csv',
      fileSize: 5242880, // 5 MB
      exportDate: new Date(Date.now() - 86400000), // Hier
      recordCount: 52231,
      status: 'completed',
      downloadCount: 3
    },
    {
      id: '2',
      formatId: '2',
      formatName: 'Catalogue LGPI',
      fileName: 'catalogue_lgpi_20250623.csv',
      fileSize: 2097152, // 2 MB
      exportDate: new Date(Date.now() - 172800000), // 2 jours
      recordCount: 52231,
      status: 'completed',
      downloadCount: 2
    },
    {
      id: '3',
      formatId: '3',
      formatName: 'Catalogue Isipharm',
      fileName: 'catalogue_isipharm_20250622.csv',
      fileSize: 3145728, // 3 MB
      exportDate: new Date(Date.now() - 259200000), // 3 jours
      recordCount: 52231,
      status: 'completed',
      downloadCount: 1
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importType, setImportType] = useState<'catalog' | 'stock' | 'price'>('catalog');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Statistiques pour les cartes
  const statsItems = [
    {
      title: "Catalogue Produits",
      description: "État du catalogue",
      link: "#",
      icon: <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      stats: [
        { value: "52,231", label: "produits" },
        { value: "4", label: "formats export" },
        { value: "3", label: "derniers exports" }
      ]
    },
    {
      title: "Mises à Jour",
      description: "Dernières opérations",
      link: "#",
      icon: <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
      stats: [
        { value: "24/06/2025", label: "dernier export" },
        { value: "20/06/2025", label: "dernière MAJ stock" },
        { value: "15/06/2025", label: "dernière MAJ prix" }
      ]
    },
    {
      title: "Statistiques Produits",
      description: "Indicateurs catalogue",
      link: "#",
      icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />,
      stats: [
        { value: "15", label: "stock sous seuil" },
        { value: "8", label: "contingentés" },
        { value: "12", label: "remplacés" }
      ]
    }
  ];

  const filteredFormats = catalogFormats.filter(format => {
    const matchesSearch = format.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         format.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || format.fileType === filterType;
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleExportCatalog = (formatId: string) => {
    console.log(`Export du catalogue au format ${formatId}`);
    // Logique d'export
  };

  const handleImport = () => {
    if (!selectedFile) return;
    
    console.log(`Import de type ${importType} avec le fichier ${selectedFile.name}`);
    // Logique d'import
    
    setIsImportModalOpen(false);
    setSelectedFile(null);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'csv': return <FileText className="w-5 h-5 text-green-500" />;
      case 'excel': return <FileSpreadsheet className="w-5 h-5 text-blue-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Gestion du Catalogue
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Importez et exportez votre catalogue produits dans différents formats
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Vue d'ensemble du catalogue
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
              placeholder="Rechercher un format..."
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
            <option value="all">Tous les formats</option>
            <option value="csv">CSV</option>
            <option value="excel">Excel</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsImportModalOpen(true)}
          className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Importer</span>
        </motion.button>
      </div>

      {/* Formats d'export */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredFormats.map((format, index) => (
          <motion.div
            key={format.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                      {format.fileType === 'csv' ? (
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      ) : (
                        <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white text-sm sm:text-base">
                        {format.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {format.description}
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleExportCatalog(format.id)}
                    className="flex items-center space-x-1 bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded text-xs font-medium"
                  >
                    <Download className="w-3 h-3" />
                    <span>Exporter</span>
                  </motion.button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Format:</span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {format.fileType.toUpperCase()} {format.hasHeader ? 'avec en-têtes' : 'sans en-têtes'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Séparateur:</span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {format.separator === ';' ? 'Point-virgule (;)' : 
                       format.separator === ',' ? 'Virgule (,)' : 
                       format.separator === '\t' ? 'Tabulation' : format.separator}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Dernier export:</span>
                    <span className="text-gray-800 dark:text-white">
                      {format.lastExport ? format.lastExport.toLocaleDateString('fr-FR') : 'Jamais'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500">
                    {format.columns.length} colonnes: {format.columns.slice(0, 3).join(', ')}
                    {format.columns.length > 3 && '...'}
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>
        ))}
      </div>

      {/* Exports récents */}
      <div className="mt-6 sm:mt-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Exports récents
        </h2>
        
        <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden">
            {/* En-tête */}
            <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                  Derniers catalogues exportés
                </h3>
                <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                  {recentExports.length} exports
                </span>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-3 sm:p-4">
              {recentExports.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Aucun export récent
                  </h3>
                  <p className="text-sm text-gray-500">
                    Vous n'avez pas encore exporté de catalogue.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {/* Version mobile - Cards */}
                  <div className="block lg:hidden">
                    {recentExports.map((export_, index) => (
                      <motion.div
                        key={export_.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1 min-w-0">
                            {getFileIcon(export_.formatName.includes('Excel') ? 'excel' : 'csv')}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-800 dark:text-white text-sm sm:text-base line-clamp-2">
                                {export_.fileName}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                {export_.formatName} • {formatFileSize(export_.fileSize)}
                              </p>
                            </div>
                          </div>
                          
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            export_.status === 'completed' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                          }`}>
                            {export_.status === 'completed' ? 'Terminé' : 'Échec'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <p className="text-gray-800 dark:text-white">
                              {export_.exportDate.toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Téléchargements:</span>
                            <p className="text-gray-800 dark:text-white">
                              {export_.downloadCount}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Produits:</span>
                            <p className="text-gray-800 dark:text-white">
                              {export_.recordCount.toLocaleString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium"
                          >
                            <Download className="w-3 h-3" />
                            <span>Télécharger</span>
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
                          <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Fichier</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Format</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Date</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Taille</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Produits</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Téléchargements</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Statut</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentExports.map((export_, index) => (
                          <motion.tr
                            key={export_.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                {getFileIcon(export_.formatName.includes('Excel') ? 'excel' : 'csv')}
                                <span className="text-gray-800 dark:text-white text-sm">
                                  {export_.fileName}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm">
                              {export_.formatName}
                            </td>
                            <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                              {export_.exportDate.toLocaleDateString('fr-FR')}
                            </td>
                            <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                              {formatFileSize(export_.fileSize)}
                            </td>
                            <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                              {export_.recordCount.toLocaleString('fr-FR')}
                            </td>
                            <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm font-medium">
                              {export_.downloadCount}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                export_.status === 'completed' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                              }`}>
                                {export_.status === 'completed' ? 'Terminé' : 'Échec'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Télécharger"
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
          </div>
        </BackgroundGradient>
      </div>

      {/* Informations supplémentaires */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-sm mt-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              À propos des exports de catalogue
            </h4>
            <p className="text-blue-700 dark:text-blue-300">
              Les exports de catalogue permettent de générer des fichiers dans différents formats adaptés aux logiciels de gestion d'officine.
              L'export complet contient toutes les informations produits, tandis que les formats spécifiques (LGPI, Isipharm, Winpharma) 
              sont structurés selon les attentes de ces logiciels. Les fichiers générés sont disponibles dans l'historique des téléchargements.
            </p>
          </div>
        </div>
      </div>

      {/* Modal d'import */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                Importer des données
              </h2>
              <button
                onClick={() => {
                  setIsImportModalOpen(false);
                  setSelectedFile(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl sm:text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Type d'import */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type d'import
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setImportType('catalog')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      importType === 'catalog' 
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <Package className={`w-6 h-6 mb-2 ${importType === 'catalog' ? 'text-teal-600' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${importType === 'catalog' ? 'text-teal-600' : 'text-gray-700 dark:text-gray-300'}`}>
                      Catalogue complet
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setImportType('stock')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      importType === 'stock' 
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <ShoppingCart className={`w-6 h-6 mb-2 ${importType === 'stock' ? 'text-teal-600' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${importType === 'stock' ? 'text-teal-600' : 'text-gray-700 dark:text-gray-300'}`}>
                      Mise à jour stocks
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setImportType('price')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      importType === 'price' 
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <TrendingUp className={`w-6 h-6 mb-2 ${importType === 'price' ? 'text-teal-600' : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${importType === 'price' ? 'text-teal-600' : 'text-gray-700 dark:text-gray-300'}`}>
                      Mise à jour prix
                    </span>
                  </button>
                </div>
              </div>

              {/* Zone de drop */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Glissez-déposez votre fichier ici ou
                </p>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                  accept=".csv,.xls,.xlsx"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg cursor-pointer hover:bg-teal-600 transition-colors"
                >
                  Choisir un fichier
                </label>
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Fichier sélectionné: {selectedFile.name}
                  </p>
                )}
              </div>

              {/* Informations sur le format */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                  Format attendu
                </h4>
                
                {importType === 'catalog' && (
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-300">
                      Fichier CSV sans en-têtes avec les colonnes suivantes:
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 font-mono text-xs">
                      CIP;Libellé;Prix tarif;Prix remisé;Stock;Seuil;Disponibilité;Colisage;Quota période;Quota quantité;CIP remplacement;Commentaire;Alerte;Prix fournisseur;Remplaçant prioritaire;Accès restreint
                    </p>
                    <div className="flex items-start space-x-2 mt-3">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-orange-600 dark:text-orange-400 text-xs">
                        L'import d'un catalogue n'efface pas les produits non présents dans le fichier. Pour supprimer un produit, laissez son libellé vide dans le fichier.
                      </p>
                    </div>
                  </div>
                )}
                
                {importType === 'stock' && (
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-300">
                      Fichier CSV simple avec deux colonnes:
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 font-mono text-xs">
                      Code produit (CIP ou EAN);Stock
                    </p>
                    <div className="flex items-start space-x-2 mt-3">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-blue-600 dark:text-blue-400 text-xs">
                        Seuls les produits présents à la fois sur le frontal et dans le fichier verront leur stock mis à jour.
                      </p>
                    </div>
                  </div>
                )}
                
                {importType === 'price' && (
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-300">
                      Fichier CSV avec la référence et les prix remisés par catégorie:
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 font-mono text-xs">
                      CIP;Prix cat.0;Prix cat.1;Prix cat.2;...;Prix cat.9
                    </p>
                    <div className="flex items-start space-x-2 mt-3">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-blue-600 dark:text-blue-400 text-xs">
                        Si une colonne de prix est omise, le prix correspondant n'est pas modifié. Mettre un prix à 0 pour une catégorie autre que la catégorie 0 signifie qu'elle héritera du prix de la catégorie 0.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setIsImportModalOpen(false);
                  setSelectedFile(null);
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm sm:text-base"
              >
                Annuler
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleImport}
                disabled={!selectedFile}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Importer
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}