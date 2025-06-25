import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Key, 
  Bell, 
  Palette, 
  Save,
  Eye,
  EyeOff,
  RefreshCw,
  Calendar,
  MapPin,
  Building
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";
import { useStore } from "../../store/useStore";

export default function ProfileSettings() {
  const { currentUser } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'preferences'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Statistiques pour les cartes
  const statsItems = [
    {
      title: "Informations Personnelles",
      description: "Profil et coordonnées",
      link: "#",
      icon: <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      stats: [
        { value: currentUser?.name || "POISOT Paul", label: "nom" },
        { value: currentUser?.role || "Administrateur", label: "rôle" },
        { value: "Actif", label: "statut" }
      ]
    },
    {
      title: "Sécurité du Compte",
      description: "Authentification et accès",
      link: "#",
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
      stats: [
        { value: "Fort", label: "mot de passe" },
        { value: currentUser?.lastLogin?.toLocaleDateString('fr-FR') || "Aujourd'hui", label: "dernière connexion" },
        { value: "Activée", label: "2FA" }
      ]
    },
    {
      title: "Préférences",
      description: "Interface et notifications",
      link: "#",
      icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />,
      stats: [
        { value: currentUser?.preferences?.theme || "Clair", label: "thème" },
        { value: currentUser?.preferences?.language || "Français", label: "langue" },
        { value: "Activées", label: "notifications" }
      ]
    }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simuler la sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    console.log('Profil sauvegardé avec succès');
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Mon Compte
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Gérez vos informations personnelles et préférences
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          Vue d'ensemble du compte
        </h2>
        <HoverEffect 
          items={statsItems} 
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 py-2 sm:py-4 lg:py-6" 
        />
      </div>

      {/* Bouton de sauvegarde */}
      <div className="flex justify-end mb-4 sm:mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
        </motion.button>
      </div>

      {/* Onglets de navigation */}
      <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {[
          { key: 'profile', label: 'Profil', icon: User },
          { key: 'security', label: 'Sécurité', icon: Shield },
          { key: 'notifications', label: 'Notifications', icon: Bell },
          { key: 'preferences', label: 'Préférences', icon: Palette }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
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
      <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          
          {/* Onglet Profil */}
          {activeTab === 'profile' && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Informations Personnelles
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      defaultValue={currentUser?.name}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={currentUser?.email}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      defaultValue={currentUser?.phone}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rôle
                    </label>
                    <input
                      type="text"
                      value={currentUser?.role}
                      disabled
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300 text-sm cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Le rôle ne peut être modifié que par un administrateur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Sécurité */}
          {activeTab === 'security' && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Sécurité du Compte
                </h3>
                
                <div className="space-y-6">
                  {/* Changement de mot de passe */}
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                      Changer le mot de passe
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Mot de passe actuel
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Confirmer le nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informations de connexion */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                      Informations de connexion
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Dernière connexion:</span>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {currentUser?.lastLogin?.toLocaleString('fr-FR') || 'Aujourd\'hui'}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Adresse IP:</span>
                        <p className="font-medium text-gray-800 dark:text-white">192.168.1.100</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Navigateur:</span>
                        <p className="font-medium text-gray-800 dark:text-white">Chrome 120.0</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Système:</span>
                        <p className="font-medium text-gray-800 dark:text-white">Windows 11</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Préférences de Notifications
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                      Types de notifications
                    </h4>
                    <div className="space-y-4">
                      {[
                        { id: 'email', label: 'Notifications par email', checked: true },
                        { id: 'push', label: 'Notifications push', checked: true },
                        { id: 'sms', label: 'Notifications SMS', checked: false }
                      ].map((notif) => (
                        <label key={notif.id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            defaultChecked={notif.checked}
                            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {notif.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                      Événements à notifier
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'Nouvelles commandes',
                        'Alertes de stock',
                        'Produits inconnus',
                        'Modifications système',
                        'Connexions suspectes',
                        'Rapports hebdomadaires'
                      ].map((event) => (
                        <label key={event} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            defaultChecked={true}
                            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {event}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Préférences */}
          {activeTab === 'preferences' && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Préférences d'Interface
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Thème
                    </label>
                    <select
                      defaultValue={currentUser?.preferences?.theme}
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
                      defaultValue={currentUser?.preferences?.language}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Lignes par page
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    >
                      <option value={10}>10 lignes</option>
                      <option value={25}>25 lignes</option>
                      <option value={50}>50 lignes</option>
                      <option value={100}>100 lignes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Page d'accueil
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    >
                      <option value="dashboard">Tableau de Bord</option>
                      <option value="orders">Commandes</option>
                      <option value="products">Articles</option>
                      <option value="officines">Officines</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                    Tableau de bord
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Disposition
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="layout"
                            value="grid"
                            defaultChecked={currentUser?.preferences?.dashboard?.layout === 'grid'}
                            className="text-teal-600 focus:ring-teal-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Grille</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="layout"
                            value="list"
                            defaultChecked={currentUser?.preferences?.dashboard?.layout === 'list'}
                            className="text-teal-600 focus:ring-teal-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Liste</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Actualisation automatique (secondes)
                      </label>
                      <select
                        defaultValue={currentUser?.preferences?.dashboard?.refreshInterval}
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
            </div>
          )}
        </div>
      </BackgroundGradient>
    </div>
  );
}