import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

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

  return (
    <View className="flex-1 bg-white px-6 pt-10">
      <Typography variant="h2" className="text-gray-900 mb-4">
        Nouvelle tâche
      </Typography>

      <Input
        label="Titre"
        placeholder="Ex: Appeler le médecin"
        value={title}
        onChangeText={setTitle}
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
  );
}