import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  AlertTriangle, 
  TrendingUp, 
  Download, 
  Upload,
  ArrowUp,
  ArrowDown,
  Info,
  FileText,
  Tag,
  Clock,
  ShoppingCart,
  Truck,
  BarChart3,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import type { Product } from "../../types";

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      cip: '3400930000001',
      name: 'Doliprane 1000mg',
      description: 'Paracétamol 1000mg - Boîte de 8 comprimés',
      category: 'Antalgique',
      manufacturer: 'Sanofi',
      price: 3.50,
      discountedPrice: 3.15,
      stock: 150,
      minStock: 20,
      maxStock: 500,
      unit: 'boîte',
      status: 'active',
      isControlled: false,
      expiryDate: new Date('2025-12-31'),
      batchNumber: 'LOT2024001',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
      reference: 'DOLI1000',
      ref7: '1234567',
      gtin: '03400930000001',
      packaging: 5,
      comment: 'Conserver à température ambiante',
      alertOnOrder: false,
      supplierPrice: 2.80,
      isPriorityReplacement: false,
      isRestricted: false,
      replacementCip: ''
    },
    {
      id: '2',
      cip: '3400930000002',
      name: 'Amoxicilline 500mg',
      description: 'Amoxicilline 500mg - Boîte de 12 gélules',
      category: 'Antibiotique',
      manufacturer: 'Biogaran',
      price: 8.90,
      discountedPrice: 7.90,
      stock: 5,
      minStock: 10,
      maxStock: 200,
      unit: 'boîte',
      status: 'active',
      isControlled: true,
      expiryDate: new Date('2025-06-30'),
      batchNumber: 'LOT2024002',
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date(),
      reference: 'AMOX500',
      ref7: '2345678',
      gtin: '03400930000002',
      packaging: 1,
      comment: 'Antibiotique à large spectre',
      alertOnOrder: true,
      supplierPrice: 6.50,
      isPriorityReplacement: false,
      isRestricted: false,
      replacementCip: ''
    },
    {
      id: '3',
      cip: '3400930000003',
      name: 'Aspirine 500mg',
      description: 'Acide acétylsalicylique 500mg - Boîte de 20 comprimés',
      category: 'Antalgique',
      manufacturer: 'Bayer',
      price: 4.25,
      discountedPrice: 3.80,
      stock: 0,
      minStock: 15,
      maxStock: 300,
      unit: 'boîte',
      status: 'discontinued',
      isControlled: false,
      expiryDate: new Date('2025-03-31'),
      batchNumber: 'LOT2024003',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date(),
      reference: 'ASPI500',
      ref7: '3456789',
      gtin: '03400930000003',
      packaging: 10,
      comment: '',
      alertOnOrder: false,
      supplierPrice: 3.20,
      isPriorityReplacement: true,
      isRestricted: false,
      replacementCip: '3400930000001'
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'orders' | 'requests' | 'associations' | 'rotations' | 'evolutions'>('details');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importType, setImportType] = useState<'catalog' | 'stock' | 'price'>('catalog');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.cip.includes(searchTerm) ||
                         product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Tri des produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'cip':
        comparison = a.cip.localeCompare(b.cip);
        break;
      case 'ref7':
        comparison = (a.ref7 || '').localeCompare(b.ref7 || '');
        break;
      case 'gtin':
        comparison = (a.gtin || '').localeCompare(b.gtin || '');
        break;
      case 'stock':
        comparison = a.stock - b.stock;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'discountedPrice':
        comparison = a.discountedPrice - b.discountedPrice;
        break;
      default:
        comparison = a.name.localeCompare(b.name);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'discontinued': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'discontinued': return 'Arrêté';
      default: return status;
    }
  };

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { color: 'text-red-600 bg-red-100', label: 'Rupture' };
    if (product.stock <= product.minStock) return { color: 'text-orange-600 bg-orange-100', label: 'Stock faible' };
    return { color: 'text-green-600 bg-green-100', label: 'En stock' };
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const lowStockProducts = products.filter(p => p.stock <= p.minStock && p.status === 'active');
  const outOfStockProducts = products.filter(p => p.stock === 0 && p.status === 'active');

  const handleImport = () => {
    if (!selectedFile) return;
    
    console.log(`Import de type ${importType} avec le fichier ${selectedFile.name}`);
    // Logique d'import
    
    setIsImportModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Liste des articles
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Gérez votre catalogue de produits pharmaceutiques
          </p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
          >
            <Upload className="w-5 h-5" />
            <span>Importer</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
          >
            <Download className="w-5 h-5" />
            <span>Exporter</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un article</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          { 
            title: "Total Produits", 
            value: products.length, 
            color: "text-blue-600", 
            bg: "bg-blue-100",
            icon: Package
          },
          { 
            title: "Produits Actifs", 
            value: products.filter(p => p.status === 'active').length, 
            color: "text-green-600", 
            bg: "bg-green-100",
            icon: Package
          },
          { 
            title: "Stock Faible", 
            value: lowStockProducts.length, 
            color: "text-orange-600", 
            bg: "bg-orange-100",
            icon: AlertTriangle
          },
          { 
            title: "Ruptures", 
            value: outOfStockProducts.length, 
            color: "text-red-600", 
            bg: "bg-red-100",
            icon: AlertTriangle
          },
          { 
            title: "Valeur Stock", 
            value: `€${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString('fr-FR')}`, 
            color: "text-purple-600", 
            bg: "bg-purple-100",
            icon: TrendingUp
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un produit (nom, CIP, fabricant)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-white"
            >
              <option value="all">Toutes catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-white"
            >
              <option value="all">Tous statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="discontinued">Arrêté</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contrôles de pagination et affichage */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Afficher</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-2 sm:px-3 py-1 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">éléments</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {currentPage} sur {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </div>
      </div>

      {/* Liste des produits */}
      <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm cursor-pointer" onClick={() => handleSort('cip')}>
                    <div className="flex items-center space-x-1">
                      <span>Référence</span>
                      {getSortIcon('cip')}
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm cursor-pointer" onClick={() => handleSort('ref7')}>
                    <div className="flex items-center space-x-1">
                      <span>Réf 7</span>
                      {getSortIcon('ref7')}
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm cursor-pointer" onClick={() => handleSort('gtin')}>
                    <div className="flex items-center space-x-1">
                      <span>Code GTIN</span>
                      {getSortIcon('gtin')}
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm cursor-pointer" onClick={() => handleSort('stock')}>
                    <div className="flex items-center justify-center space-x-1">
                      <span>Stock</span>
                      {getSortIcon('stock')}
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center space-x-1">
                      <span>Libellé</span>
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm cursor-pointer" onClick={() => handleSort('price')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Prix tarif</span>
                      {getSortIcon('price')}
                    </div>
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm cursor-pointer" onClick={() => handleSort('discountedPrice')}>
                    <div className="flex items-center justify-end space-x-1">
                      <span>Prix remisé</span>
                      {getSortIcon('discountedPrice')}
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((product, index) => {
                    const stockStatus = getStockStatus(product);
                    return (
                      <tr 
                        key={product.id} 
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedProduct(product);
                          setActiveTab('details');
                          setIsModalOpen(true);
                        }}
                      >
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm font-mono">
                          {product.cip}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm font-mono">
                          {product.ref7 || '-'}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-sm font-mono">
                          {product.gtin || '-'}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          <div className="flex items-center">
                            {product.isControlled && (
                              <span className="mr-2 bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded">
                                Contrôlé
                              </span>
                            )}
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {product.manufacturer}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm font-medium">
                          €{product.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm font-medium">
                          €{product.discountedPrice.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProduct(product);
                                setActiveTab('details');
                                setIsModalOpen(true);
                              }}
                              className="p-1.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`Êtes-vous sûr de vouloir supprimer le produit "${product.name}" ?`)) {
                                  setProducts(prev => prev.filter(p => p.id !== product.id));
                                }
                              }}
                              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </BackgroundGradient>

      {/* Modal pour création/édition de produit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {selectedProduct ? 'Modifier l\'article' : 'Nouvel article'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            {/* Onglets */}
            {selectedProduct && (
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex items-center space-x-2 px-4 py-3 ${
                    activeTab === 'details' 
                      ? 'border-b-2 border-teal-500 text-teal-600' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span>Détails produit</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center space-x-2 px-4 py-3 ${
                    activeTab === 'orders' 
                      ? 'border-b-2 border-teal-500 text-teal-600' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Liste des commandes</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`flex items-center space-x-2 px-4 py-3 ${
                    activeTab === 'requests' 
                      ? 'border-b-2 border-teal-500 text-teal-600' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Info className="w-5 h-5" />
                  <span>Liste des requêtes</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('associations')}
                  className={`flex items-center space-x-2 px-4 py-3 ${
                    activeTab === 'associations' 
                      ? 'border-b-2 border-teal-500 text-teal-600' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Tag className="w-5 h-5" />
                  <span>Associations</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('rotations')}
                  className={`flex items-center space-x-2 px-4 py-3 ${
                    activeTab === 'rotations' 
                      ? 'border-b-2 border-teal-500 text-teal-600' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Rotations</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('evolutions')}
                  className={`flex items-center space-x-2 px-4 py-3 ${
                    activeTab === 'evolutions' 
                      ? 'border-b-2 border-teal-500 text-teal-600' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Évolutions</span>
                </button>
              </div>
            )}

            {/* Contenu des onglets */}
            {activeTab === 'details' && (
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Référence (CIP13) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.cip}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="3400930000001"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Référence 7 (CIP7)
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.ref7}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="1234567"
                      maxLength={7}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Code GTIN (EAN13)
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.gtin}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="03400930000001"
                      maxLength={14}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Libellé <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.name}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Nom du produit"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      defaultValue={selectedProduct?.description}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Description détaillée du produit"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Catégorie
                    </label>
                    <select
                      defaultValue={selectedProduct?.category}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fabricant
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.manufacturer}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Nom du fabricant"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prix tarif (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={selectedProduct?.price}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prix remisé (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={selectedProduct?.discountedPrice}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Stock actuel
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedProduct?.stock}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Seuil de stock
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedProduct?.minStock}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Colisage
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedProduct?.packaging}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="1"
                      min="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Taille du lot/unité de vente (ex: 1 = à l'unité, 10 = vendu par 10)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Statut
                    </label>
                    <select
                      defaultValue={selectedProduct?.status}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                      <option value="discontinued">Arrêté</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      CIP de remplacement
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.replacementCip}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="CIP du produit remplaçant"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Code CIP d'un produit qui remplace celui-ci (en cas de remplacement définitif)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Commentaire
                    </label>
                    <textarea
                      defaultValue={selectedProduct?.comment}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Commentaire ou note sur le produit"
                      maxLength={255}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Texte libre (max 255 caractères) qui sera retourné dans les échanges PharmaML
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prix fournisseur (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={selectedProduct?.supplierPrice}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0.00"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Prix d'achat fournisseur du produit (facultatif)
                    </p>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked={selectedProduct?.isControlled}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Produit contrôlé (nécessite une prescription)
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked={selectedProduct?.alertOnOrder}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Alerte produit (envoyer un email à chaque commande)
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked={selectedProduct?.isPriorityReplacement}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Remplaçant prioritaire
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked={selectedProduct?.isRestricted}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Limitation d'accès (produit restreint)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedProduct(null);
                    }}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Annuler
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
                  >
                    {selectedProduct ? 'Modifier' : 'Créer'}
                  </motion.button>
                </div>
              </form>
            )}

            {/* Onglet Liste des commandes */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Commandes contenant ce produit
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Période:</span>
                    <select className="px-3 py-1 border border-gray-200 rounded text-sm">
                      <option value="30">30 derniers jours</option>
                      <option value="90">90 derniers jours</option>
                      <option value="180">6 derniers mois</option>
                      <option value="365">12 derniers mois</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Référence</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Officine</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Qté commandée</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Qté livrée</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Montant</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          25/06/2025
                        </td>
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          CMD-2025-001
                        </td>
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          Pharmacie Central
                        </td>
                        <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                          5
                        </td>
                        <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                          5
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm font-medium">
                          €17.50
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          20/06/2025
                        </td>
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          CMD-2025-002
                        </td>
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          Pharmacie du Marché
                        </td>
                        <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                          3
                        </td>
                        <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                          3
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm font-medium">
                          €10.50
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm">
                    <Download className="w-4 h-4" />
                    <span>Exporter</span>
                  </button>
                </div>
              </div>
            )}

            {/* Onglet Liste des requêtes */}
            {activeTab === 'requests' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Requêtes d'information sur ce produit
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Période:</span>
                    <select className="px-3 py-1 border border-gray-200 rounded text-sm">
                      <option value="30">30 derniers jours</option>
                      <option value="90">90 derniers jours</option>
                      <option value="180">6 derniers mois</option>
                      <option value="365">12 derniers mois</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Heure</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Officine</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Qté demandée</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Réponse</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          25/06/2025
                        </td>
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          10:15:32
                        </td>
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          Pharmacie Central
                        </td>
                        <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                          5
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                            Disponible (150)
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          24/06/2025
                        </td>
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          14:22:05
                        </td>
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          Pharmacie de la Gare
                        </td>
                        <td className="py-3 px-4 text-center text-gray-800 dark:text-white text-sm">
                          10
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                            Disponible (155)
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm">
                    <Download className="w-4 h-4" />
                    <span>Exporter</span>
                  </button>
                </div>
              </div>
            )}

            {/* Onglet Associations */}
            {activeTab === 'associations' && (
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Les associations permettent de lier un produit externe (notice, échantillon...) à cet article. 
                    Le produit associé sera automatiquement ajouté à la commande lorsque cet article est commandé.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Ajouter une association</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CIP/EAN du produit associé
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Code du produit à associer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Libellé du produit associé
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Nom du produit associé"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm">
                      Ajouter l'association
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">CIP/EAN associé</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Libellé</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm font-mono">
                          3400930000099
                        </td>
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          Notice Doliprane 1000mg
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Onglet Rotations */}
            {activeTab === 'rotations' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Statistiques de rotation sur 24 mois
                </h3>

                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="p-4">
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Graphique des rotations sur 24 mois</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm text-gray-500 mb-2">Commandes totales</h4>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">247</p>
                    <div className="flex items-center mt-2 text-green-600">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+12% vs période précédente</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm text-gray-500 mb-2">Boîtes commandées</h4>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">1,247</p>
                    <div className="flex items-center mt-2 text-green-600">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+8% vs période précédente</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm text-gray-500 mb-2">Boîtes livrées</h4>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">1,235</p>
                    <div className="flex items-center mt-2 text-green-600">
                      <ArrowUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+7% vs période précédente</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Évolutions */}
            {activeTab === 'evolutions' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Évolutions de tarif
                </h3>

                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Date d'application</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Prix fournisseur HT</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Prix grossiste HT</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Prix public TTC</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300 text-sm">Variation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          01/07/2025
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm">
                          €2.95
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm">
                          €3.60
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm font-medium">
                          €5.95
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center text-green-600">
                            <ArrowUp className="w-4 h-4 mr-1" />
                            <span className="text-sm">+5.3%</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4 text-gray-800 dark:text-white text-sm">
                          01/01/2025
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm">
                          €2.80
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm">
                          €3.40
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800 dark:text-white text-sm font-medium">
                          €5.65
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center text-red-600">
                            <ArrowDown className="w-4 h-4 mr-1" />
                            <span className="text-sm">-2.6%</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        À propos des évolutions de tarif
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Ces informations sont issues de la base CEPS (Comité Économique des Produits de Santé) et indiquent les changements de prix officiels à venir pour ce produit. Les dates d'application sont les dates légales de mise en œuvre des nouveaux tarifs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

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
                    <Package className={`w-6 h-6 mb-2 ${importType === 'stock' ? 'text-teal-600' : 'text-gray-500'}`} />
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
                    <Tag className={`w-6 h-6 mb-2 ${importType === 'price' ? 'text-teal-600' : 'text-gray-500'}`} />
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