import { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { Typography, Button } from '@/components/ui';
import { useTasksStore } from '@/stores/tasks.store';

export default function ValidateScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, validateTask, isLoading } = useTasksStore();

  const task = tasks.find((t) => t.id === id);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Typography>Tâche introuvable</Typography>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Typography variant="h2" className="text-gray-900 flex-1">
          Valider la tâche
        </Typography>
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
        >
          <Ionicons name="close" size={24} color="#6b7280" />
        </Pressable>
      </View>

      <View className="flex-1 px-6">
        <Typography variant="bodyLarge" className="text-gray-700 mb-6">
          {task.title}
        </Typography>

        {/* Photo Preview */}
        {photoUri ? (
          <View className="mb-6">
            <Image
              source={{ uri: photoUri }}
              className="w-full h-64 rounded-2xl"
              resizeMode="cover"
            />
            <Pressable
              onPress={() => setPhotoUri(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full items-center justify-center"
            >
              <Ionicons name="close" size={20} color="#fff" />
            </Pressable>
          </View>
        ) : (
          <View className="flex-row gap-3 mb-6">
            <Pressable
              onPress={takePhoto}
              className="flex-1 h-32 bg-gray-100 rounded-2xl items-center justify-center"
            >
              <Ionicons name="camera-outline" size={32} color="#6b7280" />
              <Typography variant="caption" className="text-gray-500 mt-2">
                Prendre une photo
              </Typography>
            </Pressable>
            <Pressable
              onPress={pickImage}
              className="flex-1 h-32 bg-gray-100 rounded-2xl items-center justify-center"
            >
              <Ionicons name="images-outline" size={32} color="#6b7280" />
              <Typography variant="caption" className="text-gray-500 mt-2">
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