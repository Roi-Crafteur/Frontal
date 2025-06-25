import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Plus, 
  Edit, 
  Eye, 
  Truck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  Download,
  Upload,
  Calendar,
  FileText,
  Package,
  Euro,
  BarChart3,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
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
      orderDate: new Date('2025-05-25'),
      deliveryDate: new Date('2025-06-25'),
      notes: 'Commande urgente pour patient',
      createdBy: 'POISOT Paul',
      createdAt: new Date('2025-05-25'),
      updatedAt: new Date()
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('En attentes');
  const [filterSelection, setFilterSelection] = useState<string>('Selection');
  const [dateFrom, setDateFrom] = useState('25/05/2025');
  const [dateTo, setDateTo] = useState('25/06/2025');
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  // Statistiques basées sur l'image
  const stats = {
    commandesLivrables: { count: 0, total: 0 },
    montantFacturable: { current: 0.00, total: 0.00 },
    lignesLivrables: { count: 0, total: 0 },
    unitesLivrables: { count: 0, undefined: 'undefined', demande: 0 },
    produitsManquants: { lignes: 0, unites: 0, ca: 0 },
    produitsInconnus: { lignes: 0, unites: 0 }
  };

  const montantTotalLivrable = 0.00;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.officineName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
            Liste des commandes
          </h1>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Nombre de commandes Livrables :</span>
              <span className="font-medium">{stats.commandesLivrables.count} / {stats.commandesLivrables.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Montant Facturable :</span>
              <span className="font-medium">{stats.montantFacturable.current.toFixed(2)} € / {stats.montantFacturable.total.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Lignes Livrables :</span>
              <span className="font-medium">{stats.lignesLivrables.count} / {stats.lignesLivrables.total}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Unités Livrables :</span>
              <span className="font-medium">{stats.unitesLivrables.count} / {stats.unitesLivrables.undefined} (Demande : {stats.unitesLivrables.demande})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Produits manquants :</span>
              <span className="font-medium">{stats.produitsManquants.lignes} lignes représentant {stats.produitsManquants.unites} unités (CA {stats.produitsManquants.ca}€)</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Produits inconnus :</span>
              <span className="font-medium">{stats.produitsInconnus.lignes} lignes représentant {stats.produitsInconnus.unites} unités</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions et filtres */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm font-medium">Import / Saisie de commandes</span>
          </motion.button>
          
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Montant total livrable (sélection)</span>
            <div className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm font-medium">
              {montantTotalLivrable.toFixed(2)} €
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Exporter</span>
          </motion.button>
        </div>
      </div>

      {/* Filtres de recherche */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Affichage
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="En attentes">En attentes</option>
            <option value="En cours">En cours</option>
            <option value="Livrées">Livrées</option>
            <option value="Toutes">Toutes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sélection
          </label>
          <select
            value={filterSelection}
            onChange={(e) => setFilterSelection(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="Selection">Sélection</option>
            <option value="Toutes">Toutes</option>
            <option value="Aucune">Aucune</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date de début
          </label>
          <div className="relative">
            <input
              type="text"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="25/05/2025"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date de fin
          </label>
          <div className="relative">
            <input
              type="text"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="25/06/2025"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Bouton de recherche */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2 rounded-lg shadow-lg transition-all flex items-center space-x-2"
        >
          <Search className="w-4 h-4" />
          <span>Rechercher</span>
        </motion.button>
      </div>

      {/* Contrôles de pagination et affichage */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">Afficher</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-1 border border-gray-200 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-600 dark:text-gray-300">éléments</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">Rechercher :</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border border-gray-200 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            placeholder="Rechercher..."
          />
        </div>
      </div>

      {/* Tableau des commandes */}
      <BackgroundGradient className="rounded-2xl p-1">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
          {/* En-têtes du tableau */}
          <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-7 gap-4 p-4 text-sm font-medium text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Référence</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Adhérent</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Lignes</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Boîtes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Euro className="w-4 h-4" />
                <span>Montant</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>État</span>
              </div>
            </div>
          </div>

          {/* Contenu du tableau */}
          <div className="p-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Aucune donnée disponible dans le tableau
                </h3>
                <p className="text-gray-500">
                  Aucune commande ne correspond à vos critères de recherche.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="grid grid-cols-7 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="text-sm text-gray-800 dark:text-white">
                      {order.orderDate.toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      {order.orderNumber}
                    </div>
                    <div className="text-sm text-gray-800 dark:text-white">
                      {order.officineName}
                    </div>
                    <div className="text-sm text-gray-800 dark:text-white">
                      {order.items.length}
                    </div>
                    <div className="text-sm text-gray-800 dark:text-white">
                      {order.totalItems}
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      €{order.totalAmount.toFixed(2)}
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Pied de tableau avec pagination */}
          <div className="bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Affichage de l'élément 0 à 0 sur 0 élément
              </div>
              <div className="flex items-center space-x-2">
                <button
                  disabled
                  className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-400 cursor-not-allowed"
                >
                  Précédent
                </button>
                <button
                  disabled
                  className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-400 cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </BackgroundGradient>

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