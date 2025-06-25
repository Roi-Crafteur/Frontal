import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  Mail, 
  Phone, 
  Calendar, 
  Search, 
  Filter,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Lock,
  Unlock,
  UserCheck,
  AlertTriangle
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";
import type { User as UserType } from "../../types";

export default function UserManagement() {
  const [users, setUsers] = useState<UserType[]>([
    {
      id: '1',
      name: 'POISOT Paul',
      email: 'paul.poisot@infosoft.fr',
      role: 'Administrateur',
      phone: '+33 1 23 45 67 89',
      lastLogin: new Date(),
      status: 'active',
      permissions: ['all'],
      preferences: {
        theme: 'light',
        language: 'fr',
        notifications: { email: true, push: true, sms: false, types: ['orders', 'alerts'] },
        dashboard: { layout: 'grid', widgets: ['stats', 'orders', 'products'], refreshInterval: 30 }
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Marie Dubois',
      email: 'marie.dubois@infosoft.fr',
      role: 'Gestionnaire',
      phone: '+33 1 23 45 67 90',
      lastLogin: new Date(Date.now() - 86400000),
      status: 'active',
      permissions: ['orders', 'products', 'reports'],
      preferences: {
        theme: 'dark',
        language: 'fr',
        notifications: { email: true, push: false, sms: true, types: ['orders'] },
        dashboard: { layout: 'list', widgets: ['orders', 'stats'], refreshInterval: 60 }
      },
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date(Date.now() - 86400000)
    },
    {
      id: '3',
      name: 'Jean Martin',
      email: 'jean.martin@infosoft.fr',
      role: 'Consultant',
      phone: '+33 1 23 45 67 91',
      lastLogin: new Date(Date.now() - 172800000),
      status: 'inactive',
      permissions: ['orders'],
      preferences: {
        theme: 'light',
        language: 'fr',
        notifications: { email: false, push: false, sms: false, types: [] },
        dashboard: { layout: 'grid', widgets: ['orders'], refreshInterval: 120 }
      },
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date(Date.now() - 172800000)
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showPasswords, setShowPasswords] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'permissions' | 'preferences'>('info');

  // Rôles disponibles
  const availableRoles = [
    'Administrateur',
    'Gestionnaire', 
    'Consultant',
    'Utilisateur'
  ];

  // Pages d'accueil disponibles
  const availablePages = [
    { value: 'dashboard', label: 'Tableau de Bord' },
    { value: 'orders', label: 'Commandes' },
    { value: 'products', label: 'Articles' },
    { value: 'officines', label: 'Officines' },
    { value: 'lists', label: 'Listes' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrateur': return 'text-red-600 bg-red-100';
      case 'Gestionnaire': return 'text-blue-600 bg-blue-100';
      case 'Consultant': return 'text-purple-600 bg-purple-100';
      case 'Utilisateur': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'text-green-600 bg-green-100' 
      : 'text-red-600 bg-red-100';
  };

  const getStatusLabel = (status: string) => {
    return status === 'active' ? 'Actif' : 'Inactif';
  };

  // Statistiques pour les cartes
  const statsItems = [
    {
      title: "Utilisateurs Totaux",
      description: "Tous les comptes",
      link: "#",
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      stats: [
        { value: users.length, label: "utilisateurs" },
        { value: users.filter(u => u.status === 'active').length, label: "actifs" },
        { value: users.filter(u => u.lastLogin && u.lastLogin > new Date(Date.now() - 86400000)).length, label: "connectés 24h" }
      ]
    },
    {
      title: "Répartition par Rôle",
      description: "Distribution des permissions",
      link: "#",
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />,
      stats: [
        { value: users.filter(u => u.role === 'Administrateur').length, label: "admins" },
        { value: users.filter(u => u.role === 'Gestionnaire').length, label: "gestionnaires" },
        { value: users.filter(u => u.role === 'Consultant').length, label: "consultants" }
      ]
    },
    {
      title: "Activité Récente",
      description: "Connexions et actions",
      link: "#",
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
      stats: [
        { value: users.filter(u => u.lastLogin && u.lastLogin > new Date(Date.now() - 604800000)).length, label: "cette semaine" },
        { value: users.filter(u => u.lastLogin && u.lastLogin > new Date(Date.now() - 2592000000)).length, label: "ce mois" },
        { value: "98%", label: "taux activité" }
      ]
    }
  ];

  const handleCreateUser = () => {
    setSelectedUser(null);
    setActiveTab('info');
    setIsModalOpen(true);
  };

  const handleEditUser = (user: UserType) => {
    setSelectedUser(user);
    setActiveTab('info');
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (user.role === 'Administrateur' && users.filter(u => u.role === 'Administrateur').length === 1) {
      alert('Impossible de supprimer le dernier administrateur');
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur "${user.name}" ?`)) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleResetPassword = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (confirm(`Réinitialiser le mot de passe de "${user.name}" ?`)) {
      // Simuler la réinitialisation
      console.log(`Mot de passe réinitialisé pour ${user.name}`);
      alert('Un email de réinitialisation a été envoyé à l\'utilisateur');
    }
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active', updatedAt: new Date() }
        : user
    ));
  };

  const exportUsers = () => {
    const csvContent = [
      ['Nom', 'Email', 'Rôle', 'Statut', 'Dernière connexion', 'Date création'].join(','),
      ...users.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        user.lastLogin?.toLocaleDateString('fr-FR') || 'Jamais',
        user.createdAt.toLocaleDateString('fr-FR')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'utilisateurs.csv';
    link.click();
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Gestion des Utilisateurs
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Gérez les comptes utilisateurs, rôles et permissions de la plateforme
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Vue d'ensemble des utilisateurs
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
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="all">Tous les rôles</option>
            {availableRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportUsers}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateUser}
            className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvel Utilisateur</span>
          </motion.button>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-teal-400 to-teal-500 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white text-sm sm:text-base">
                        {user.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1 sm:space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleResetPassword(user.id)}
                      className="p-1.5 sm:p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title="Réinitialiser mot de passe"
                    >
                      <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditUser(user)}
                      className="p-1.5 sm:p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleStatus(user.id)}
                      className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title={user.status === 'active' ? 'Désactiver' : 'Activer'}
                    >
                      {user.status === 'active' ? (
                        <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <Unlock className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Rôle:</span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Statut:</span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </div>

                  {user.phone && (
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{user.phone}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>
                      Dernière connexion: {user.lastLogin?.toLocaleDateString('fr-FR') || 'Jamais'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      Créé le {user.createdAt.toLocaleDateString('fr-FR')}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-500">
                        {user.permissions.length} permission(s)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>
        ))}
      </div>

      {/* Modal pour création/édition d'utilisateur */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                {selectedUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl sm:text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Onglets */}
            <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
              {[
                { key: 'info', label: 'Informations', icon: User },
                { key: 'permissions', label: 'Permissions', icon: Shield },
                { key: 'preferences', label: 'Préférences', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                  }`}
                >
                  <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Contenu des onglets */}
            <div className="space-y-4 sm:space-y-6">
              {/* Onglet Informations */}
              {activeTab === 'info' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedUser?.name}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                      placeholder="Nom complet"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={selectedUser?.email}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      defaultValue={selectedUser?.phone}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rôle
                    </label>
                    <select
                      defaultValue={selectedUser?.role}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                    >
                      {availableRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Page d'accueil
                    </label>
                    <select
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                    >
                      {availablePages.map(page => (
                        <option key={page.value} value={page.value}>{page.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Statut
                    </label>
                    <select
                      defaultValue={selectedUser?.status}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                    </select>
                  </div>

                  {!selectedUser && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Login
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                          placeholder="Identifiant de connexion"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Mot de passe
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords ? "text" : "password"}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                            placeholder="Mot de passe"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(!showPasswords)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Onglet Permissions */}
              {activeTab === 'permissions' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                          Permissions basées sur le rôle
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Les permissions sont automatiquement attribuées selon le rôle sélectionné. 
                          Vous pouvez personnaliser les accès pour cet utilisateur spécifiquement.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Tableau de Bord',
                      'Officines', 
                      'Articles',
                      'Commandes',
                      'Listes CEPS',
                      'Utilisateurs',
                      'Rôles',
                      'Documents',
                      'Paramètres'
                    ].map((module) => (
                      <div key={module} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800 dark:text-white text-sm">
                            {module}
                          </span>
                          <input
                            type="checkbox"
                            defaultChecked={selectedUser?.role === 'Administrateur'}
                            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {['Consulter', 'Modifier', 'Créer', 'Supprimer'].map((action) => (
                            <label key={action} className="flex items-center space-x-1">
                              <input
                                type="checkbox"
                                defaultChecked={selectedUser?.role === 'Administrateur'}
                                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              />
                              <span className="text-gray-600 dark:text-gray-300">{action}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Onglet Préférences */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Thème par défaut
                      </label>
                      <select
                        defaultValue={selectedUser?.preferences?.theme}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      >
                        <option value="light">Clair</option>
                        <option value="dark">Sombre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Langue
                      </label>
                      <select
                        defaultValue={selectedUser?.preferences?.language}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                      Notifications
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          defaultChecked={selectedUser?.preferences?.notifications?.email}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Notifications par email
                        </span>
                      </label>
                      
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          defaultChecked={selectedUser?.preferences?.notifications?.push}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Notifications push
                        </span>
                      </label>
                      
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          defaultChecked={selectedUser?.preferences?.notifications?.sms}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Notifications SMS
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                      Tableau de bord
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Disposition
                        </label>
                        <select
                          defaultValue={selectedUser?.preferences?.dashboard?.layout}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                        >
                          <option value="grid">Grille</option>
                          <option value="list">Liste</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Actualisation (secondes)
                        </label>
                        <select
                          defaultValue={selectedUser?.preferences?.dashboard?.refreshInterval}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                        >
                          <option value={30}>30</option>
                          <option value={60}>60</option>
                          <option value={120}>120</option>
                          <option value={300}>300</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser(null);
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm sm:text-base"
              >
                Annuler
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all font-medium text-sm sm:text-base"
              >
                {selectedUser ? 'Modifier' : 'Créer'} l'utilisateur
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}