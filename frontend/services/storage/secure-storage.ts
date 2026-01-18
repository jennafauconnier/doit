import * as SecureStore from "expo-secure-store";

export const secureStorage = {
  setToken: async (token: string) => {
    await SecureStore.setItemAsync("auth_token", token);
  },

  getToken: async (): Promise<string | null> => {
    return SecureStore.getItemAsync("auth_token");
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync("auth_token");
  },

  setUser: async (user: object) => {
    await SecureStore.setItemAsync("auth_user", JSON.stringify(user));
  },

  getUser: async <T>(): Promise<T | null> => {
    const userStr = await SecureStore.getItemAsync("auth_user");
    if (userStr) {
      return JSON.parse(userStr) as T;
    }
    return null;
  },

  removeUser: async () => {
    await SecureStore.deleteItemAsync("auth_user");
  },

  clear: async () => {
    await SecureStore.deleteItemAsync("auth_token");
    await SecureStore.deleteItemAsync("auth_user");
  },
};