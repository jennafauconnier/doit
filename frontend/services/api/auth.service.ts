import { apiClient } from "./client";

interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  signup: (data: SignupRequest) =>
    apiClient<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      auth: false,
    }),

  login: (data: LoginRequest) =>
    apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      auth: false,
    }),

  me: () => apiClient<User>("/auth/me"),
};