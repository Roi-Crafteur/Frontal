import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  CreditCard, 
  Globe, 
  Settings, 
  Lock, 
  User, 
  FileText,
  Smartphone,
  Printer,
  Eye,
  EyeOff,
  Check,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import type { Officine } from "../../types";

export default function OfficeManagement() {
  const [officines, setOfficines] = useState<Officine[]>([
    {
      id: '1',
      name: 'Pharmacie Central',
      address: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      phone: '+33 1 23 45 67 89',
      mobile: '+33 6 12 34 56 78',
      fax: '+33 1 23 45 67 90',
      email: 'contact@pharmacie-central.fr',
      siret: '12345678901234',
      status: 'active',
      contactPerson: 'Dr. Martin Dupont',
      lastOrder: new Date(Date.now() - 86400000),
      totalOrders: 247,
      totalAmount: 125430.50,
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date(),
      // Identification Web
      webLogin: 'pharma_central',
      webPassword: '••••••••',
      finess: '123456789',
      // Identification PharmaML
      ediId: '1234567890123',
      ediKey: 'ABCD',
      disablePharmaML: false,
      // Profil de commande
      refuseContingent: false,
      infoProductResponse: 0,
      clientCategory: 0,
      showRestrictedProducts: true,
      lgo: 'LGPI',
      // Options supplémentaires
      showStocks: true,
      hidePrices: false,
      ignoreFranco: false,
      groupProductsInExport: false
    },
    {
      id: '2',
      name: 'Pharmacie du Marché',
      address: '456 Avenue des Champs',
      city: 'Lyon',
      postalCode: '69001',
      phone: '+33 4 56 78 90 12',
      mobile: '+33 6 23 45 67 89',
      fax: '+33 4 56 78 90 13',
      email: 'info@pharmacie-marche.fr',
      siret: '98765432109876',
      status: 'active',
      contactPerson: 'Dr. Sophie Bernard',
      lastOrder: new Date(Date.now() - 172800000),
      totalOrders: 189,
      totalAmount: 89250.75,
      createdAt: new Date('2023-03-20'),
      updatedAt: new Date(Date.now() - 172800000),
      // Identification Web
      webLogin: 'pharma_marche',
      webPassword: '••••••••',
      finess: '987654321',
      // Identification PharmaML
      ediId: '9876543210987',
      ediKey: 'WXYZ',
      disablePharmaML: false,
      // Profil de commande
      refuseContingent: false,
      infoProductResponse: 0,
      clientCategory: 1,
      showRestrictedProducts: true,
      lgo: 'Winpharma',
      // Options supplémentaires
      showStocks: true,
      hidePrices: false,
      ignoreFranco: true,
      groupProductsInExport: true
    },
    {
      id: '3',
      name: 'Pharmacie de la Gare',
      address: '789 Boulevard de la Gare',
      city: 'Marseille',
      postalCode: '13001',
      phone: '+33 4 91 23 45 67',
      mobile: '+33 6 34 56 78 90',
      fax: '+33 4 91 23 45 68',
      email: 'contact@pharmacie-gare.fr',
      siret: '11223344556677',
      status: 'suspended',
      contactPerson: 'Dr. Pierre Moreau',
      lastOrder: new Date(Date.now() - 2592000000),
      totalOrders: 156,
      totalAmount: 67890.25,
      createdAt: new Date('2023-05-10'),
      updatedAt: new Date(Date.now() - 2592000000),
      // Identification Web
      webLogin: 'pharma_gare',
      webPassword: '••••••••',
      finess: '456789123',
      // Identification PharmaML
      ediId: '4567891234567',
      ediKey: 'EFGH',
      disablePharmaML: true,
      // Profil de commande
      refuseContingent: true,
      infoProductResponse: 1,
      clientCategory: 2,
      showRestrictedProducts: false,
      lgo: 'Isipharm',
      // Options supplémentaires
      showStocks: false,
      hidePrices: true,
      ignoreFranco: false,
      groupProductsInExport: false
    },
    {
      id: '4',
      name: 'Pharmacie des Lilas',
      address: '15 Rue des Fleurs',
      city: 'Nice',
      postalCode: '06000',
      phone: '+33 4 93 12 34 56',
      mobile: '+33 6 45 67 89 01',
      fax: '+33 4 93 12 34 57',
      email: 'info@pharmacie-lilas.fr',
      siret: '22334455667788',
      status: 'active',
      contactPerson: 'Dr. Marie Dubois',
      lastOrder: new Date(Date.now() - 432000000),
      totalOrders: 312,
      totalAmount: 178450.80,
      createdAt: new Date('2023-02-28'),
      updatedAt: new Date(Date.now() - 432000000),
      // Identification Web
      webLogin: 'pharma_lilas',
      webPassword: '••••••••',
      finess: '789123456',
      // Identification PharmaML
      ediId: '7891234567890',
      ediKey: 'IJKL',
      disablePharmaML: false,
      // Profil de commande
      refuseContingent: false,
      infoProductResponse: 0,
      clientCategory: 1,
      showRestrictedProducts: true,
      lgo: 'PharmaGest',
      // Options supplémentaires
      showStocks: true,
      hidePrices: false,
      ignoreFranco: false,
      groupProductsInExport: true
    },
    {
      id: '5',
      name: 'Pharmacie Saint-Antoine',
      address: '42 Avenue Saint-Antoine',
      city: 'Toulouse',
      postalCode: '31000',
      phone: '+33 5 61 98 76 54',
      mobile: '+33 6 56 78 90 12',
      fax: '+33 5 61 98 76 55',
      email: 'contact@st-antoine-pharma.fr',
      siret: '33445566778899',
      status: 'inactive',
      contactPerson: 'Dr. Jean Lefevre',
      lastOrder: new Date(Date.now() - 1296000000),
      totalOrders: 89,
      totalAmount: 45230.15,
      createdAt: new Date('2023-07-12'),
      updatedAt: new Date(Date.now() - 1296000000),
      // Identification Web
      webLogin: 'pharma_st_antoine',
      webPassword: '••••••••',
      finess: '321654987',
      // Identification PharmaML
      ediId: '3216549876543',
      ediKey: 'MNOP',
      disablePharmaML: false,
      // Profil de commande
      refuseContingent: true,
      infoProductResponse: 2,
      clientCategory: 0,
      showRestrictedProducts: false,
      lgo: 'Dossier Pharmaceutique',
      // Options supplémentaires
      showStocks: false,
      hidePrices: true,
      ignoreFranco: true,
      groupProductsInExport: false
    },
    {
      id: '6',
      name: 'Pharmacie du Soleil',
      address: '88 Promenade du Soleil',
      city: 'Cannes',
      postalCode: '06400',
      phone: '+33 4 92 87 65 43',
      mobile: '+33 6 67 89 01 23',
      fax: '+33 4 92 87 65 44',
      email: 'hello@pharmacie-soleil.fr',
      siret: '44556677889900',
      status: 'active',
      contactPerson: 'Dr. Claire Rousseau',
      lastOrder: new Date(Date.now() - 259200000),
      totalOrders: 427,
      totalAmount: 289670.90,
      createdAt: new Date('2023-01-08'),
      updatedAt: new Date(Date.now() - 259200000),
      // Identification Web
      webLogin: 'pharma_soleil',
      webPassword: '••••••••',
      finess: '654987321',
      // Identification PharmaML
      ediId: '6549873216540',
      ediKey: 'QRST',
      disablePharmaML: false,
      // Profil de commande
      refuseContingent: false,
      infoProductResponse: 1,
      clientCategory: 3,
      showRestrictedProducts: true,
      lgo: 'Pharmagest',
      // Options supplémentaires
      showStocks: true,
      hidePrices: false,
      ignoreFranco: false,
      groupProductsInExport: true
    },
    {
      id: '7',
      name: 'Pharmacie de la République',
      address: '234 Place de la République',
      city: 'Bordeaux',
      postalCode: '33000',
      phone: '+33 5 56 43 21 09',
      mobile: '+33 6 78 90 12 34',
      fax: '+33 5 56 43 21 10',
      email: 'contact@pharmacie-republique.fr',
      siret: '55667788990011',
      status: 'active',
      contactPerson: 'Dr. Antoine Martin',
      lastOrder: new Date(Date.now() - 86400000),
      totalOrders: 298,
      totalAmount: 156789.45,
      createdAt: new Date('2023-04-15'),
      updatedAt: new Date(Date.now() - 86400000),
      // Identification Web
      webLogin: 'pharma_republique',
      webPassword: '••••••••',
      finess: '987321654',
      // Identification PharmaML
      ediId: '9873216549876',
      ediKey: 'UVWX',
      disablePharmaML: false,
      // Profil de commande
      refuseContingent: false,
      infoProductResponse: 0,
      clientCategory: 2,
      showRestrictedProducts: true,
      lgo: 'LGPI',
      // Options supplémentaires
      showStocks: true,
      hidePrices: false,
      ignoreFranco: true,
      groupProductsInExport: false
    }
  ]);

  const [selectedOfficine, setSelectedOfficine] = useState<Officine | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'id' | 'name' | 'city' | 'lastOrder' | 'lgo'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeTab, setActiveTab] = useState<'address' | 'web' | 'pharmaml' | 'profile'>('address');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [hoveredOfficineId, setHoveredOfficineId] = useState<string | null>(null);

  // Référence pour le mot de passe
  const passwordRef = useRef<HTMLInputElement>(null);

  const filteredOfficines = officines
    .filter(officine => {
      if (searchTerm === '') return true;
      
      // Recherche exacte par ID avec préfixe #
      if (searchTerm.startsWith('#')) {
        const searchId = searchTerm.substring(1); // Retire le #
        if (searchId === '') return true; // Si juste #, montre tout
        const matchesExactId = officine.id === searchId;
        const matchesStatus = filterStatus === 'all' || officine.status === filterStatus;
        return matchesExactId && matchesStatus;
      }
      
      // Recherche normale dans tous les champs
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        officine.id.toLowerCase().includes(searchLower) ||
        officine.name.toLowerCase().includes(searchLower) ||
        officine.city.toLowerCase().includes(searchLower) ||
        officine.contactPerson.toLowerCase().includes(searchLower) ||
        officine.address.toLowerCase().includes(searchLower) ||
        officine.postalCode.includes(searchTerm) ||
        officine.phone.includes(searchTerm) ||
        officine.mobile?.includes(searchTerm) ||
        officine.email.toLowerCase().includes(searchLower) ||
        officine.siret.includes(searchTerm) ||
        officine.finess?.includes(searchTerm) ||
        (officine.lgo?.toLowerCase() || '').includes(searchLower) ||
        officine.webLogin?.toLowerCase().includes(searchLower) ||
        officine.ediId?.includes(searchTerm);
      
      const matchesStatus = filterStatus === 'all' || officine.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'id':
          aValue = a.id.toLowerCase();
          bValue = b.id.toLowerCase();
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'city':
          aValue = a.city.toLowerCase();
          bValue = b.city.toLowerCase();
          break;
        case 'lastOrder':
          aValue = a.lastOrder ? a.lastOrder.getTime() : 0;
          bValue = b.lastOrder ? b.lastOrder.getTime() : 0;
          break;
        case 'lgo':
          aValue = (a.lgo || '').toLowerCase();
          bValue = (b.lgo || '').toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-orange-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'active': return 'from-green-400 to-green-500';
      case 'inactive': return 'from-orange-400 to-orange-500';
      case 'suspended': return 'from-red-400 to-red-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'suspended': return 'Suspendu';
      default: return status;
    }
  };

  const getInfoProductResponseLabel = (value: number) => {
    switch (value) {
      case 0: return 'Selon le paramétrage global';
      case 1: return 'Refuser les informations produit';
      case 2: return 'Ne pas donner de stock si partiel';
      default: return 'Inconnu';
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    if (passwordRef.current) {
      setPasswordsMatch(newPassword === passwordConfirm);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmValue = e.target.value;
    setPasswordConfirm(confirmValue);
    if (passwordRef.current) {
      setPasswordsMatch(passwordRef.current.value === confirmValue);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Gestion des Officines
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Gérez vos pharmacies clientes et leurs informations
          </p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
            onClick={() => {
              setSelectedOfficine(null);
              setActiveTab('address');
              setIsModalOpen(true);
              setShowPassword(false);
              setPasswordConfirm('');
              setPasswordsMatch(true);
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Nouvelle Officine</span>
          </motion.button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher (tapez #1 pour l'ID exact, ou nom, ville, contact, adresse, tél, email, SIRET, FINESS, LGO, login, EDI...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-9 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-white min-w-[140px]"
            >
              <option value="all">Tous statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="suspended">Suspendu</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'id' | 'name' | 'city' | 'lastOrder' | 'lgo')}
              className="pl-3 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-white min-w-[120px]"
            >
              <option value="id">ID</option>
              <option value="name">Nom A-Z</option>
              <option value="city">Ville</option>
              <option value="lgo">Logiciel</option>
              <option value="lastOrder">Dernière cmd</option>
            </select>
          </div>

          {/* Sort Order */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className={`flex items-center justify-center px-3 py-3 border border-gray-200 rounded-xl transition-colors min-w-[50px] ${
              sortOrder === 'asc' 
                ? 'bg-teal-50 border-teal-200 text-teal-600' 
                : 'bg-red-50 border-red-200 text-red-600'
            } hover:bg-opacity-75`}
            title={sortOrder === 'asc' ? 'Tri croissant' : 'Tri décroissant'}
          >
            {sortOrder === 'asc' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </motion.button>

          {/* Results Count */}
          <div className="flex items-center px-3 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 min-w-[80px]">
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              {filteredOfficines.length} résultat{filteredOfficines.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards - Business Focus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Carte 1 - Total Officines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{officines.length}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Total Officines</p>
        </motion.div>

        {/* Carte 2 - Actives vs Inactives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-orange-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            {/* Actives */}
            <div className="text-center flex-1">
              <div className="flex items-center justify-center mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">Actives</span>
              </div>
              <h3 className="text-lg font-bold text-green-600">
                {officines.filter(o => o.status === 'active').length}
              </h3>
            </div>
            
            {/* Séparateur */}
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-3"></div>
            
            {/* Inactives */}
            <div className="text-center flex-1">
              <div className="flex items-center justify-center mb-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">Inactives</span>
              </div>
              <h3 className="text-lg font-bold text-orange-600">
                {officines.filter(o => o.status === 'inactive').length}
              </h3>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center mt-2">Statuts Actives/Inactives</p>
        </motion.div>

        {/* Carte 3 - Officines Suspendues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 text-center"
        >
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
            <Building2 className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {officines.filter(o => o.status === 'suspended').length}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Officines Suspendues</p>
        </motion.div>
      </div>

      {/* Officines Grid - Optimized Business View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filteredOfficines.map((officine, index) => (
          <motion.div
            key={officine.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            onMouseEnter={() => setHoveredOfficineId(officine.id)}
            onMouseLeave={() => setHoveredOfficineId(null)}
            className="relative group"
          >
            <motion.div
              layout
              className={`
                bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 
                shadow-sm transition-all duration-300 ease-out cursor-pointer p-4
                ${hoveredOfficineId === officine.id 
                  ? 'shadow-xl border-gray-300 dark:border-gray-600 z-20 scale-102' 
                  : 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
              style={{
                transformOrigin: 'center',
                transform: hoveredOfficineId === officine.id ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              {/* Header avec informations essentielles toujours visibles */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 bg-gradient-to-r ${getStatusGradient(officine.status)} rounded-lg flex items-center justify-center shadow-md`}>
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800 dark:text-white text-sm truncate">
                        {officine.name}
                      </h3>
                      <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md font-mono">
                        #{officine.id}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {officine.contactPerson}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 truncate mt-0.5">
                      💻 {officine.lgo}
                    </p>
                  </div>
                </div>
                
                {/* Actions rapides - visibles au hover */}
                <AnimatePresence>
                  {hoveredOfficineId === officine.id && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8, x: 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 10 }}
                      className="flex space-x-1"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOfficine(officine);
                          setActiveTab('address');
                          setIsModalOpen(true);
                          setShowPassword(false);
                          setPasswordConfirm('');
                          setPasswordsMatch(true);
                        }}
                        className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Informations supplémentaires au hover */}
              <AnimatePresence>
                {hoveredOfficineId === officine.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 mb-3"
                  >
                    <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{officine.address}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{officine.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{officine.email}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer avec dernière activité - toujours visible */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="text-xs text-gray-500">
                  Dernière commande: {officine.lastOrder?.toLocaleDateString('fr-FR')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Modal pour création/édition d'officine */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {selectedOfficine ? 'Modifier l\'officine' : 'Nouvelle officine'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedOfficine(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            {/* Onglets */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('address')}
                className={`flex items-center space-x-2 px-4 py-3 ${
                  activeTab === 'address' 
                    ? 'border-b-2 border-teal-500 text-teal-600' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>Adresse de facturation</span>
              </button>
              
              <button
                onClick={() => setActiveTab('web')}
                className={`flex items-center space-x-2 px-4 py-3 ${
                  activeTab === 'web' 
                    ? 'border-b-2 border-teal-500 text-teal-600' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Globe className="w-5 h-5" />
                <span>Identification Web</span>
              </button>
              
              <button
                onClick={() => setActiveTab('pharmaml')}
                className={`flex items-center space-x-2 px-4 py-3 ${
                  activeTab === 'pharmaml' 
                    ? 'border-b-2 border-teal-500 text-teal-600' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Identification PharmaML</span>
              </button>
              
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center space-x-2 px-4 py-3 ${
                  activeTab === 'profile' 
                    ? 'border-b-2 border-teal-500 text-teal-600' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Profil de commande</span>
              </button>
            </div>

            <form className="space-y-6">
              {/* Onglet Adresse de facturation */}
              {activeTab === 'address' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Raison sociale <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedOfficine?.name}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Nom de l'officine"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedOfficine?.contactPerson}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Dr. Nom Prénom"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Adresse <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedOfficine?.address}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="123 Rue de la Paix"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Code postal <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedOfficine?.postalCode}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="75001"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ville <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedOfficine?.city}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Paris"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Courriel
                    </label>
                    <input
                      type="email"
                      defaultValue={selectedOfficine?.email}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="contact@officine.fr"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Téléphone Fixe
                    </label>
                    <input
                      type="tel"
                      defaultValue={selectedOfficine?.phone}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Téléphone Mobile
                    </label>
                    <input
                      type="tel"
                      defaultValue={selectedOfficine?.mobile}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fax
                    </label>
                    <input
                      type="tel"
                      defaultValue={selectedOfficine?.fax}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="+33 1 23 45 67 90"
                    />
                  </div>
                </div>
              )}

              {/* Onglet Identification Web */}
              {activeTab === 'web' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Ces informations permettent à l'officine de se connecter au portail web pour consulter ses commandes et documents.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Login Web <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedOfficine?.webLogin}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Identifiant de connexion"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Identifiant que l'officine utilisera pour se connecter au portail web
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mot de passe <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        defaultValue={selectedOfficine?.webPassword}
                        ref={passwordRef}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Mot de passe"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Mot de passe pour l'accès au portail web
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirmer le mot de passe <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordConfirm}
                        onChange={handleConfirmPasswordChange}
                        className={`w-full px-4 py-3 pr-10 border ${
                          passwordsMatch ? 'border-gray-200' : 'border-red-500'
                        } rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                        placeholder="Confirmer le mot de passe"
                        required
                      />
                      {!passwordsMatch && (
                        <div className="text-red-500 text-xs mt-1">
                          Les mots de passe ne correspondent pas
                        </div>
                      )}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {passwordConfirm && (
                          passwordsMatch ? 
                            <Check className="w-5 h-5 text-green-500" /> : 
                            <X className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Numéro FINESS
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedOfficine?.finess}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="123456789"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Nécessaire si l'officine souhaite utiliser sa carte CPS pour se connecter
                    </p>
                  </div>
                </div>
              )}

              {/* Onglet Identification PharmaML */}
              {activeTab === 'pharmaml' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Ces paramètres sont indispensables pour l'échange EDI avec le Logiciel de Gestion d'Officine (LGO) de la pharmacie.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Identifiant EDI <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedOfficine?.ediId}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="1234567890123"
                      maxLength={13}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Généralement le CIP de l'officine (13 caractères maximum)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Clé EDI <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedOfficine?.ediKey}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="ABCD"
                      maxLength={4}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Code de 4 caractères à configurer dans le LGO de la pharmacie
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="disablePharmaML"
                      checked={selectedOfficine?.disablePharmaML || false}
                      onChange={() => {
                        if (selectedOfficine) {
                          setSelectedOfficine({
                            ...selectedOfficine,
                            disablePharmaML: !selectedOfficine.disablePharmaML
                          });
                        }
                      }}
                      className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <label htmlFor="disablePharmaML" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Interdire les communications PharmaML
                      </label>
                      <p className="text-xs text-gray-500">
                        Cochez cette case si l'officine ne dispose pas d'un logiciel compatible PharmaML
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Profil de commande */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Ces paramètres permettent de personnaliser le traitement des commandes de cette officine.
                    </p>
                  </div>

                  {/* Section Stock produits */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Stock produits</h3>
                    
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="showStocks"
                        checked={selectedOfficine?.showStocks || false}
                        onChange={() => {
                          if (selectedOfficine) {
                            setSelectedOfficine({
                              ...selectedOfficine,
                              showStocks: !selectedOfficine.showStocks
                            });
                          }
                        }}
                        className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <div>
                        <label htmlFor="showStocks" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Afficher les stocks sur accès pharmacien
                        </label>
                        <p className="text-xs text-gray-500">
                          Si activé, l'officine pourra voir les niveaux de stock des produits
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section Prix produits */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Prix produits</h3>
                    
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="hidePrices"
                        checked={selectedOfficine?.hidePrices || false}
                        onChange={() => {
                          if (selectedOfficine) {
                            setSelectedOfficine({
                              ...selectedOfficine,
                              hidePrices: !selectedOfficine.hidePrices
                            });
                          }
                        }}
                        className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <div>
                        <label htmlFor="hidePrices" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Masquer les prix sur accès pharmacien
                        </label>
                        <p className="text-xs text-gray-500">
                          Si activé, les prix ne seront pas visibles pour cette officine
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section Option Franco */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Option Franco</h3>
                    
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="ignoreFranco"
                        checked={selectedOfficine?.ignoreFranco || false}
                        onChange={() => {
                          if (selectedOfficine) {
                            setSelectedOfficine({
                              ...selectedOfficine,
                              ignoreFranco: !selectedOfficine.ignoreFranco
                            });
                          }
                        }}
                        className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <div>
                        <label htmlFor="ignoreFranco" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ignorer le franco
                        </label>
                        <p className="text-xs text-gray-500">
                          Si activé, le montant minimum de commande (franco) ne sera pas appliqué
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section Droits d'accès */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Droits d'accès</h3>
                    
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="showRestrictedProducts"
                        checked={selectedOfficine?.showRestrictedProducts || false}
                        onChange={() => {
                          if (selectedOfficine) {
                            setSelectedOfficine({
                              ...selectedOfficine,
                              showRestrictedProducts: !selectedOfficine.showRestrictedProducts
                            });
                          }
                        }}
                        className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <div>
                        <label htmlFor="showRestrictedProducts" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Autoriser la consultation des produits restreints
                        </label>
                        <p className="text-xs text-gray-500">
                          Si activé, l'officine pourra voir les articles marqués "accès limité"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section Regroupement des commandes */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Regroupement des commandes</h3>
                    
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="groupProductsInExport"
                        checked={selectedOfficine?.groupProductsInExport || false}
                        onChange={() => {
                          if (selectedOfficine) {
                            setSelectedOfficine({
                              ...selectedOfficine,
                              groupProductsInExport: !selectedOfficine.groupProductsInExport
                            });
                          }
                        }}
                        className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <div>
                        <label htmlFor="groupProductsInExport" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ne pas regrouper les produits commandés dans l'export
                        </label>
                        <p className="text-xs text-gray-500">
                          Si activé, chaque ligne de commande sera exportée séparément, même pour des produits identiques
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Réponse aux infos produits
                    </label>
                    <select
                      value={selectedOfficine?.infoProductResponse || 0}
                      onChange={(e) => {
                        if (selectedOfficine) {
                          setSelectedOfficine({
                            ...selectedOfficine,
                            infoProductResponse: parseInt(e.target.value)
                          });
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value={0}>Selon le paramétrage global</option>
                      <option value={1}>Refuser les informations produit</option>
                      <option value={2}>Ne pas donner de stock si partiel</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Définit comment répondre aux demandes d'information de stock depuis l'officine
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Catégorie du client
                    </label>
                    <select
                      value={selectedOfficine?.clientCategory || 0}
                      onChange={(e) => {
                        if (selectedOfficine) {
                          setSelectedOfficine({
                            ...selectedOfficine,
                            clientCategory: parseInt(e.target.value)
                          });
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value={0}>Catégorie 0 (par défaut)</option>
                      <option value={1}>Catégorie 1</option>
                      <option value={2}>Catégorie 2</option>
                      <option value={3}>Catégorie 3</option>
                      <option value={4}>Catégorie 4</option>
                      <option value={5}>Catégorie 5</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Catégorie tarifaire qui s'appliquera aux prix remisés pour ce client
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Logiciel Gérant l'Officine (LGO)
                    </label>
                    <input
                      type="text"
                      value={selectedOfficine?.lgo || ''}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Information non modifiable, détectée automatiquement lors des échanges
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedOfficine(null);
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
                  {selectedOfficine ? 'Enregistrer' : 'Créer'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}