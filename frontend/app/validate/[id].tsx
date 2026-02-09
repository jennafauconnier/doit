import { useState } from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { Typography, Button } from "@/components/ui";
import { useTasksStore } from "@/stores/tasks.store";
import { layout } from "@/styles";
import { styles } from "./[id].styles";


export default function ValidateScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, validateTask, isLoading } = useTasksStore();

  const task = tasks.find((t) => t.id === id);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleValidate = async () => {
    if (!photoUri || !id) return;

    setIsSubmitting(true);
    try {
      await validateTask(id, photoUri);
      router.back();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!task) {
    return (
      <SafeAreaView style={layout.flex}>
        <Typography>Tâche introuvable</Typography>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={layout.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Typography variant="h2" style={styles.headerTitle}>
          Valider la tâche
        </Typography>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#6b7280" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Typography variant="bodyLarge" style={styles.taskTitle}>
          {task.title}
        </Typography>

        {/* Photo Preview */}
        {photoUri ? (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: photoUri }}
              style={styles.previewImage}
              resizeMode="cover"
            />
            <Pressable
              onPress={() => setPhotoUri(null)}
              style={styles.removeButton}
            >
              <Ionicons name="close" size={20} color="#fff" />
            </Pressable>
          </View>
        ) : (
          <View style={styles.optionsRow}>
            <Pressable onPress={takePhoto} style={styles.optionCard}>
              <Ionicons name="camera-outline" size={32} color="#6b7280" />
              <Typography variant="caption" style={styles.optionLabel}>
                Prendre une photo
              </Typography>
            </Pressable>
            <Pressable onPress={pickImage} style={styles.optionCard}>
              <Ionicons name="images-outline" size={32} color="#6b7280" />
              <Typography variant="caption" style={styles.optionLabel}>
                Galerie
              </Typography>
            </Pressable>
          </View>
        )}

        <Button
          fullWidth
          onPress={handleValidate}
          isLoading={isSubmitting || isLoading}
          disabled={!photoUri || isSubmitting || isLoading}
        >
          Valider avec cette photo
        </Button>
      </View>
    </SafeAreaView>
  );
}

