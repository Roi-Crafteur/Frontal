import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, X, AlertTriangle, Info, CheckCircle, XCircle, Filter, Search } from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import type { Notification } from "../../types";

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Stock faible',
      message: 'Le stock d\'Amoxicilline 500mg est en dessous du seuil minimum (5 unités restantes)',
      userId: '1',
      isRead: false,
      isGlobal: false,
      priority: 'high',
      createdAt: new Date(Date.now() - 300000),
      expiresAt: new Date(Date.now() + 86400000)
    },
    {
      id: '2',
      type: 'success',
      title: 'Commande livrée',
      message: 'La commande CMD-2025-002 a été livrée avec succès à la Pharmacie du Marché',
      isRead: true,
      isGlobal: true,
      priority: 'normal',
      createdAt: new Date(Date.now() - 3600000)
    },
    {
      id: '3',
      type: 'info',
      title: 'Nouvelle commande',
      message: 'Une nouvelle commande CMD-2025-004 a été reçue de la Pharmacie Central',
      userId: '2',
      isRead: false,
      isGlobal: false,
      priority: 'normal',
      createdAt: new Date(Date.now() - 7200000)
    },
    {
      id: '4',
      type: 'error',
      title: 'Produit indisponible',
      message: 'L\'Aspirine 500mg n\'est plus disponible et doit être retiré du catalogue',
      isRead: false,
      isGlobal: true,
      priority: 'high',
      createdAt: new Date(Date.now() - 10800000)
    },
    {
      id: '5',
      type: 'info',
      title: 'Mise à jour système',
      message: 'Une mise à jour de sécurité sera appliquée ce soir à 22h00',
      isRead: true,
      isGlobal: true,
      priority: 'low',
      createdAt: new Date(Date.now() - 14400000),
      expiresAt: new Date(Date.now() + 43200000)
    }
  ]);

  const [filterType, setFilterType] = useState<string>('all');
  const [filterRead, setFilterRead] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'read' && notification.isRead) ||
                       (filterRead === 'unread' && !notification.isRead);
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesRead && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info': return Info;
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      default: return Info;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'border-l-gray-300';
      case 'normal': return 'border-l-blue-400';
      case 'high': return 'border-l-orange-400';
      default: return 'border-l-gray-300';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center space-x-3">
            <Bell className="w-8 h-8 text-teal-600" />
            <span>Centre de Notifications</span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Gérez toutes vos notifications système et alertes
          </p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-5 h-5" />
            <span>Tout marquer comme lu</span>
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher dans les notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-white"
            >
              <option value="all">Tous types</option>
              <option value="info">Information</option>
              <option value="success">Succès</option>
              <option value="warning">Avertissement</option>
              <option value="error">Erreur</option>
            </select>
          </div>
          
          <div className="relative">
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-white"
            >
              <option value="all">Toutes</option>
              <option value="unread">Non lues</option>
              <option value="read">Lues</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            title: "Total", 
            value: notifications.length, 
            color: "text-blue-600", 
            bg: "bg-blue-100",
            icon: Bell
          },
          { 
            title: "Non lues", 
            value: unreadCount, 
            color: "text-red-600", 
            bg: "bg-red-100",
            icon: Bell
          },
          { 
            title: "Priorité élevée", 
            value: notifications.filter(n => n.priority === 'high').length, 
            color: "text-orange-600", 
            bg: "bg-orange-100",
            icon: AlertTriangle
          },
          { 
            title: "Globales", 
            value: notifications.filter(n => n.isGlobal).length, 
            color: "text-purple-600", 
            bg: "bg-purple-100",
            icon: Bell
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

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
              Aucune notification trouvée
            </h3>
            <p className="text-gray-500">
              Aucune notification ne correspond à vos critères de recherche.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => {
            const TypeIcon = getTypeIcon(notification.type);
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BackgroundGradient className="rounded-2xl p-1">
                  <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.isRead ? 'ring-2 ring-teal-100 dark:ring-teal-900' : ''
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getTypeColor(notification.type)}`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            )}
                            {notification.isGlobal && (
                              <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                                Globale
                              </span>
                            )}
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              notification.priority === 'high' ? 'bg-red-100 text-red-600' :
                              notification.priority === 'normal' ? 'bg-blue-100 text-blue-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {notification.priority === 'high' ? 'Élevée' :
                               notification.priority === 'normal' ? 'Normale' : 'Faible'}
                            </span>
                          </div>
                          
                          <p className={`text-sm mb-3 ${!notification.isRead ? 'text-gray-800 dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>
                              {notification.createdAt.toLocaleDateString('fr-FR')} à {notification.createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {notification.expiresAt && (
                              <span>
                                Expire le {notification.expiresAt.toLocaleDateString('fr-FR')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.isRead && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Marquer comme lu"
                          >
                            <Check className="w-4 h-4" />
                          </motion.button>
                        )}
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </BackgroundGradient>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}