import { create } from 'zustand'
import type { User, Officine, Product, Order, Notification, AuditLog, DashboardStats } from '../types'

interface AppState {
  // UI State
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  activeModule: string
  
  // User State
  currentUser: User | null
  isAuthenticated: boolean
  
  // Data State
  users: User[]
  officines: Officine[]
  products: Product[]
  orders: Order[]
  notifications: Notification[]
  auditLogs: AuditLog[]
  dashboardStats: DashboardStats | null
  
  // Loading States
  loading: {
    users: boolean
    officines: boolean
    products: boolean
    orders: boolean
    notifications: boolean
  }
  
  // Actions
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleTheme: () => void
  setActiveModule: (module: string) => void
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  
  // Data Actions
  fetchUsers: () => Promise<void>
  fetchOfficines: () => Promise<void>
  fetchProducts: () => Promise<void>
  fetchOrders: () => Promise<void>
  fetchNotifications: () => Promise<void>
  fetchDashboardStats: () => Promise<void>
  
  // CRUD Actions
  addUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateUser: (id: string, user: Partial<User>) => Promise<void>
  deleteUser: (id: string) => Promise<void>
  
  addOfficine: (officine: Omit<Officine, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateOfficine: (id: string, officine: Partial<Officine>) => Promise<void>
  deleteOfficine: (id: string) => Promise<void>
  
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>
  deleteOrder: (id: string) => Promise<void>
  
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void
  markNotificationAsRead: (id: string) => void
  deleteNotification: (id: string) => void
  
  // Audit Actions
  logAction: (action: string, resource: string, resourceId: string, details?: Record<string, any>) =>  void
}

export const useStore = create<AppState>((set, get) => ({
  // Initial State
  sidebarOpen: false,
  theme: 'light',
  activeModule: 'dashboard',
  currentUser: {
    id: '1',
    name: 'POISOT Paul',
    email: 'paul.poisot@infosoft.fr',
    role: 'Administrateur',
    phone: '+33 1 23 45 67 89',
    avatar: '/avatar.jpg',
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
  isAuthenticated: true,
  users: [],
  officines: [],
  products: [],
  orders: [],
  notifications: [],
  auditLogs: [],
  dashboardStats: null,
  loading: {
    users: false,
    officines: false,
    products: false,
    orders: false,
    notifications: false
  },
  
  // UI Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setActiveModule: (module) => set({ activeModule: module }),
  
  // Auth Actions
  setUser: (user) => set({ currentUser: user, isAuthenticated: !!user }),
  login: async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (email === 'admin@infosoft.fr' && password === 'admin') {
      set({
        currentUser: {
          id: '1',
          name: 'POISOT Paul',
          email: 'admin@infosoft.fr',
          role: 'Administrateur',
          phone: '+33 1 23 45 67 89',
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
        isAuthenticated: true
      })
      return true
    }
    return false
  },
  logout: () => set({ currentUser: null, isAuthenticated: false }),
  
  // Data Fetch Actions
  fetchUsers: async () => {
    set(state => ({ loading: { ...state.loading, users: true } }))
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const mockUsers: User[] = [
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
      }
    ]
    set(state => ({ 
      users: mockUsers, 
      loading: { ...state.loading, users: false } 
    }))
  },
  
  fetchOfficines: async () => {
    set(state => ({ loading: { ...state.loading, officines: true } }))
    await new Promise(resolve => setTimeout(resolve, 1000))
    const mockOfficines: Officine[] = [
      {
        id: '1',
        name: 'Pharmacie Central',
        address: '123 Rue de la Paix',
        city: 'Paris',
        postalCode: '75001',
        phone: '+33 1 23 45 67 89',
        email: 'contact@pharmacie-central.fr',
        siret: '12345678901234',
        status: 'active',
        contactPerson: 'Dr. Martin Dupont',
        lastOrder: new Date(Date.now() - 86400000),
        totalOrders: 247,
        totalAmount: 125430.50,
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date()
      }
    ]
    set(state => ({ 
      officines: mockOfficines, 
      loading: { ...state.loading, officines: false } 
    }))
  },
  
  fetchProducts: async () => {
    set(state => ({ loading: { ...state.loading, products: true } }))
    await new Promise(resolve => setTimeout(resolve, 1000))
    const mockProducts: Product[] = [
      {
        id: '1',
        cip: '3400930000001',
        name: 'Doliprane 1000mg',
        description: 'Paracétamol 1000mg - Boîte de 8 comprimés',
        category: 'Antalgique',
        manufacturer: 'Sanofi',
        price: 3.50,
        stock: 150,
        minStock: 20,
        maxStock: 500,
        unit: 'boîte',
        status: 'active',
        isControlled: false,
        expiryDate: new Date('2025-12-31'),
        batchNumber: 'LOT2024001',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date()
      }
    ]
    set(state => ({ 
      products: mockProducts, 
      loading: { ...state.loading, products: false } 
    }))
  },
  
  fetchOrders: async () => {
    set(state => ({ loading: { ...state.loading, orders: true } }))
    await new Promise(resolve => setTimeout(resolve, 1000))
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'CMD-2025-001',
        officineId: '1',
        officineName: 'Pharmacie Central',
        status: 'processing',
        priority: 'normal',
        items: [
          { id: '1', productId: '1', productName: 'Doliprane 1000mg', cip: '3400930000001', quantity: 5, unitPrice: 3.50, totalPrice: 17.50, status: 'available' }
        ],
        totalAmount: 17.50,
        totalItems: 5,
        orderDate: new Date(),
        deliveryDate: new Date(Date.now() + 86400000),
        notes: 'Commande urgente pour patient',
        createdBy: 'POISOT Paul',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    set(state => ({ 
      orders: mockOrders, 
      loading: { ...state.loading, orders: false } 
    }))
  },
  
  fetchNotifications: async () => {
    set(state => ({ loading: { ...state.loading, notifications: true } }))
    await new Promise(resolve => setTimeout(resolve, 500))
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'warning',
        title: 'Stock faible',
        message: 'Le stock d\'Amoxicilline 500mg est en dessous du seuil minimum',
        userId: '1',
        isRead: false,
        isGlobal: false,
        priority: 'high',
        createdAt: new Date(Date.now() - 300000)
      }
    ]
    set(state => ({ 
      notifications: mockNotifications, 
      loading: { ...state.loading, notifications: false } 
    }))
  },
  
  fetchDashboardStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const mockStats: DashboardStats = {
      totalOrders: 1247,
      totalRevenue: 89432.50,
      totalOfficines: 354,
      totalProducts: 52231,
      ordersToday: 23,
      ordersYesterday: 137,
      revenueToday: 1250.75,
      revenueYesterday: 8950.25,
      lowStockProducts: 15,
      pendingOrders: 8
    }
    set({ dashboardStats: mockStats })
  },
  
  // CRUD Actions
  addUser: async (userData) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    set(state => ({ users: [...state.users, newUser] }))
    get().logAction('CREATE', 'user', newUser.id, { name: newUser.name })
  },
  
  updateUser: async (id, userData) => {
    set(state => ({
      users: state.users.map(user => 
        user.id === id ? { ...user, ...userData, updatedAt: new Date() } : user
      )
    }))
    get().logAction('UPDATE', 'user', id, userData)
  },
  
  deleteUser: async (id) => {
    const user = get().users.find(u => u.id === id)
    set(state => ({ users: state.users.filter(user => user.id !== id) }))
    get().logAction('DELETE', 'user', id, { name: user?.name })
  },
  
  addOfficine: async (officineData) => {
    const newOfficine: Officine = {
      ...officineData,
      id: Date.now().toString(),
      totalOrders: 0,
      totalAmount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    set(state => ({ officines: [...state.officines, newOfficine] }))
    get().logAction('CREATE', 'officine', newOfficine.id, { name: newOfficine.name })
  },
  
  updateOfficine: async (id, officineData) => {
    set(state => ({
      officines: state.officines.map(officine => 
        officine.id === id ? { ...officine, ...officineData, updatedAt: new Date() } : officine
      )
    }))
    get().logAction('UPDATE', 'officine', id, officineData)
  },
  
  deleteOfficine: async (id) => {
    const officine = get().officines.find(o => o.id === id)
    set(state => ({ officines: state.officines.filter(officine => officine.id !== id) }))
    get().logAction('DELETE', 'officine', id, { name: officine?.name })
  },
  
  addProduct: async (productData) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    set(state => ({ products: [...state.products, newProduct] }))
    get().logAction('CREATE', 'product', newProduct.id, { name: newProduct.name })
  },
  
  updateProduct: async (id, productData) => {
    set(state => ({
      products: state.products.map(product => 
        product.id === id ? { ...product, ...productData, updatedAt: new Date() } : product
      )
    }))
    get().logAction('UPDATE', 'product', id, productData)
  },
  
  deleteProduct: async (id) => {
    const product = get().products.find(p => p.id === id)
    set(state => ({ products: state.products.filter(product => product.id !== id) }))
    get().logAction('DELETE', 'product', id, { name: product?.name })
  },
  
  addOrder: async (orderData) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderNumber: `CMD-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    set(state => ({ orders: [...state.orders, newOrder] }))
    get().logAction('CREATE', 'order', newOrder.id, { orderNumber: newOrder.orderNumber })
  },
  
  updateOrder: async (id, orderData) => {
    set(state => ({
      orders: state.orders.map(order => 
        order.id === id ? { ...order, ...orderData, updatedAt: new Date() } : order
      )
    }))
    get().logAction('UPDATE', 'order', id, orderData)
  },
  
  deleteOrder: async (id) => {
    const order = get().orders.find(o => o.id === id)
    set(state => ({ orders: state.orders.filter(order => order.id !== id) }))
    get().logAction('DELETE', 'order', id, { orderNumber: order?.orderNumber })
  },
  
  addNotification: (notificationData) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    set(state => ({ notifications: [newNotification, ...state.notifications] }))
  },
  
  markNotificationAsRead: (id) => {
    set(state => ({
      notifications: state.notifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    }))
  },
  
  deleteNotification: (id) => {
    set(state => ({ notifications: state.notifications.filter(notification => notification.id !== id) }))
  },
  
  logAction: (action, resource, resourceId, details = {}) => {
    const currentUser = get().currentUser
    if (!currentUser) return
    
    const logEntry: AuditLog = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      action,
      resource,
      resourceId,
      details,
      ipAddress: '127.0.0.1', // Would be real IP in production
      userAgent: navigator.userAgent,
      timestamp: new Date()
    }
    
    set(state => ({ auditLogs: [logEntry, ...state.auditLogs] }))
  }
}))