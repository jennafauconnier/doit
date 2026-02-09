import { apiClient } from "./client";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueAt?: string;
  completed: boolean;
  proofPhoto?: string;
  validatedAt?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  dueAt?: string;
  completed?: boolean;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  dueAt?: string;
  completed?: boolean;
}

export const tasksService = {
  list: () => apiClient<Task[]>("/tasks"),

  create: (data: CreateTaskRequest) =>
    apiClient<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateTaskRequest) =>
    apiClient<Task>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  remove: (id: string) =>
    apiClient<{ id: string }>(`/tasks/${id}`, {
      method: "DELETE",
    }),

  validate: (id: string, photoUri: string) => {
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      type: 'image/jpeg',
      name: 'proof.jpg',
    } as any);
  
    return apiClient<Task>(`/tasks/${id}/validate`, {
      method: 'POST',
      body: formData,
    } as any);
  },
};