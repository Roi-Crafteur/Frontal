import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Edit, Eye, Truck, Clock, CheckCircle, XCircle, Search, Filter, Download } from "lucide-react";
import { BackgroundGradient } from "../ui/aceternity/background-gradient";
import type { Order } from "../../types";

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'CMD-2025-001',
      officineId: '1',
      officineName: 'Pharmacie Central',
      status: 'processing',
      priority: 'normal',
      items: [
        { id: '1', productId: '1', productName: 'Doliprane 1000mg', cip: '3400930000001', quantity: 5, unitPrice: 3.50, totalPrice: 17.50, status: 'available' },
        { id: '2', productId: '2', productName: 'Amoxicilline 500mg', cip: '3400930000002', quantity: 2, unitPrice: 8.90, totalPrice: 17.80, status: 'partial' }
      ],
      totalAmount: 35.30,
      totalItems: 7,
      orderDate: new Date(),
      deliveryDate: new Date(Date.now() + 86400000),
      notes: 'Commande urgente pour patient',
      createdBy: 'POISOT Paul',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      orderNumber: 'CMD-2025-002',
      officineId: '2',
      officineName: 'Pharmacie du Marché',
      status: 'shipped',
      priority: 'high',
      items: [
        { id: '3', productId: '1', productName: 'Doliprane 1000mg', cip: '3400930000001', quantity: 10, unitPrice: 3.50, totalPrice: 35.00, status: 'available' }
      ],
      totalAmount: 35.00,
      totalItems: 10,
      orderDate: new Date(Date.now() - 86400000),
      deliveryDate: new Date(Date.now() + 43200000),
      createdBy: 'Marie Dubois',
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 43200000)
    },
    {
      id: '3',
      orderNumber: 'CMD-2025-003',
      officineId: '3',
      officineName: 'Pharmacie de la Gare',
      status: 'delivered',
      priority: 'low',
      items: [
        { id: '4', productId: '3', productName: 'Aspirine 500mg', cip: '3400930000003', quantity: 3, unitPrice: 4.25, totalPrice: 12.75, status: 'unavailable' }
      ],
      totalAmount: 12.75,
      totalItems: 3,
      orderDate: new Date(Date.now() - 172800000),
      deliveryDate: new Date(Date.now() - 86400000),
      createdBy: 'Jean Martin',
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date(Date.now() - 86400000)
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.officineName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || order.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'processing': return 'En cours';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return ShoppingCart;
      case 'shipped': return Truck;
      case 'delivered': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-gray-600 bg-gray-100';
      case 'normal': return 'text-blue-600 bg-blue-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low': return 'Faible';
      case 'normal': return 'Normale';
      case 'high': return 'Élevée';
      case 'urgent': return 'Urgente';
      default: return priority;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Gestion des Commandes
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Suivez et gérez toutes les commandes pharmaceutiques
          </p>
        </div>
        
        <div className="flex space-x-3">
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
            <span>Nouvelle Commande</span>
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une commande..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-white"
            >
              <option value="all">Tous statuts</option>
              <option value="pending">En attente</option>
              <option value="processing">En cours</option>
              <option value="shipped">Expédiée</option>
              <option value="delivered">Livrée</option>
              <option value="cancelled">Annulée</option>
            </select>
          </div>
          
          <div className="relative">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none bg-white"
            >
              <option value="all">Toutes priorités</option>
              <option value="low">Faible</option>
              <option value="normal">Normale</option>
              <option value="high">Élevée</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          { 
            title: "Total Commandes", 
            value: orders.length, 
            color: "text-blue-600", 
            bg: "bg-blue-100",
            icon: ShoppingCart
          },
          { 
            title: "En Cours", 
            value: orders.filter(o => o.status === 'processing').length, 
            color: "text-orange-600", 
            bg: "bg-orange-100",
            icon: Clock
          },
          { 
            title: "Expédiées", 
            value: orders.filter(o => o.status === 'shipped').length, 
            color: "text-purple-600", 
            bg: "bg-purple-100",
            icon: Truck
          },
          { 
            title: "Livrées", 
            value: orders.filter(o => o.status === 'delivered').length, 
            color: "text-green-600", 
            bg: "bg-green-100",
            icon: CheckCircle
          },
          { 
            title: "CA Total", 
            value: `€${orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString('fr-FR')}`, 
            color: "text-teal-600", 
            bg: "bg-teal-100",
            icon: ShoppingCart
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

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const StatusIcon = getStatusIcon(order.status);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <BackgroundGradient className="rounded-2xl p-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-500 rounded-xl flex items-center justify-center">
                        <StatusIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {order.orderNumber}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {order.officineName}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                        {getPriorityLabel(order.priority)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                      
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Date de commande</p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {order.orderDate.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Date de livraison</p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {order.deliveryDate?.toLocaleDateString('fr-FR') || 'Non définie'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Articles</p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {order.totalItems} unités ({order.items.length} produits)
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Montant total</p>
                      <p className="text-xl font-bold text-teal-600">
                        €{order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Notes:</strong> {order.notes}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500">
                    <span>Créée par {order.createdBy}</span>
                    <span>Mise à jour: {order.updatedAt.toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </BackgroundGradient>
            </motion.div>
          );
        })}
      </div>

      {/* Modal pour détails de commande */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Détails de la commande {selectedOrder.orderNumber}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedOrder(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Informations générales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Informations générales
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Officine:</span>
                      <p className="font-medium text-gray-800 dark:text-white">{selectedOrder.officineName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Statut:</span>
                      <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusLabel(selectedOrder.status)}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Priorité:</span>
                      <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedOrder.priority)}`}>
                        {getPriorityLabel(selectedOrder.priority)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Dates importantes
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Date de commande:</span>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {selectedOrder.orderDate.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Date de livraison prévue:</span>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {selectedOrder.deliveryDate?.toLocaleDateString('fr-FR') || 'Non définie'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Articles commandés */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Articles commandés
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Produit</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">CIP</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Quantité</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Prix unitaire</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Total</th>
                        <th className="text-center py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 px-4 text-gray-800 dark:text-white">{item.productName}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{item.cip}</td>
                          <td className="py-3 px-4 text-right text-gray-800 dark:text-white">{item.quantity}</td>
                          <td className="py-3 px-4 text-right text-gray-800 dark:text-white">€{item.unitPrice.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right font-medium text-gray-800 dark:text-white">€{item.totalPrice.toFixed(2)}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'available' ? 'text-green-600 bg-green-100' :
                              item.status === 'partial' ? 'text-orange-600 bg-orange-100' :
                              'text-red-600 bg-red-100'
                            }`}>
                              {item.status === 'available' ? 'Disponible' :
                               item.status === 'partial' ? 'Partiel' : 'Indisponible'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-200 dark:border-gray-700">
                        <td colSpan={4} className="py-3 px-4 text-right font-semibold text-gray-800 dark:text-white">
                          Total de la commande:
                        </td>
                        <td className="py-3 px-4 text-right text-xl font-bold text-teal-600">
                          €{selectedOrder.totalAmount.toFixed(2)}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    Notes
                  </h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedOrder(null);
                }}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Fermer
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
              >
                Modifier la commande
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}