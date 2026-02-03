import { useState } from "react";
import { View, Pressable, KeyboardAvoidingView, Platform } from "react-native";
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
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <Typography variant="h2" className="text-gray-900">
            Nouvelle tâche
          </Typography>
          <Pressable
            onPress={handleClose}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
          >
            <Ionicons name="close" size={24} color="#6b7280" />
          </Pressable>
        </View>

        {/* Form */}
        <View className="flex-1 px-6">
          <Input
            label="Titre"
            placeholder="Ex: Appeler le médecin"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          <View className="mt-6">
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