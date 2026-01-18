import { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Typography, Card, Button, IconButton, Logo } from "@/components/ui";
import { useAuthStore } from "@/stores/auth.store";

// Mock data pour l'instant
const mockTasks = [
  { id: "1", title: "Faire les courses", completed: false },
  { id: "2", title: "Appeler le médecin", completed: true },
  { id: "3", title: "Répondre aux emails", completed: false },
];

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const [tasks, setTasks] = useState(mockTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Typography variant="bodyLarge" className="text-gray-500">
                Bonjour
              </Typography>
              <Typography variant="bodyLarge" className="text-gray-900">
                {user?.username || "Utilisateur"} 👋
              </Typography>
            </View>
            <Logo size="sm" />
          </View>

          {/* Stats */}
          <View className="flex-row gap-3 mt-6">
            <View className="flex-1 bg-fuchsia-50 rounded-2xl p-4">
              <Typography variant="h2" className="text-fuchsia-600">
                {pendingTasks.length}
              </Typography>
              <Typography variant="caption" className="text-fuchsia-600/70">
                En cours
              </Typography>
            </View>
            <View className="flex-1 bg-green-50 rounded-2xl p-4">
              <Typography variant="h2" className="text-green-600">
                {completedTasks.length}
              </Typography>
              <Typography variant="caption" className="text-green-600/70">
                Terminées
              </Typography>
            </View>
          </View>
        </View>

        {/* Tasks List */}
        <ScrollView 
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <View className="mb-6">
              <Typography variant="label" className="text-gray-500 mb-3">
                À FAIRE
              </Typography>
              {pendingTasks.map((task, index) => (
                <Animated.View
                  key={task.id}
                  entering={FadeInDown.delay(index * 100)}
                >
                  <TaskItem
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                  />
                </Animated.View>
              ))}
            </View>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <View className="mb-6">
              <Typography variant="label" className="text-gray-400 mb-3">
                TERMINÉES
              </Typography>
              {completedTasks.map((task, index) => (
                <Animated.View
                  key={task.id}
                  entering={FadeInDown.delay(index * 100)}
                >
                  <TaskItem
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                  />
                </Animated.View>
              ))}
            </View>
          )}

          {/* Empty State */}
          {tasks.length === 0 && (
            <View className="items-center justify-center py-20">
              <Ionicons name="checkbox-outline" size={64} color="#e5e7eb" />
              <Typography variant="bodyLarge" className="text-gray-400 mt-4">
                Aucune tâche pour le moment
              </Typography>
              <Typography variant="caption" className="text-gray-400">
                Appuie sur + pour en ajouter une
              </Typography>
            </View>
          )}
        </ScrollView>

        {/* FAB - Add Task */}
        <Pressable
          className="absolute bottom-6 right-6 w-14 h-14 bg-fuchsia-500 rounded-full items-center justify-center shadow-lg"
          style={{
            shadowColor: "#d946ef",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

// Task Item Component
function TaskItem({
  task,
  onToggle,
}: {
  task: { id: string; title: string; completed: boolean };
  onToggle: () => void;
}) {
  return (
    <Pressable
      onPress={onToggle}
      className="flex-row items-center bg-gray-50 rounded-xl p-4 mb-2"
    >
      <View
        className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
          task.completed
            ? "bg-green-500 border-green-500"
            : "border-gray-300"
        }`}
      >
        {task.completed && (
          <Ionicons name="checkmark" size={14} color="#fff" />
        )}
      </View>
      <Typography
        className={`flex-1 ${
          task.completed ? "text-gray-400 line-through" : "text-gray-800"
        }`}
      >
        {task.title}
      </Typography>
      <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
    </Pressable>
  );
}