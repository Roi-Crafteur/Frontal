import React, { useState } from "react";
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
  Eye,
  FileText,
  Link,
  BarChart3,
  Euro,
  Calendar,
  ShoppingCart,
  Users,
  Info
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
      // Champs supplémentaires
      reference: '3400930000001',
      ref7: '3000001',
      gtin: '3400930000001',
      packaging: 1,
      comment: 'Conserver à température ambiante',
      alertOnOrder: false,
      supplierPrice: 2.80,
      isPriorityReplacement: false,
      isRestricted: false,
      replacementCip: '',
      quotaPeriod: '',
      quotaQuantity: 0
    },
    {
      id: '2',
      cip: '3400930000002',
      name: 'Amoxicilline 500mg',
      description: 'Amoxicilline 500mg - Boîte de 12 gélules',
      category: 'Antibiotique',
      manufacturer: 'Biogaran',
      price: 8.90,
      discountedPrice: 8.01,
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
      // Champs supplémentaires
      reference: '3400930000002',
      ref7: '3000002',
      gtin: '3400930000002',
      packaging: 1,
      comment: 'Prescription médicale obligatoire',
      alertOnOrder: true,
      supplierPrice: 7.12,
      isPriorityReplacement: false,
      isRestricted: true,
      replacementCip: '',
      quotaPeriod: 'Mensuel',
      quotaQuantity: 50
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'details' | 'pricing' | 'comments' | 'associations' | 'rotations'>('details');
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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
    if (!sortField) return 0;
    
    let aValue = a[sortField as keyof Product];
    let bValue = b[sortField as keyof Product];
    
    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

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

  const lowStockProducts = products.filter(p => p.stock <= p.minStock && p.status === 'active');
  const outOfStockProducts = products.filter(p => p.stock === 0 && p.status === 'active');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Liste des articles
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mt-2">
            <span>PharmaML</span>
            <span>/</span>
            <span>Articles</span>
          </div>
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

      {/* Liste des articles */}
      <BackgroundGradient className="rounded-2xl p-1">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
          {/* En-tête avec actions */}
          <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Liste des articles
              </h3>
              
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedProduct(null);
                    setActiveTab('details');
                    setIsModalOpen(true);
                  }}
                  className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un article</span>
                </motion.button>
                
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Importer</span>
                  </motion.button>
                </div>
                
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exports</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Contrôles de pagination et recherche */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Afficher</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-3 py-1 border border-gray-200 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                  >
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="text-sm text-gray-600 dark:text-gray-300">éléments</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Rechercher :</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-1 border border-gray-200 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm w-48"
                  placeholder="Rechercher..."
                />
              </div>
            </div>
          </div>

          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleSort('reference')}
                  >
                    <div className="flex items-center space-x-1">
                      <Package className="w-4 h-4" />
                      <span>Référence</span>
                      {sortField === 'reference' && (
                        <span className="text-teal-500">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleSort('ref7')}
                  >
                    <div className="flex items-center space-x-1">
                      <Package className="w-4 h-4" />
                      <span>Réf 7</span>
                      {sortField === 'ref7' && (
                        <span className="text-teal-500">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleSort('gtin')}
                  >
                    <div className="flex items-center space-x-1">
                      <Package className="w-4 h-4" />
                      <span>Code GTIN</span>
                      {sortField === 'gtin' && (
                        <span className="text-teal-500">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleSort('stock')}
                  >
                    <div className="flex items-center space-x-1">
                      <BarChart3 className="w-4 h-4" />
                      <span>Stock</span>
                      {sortField === 'stock' && (
                        <span className="text-teal-500">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>Libellé</span>
                      {sortField === 'name' && (
                        <span className="text-teal-500">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <Euro className="w-4 h-4" />
                      <span>Prix tarif</span>
                      {sortField === 'price' && (
                        <span className="text-teal-500">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleSort('discountedPrice')}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      <Euro className="w-4 h-4" />
                      <span>Prix remisé</span>
                      {sortField === 'discountedPrice' && (
                        <span className="text-teal-500">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedProducts.map((product, index) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setActiveTab('details');
                        setIsModalOpen(true);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800 dark:text-white">
                        {product.reference}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800 dark:text-white">
                        {product.ref7}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-800 dark:text-white">
                        {product.gtin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-800 dark:text-white">
                            {product.stock}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                            {stockStatus.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 dark:text-white">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.manufacturer}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-800 dark:text-white">
                        €{product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-teal-600">
                        €{product.discountedPrice.toFixed(2)}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Affichage de {(currentPage - 1) * itemsPerPage + 1} à {Math.min(currentPage * itemsPerPage, sortedProducts.length)} sur {sortedProducts.length} éléments
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  Précédent
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  Suivant
                </button>
              </div>
            </div>
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
                {selectedProduct ? 'Propriétés de l\'article' : 'Nouvel article'}
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
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('details')}
                className={`flex items-center space-x-2 px-4 py-3 ${
                  activeTab === 'details' 
                    ? 'border-b-2 border-teal-500 text-teal-600' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Détails de l'article</span>
              </button>
              
              <button
                onClick={() => setActiveTab('pricing')}
                className={`flex items-center space-x-2 px-4 py-3 ${
                  activeTab === 'pricing' 
                    ? 'border-b-2 border-teal-500 text-teal-600' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Euro className="w-5 h-5" />
                <span>Tarification et disponibilité</span>
              </button>
              
              <button
                onClick={() => setActiveTab('comments')}
                className={`flex items-center space-x-2 px-4 py-3 ${
                  activeTab === 'comments' 
                    ? 'border-b-2 border-teal-500 text-teal-600' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Info className="w-5 h-5" />
                <span>Commentaire</span>
              </button>
              
              <button
                onClick={() => setActiveTab('associations')}
                className={`flex items-center space-x-2 px-4 py-3 ${
                  activeTab === 'associations' 
                    ? 'border-b-2 border-teal-500 text-teal-600' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Link className="w-5 h-5" />
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
            </div>

            <form className="space-y-6">
              {/* Onglet Détails */}
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Référence
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.reference}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="3400930000001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Code EAN
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.gtin}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="3400930000001"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Libellé
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.name}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Nom du produit"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date de dernière vente
                    </label>
                    <input
                      type="text"
                      value="-"
                      readOnly
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Stock
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
                      Seuil
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
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Exploitant
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct?.manufacturer}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Nom du fabricant"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={selectedProduct?.alertOnOrder}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Envoyer un email lors de la commande de ce produit
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Onglet Tarification */}
              {activeTab === 'pricing' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      Prix fournisseur (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={selectedProduct?.supplierPrice}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0.00"
                    />
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
                      Période de quota
                    </label>
                    <select
                      defaultValue={selectedProduct?.quotaPeriod || ''}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Aucune</option>
                      <option value="Journalier">Journalier</option>
                      <option value="Hebdomadaire">Hebdomadaire</option>
                      <option value="Mensuel">Mensuel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Quantité quota
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedProduct?.quotaQuantity}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0"
                    />
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
                  </div>

                  <div className="md:col-span-2 space-y-3">
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

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={selectedProduct?.isRestricted}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Accès limité
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Onglet Commentaire */}
              {activeTab === 'comments' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Commentaire
                    </label>
                    <textarea
                      defaultValue={selectedProduct?.comment}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Commentaire sur le produit"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Ce commentaire sera visible par les officines et retourné dans les échanges PharmaML
                    </p>
                  </div>
                </div>
              )}

              {/* Onglet Associations */}
              {activeTab === 'associations' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Les associations permettent de lier un produit externe à cet article. 
                      L'article associé sera automatiquement ajouté à la commande lorsque cet article principal est commandé.
                    </p>
                  </div>

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

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition-all"
                    >
                      Ajouter l'association
                    </motion.button>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                      Produits associés actuels
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Aucun produit associé pour cet article
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Rotations */}
              {activeTab === 'rotations' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Statistiques de rotation sur 24 mois pour ce produit
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700">
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mois</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Commandes</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Boîtes commandées</th>
                          <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Boîtes livrées</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {Array.from({ length: 24 }).map((_, index) => {
                          const date = new Date();
                          date.setMonth(date.getMonth() - index);
                          const monthYear = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
                          
                          // Données simulées
                          const orders = Math.floor(Math.random() * 10);
                          const boxesOrdered = Math.floor(Math.random() * 50);
                          const boxesDelivered = Math.floor(boxesOrdered * (0.8 + Math.random() * 0.2));
                          
                          return (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                                {monthYear}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800 dark:text-white">
                                {orders}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800 dark:text-white">
                                {boxesOrdered}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-800 dark:text-white">
                                {boxesDelivered}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedProduct(null);
                  }}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Retour
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
                >
                  Valider
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}