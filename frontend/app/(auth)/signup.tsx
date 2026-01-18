import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Input, Typography, IconButton, Logo } from "@/components/ui";
import { authService } from "@/services/api/auth.service";
import { useAuthStore } from "@/stores/auth.store";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authService.signup({
        username,
        email,
        password,
      });

      useAuthStore.getState().setAuth(response.user, response.token);
      router.replace("/(tabs)");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de l'inscription"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        {/* Header Row: Back + Logo centered */}
        <Animated.View
          entering={FadeInUp.delay(50).springify()}
          className="flex-row items-center justify-between px-4 py-2"
        >
          {/* Back Button */}
          <Link href="/(auth)/login" asChild>
            <IconButton
              variant="ghost"
              size="md"
              icon={<Ionicons name="arrow-back" size={24} color="#111" />}
            />
          </Link>

          {/* Logo centered */}
          <Logo size="md" />

          {/* Empty space for balance */}
          <View className="w-11" />
        </Animated.View>

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
                className="mt-4 mb-8"
              >
                <Typography variant="h1" className="text-gray-900 mb-2">
                  Créer un compte ✨
                </Typography>
                <Typography variant="bodyLarge" className="text-gray-500">
                  Rejoignez-nous et organisez votre vie
                </Typography>
              </Animated.View>

              {/* Form */}
              <Animated.View
                entering={FadeInDown.delay(200).springify()}
                className="gap-4"
              >
                <Input
                  label="Nom d'utilisateur"
                  value={username}
                  onChangeText={setUsername}
                  placeholder="johndoe"
                  autoCapitalize="none"
                  autoComplete="username"
                  leftIcon={
                    <Ionicons name="person-outline" size={20} color="#9ca3af" />
                  }
                />

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
                  placeholder="Minimum 8 caractères"
                  secureTextEntry
                  autoComplete="new-password"
                  helperText="Doit contenir au moins 8 caractères"
                  leftIcon={
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#9ca3af"
                    />
                  }
                />

                <Input
                  label="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirmez votre mot de passe"
                  secureTextEntry
                  autoComplete="new-password"
                  leftIcon={
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={20}
                      color="#9ca3af"
                    />
                  }
                />

                {error ? (
                  <View className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <Typography variant="caption" className="text-red-600">
                      {error}
                    </Typography>
                  </View>
                ) : null}

                <Typography
                  variant="caption"
                  className="text-gray-400 text-center"
                >
                  En créant un compte, vous acceptez nos{" "}
                  <Typography variant="caption" className="text-blue-600">
                    Conditions d'utilisation
                  </Typography>{" "}
                  et notre{" "}
                  <Typography variant="caption" className="text-blue-600">
                    Politique de confidentialité
                  </Typography>
                </Typography>

                <Button
                  onPress={handleSignup}
                  isLoading={isLoading}
                  fullWidth
                  rightIcon={
                    <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  }
                >
                  Créer mon compte
                </Button>
              </Animated.View>
            </View>
          </ScrollView>

          {/* Footer */}
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            className="flex-row justify-center py-6"
          >
            <Typography className="text-gray-500">Déjà un compte ? </Typography>
            <Link href="/(auth)/login" asChild>
              <Pressable>
                <Typography className="text-blue-600 font-semibold">
                  Se connecter
                </Typography>
              </Pressable>
            </Link>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
