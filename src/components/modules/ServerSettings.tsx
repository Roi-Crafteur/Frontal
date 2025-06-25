import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Mail, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Palette, 
  Save,
  AlertTriangle,
  Info,
  Eye,
  EyeOff,
  Download,
  Upload,
  RefreshCw
} from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import { HoverEffect } from "../ui/aceternity/card-hover-effect";

interface ServerSettings {
  // Paramètres d'alerte
  alertEmails: string;
  alertOnOrder: boolean;
  alertUnknownProduct: boolean;
  alertStockThreshold: boolean;
  alertPackagingMultiple: boolean;
  
  // Paramètres de fichiers prix
  priceFileEmails: string;
  
  // Paramètres techniques
  stockThreshold: number;
  apiOrderStatus: number;
  
  // Informations de facturation
  companyName: string;
  companyAddress: string;
  companyCity: string;
  companyPostalCode: string;
  companyCIP: string;
  companyPhone: string;
  companyEmail: string;
  
  // Paramètres d'interface
  theme: 'light' | 'dark';
  defaultRowsPerPage: number;
  sidebarCollapsed: boolean;
}

export default function ServerSettings() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'billing' | 'technical' | 'interface'>('alerts');
  const [settings, setSettings] = useState<ServerSettings>({
    // Alertes
    alertEmails: 'admin@infosoft.fr, support@infosoft.fr',
    alertOnOrder: true,
    alertUnknownProduct: true,
    alertStockThreshold: true,
    alertPackagingMultiple: false,
    
    // Fichiers prix
    priceFileEmails: 'tarifs@infosoft.fr',
    
    // Technique
    stockThreshold: 0,
    apiOrderStatus: 3,
    
    // Facturation
    companyName: 'INFOSOFT SARL',
    companyAddress: '123 Avenue des Technologies',
    companyCity: 'Paris',
    companyPostalCode: '75001',
    companyCIP: '1234567890123',
    companyPhone: '+33 1 23 45 67 89',
    companyEmail: 'contact@infosoft.fr',
    
    // Interface
    theme: 'light',
    defaultRowsPerPage: 25,
    sidebarCollapsed: false
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Statistiques pour les cartes
  const statsItems = [
    {
      title: "Alertes Actives",
      description: "Notifications configurées",
      link: "#",
      icon: <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />,
      stats: [
        { value: Object.values(settings).filter(v => typeof v === 'boolean' && v).length, label: "activées" },
        { value: settings.alertEmails.split(',').length, label: "destinataires" },
        { value: "Temps réel", label: "fréquence" }
      ]
    },
    {
      title: "Configuration Système",
      description: "Paramètres techniques",
      link: "#",
      icon: <Database className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      stats: [
        { value: settings.stockThreshold, label: "seuil stock" },
        { value: settings.apiOrderStatus, label: "statut API" },
        { value: settings.defaultRowsPerPage, label: "lignes/page" }
      ]
    },
    {
      title: "Informations Légales",
      description: "Données de facturation",
      link: "#",
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />,
      stats: [
        { value: settings.companyCIP ? "Configuré" : "Manquant", label: "CIP structure" },
        { value: settings.companyName ? "Valide" : "Manquant", label: "raison sociale" },
        { value: "GERS", label: "export activé" }
      ]
    }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simuler la sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    
    // Notification de succès (à implémenter)
    console.log('Paramètres sauvegardés avec succès');
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'server-settings.json';
    link.click();
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings({ ...settings, ...importedSettings });
        } catch (error) {
          console.error('Erreur lors de l\'import:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Paramètres Serveur
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
            Configuration globale du frontal PharmaML
          </p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
          État de la configuration
        </h2>
        <HoverEffect 
          items={statsItems} 
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 py-2 sm:py-4 lg:py-6" 
        />
      </div>

      {/* Actions rapides */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center space-x-2 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportSettings}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Exporter</span>
        </motion.button>
        
        <label className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all text-sm cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>Importer</span>
          <input
            type="file"
            accept=".json"
            onChange={handleImportSettings}
            className="hidden"
          />
        </label>
      </div>

      {/* Onglets de navigation */}
      <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {[
          { key: 'alerts', label: 'Alertes & Notifications', icon: Bell },
          { key: 'billing', label: 'Adresse de Facturation', icon: Shield },
          { key: 'technical', label: 'Paramètres Techniques', icon: Database },
          { key: 'interface', label: 'Interface & Thème', icon: Palette }
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
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Contenu des onglets */}
      <BackgroundGradient className="rounded-xl sm:rounded-2xl p-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          
          {/* Onglet Alertes */}
          {activeTab === 'alerts' && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Configuration des Alertes Email
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  {/* Adresses email des alertes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Adresses email des alertes
                    </label>
                    <textarea
                      value={settings.alertEmails}
                      onChange={(e) => setSettings({...settings, alertEmails: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      placeholder="email1@domain.com, email2@domain.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Séparez les adresses par des virgules. Ces adresses recevront toutes les alertes activées.
                    </p>
                  </div>

                  {/* Types d'alertes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 dark:text-white">Alertes de Commandes</h4>
                      
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="alertOnOrder"
                          checked={settings.alertOnOrder}
                          onChange={(e) => setSettings({...settings, alertOnOrder: e.target.checked})}
                          className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <div>
                          <label htmlFor="alertOnOrder" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Alerte à chaque commande
                          </label>
                          <p className="text-xs text-gray-500">
                            Envoi automatique d'un email de confirmation pour chaque nouvelle commande reçue
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="alertUnknownProduct"
                          checked={settings.alertUnknownProduct}
                          onChange={(e) => setSettings({...settings, alertUnknownProduct: e.target.checked})}
                          className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <div>
                          <label htmlFor="alertUnknownProduct" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Alerte produit inconnu
                          </label>
                          <p className="text-xs text-gray-500">
                            Email envoyé lorsqu'une commande contient un produit non reconnu
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800 dark:text-white">Alertes de Stock</h4>
                      
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="alertStockThreshold"
                          checked={settings.alertStockThreshold}
                          onChange={(e) => setSettings({...settings, alertStockThreshold: e.target.checked})}
                          className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <div>
                          <label htmlFor="alertStockThreshold" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Alerte stock au seuil
                          </label>
                          <p className="text-xs text-gray-500">
                            Email lorsqu'un produit commandé atteint ou passe sous le seuil défini
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="alertPackagingMultiple"
                          checked={settings.alertPackagingMultiple}
                          onChange={(e) => setSettings({...settings, alertPackagingMultiple: e.target.checked})}
                          className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <div>
                          <label htmlFor="alertPackagingMultiple" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Alerte colisage non multiple
                          </label>
                          <p className="text-xs text-gray-500">
                            Email si la quantité commandée n'est pas un multiple du colisage
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fichiers prix */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Adresses email d'envoi des fichiers prix
                    </label>
                    <input
                      type="text"
                      value={settings.priceFileEmails}
                      onChange={(e) => setSettings({...settings, priceFileEmails: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      placeholder="tarifs@domain.com"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Adresses qui recevront les fichiers PRIX.CSV, EVOLUTION.CSV, CEPS.CSV automatiquement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Facturation */}
          {activeTab === 'billing' && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Informations de Facturation
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Raison sociale
                    </label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Code CIP de la structure *
                    </label>
                    <input
                      type="text"
                      value={settings.companyCIP}
                      onChange={(e) => setSettings({...settings, companyCIP: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      placeholder="1234567890123"
                    />
                    <p className="text-xs text-red-500 mt-1">
                      * Obligatoire pour l'export du fichier GERS
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={settings.companyAddress}
                      onChange={(e) => setSettings({...settings, companyAddress: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Code postal
                    </label>
                    <input
                      type="text"
                      value={settings.companyPostalCode}
                      onChange={(e) => setSettings({...settings, companyPostalCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      value={settings.companyCity}
                      onChange={(e) => setSettings({...settings, companyCity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={settings.companyPhone}
                      onChange={(e) => setSettings({...settings, companyPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => setSettings({...settings, companyEmail: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Technique */}
          {activeTab === 'technical' && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Paramètres Techniques
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Seuil de retour des quantités livrables
                      </label>
                      <input
                        type="number"
                        value={settings.stockThreshold}
                        onChange={(e) => setSettings({...settings, stockThreshold: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Seuil global pour les demandes d'Info Produit (0 = disponible uniquement si stock positif)
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        État des commandes importées via API
                      </label>
                      <select
                        value={settings.apiOrderStatus}
                        onChange={(e) => setSettings({...settings, apiOrderStatus: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      >
                        <option value={1}>1 - En attente</option>
                        <option value={2}>2 - En cours de traitement</option>
                        <option value={3}>3 - Traitée côté ERP</option>
                        <option value={4}>4 - Expédiée</option>
                        <option value={5}>5 - Livrée</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Statut par défaut des commandes injectées par API
                      </p>
                    </div>
                  </div>

                  {/* Informations système (lecture seule) */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                      Informations Système (Lecture seule)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Version PharmaML:</span>
                        <p className="font-medium text-gray-800 dark:text-white">v2.1.4</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Base de données:</span>
                        <p className="font-medium text-gray-800 dark:text-white">PostgreSQL 14.2</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Dernière sauvegarde:</span>
                        <p className="font-medium text-gray-800 dark:text-white">Aujourd'hui 03:00</p>
                      </div>
                    </div>
                  </div>

                  {/* Zone de danger */}
                  <div className="border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                          Paramètres Avancés
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                          Les paramètres suivants ne peuvent être modifiés que par Infosoft. 
                          Contactez le support technique pour toute modification.
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-red-600">Arrondi colisage:</span>
                            <span className="font-medium">Inférieur</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-red-600">Catégories tarifaires:</span>
                            <span className="font-medium">10 catégories</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-red-600">Timeout API:</span>
                            <span className="font-medium">30 secondes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Interface */}
          {activeTab === 'interface' && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
                  Personnalisation de l'Interface
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Thème par défaut
                      </label>
                      <select
                        value={settings.theme}
                        onChange={(e) => setSettings({...settings, theme: e.target.value as 'light' | 'dark'})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      >
                        <option value="light">Clair</option>
                        <option value="dark">Sombre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Lignes par page par défaut
                      </label>
                      <select
                        value={settings.defaultRowsPerPage}
                        onChange={(e) => setSettings({...settings, defaultRowsPerPage: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                      >
                        <option value={10}>10 lignes</option>
                        <option value={25}>25 lignes</option>
                        <option value={50}>50 lignes</option>
                        <option value={100}>100 lignes</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="sidebarCollapsed"
                        checked={settings.sidebarCollapsed}
                        onChange={(e) => setSettings({...settings, sidebarCollapsed: e.target.checked})}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <label htmlFor="sidebarCollapsed" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Menu latéral réduit par défaut
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      Le menu latéral sera affiché en mode réduit lors de la connexion
                    </p>
                  </div>

                  {/* Aperçu du thème */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                      Aperçu du Thème
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border rounded-lg p-3 text-center">
                        <div className="w-full h-2 bg-teal-500 rounded mb-2"></div>
                        <div className="text-xs text-gray-600">Thème Clair</div>
                      </div>
                      <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 text-center">
                        <div className="w-full h-2 bg-teal-400 rounded mb-2"></div>
                        <div className="text-xs text-gray-300">Thème Sombre</div>
                      </div>
                    </div>
                  </div>

                  {/* Liens utiles */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                          Liens Utiles
                        </h4>
                        <div className="space-y-2 text-sm">
                          <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                            📖 Télécharger la documentation
                          </a>
                          <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                            🔧 Support technique Infosoft
                          </a>
                          <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                            📊 Tableau de bord système
                          </a>
                        </div>
                      </div>
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