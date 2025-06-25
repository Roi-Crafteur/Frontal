import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Download, 
  FileText, 
  Calendar, 
  Search, 
  Filter,
  Eye,
  Trash2,
  RefreshCw,
  File,
  FileSpreadsheet,
  Archive,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";

interface DownloadRecord {
  id: string;
  fileName: string;
  fileType: 'csv' | 'excel' | 'pdf' | 'zip';
  exportType: string;
  fileSize: number;
  downloadDate: Date;
  status: 'completed' | 'failed' | 'expired';
  downloadCount: number;
  expiresAt?: Date;
  description: string;
  recordCount?: number;
  period?: string;
}

export default function DownloadHistory() {
  const [downloads, setDownloads] = useState<DownloadRecord[]>([
    {
      id: '1',
      fileName: 'commandes_en_attente_20250625.csv',
      fileType: 'csv',
      exportType: 'Commandes en attente',
      fileSize: 245760, // 240 KB
      downloadDate: new Date(),
      status: 'completed',
      downloadCount: 3,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
      description: 'Export des commandes en attente de traitement',
      recordCount: 23,
      period: '25/06/2025'
    },
    {
      id: '2',
      fileName: 'produits_inconnus_mai2025.csv',
      fileType: 'csv',
      exportType: 'Produits inconnus',
      fileSize: 102400, // 100 KB
      downloadDate: new Date(Date.now() - 86400000), // Hier
      status: 'completed',
      downloadCount: 1,
      expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      description: 'Liste des produits inconnus du mois de mai',
      recordCount: 15,
      period: '01/05/2025 - 31/05/2025'
    },
    {
      id: '3',
      fileName: 'catalogue_complet_20250624.xlsx',
      fileType: 'excel',
      exportType: 'Catalogue complet',
      fileSize: 5242880, // 5 MB
      downloadDate: new Date(Date.now() - 172800000), // Avant-hier
      status: 'completed',
      downloadCount: 5,
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      description: 'Export complet du catalogue produits',
      recordCount: 52231,
      period: '24/06/2025'
    },
    {
      id: '4',
      fileName: 'gers_mai2025.csv',
      fileType: 'csv',
      exportType: 'Export GERS',
      fileSize: 1048576, // 1 MB
      downloadDate: new Date(Date.now() - 259200000), // 3 jours avant
      status: 'completed',
      downloadCount: 2,
      expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      description: 'Fichier GERS du mois de mai',
      recordCount: 1247,
      period: '01/05/2025 - 31/05/2025'
    },
    {
      id: '5',
      fileName: 'flux_clients_20250623.csv',
      fileType: 'csv',
      exportType: 'Flux par clients',
      fileSize: 153600, // 150 KB
      downloadDate: new Date(Date.now() - 345600000), // 4 jours avant
      status: 'expired',
      downloadCount: 1,
      expiresAt: new Date(Date.now() - 86400000), // Expiré hier
      description: 'Export des flux regroupés par client',
      recordCount: 8,
      period: '23/06/2025'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Statistiques pour les cartes
  const statsItems = [
    {
      title: "Téléchargements Récents",
      description: "Derniers 7 jours",
      link: "#",
      icon: <Download className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      stats: [
        { value: downloads.filter(d => d.downloadDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, label: "fichiers" },
        { value: downloads.reduce((sum, d) => sum + d.downloadCount, 0), label: "téléchargements" },
        { value: Math.round(downloads.reduce((sum, d) => sum + d.fileSize, 0) / 1024 / 1024), label: "MB total" }
      ]
    },
    {
      title: "Types de Fichiers",
      description: "Formats exportés",
      link: "#",
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
      stats: [
        { value: downloads.filter(d => d.fileType === 'csv').length, label: "CSV" },
        { value: downloads.filter(d => d.fileType === 'excel').length, label: "Excel" },
        { value: downloads.filter(d => d.fileType === 'pdf' || d.fileType === 'zip').length, label: "autres" }
      ]
    },
    {
      title: "Statut des Fichiers",
      description: "Disponibilité actuelle",
      link: "#",
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />,
      stats: [
        { value: downloads.filter(d => d.status === 'completed' && (d.expiresAt || new Date()) > new Date()).length, label: "disponibles" },
        { value: downloads.filter(d => d.status === 'expired' || ((d.expiresAt || new Date()) <= new Date())).length, label: "expirés" },
        { value: downloads.filter(d => d.status === 'failed').length, label: "échec" }
      ]
    }
  ];

  const filteredDownloads = downloads.filter(download => {
    const matchesSearch = download.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         download.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         download.exportType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || download.fileType === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'available' && download.status === 'completed' && (download.expiresAt || new Date()) > new Date()) ||
                         (filterStatus === 'expired' && (download.status === 'expired' || ((download.expiresAt || new Date()) <= new Date())));
    return matchesSearch && matchesType && matchesStatus;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'csv': return <File className="w-5 h-5 text-green-500" />;
      case 'excel': return <FileSpreadsheet className="w-5 h-5 text-blue-500" />;
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'zip': return <Archive className="w-5 h-5 text-orange-500" />;
      default: return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (download: DownloadRecord) => {
    if (download.status === 'failed') return 'text-red-600 bg-red-100';
    if (download.status === 'expired' || (download.expiresAt && download.expiresAt <= new Date())) 
      return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getStatusLabel = (download: DownloadRecord) => {
    if (download.status === 'failed') return 'Échec';
    if (download.status === 'expired' || (download.expiresAt && download.expiresAt <= new Date())) 
      return 'Expiré';
    return 'Disponible';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = (id: string) => {
    setDownloads(prev => prev.map(download => 
      download.id === id 
        ? { ...download, downloadCount: download.downloadCount + 1 } 
        : download
    ));
    console.log(`Téléchargement du fichier ${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fichier de l\'historique ?')) {
      setDownloads(prev => prev.filter(download => download.id !== id));
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Historique des Téléchargements
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Consultez et gérez vos fichiers exportés récemment
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Vue d'ensemble des téléchargements
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
              placeholder="Rechercher un fichier..."
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
            <option value="pdf">PDF</option>
            <option value="zip">ZIP</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="available">Disponibles</option>
            <option value="expired">Expirés</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Actualiser</span>
        </motion.button>
      </div>

      {/* Liste des téléchargements */}
      <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden">
          {/* En-tête */}
          <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                Fichiers téléchargés récemment
              </h3>
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                {filteredDownloads.length} fichiers
              </span>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-3 sm:p-4">
            {filteredDownloads.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Aucun téléchargement trouvé
                </h3>
                <p className="text-sm text-gray-500">
                  Aucun fichier ne correspond à vos critères de recherche.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {/* Version mobile - Cards */}
                <div className="block lg:hidden">
                  {filteredDownloads.map((download, index) => (
                    <motion.div
                      key={download.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          {getFileIcon(download.fileType)}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 dark:text-white text-sm sm:text-base line-clamp-2">
                              {download.fileName}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              {download.exportType} • {formatFileSize(download.fileSize)}
                            </p>
                          </div>
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(download)}`}>
                          {getStatusLabel(download)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div>
                          <span className="text-gray-500">Date:</span>
                          <p className="text-gray-800 dark:text-white">
                            {download.downloadDate.toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Téléchargements:</span>
                          <p className="text-gray-800 dark:text-white">
                            {download.downloadCount}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Période:</span>
                          <p className="text-gray-800 dark:text-white">
                            {download.period || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Expire le:</span>
                          <p className="text-gray-800 dark:text-white">
                            {download.expiresAt?.toLocaleDateString('fr-FR') || 'N/A'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDownload(download.id)}
                          disabled={download.status === 'expired' || (download.expiresAt && download.expiresAt <= new Date())}
                          className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(download.id)}
                          className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
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
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Type d'export</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Date</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Taille</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Téléchargements</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Expire le</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Statut</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDownloads.map((download, index) => (
                        <motion.tr
                          key={download.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              {getFileIcon(download.fileType)}
                              <div>
                                <p className="text-gray-800 dark:text-white text-sm font-medium">
                                  {download.fileName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {download.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm">
                            {download.exportType}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                            {download.downloadDate.toLocaleDateString('fr-FR')}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                            {formatFileSize(download.fileSize)}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm font-medium">
                            {download.downloadCount}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                            {download.expiresAt?.toLocaleDateString('fr-FR') || 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(download)}`}>
                              {getStatusLabel(download)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDownload(download.id)}
                                disabled={download.status === 'expired' || (download.expiresAt && download.expiresAt <= new Date())}
                                className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Télécharger"
                              >
                                <Download className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDelete(download.id)}
                                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
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
                Les fichiers sont conservés pendant 7 jours après leur génération
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Affichage de {filteredDownloads.length} fichier(s) sur {downloads.length}
              </div>
            </div>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
}