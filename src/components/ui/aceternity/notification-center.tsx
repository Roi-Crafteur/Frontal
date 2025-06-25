import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { useStore } from "../../../store/useStore";
import { Bell, X, Check, AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react";

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, removeNotification, markNotificationAsRead } = useStore();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Notifications
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Aucune notification</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                          !notification.read && "bg-teal-50 dark:bg-teal-900/20"
                        )}
                      >
                        <div className="flex items-start space-x-3">
                          {getIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-800 dark:text-white">
                                {notification.title}
                              </p>
                              <div className="flex items-center space-x-1">
                                {!notification.read && (
                                  <button
                                    onClick={() => markNotificationAsRead(notification.id)}
                                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    title="Marquer comme lu"
                                  >
                                    <Check className="w-3 h-3 text-gray-500" />
                                  </button>
                                )}
                                <button
                                  onClick={() => removeNotification(notification.id)}
                                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                  title="Supprimer"
                                >
                                  <X className="w-3 h-3 text-gray-500" />
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.timestamp.toLocaleString('fr-FR')}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};