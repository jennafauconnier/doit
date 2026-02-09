import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Input, Logo, Typography } from "@/components/ui";
import { authService } from "@/services/api/auth.service";
import { useAuthStore } from "@/stores/auth.store";

import { layout } from "@/styles";
import { styles } from "./login.styles";

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
    <View style={layout.container}>
      <SafeAreaView style={layout.flex} edges={["top", "bottom"]}>
        <View style={styles.logoContainer}>
          <Logo size="lg" />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={layout.flex}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              {/* Header */}
              <Animated.View
                entering={FadeInUp.delay(100).springify()}
                style={styles.headerSection}
              >
                <Typography variant="h1" style={styles.title}>
                  Bon retour 👋
                </Typography>
                <Typography variant="bodyLarge" style={styles.subtitle}>
                  Connectez-vous pour accéder à vos tâches
                </Typography>
              </Animated.View>

              {/* Form */}
              <Animated.View
                entering={FadeInDown.delay(200).springify()}
                style={styles.form}
              >
                <Input
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="votre@email.com"
                  leftIcon="email-outline"
                />

                <Input
                  label="Mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Entrez votre mot de passe"
                  secureTextEntry
                  leftIcon="lock-outline"
                />

                <Pressable style={styles.forgotPassword}>
                  <Typography variant="caption" style={styles.linkText}>
                    Mot de passe oublié ?
                  </Typography>
                </Pressable>

                {error ? (
                  <View style={styles.errorBox}>
                    <Typography variant="caption" style={styles.errorText}>
                      {error}
                    </Typography>
                  </View>
                ) : null}

                <Button
                  onPress={handleLogin}
                  isLoading={isLoading}
                  fullWidth
                >
                  Se connecter
                </Button>
              </Animated.View>
            </View>
          </ScrollView>

          {/* Footer */}
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            style={styles.footer}
          >
            <Typography style={styles.footerText}>
              Pas encore de compte ?{" "}
            </Typography>
            <Link href="/(auth)/signup" asChild>
              <Pressable>
                <Typography style={styles.footerLink}>S'inscrire</Typography>
              </Pressable>
            </Link>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
