// Types globaux pour la plateforme pharmaceutique
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Administrateur' | 'Gestionnaire' | 'Utilisateur';
  phone?: string;
  avatar?: string;
  lastLogin?: Date;
  status: 'active' | 'inactive';
  permissions: string[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'fr' | 'en';
  notifications: NotificationSettings;
  dashboard: DashboardSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  types: string[];
}

export interface DashboardSettings {
  layout: 'grid' | 'list';
  widgets: string[];
  refreshInterval: number;
}

export interface Officine {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  mobile?: string;
  fax?: string;
  email: string;
  siret: string;
  status: 'active' | 'inactive' | 'suspended';
  contactPerson: string;
  lastOrder?: Date;
  totalOrders: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  // Identification Web
  webLogin?: string;
  webPassword?: string;
  finess?: string;
  // Identification PharmaML
  ediId?: string;
  ediKey?: string;
  disablePharmaML?: boolean;
  // Profil de commande
  refuseContingent?: boolean;
  infoProductResponse?: number; // 0=global, 1=refuser, 2=pas de stock si partiel
  clientCategory?: number; // 0-9 catégories tarifaires
  showRestrictedProducts?: boolean;
  lgo?: string; // Logiciel Gérant l'Officine (LGPI, Winpharma, etc.)
}

export interface Product {
  id: string;
  cip: string;
  name: string;
  description: string;
  category: string;
  manufacturer: string;
  price: number;
  stock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  status: 'active' | 'inactive' | 'discontinued';
  isControlled: boolean;
  expiryDate?: Date;
  batchNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  officineId: string;
  officineName: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  items: OrderItem[];
  totalAmount: number;
  totalItems: number;
  orderDate: Date;
  deliveryDate?: Date;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  cip: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: 'available' | 'partial' | 'unavailable';
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  userId?: string;
  isRead: boolean;
  isGlobal: boolean;
  priority: 'low' | 'normal' | 'high';
  createdAt: Date;
  expiresAt?: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalOfficines: number;
  totalProducts: number;
  ordersToday: number;
  ordersYesterday: number;
  revenueToday: number;
  revenueYesterday: number;
  lowStockProducts: number;
  pendingOrders: number;
}