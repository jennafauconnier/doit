import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Input, Logo, Typography } from "@/components/ui";
import { authService } from "@/services/api/auth.service";
import { useAuthStore } from "@/stores/auth.store";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authService.login({ email, password });
      await useAuthStore.getState().setAuth(response.user, response.token);
      router.replace("/(tabs)");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        <View className="items-center my-6">
          <Logo size="lg" />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          {/* Centered Content */}
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="px-6">
              {/* Header */}
              <Animated.View
                entering={FadeInUp.delay(100).springify()}
                className="mb-10"
              >
                <Typography variant="h1" className="text-gray-900 mb-2">
                  Bon retour 👋
                </Typography>
                <Typography variant="bodyLarge" className="text-gray-500">
                  Connectez-vous pour accéder à vos tâches
                </Typography>
              </Animated.View>

              {/* Form */}
              <Animated.View
                entering={FadeInDown.delay(200).springify()}
                className="gap-5"
              >
                <Input
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="votre@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  leftIcon={
                    <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                  }
                />

                <Input
                  label="Mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Entrez votre mot de passe"
                  secureTextEntry
                  autoComplete="password"
                  leftIcon={
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#9ca3af"
                    />
                  }
                />

                <Pressable className="self-end">
                  <Typography variant="caption" className="text-blue-600">
                    Mot de passe oublié ?
                  </Typography>
                </Pressable>

                {error ? (
                  <View className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <Typography variant="caption" className="text-red-600">
                      {error}
                    </Typography>
                  </View>
                ) : null}

                <Button
                  onPress={handleLogin}
                  isLoading={isLoading}
                  fullWidth
                  rightIcon={
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                  }
                >
                  Se connecter
                </Button>
              </Animated.View>
            </View>
          </ScrollView>

          {/* Footer */}
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            className="flex-row justify-center py-6"
          >
            <Typography className="text-gray-500">
              Pas encore de compte ?{" "}
            </Typography>
            <Link href="/(auth)/signup" asChild>
              <Pressable>
                <Typography className="text-blue-600 font-semibold">
                  S'inscrire
                </Typography>
              </Pressable>
            </Link>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
