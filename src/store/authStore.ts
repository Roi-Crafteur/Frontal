import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { email: string; name: string };
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation (in real app, this would be server-side)
    if (email && password) {
      set({
        isAuthenticated: true,
        user: { email, name: email.split('@')[0] }
      });
      return true;
    }
    return false;
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null
    });
  }
})); 