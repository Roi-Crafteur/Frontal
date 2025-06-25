import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  role: 'Administrateur' | 'Gestionnaire' | 'Utilisateur'
  avatar?: string
}

interface AppState {
  // UI State
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  
  // User State
  currentUser: User | null
  isAuthenticated: boolean
  
  // Data State
  orders: any[]
  products: any[]
  officines: any[]
  notifications: any[]
  
  // Actions
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleTheme: () => void
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  
  // Data Actions
  fetchOrders: () => Promise<void>
  fetchProducts: () => Promise<void>
  fetchOfficines: () => Promise<void>
  addNotification: (notification: any) => void
  removeNotification: (id: string) => void
}

export const useStore = create<AppState>((set, get) => ({
  // Initial State
  sidebarOpen: false, // Fermé par défaut pour le hover effect
  theme: 'light',
  currentUser: {
    id: '1',
    name: 'POISOT Paul',
    email: 'paul.poisot@infosoft.fr',
    role: 'Administrateur',
    avatar: '/avatar.jpg'
  },
  isAuthenticated: true,
  orders: [],
  products: [],
  officines: [],
  notifications: [],
  
  // UI Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  
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
          role: 'Administrateur'
        },
        isAuthenticated: true
      })
      return true
    }
    return false
  },
  logout: () => set({ currentUser: null, isAuthenticated: false }),
  
  // Data Actions
  fetchOrders: async () => {
    // Simulate API call
    const mockOrders = [
      { id: '1', date: new Date(), client: 'Pharmacie Central', status: 'En cours', total: 1250.50 },
      { id: '2', date: new Date(), client: 'Pharmacie du Marché', status: 'Livré', total: 890.25 }
    ]
    set({ orders: mockOrders })
  },
  
  fetchProducts: async () => {
    // Simulate API call
    const mockProducts = [
      { id: '1', name: 'Doliprane 1000mg', price: 3.50, stock: 150, category: 'Antalgique' },
      { id: '2', name: 'Amoxicilline 500mg', price: 8.90, stock: 75, category: 'Antibiotique' }
    ]
    set({ products: mockProducts })
  },
  
  fetchOfficines: async () => {
    // Simulate API call
    const mockOfficines = [
      { id: '1', name: 'Pharmacie Central', address: '123 Rue de la Paix, Paris', phone: '01.23.45.67.89' },
      { id: '2', name: 'Pharmacie du Marché', address: '456 Avenue des Champs, Lyon', phone: '04.56.78.90.12' }
    ]
    set({ officines: mockOfficines })
  },
  
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { ...notification, id: Date.now().toString() }]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  }))
}))