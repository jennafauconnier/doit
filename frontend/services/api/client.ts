import { useAuthStore } from "@/stores/auth.store";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { auth = true, ...fetchOptions } = options;

  const headers: HeadersInit = {
    ...fetchOptions.headers,
  };

  // Ne pas définir Content-Type pour FormData, le navigateur le fera automatiquement
  const isFormData = fetchOptions.body instanceof FormData;
  if (!isFormData) {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = useAuthStore.getState().token;
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Une erreur est survenue");
  }

  return data;
}