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

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { tasks, isLoading, fetchTasks, toggleTask, deleteTask } =
    useTasksStore();

  useEffect(() => {
    fetchTasks().catch(() => {});
  }, [fetchTasks]);

  const pendingTasks = tasks.filter((t) => !t.validatedAt);
  const completedTasks = tasks.filter((t) => !!t.validatedAt);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex} edges={["top"]}>
        {/* Header */}
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

          {/* Stats */}
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

        {/* Tasks List */}
        <ScrollView
          style={styles.tasksList}
          showsVerticalScrollIndicator={false}
        >
          {/* Pending Tasks */}
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
                    onToggle={() => toggleTask(task)}
                    onDelete={() => deleteTask(task.id)}
                    onValidate={() => router.push(`/validate/${task.id}`)}
                  />
                </Animated.View>
              ))}
            </View>
          )}

          {/* Completed Tasks */}
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
                    onToggle={() => toggleTask(task)}
                    onDelete={() => deleteTask(task.id)}
                    onValidate={() => {}}
                  />
                </Animated.View>
              ))}
            </View>
          )}

          {/* Empty State */}
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

        {/* FAB */}
        <Pressable onPress={() => router.push("/modal")} style={styles.fab}>
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  greetingLabel: {
    color: "#6B7280",
  },
  greetingName: {
    color: "#111827",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  statCardPending: {
    backgroundColor: "#FDF4FF",
  },
  statCardCompleted: {
    backgroundColor: "#F0FDF4",
  },
  statNumberPending: {
    color: "#C026D3",
  },
  statLabelPending: {
    color: "#C026D3",
    opacity: 0.7,
  },
  statNumberCompleted: {
    color: "#16A34A",
  },
  statLabelCompleted: {
    color: "#16A34A",
    opacity: 0.7,
  },
  tasksList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#6B7280",
    marginBottom: 12,
  },
  sectionTitleMuted: {
    color: "#9CA3AF",
    marginBottom: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    color: "#9CA3AF",
    marginTop: 16,
  },
  emptySubtitle: {
    color: "#9CA3AF",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: "#D946EF",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#d946ef",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});