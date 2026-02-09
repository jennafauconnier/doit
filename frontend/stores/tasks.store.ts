import { create } from "zustand";
import { tasksService, type Task, type UpdateTaskRequest } from "@/services/api/tasks.service";

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (title: string) => Promise<void>;
  updateTask: (id: string, data: UpdateTaskRequest) => Promise<void>;
  toggleTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  validateTask: (id: string, photoUri: string) => Promise<void>;
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await tasksService.list();
      set({ tasks, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Erreur de chargement", isLoading: false });
    }
  },

  createTask: async (title: string) => {
    set({ isLoading: true, error: null });
    try {
      const task = await tasksService.create({ title });
      set((state) => ({
        tasks: [task, ...state.tasks],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message || "Erreur lors de la création", isLoading: false });
    }
  },

  updateTask: async (id: string, data: UpdateTaskRequest) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await tasksService.update(id, data);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updated : task)),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message || "Erreur lors de la mise à jour", isLoading: false });
    }
  },

  toggleTask: async (task: Task) => {
    await get().updateTask(task.id, { completed: !task.completed });
  },

  deleteTask: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await tasksService.remove(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message || "Erreur lors de la suppression", isLoading: false });
    }
  },

  validateTask: async (id: string, photoUri: string) => {
    set({ isLoading: true, error: null });
    try {
      const validated = await tasksService.validate(id, photoUri);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? validated : t)),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message || 'Erreur lors de la validation', isLoading: false });
    }
  },
}));