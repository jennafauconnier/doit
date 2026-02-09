import { useState } from "react";
import {
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Typography, Input, Button } from "@/components/ui";
import { useTasksStore } from "@/stores/tasks.store";

export default function ModalScreen() {
  const router = useRouter();
  const { createTask, isLoading } = useTasksStore();

  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    const value = title.trim();
    if (!value) return;

    setIsSubmitting(true);
    try {
      await createTask(value);
      setTitle("");
      router.back();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        {/* Header */}
        <View style={styles.header}>
          <Typography variant="h2" style={styles.title}>
            Nouvelle tâche
          </Typography>
          <Pressable onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </Pressable>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Titre"
            placeholder="Ex: Appeler le médecin"
            value={title}
            onChangeText={setTitle}
          />

          <View style={styles.buttonContainer}>
            <Button
              fullWidth
              onPress={handleCreate}
              isLoading={isSubmitting || isLoading}
              disabled={isSubmitting || isLoading || !title.trim()}
            >
              Ajouter
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    color: "#111827",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    marginTop: 24,
  },
});