import { useEffect } from "react";
import { View, ScrollView, Pressable, Image, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Typography, Button } from "@/components/ui";
import { useTasksStore } from "@/stores/tasks.store";
import { layout } from "@/styles";
import { styles } from "./[id].styles";

export default function TaskDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, fetchTasks, deleteTask } = useTasksStore();

  const task = tasks.find((t) => t.id === id);

  useEffect(() => {
    if (!task) {
      fetchTasks().catch(() => {});
    }
  }, [task, fetchTasks]);

  if (!task) {
    return (
      <SafeAreaView style={layout.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </Pressable>
          <Typography variant="h2" style={styles.headerTitle}>
            Tâche introuvable
          </Typography>
        </View>
      </SafeAreaView>
    );
  }

  const isValidated = !!task.validatedAt;

  const handleDelete = async () => {
    await deleteTask(task.id);
    router.back();
  };

  const handleValidate = () => {
    router.push(`/validate/${task.id}`);
  };

  return (
    <SafeAreaView style={layout.container} edges={["top"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </Pressable>
        <Typography variant="h2" style={styles.headerTitle}>
          Détails de la tâche
        </Typography>
        <Pressable onPress={handleDelete} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Typography variant="label" style={styles.label}>
            STATUT
          </Typography>
          <View
            style={[
              styles.statusBadge,
              isValidated ? styles.statusValidated : styles.statusPending,
            ]}
          >
            <Ionicons
              name={isValidated ? "checkmark-circle" : "time-outline"}
              size={20}
              color={isValidated ? "#16A34A" : "#D946EF"}
            />
            <Typography
              variant="bodyLarge"
              style={[
                styles.statusText,
                isValidated
                  ? styles.statusTextValidated
                  : styles.statusTextPending,
              ]}
            >
              {isValidated ? "Validée" : "En cours"}
            </Typography>
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="label" style={styles.label}>
            TITRE
          </Typography>
          <Typography variant="h3" style={styles.title}>
            {task.title}
          </Typography>
        </View>

        {task.description && (
          <View style={styles.section}>
            <Typography variant="label" style={styles.label}>
              DESCRIPTION
            </Typography>
            <Typography variant="bodyLarge" style={styles.description}>
              {task.description}
            </Typography>
          </View>
        )}

        <View style={styles.section}>
          <Typography variant="label" style={styles.label}>
            CRÉÉE LE
          </Typography>
          <Typography variant="bodyLarge" style={styles.date}>
            {new Date(task.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </View>

        {isValidated && task.validatedAt && (
          <View style={styles.section}>
            <Typography variant="label" style={styles.label}>
              VALIDÉE LE
            </Typography>
            <Typography variant="bodyLarge" style={styles.date}>
              {new Date(task.validatedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </View>
        )}

        {isValidated && task.proofPhoto && (
          <View style={styles.section}>
            <Typography variant="label" style={styles.label}>
              PHOTO DE PREUVE
            </Typography>
            <Image
              source={{ uri: task.proofPhoto }}
              style={styles.proofImage}
              resizeMode="cover"
            />
          </View>
        )}

        {!isValidated && (
          <View style={styles.section}>
            <Button
              fullWidth
              onPress={handleValidate}
              icon={<Ionicons name="camera-outline" size={20} color="#fff" />}
            >
              Valider avec une photo
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
