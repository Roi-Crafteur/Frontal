import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Check, 
  X, 
  Search, 
  Filter,
  Copy,
  Settings,
  Eye,
  Download,
  Upload,
  AlertTriangle,
  Lock,
  Unlock
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";

interface Permission {
  id: string;
  module: string;
  actions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    export: boolean;
    import: boolean;
    special?: string[];
  };
}

interface Role {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  isModifiable: boolean;
  userCount: number;
  permissions: Permission[];
  defaultPage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: '1',
      name: 'Administrateur',
      description: 'Accès total à l\'ensemble des fonctionnalités du frontal',
      isDefault: true,
      isModifiable: false,
      userCount: 1,
      permissions: [], // Toutes les permissions
      defaultPage: 'dashboard',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Gestionnaire',
      description: 'Accès aux fonctions opérationnelles sans administration des utilisateurs',
      isDefault: true,
      isModifiable: false,
      userCount: 2,
      permissions: [], // Permissions limitées
      defaultPage: 'orders',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Consultant',
      description: 'Accès en lecture seule aux commandes et statistiques',
      isDefault: false,
      isModifiable: true,
      userCount: 0,
      permissions: [], // Permissions de lecture
      defaultPage: 'lists',
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15')
    }
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Modules et permissions disponibles
  const availableModules = [
    {
      id: 'dashboard',
      name: 'Tableau de Bord',
      actions: ['view'],
      special: []
    },
    {
      id: 'officines',
      name: 'Officines',
      actions: ['view', 'create', 'edit', 'delete', 'export', 'import'],
      special: ['connect_as_officine']
    },
    {
      id: 'products',
      name: 'Articles',
      actions: ['view', 'create', 'edit', 'delete', 'export', 'import'],
      special: ['update_stocks', 'update_prices']
    },
    {
      id: 'orders',
      name: 'Commandes',
      actions: ['view', 'create', 'edit', 'delete', 'export', 'import'],
      special: ['modify_quantities', 'validate_orders']
    },
    {
      id: 'users',
      name: 'Utilisateurs',
      actions: ['view', 'create', 'edit', 'delete'],
      special: ['reset_passwords', 'assign_roles']
    },
    {
      id: 'roles',
      name: 'Rôles Utilisateurs',
      actions: ['view', 'create', 'edit', 'delete'],
      special: []
    },
    {
      id: 'ceps',
      name: 'Listes CEPS',
      actions: ['view', 'export'],
      special: ['correct_prices']
    },
    {
      id: 'lists',
      name: 'Listes et Statistiques',
      actions: ['view', 'export'],
      special: []
    },
    {
      id: 'documents',
      name: 'Documents',
      actions: ['view', 'create', 'edit', 'delete', 'export', 'import'],
      special: []
    },
    {
      id: 'settings',
      name: 'Paramètres Serveur',
      actions: ['view', 'edit'],
      special: []
    }
  ];

  // Statistiques pour les cartes
  const statsItems = [
    {
      title: "Rôles Totaux",
      description: "Tous les rôles configurés",
      link: "#",
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      stats: [
        { value: roles.length, label: "rôles" },
        { value: roles.filter(r => r.isDefault).length, label: "par défaut" },
        { value: roles.filter(r => r.isModifiable).length, label: "modifiables" }
      ]
    },
    {
      title: "Utilisateurs Assignés",
      description: "Répartition par rôle",
      link: "#",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
      stats: [
        { value: roles.reduce((sum, r) => sum + r.userCount, 0), label: "utilisateurs" },
        { value: roles.find(r => r.name === 'Administrateur')?.userCount || 0, label: "admins" },
        { value: roles.find(r => r.name === 'Gestionnaire')?.userCount || 0, label: "gestionnaires" }
      ]
    },
    {
      title: "Modules Disponibles",
      description: "Permissions configurables",
      link: "#",
      icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />,
      stats: [
        { value: availableModules.length, label: "modules" },
        { value: availableModules.reduce((sum, m) => sum + m.actions.length, 0), label: "actions" },
        { value: availableModules.reduce((sum, m) => sum + m.special.length, 0), label: "spéciales" }
      ]
    }
  ];

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'default' && role.isDefault) ||
                         (filterType === 'custom' && !role.isDefault);
    return matchesSearch && matchesFilter;
  });

  const handleCreateRole = () => {
    setSelectedRole(null);
    setIsModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    if (!role.isModifiable) {
      alert('Ce rôle par défaut ne peut pas être modifié');
      return;
    }
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    if (!role.isModifiable) {
      alert('Ce rôle par défaut ne peut pas être supprimé');
      return;
    }

    if (role.userCount > 0) {
      alert(`Impossible de supprimer ce rôle car ${role.userCount} utilisateur(s) y sont assignés`);
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer le rôle "${role.name}" ?`)) {
      setRoles(prev => prev.filter(r => r.id !== roleId));
    }
  };

  const handleDuplicateRole = (role: Role) => {
    const newRole: Role = {
      ...role,
      id: Date.now().toString(),
      name: `${role.name} (Copie)`,
      isDefault: false,
      isModifiable: true,
      userCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setRoles(prev => [...prev, newRole]);
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'view': return 'Consulter';
      case 'create': return 'Créer';
      case 'edit': return 'Modifier';
      case 'delete': return 'Supprimer';
      case 'export': return 'Exporter';
      case 'import': return 'Importer';
      default: return action;
    }
  };

  const getSpecialLabel = (special: string) => {
    switch (special) {
      case 'connect_as_officine': return 'Se connecter en tant qu\'officine';
      case 'update_stocks': return 'Mettre à jour les stocks';
      case 'update_prices': return 'Mettre à jour les prix';
      case 'modify_quantities': return 'Modifier les quantités';
      case 'validate_orders': return 'Valider les commandes';
      case 'reset_passwords': return 'Réinitialiser les mots de passe';
      case 'assign_roles': return 'Assigner des rôles';
      case 'correct_prices': return 'Corriger les prix automatiquement';
      default: return special;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Gestion des Rôles Utilisateurs
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Configurez les permissions et accès aux modules du frontal
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Vue d'ensemble des rôles
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
              placeholder="Rechercher un rôle..."
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
            <option value="all">Tous les rôles</option>
            <option value="default">Rôles par défaut</option>
            <option value="custom">Rôles personnalisés</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateRole}
          className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un rôle</span>
        </motion.button>
      </div>

      {/* Liste des rôles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredRoles.map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
                      role.isDefault 
                        ? 'bg-gradient-to-r from-blue-400 to-blue-500' 
                        : 'bg-gradient-to-r from-purple-400 to-purple-500'
                    }`}>
                      {role.isDefault ? (
                        <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      ) : (
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white text-sm sm:text-base">
                        {role.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {role.userCount} utilisateur(s)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1 sm:space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDuplicateRole(role)}
                      className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Dupliquer"
                    >
                      <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditRole(role)}
                      disabled={!role.isModifiable}
                      className="p-1.5 sm:p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title={role.isModifiable ? "Modifier" : "Non modifiable"}
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteRole(role.id)}
                      disabled={!role.isModifiable || role.userCount > 0}
                      className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title={!role.isModifiable ? "Non supprimable" : role.userCount > 0 ? "Utilisateurs assignés" : "Supprimer"}
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {role.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      role.isDefault 
                        ? 'text-blue-600 bg-blue-100' 
                        : 'text-purple-600 bg-purple-100'
                    }`}>
                      {role.isDefault ? 'Par défaut' : 'Personnalisé'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Page d'accueil:</span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {role.defaultPage || 'Tableau de bord'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Modifiable:</span>
                    {role.isModifiable ? (
                      <Unlock className="w-4 h-4 text-green-600" />
                    ) : (
                      <Lock className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500">
                    Créé le {role.createdAt.toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>
        ))}
      </div>

      {/* Modal pour création/édition de rôle */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
                {selectedRole ? 'Modifier le rôle' : 'Nouveau rôle'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedRole(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl sm:text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Informations de base */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom du rôle
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedRole?.name}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                    placeholder="Nom du rôle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Page d'accueil par défaut
                  </label>
                  <select
                    defaultValue={selectedRole?.defaultPage}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                  >
                    <option value="dashboard">Tableau de Bord</option>
                    <option value="orders">Commandes</option>
                    <option value="products">Articles</option>
                    <option value="officines">Officines</option>
                    <option value="lists">Listes</option>
                  </select>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    defaultValue={selectedRole?.description}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                    placeholder="Description du rôle et de ses responsabilités"
                  />
                </div>
              </div>

              {/* Configuration des permissions */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Configuration des Permissions
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  {availableModules.map((module) => (
                    <div key={module.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
                          {module.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <button className="text-xs text-teal-600 hover:text-teal-700">
                            Tout autoriser
                          </button>
                          <span className="text-gray-300">|</span>
                          <button className="text-xs text-red-600 hover:text-red-700">
                            Tout interdire
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                        {module.actions.map((action) => (
                          <label key={action} className="flex items-center space-x-2 text-xs sm:text-sm">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              defaultChecked={selectedRole?.name === 'Administrateur'}
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                              {getActionLabel(action)}
                            </span>
                          </label>
                        ))}
                        
                        {module.special.map((special) => (
                          <label key={special} className="flex items-center space-x-2 text-xs sm:text-sm">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                              defaultChecked={selectedRole?.name === 'Administrateur'}
                            />
                            <span className="text-orange-700 dark:text-orange-300 font-medium">
                              {getSpecialLabel(special)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avertissement pour rôles par défaut */}
              {selectedRole?.isDefault && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 text-sm sm:text-base">
                        Rôle par défaut
                      </h4>
                      <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        Ce rôle est fourni par défaut et ne peut pas être modifié ou supprimé. 
                        Vous pouvez le dupliquer pour créer un rôle personnalisé basé sur celui-ci.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedRole(null);
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm sm:text-base"
              >
                Annuler
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={selectedRole?.isDefault}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedRole ? 'Modifier' : 'Créer'} le rôle
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}