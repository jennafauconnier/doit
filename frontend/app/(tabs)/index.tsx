import { useEffect } from "react";
import { View, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

import { Typography, Logo } from "@/components/ui";
import { useAuthStore } from "@/stores/auth.store";
import { useTasksStore } from "@/stores/tasks.store";
import { TaskItem } from "@/components/tasks/task-item.component";

import { layout } from "@/styles";
import { styles } from "./index.styles";

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { tasks, isLoading, fetchTasks, deleteTask } = useTasksStore();

  useEffect(() => {
    fetchTasks().catch(() => {});
  }, [fetchTasks]);

  const pendingTasks = tasks.filter((t) => !t.validatedAt);
  const completedTasks = tasks.filter((t) => !!t.validatedAt);

  return (
    <View style={styles.container}>
      <SafeAreaView style={layout.flex} edges={["top"]}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.greeting}>
              <Typography variant="bodyLarge" style={styles.greetingLabel}>
                Bonjour
              </Typography>
              <Typography variant="bodyLarge" style={styles.greetingName}>
                {user?.username || "Utilisateur"} 👋
              </Typography>
            </View>
            <Logo size="sm" />
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statCard, styles.statCardPending]}>
              <Typography variant="h2" style={styles.statNumberPending}>
                {pendingTasks.length}
              </Typography>
              <Typography variant="caption" style={styles.statLabelPending}>
                En cours
              </Typography>
            </View>
            <View style={[styles.statCard, styles.statCardCompleted]}>
              <Typography variant="h2" style={styles.statNumberCompleted}>
                {completedTasks.length}
              </Typography>
              <Typography variant="caption" style={styles.statLabelCompleted}>
                Validées
              </Typography>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.tasksList}
          showsVerticalScrollIndicator={false}
        >
          {pendingTasks.length > 0 && (
            <View style={styles.section}>
              <Typography variant="label" style={styles.sectionTitle}>
                À FAIRE
              </Typography>
              {pendingTasks.map((task, index) => (
                <Animated.View
                  key={task.id}
                  entering={FadeInDown.delay(index * 100)}
                >
                  <TaskItem
                    task={task}
                    onPress={() => router.push(`/tasks/${task.id}`)}
                    onDelete={() => deleteTask(task.id)}
                    onValidate={() => router.push(`/validate/${task.id}`)}
                  />
                </Animated.View>
              ))}
            </View>
          )}

          {completedTasks.length > 0 && (
            <View style={styles.section}>
              <Typography variant="label" style={styles.sectionTitleMuted}>
                VALIDÉES
              </Typography>
              {completedTasks.map((task, index) => (
                <Animated.View
                  key={task.id}
                  entering={FadeInDown.delay(index * 100)}
                >
                  <TaskItem
                    task={task}
                    onPress={() => router.push(`/tasks/${task.id}`)}
                    onDelete={() => deleteTask(task.id)}
                    onValidate={() => {}}
                  />
                </Animated.View>
              ))}
            </View>
          )}

          {!isLoading && tasks.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="checkbox-outline" size={64} color="#e5e7eb" />
              <Typography variant="bodyLarge" style={styles.emptyTitle}>
                Aucune tâche pour le moment
              </Typography>
              <Typography variant="caption" style={styles.emptySubtitle}>
                Appuie sur + pour en ajouter une
              </Typography>
            </View>
          )}

          {isLoading && tasks.length === 0 && (
            <View style={styles.emptyState}>
              <Typography variant="bodyLarge" style={styles.emptyTitle}>
                Chargement...
              </Typography>
            </View>
          )}
        </ScrollView>

        <Pressable onPress={() => router.push("/modal")} style={styles.fab}>
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
