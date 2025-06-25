import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  Users,
  Tag,
  Plus,
  FolderOpen,
  File,
  Image,
  FileSpreadsheet,
  Archive
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";

interface Document {
  id: string;
  name: string;
  category: string;
  type: 'pdf' | 'excel' | 'word' | 'image' | 'archive';
  size: number;
  destinataire: 'tous' | string; // 'tous' ou ID officine
  destinataireNom?: string;
  dateUpload: Date;
  dateExpiration?: Date;
  isPublic: boolean;
  tags: string[];
  linkedOrders?: string[];
  uploadedBy: string;
  downloadCount: number;
}

export default function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Catalogue Tarifs 2025.pdf',
      category: 'Tarifs',
      type: 'pdf',
      size: 2048576, // 2MB
      destinataire: 'tous',
      dateUpload: new Date('2025-01-15'),
      dateExpiration: new Date('2025-12-31'),
      isPublic: true,
      tags: ['tarifs', 'catalogue', '2025'],
      uploadedBy: 'POISOT Paul',
      downloadCount: 45
    },
    {
      id: '2',
      name: 'Promotion Février.pdf',
      category: 'Promotions',
      type: 'pdf',
      size: 1024000, // 1MB
      destinataire: 'tous',
      dateUpload: new Date('2025-02-01'),
      dateExpiration: new Date('2025-02-28'),
      isPublic: true,
      tags: ['promotion', 'février'],
      uploadedBy: 'Marie Dubois',
      downloadCount: 23
    },
    {
      id: '3',
      name: 'Avoir Pharmacie Central.pdf',
      category: 'Avoirs',
      type: 'pdf',
      size: 512000, // 500KB
      destinataire: '1',
      destinataireNom: 'Pharmacie Central',
      dateUpload: new Date('2025-05-20'),
      isPublic: false,
      tags: ['avoir', 'pharmacie-central'],
      linkedOrders: ['CMD-2025-001'],
      uploadedBy: 'POISOT Paul',
      downloadCount: 3
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDestinataire, setFilterDestinataire] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploadDestinataire, setUploadDestinataire] = useState('tous');
  const [uploadTags, setUploadTags] = useState('');

  const categories = [...new Set(documents.map(d => d.category))];

  // Statistiques pour les cartes
  const statsItems = [
    {
      title: "Documents totaux",
      description: "Tous les fichiers",
      link: "#",
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      stats: [
        { value: documents.length, label: "fichiers" },
        { value: documents.filter(d => d.isPublic).length, label: "publics" },
        { value: Math.round(documents.reduce((sum, d) => sum + d.size, 0) / 1024 / 1024), label: "MB total" }
      ]
    },
    {
      title: "Documents publics",
      description: "Accessibles à tous",
      link: "#",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
      stats: [
        { value: documents.filter(d => d.isPublic).length, label: "publics" },
        { value: documents.reduce((sum, d) => sum + d.downloadCount, 0), label: "téléchargements" },
        { value: categories.length, label: "catégories" }
      ]
    },
    {
      title: "Documents privés",
      description: "Ciblés par officine",
      link: "#",
      icon: <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />,
      stats: [
        { value: documents.filter(d => !d.isPublic).length, label: "privés" },
        { value: documents.filter(d => d.linkedOrders?.length).length, label: "liés commandes" },
        { value: documents.filter(d => d.dateExpiration && d.dateExpiration < new Date()).length, label: "expirés" }
      ]
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesDestinataire = filterDestinataire === 'all' || 
                               (filterDestinataire === 'public' && doc.isPublic) ||
                               (filterDestinataire === 'private' && !doc.isPublic);
    return matchesSearch && matchesCategory && matchesDestinataire;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'excel': return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case 'word': return <File className="w-5 h-5 text-blue-500" />;
      case 'image': return <Image className="w-5 h-5 text-purple-500" />;
      case 'archive': return <Archive className="w-5 h-5 text-gray-500" />;
      default: return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = () => {
    if (!selectedFile || !uploadCategory) return;

    const newDocument: Document = {
      id: Date.now().toString(),
      name: selectedFile.name,
      category: uploadCategory,
      type: selectedFile.type.includes('pdf') ? 'pdf' : 
            selectedFile.type.includes('excel') || selectedFile.type.includes('spreadsheet') ? 'excel' :
            selectedFile.type.includes('word') ? 'word' :
            selectedFile.type.includes('image') ? 'image' : 'archive',
      size: selectedFile.size,
      destinataire: uploadDestinataire,
      destinataireNom: uploadDestinataire === 'tous' ? undefined : 'Officine sélectionnée',
      dateUpload: new Date(),
      isPublic: uploadDestinataire === 'tous',
      tags: uploadTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      uploadedBy: 'POISOT Paul',
      downloadCount: 0
    };

    setDocuments(prev => [newDocument, ...prev]);
    setIsUploadModalOpen(false);
    setSelectedFile(null);
    setUploadCategory('');
    setUploadDestinataire('tous');
    setUploadTags('');
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const handleDownloadDocument = (doc: Document) => {
    // Simuler le téléchargement
    setDocuments(prev => prev.map(d => 
      d.id === doc.id ? { ...d, downloadCount: d.downloadCount + 1 } : d
    ));
    console.log(`Téléchargement de ${doc.name}`);
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Gestion des Documents
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Partagez et gérez vos documents avec les officines
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Vue d'ensemble des documents
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
              placeholder="Rechercher un document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="all">Toutes catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={filterDestinataire}
            onChange={(e) => setFilterDestinataire(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="all">Tous destinataires</option>
            <option value="public">Documents publics</option>
            <option value="private">Documents privés</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Importer un fichier</span>
        </motion.button>
      </div>

      {/* Liste des documents */}
      <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="p-3 sm:p-4">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Aucun document trouvé
                </h3>
                <p className="text-sm text-gray-500">
                  Aucun document ne correspond à vos critères de recherche.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {/* Version mobile - Cards */}
                <div className="block lg:hidden">
                  {filteredDocuments.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          {getFileIcon(doc.type)}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 dark:text-white text-sm sm:text-base line-clamp-2">
                              {doc.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              {doc.category} • {formatFileSize(doc.size)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDownloadDocument(doc)}
                            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDownloadDocument(doc)}
                            className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div>
                          <span className="text-gray-500">Destinataire:</span>
                          <p className="text-gray-800 dark:text-white">
                            {doc.isPublic ? 'Tous' : doc.destinataireNom}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Téléchargements:</span>
                          <p className="text-gray-800 dark:text-white">
                            {doc.downloadCount}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Date upload:</span>
                          <p className="text-gray-800 dark:text-white">
                            {doc.dateUpload.toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Par:</span>
                          <p className="text-gray-800 dark:text-white">
                            {doc.uploadedBy}
                          </p>
                        </div>
                      </div>
                      
                      {doc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
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
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Document</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Catégorie</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Destinataire</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Taille</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Date upload</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Téléchargements</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map((doc, index) => (
                        <motion.tr
                          key={doc.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              {getFileIcon(doc.type)}
                              <div>
                                <p className="text-gray-800 dark:text-white text-sm font-medium">
                                  {doc.name}
                                </p>
                                {doc.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {doc.tags.slice(0, 3).map((tag, tagIndex) => (
                                      <span
                                        key={tagIndex}
                                        className="px-1.5 py-0.5 bg-teal-100 text-teal-800 text-xs rounded"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {doc.tags.length > 3 && (
                                      <span className="text-xs text-gray-500">+{doc.tags.length - 3}</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm">
                            {doc.category}
                          </td>
                          <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                            {doc.isPublic ? (
                              <span className="flex items-center space-x-1">
                                <Users className="w-4 h-4 text-green-500" />
                                <span>Tous</span>
                              </span>
                            ) : (
                              doc.destinataireNom
                            )}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                            {formatFileSize(doc.size)}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                            {doc.dateUpload.toLocaleDateString('fr-FR')}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm font-medium">
                            {doc.downloadCount}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDownloadDocument(doc)}
                                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Voir"
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDownloadDocument(doc)}
                                className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Télécharger"
                              >
                                <Download className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDeleteDocument(doc.id)}
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
        </div>
      </BackgroundGradient>

      {/* Modal d'upload */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                Importer un nouveau document
              </h2>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl sm:text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
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
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar"
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

              {/* Formulaire */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="Tarifs">Tarifs</option>
                    <option value="Promotions">Promotions</option>
                    <option value="Avoirs">Avoirs</option>
                    <option value="Notices">Notices</option>
                    <option value="Contrats">Contrats</option>
                    <option value="Autres">Autres</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Destinataire
                  </label>
                  <select
                    value={uploadDestinataire}
                    onChange={(e) => setUploadDestinataire(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="tous">Tous les clients</option>
                    <option value="1">Pharmacie Central</option>
                    <option value="2">Pharmacie du Marché</option>
                    <option value="3">Pharmacie de la Gare</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={uploadTags}
                  onChange={(e) => setUploadTags(e.target.value)}
                  placeholder="ex: tarifs, 2025, promotion"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm sm:text-base"
              >
                Annuler
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFileUpload}
                disabled={!selectedFile || !uploadCategory}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Importer le document
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}