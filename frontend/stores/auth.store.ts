import { create } from 'zustand';
import { secureStorage } from '@/services/storage/secure-storage';
import { notificationService } from '@/services/notifications/notifications.service';
import { authService } from '@/services/api/auth.service';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,

  setAuth: async (user, token) => {
    await secureStorage.setToken(token);
    await secureStorage.setUser(user);
    set({ user, token, isAuthenticated: true, isLoading: false });

    // Enregistrer le token de notification
    try {
      const pushToken = await notificationService.registerForPushNotifications();
      console.log('📱 Push Token:', pushToken);
      if (pushToken) {
        await authService.registerPushToken(pushToken);
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du push token:', error);
    }
  },

  logout: async () => {
    await secureStorage.clear();
    set({ user: null, token: null, isAuthenticated: false });
  },

  hydrate: async () => {
    const token = await secureStorage.getToken();
    const user = await secureStorage.getUser<User>();

    if (token && user) {
      set({ user, token, isAuthenticated: true, isLoading: false });
      
      try {
        const pushToken = await notificationService.registerForPushNotifications();
        if (pushToken) {
          await authService.registerPushToken(pushToken);
        }
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement du push token:', error);
      }
    } else {
      set({ isLoading: false });
    }
  },
}));