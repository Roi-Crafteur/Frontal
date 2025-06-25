import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  role: 'Administrateur' | 'Gestionnaire' | 'Utilisateur'
  avatar?: string
  preferences?: {
    theme: 'light' | 'dark'
    notifications: boolean
    language: string
  }
}

interface Order {
  id: string
  date: Date
  client: string
  status: 'En cours' | 'Livré' | 'En attente' | 'Annulé'
  total: number
  items: number
  lines: number
  units: number
}

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: string
  cip?: string
  contingent?: boolean
  replacement?: string[]
}

interface Officine {
  id: string
  name: string
  address: string
  phone: string
  email?: string
  status: 'Actif' | 'Inactif'
  lastOrder?: Date
}

interface Notification {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: Date
  read: boolean
  userId?: string
}

interface Log {
  id: string
  timestamp: Date
  userId: string
  action: string
  module: string
  details: string
  ip?: string
}

interface AppState {
  // UI State
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  loading: boolean
  
  // User State
  currentUser: User | null
  isAuthenticated: boolean
  users: User[]
  
  // Business Data
  orders: Order[]
  products: Product[]
  officines: Officine[]
  notifications: Notification[]
  logs: Log[]
  
  // Statistics
  stats: {
    todayOrders: { commands: number; lines: number; units: number }
    yesterdayOrders: { commands: number; lines: number; units: number }
    totalProducts: number
    totalOfficines: number
    availability: number
  }
  
  // Actions
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleTheme: () => void
  setLoading: (loading: boolean) => void
  
  // Auth Actions
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  
  // Data Actions
  fetchOrders: () => Promise<void>
  fetchProducts: () => Promise<void>
  fetchOfficines: () => Promise<void>
  fetchUsers: () => Promise<void>
  
  // Notification Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  markNotificationAsRead: (id: string) => void
  
  // Log Actions
  addLog: (log: Omit<Log, 'id' | 'timestamp'>) => void
  fetchLogs: () => Promise<void>
  
  // Business Actions
  createOrder: (order: Omit<Order, 'id'>) => Promise<void>
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>
  deleteOrder: (id: string) => Promise<void>
  
  createProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  
  createOfficine: (officine: Omit<Officine, 'id'>) => Promise<void>
  updateOfficine: (id: string, officine: Partial<Officine>) => Promise<void>
  deleteOfficine: (id: string) => Promise<void>
}

export const useStore = create<AppState>((set, get) => ({
  // Initial State
  sidebarOpen: false,
  theme: 'light',
  loading: false,
  currentUser: {
    id: '1',
    name: 'POISOT Paul',
    email: 'paul.poisot@infosoft.fr',
    role: 'Administrateur',
    preferences: {
      theme: 'light',
      notifications: true,
      language: 'fr'
    }
  },
  isAuthenticated: true,
  users: [],
  orders: [],
  products: [],
  officines: [],
  notifications: [],
  logs: [],
  stats: {
    todayOrders: { commands: 23, lines: 20, units: 94 },
    yesterdayOrders: { commands: 137, lines: 127, units: 89 },
    totalProducts: 52231,
    totalOfficines: 354,
    availability: 98
  },
  
  // UI Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  setLoading: (loading) => set({ loading }),
  
  // Auth Actions
  setUser: (user) => set({ currentUser: user, isAuthenticated: !!user }),
  login: async (email, password) => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email === 'admin@infosoft.fr' && password === 'admin') {
      const user: User = {
        id: '1',
        name: 'POISOT Paul',
        email: 'admin@infosoft.fr',
        role: 'Administrateur',
        preferences: {
          theme: 'light',
          notifications: true,
          language: 'fr'
        }
      }
      set({ currentUser: user, isAuthenticated: true, loading: false })
      get().addLog({
        userId: user.id,
        action: 'LOGIN',
        module: 'AUTH',
        details: 'Connexion réussie'
      })
      return true
    }
    
    set({ loading: false })
    return false
  },
  
  logout: () => {
    const currentUser = get().currentUser
    if (currentUser) {
      get().addLog({
        userId: currentUser.id,
        action: 'LOGOUT',
        module: 'AUTH',
        details: 'Déconnexion'
      })
    }
    set({ currentUser: null, isAuthenticated: false })
  },
  
  // Data Actions
  fetchOrders: async () => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockOrders: Order[] = [
      {
        id: '1',
        date: new Date(),
        client: 'Pharmacie Central',
        status: 'En cours',
        total: 1250.50,
        items: 15,
        lines: 12,
        units: 45
      },
      {
        id: '2',
        date: new Date(Date.now() - 86400000),
        client: 'Pharmacie du Marché',
        status: 'Livré',
        total: 890.25,
        items: 8,
        lines: 6,
        units: 23
      }
    ]
    
    set({ orders: mockOrders, loading: false })
  },
  
  fetchProducts: async () => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Doliprane 1000mg',
        price: 3.50,
        stock: 150,
        category: 'Antalgique',
        cip: '3400930000001'
      },
      {
        id: '2',
        name: 'Amoxicilline 500mg',
        price: 8.90,
        stock: 5,
        category: 'Antibiotique',
        cip: '3400930000002'
      }
    ]
    
    set({ products: mockProducts, loading: false })
  },
  
  fetchOfficines: async () => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockOfficines: Officine[] = [
      {
        id: '1',
        name: 'Pharmacie Central',
        address: '123 Rue de la Paix, 75001 Paris',
        phone: '01.23.45.67.89',
        email: 'contact@pharmacie-central.fr',
        status: 'Actif',
        lastOrder: new Date()
      },
      {
        id: '2',
        name: 'Pharmacie du Marché',
        address: '456 Avenue des Champs, 69001 Lyon',
        phone: '04.56.78.90.12',
        email: 'info@pharmacie-marche.fr',
        status: 'Actif',
        lastOrder: new Date(Date.now() - 86400000)
      }
    ]
    
    set({ officines: mockOfficines, loading: false })
  },
  
  fetchUsers: async () => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'POISOT Paul',
        email: 'paul.poisot@infosoft.fr',
        role: 'Administrateur'
      },
      {
        id: '2',
        name: 'Marie Dubois',
        email: 'marie.dubois@infosoft.fr',
        role: 'Gestionnaire'
      }
    ]
    
    set({ users: mockUsers, loading: false })
  },
  
  // Notification Actions
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    }
    set((state) => ({
      notifications: [newNotification, ...state.notifications]
    }))
  },
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
  })),
  
  // Log Actions
  addLog: (log) => {
    const newLog: Log = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    set((state) => ({
      logs: [newLog, ...state.logs]
    }))
  },
  
  fetchLogs: async () => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    set({ loading: false })
  },
  
  // Business Actions
  createOrder: async (order) => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newOrder: Order = {
      ...order,
      id: Date.now().toString()
    }
    
    set((state) => ({
      orders: [newOrder, ...state.orders],
      loading: false
    }))
    
    get().addLog({
      userId: get().currentUser?.id || '',
      action: 'CREATE_ORDER',
      module: 'ORDERS',
      details: `Nouvelle commande créée: ${newOrder.client}`
    })
  },
  
  updateOrder: async (id, order) => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    set((state) => ({
      orders: state.orders.map(o => o.id === id ? { ...o, ...order } : o),
      loading: false
    }))
    
    get().addLog({
      userId: get().currentUser?.id || '',
      action: 'UPDATE_ORDER',
      module: 'ORDERS',
      details: `Commande modifiée: ${id}`
    })
  },
  
  deleteOrder: async (id) => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    set((state) => ({
      orders: state.orders.filter(o => o.id !== id),
      loading: false
    }))
    
    get().addLog({
      userId: get().currentUser?.id || '',
      action: 'DELETE_ORDER',
      module: 'ORDERS',
      details: `Commande supprimée: ${id}`
    })
  },
  
  createProduct: async (product) => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    }
    
    set((state) => ({
      products: [newProduct, ...state.products],
      loading: false
    }))
    
    get().addLog({
      userId: get().currentUser?.id || '',
      action: 'CREATE_PRODUCT',
      module: 'PRODUCTS',
      details: `Nouveau produit créé: ${newProduct.name}`
    })
  },
  
  updateProduct: async (id, product) => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    set((state) => ({
      products: state.products.map(p => p.id === id ? { ...p, ...product } : p),
      loading: false
    }))
    
    get().addLog({
      userId: get().currentUser?.id || '',
      action: 'UPDATE_PRODUCT',
      module: 'PRODUCTS',
      details: `Produit modifié: ${id}`
    })
  },
  
  deleteProduct: async (id) => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    set((state) => ({
      products: state.products.filter(p => p.id !== id),
      loading: false
    }))
    
    get().addLog({
      userId: get().currentUser?.id || '',
      action: 'DELETE_PRODUCT',
      module: 'PRODUCTS',
      details: `Produit supprimé: ${id}`
    })
  },
  
  createOfficine: async (officine) => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newOfficine: Officine = {
      ...officine,
      id: Date.now().toString()
    }
    
    set((state) => ({
      officines: [newOfficine, ...state.officines],
      loading: false
    }))
    
    get().addLog({
      userId: get().currentUser?.id || '',
      action: 'CREATE_OFFICINE',
      module: 'OFFICINES',
      details: `Nouvelle officine créée: ${newOfficine.name}`
    })
  },
  
  updateOfficine: async (id, officine) => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    set((state) => ({
      officines: state.officines.map(o => o.id === id ? { ...o, ...officine } : o),
      loading: false
    }))
    
    get().addLog({
      userId: get().currentUser?.id || '',
      action: 'UPDATE_OFFICINE',
      module: 'OFFICINES',
      details: `Officine modifiée: ${id}`
    })
  },
  
  deleteOfficine: async (id) => {
    set({ loading: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    
    set((state) => ({
      officines: state.officines.filter(o => o.id !== id),
      loading: false
    }))
    
    get().addLog({
      userId: get().currentUser?.id || '',
      action: 'DELETE_OFFICINE',
      module: 'OFFICINES',
      details: `Officine supprimée: ${id}`
    })
  }
}))