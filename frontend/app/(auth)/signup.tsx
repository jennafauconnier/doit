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

import { Button, Input, Typography, Logo } from "@/components/ui";
import { IconButton } from "react-native-paper";
import { authService } from "@/services/api/auth.service";
import { useAuthStore } from "@/stores/auth.store";

import { layout } from "@/styles";
import { styles } from "./signup.styles";

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
    <View style={styles.container}>
      <SafeAreaView style={layout.flex} edges={["top", "bottom"]}>
        {/* Header Row */}
        <Animated.View
          entering={FadeInUp.delay(50).springify()}
          style={styles.header}
        >
          <Link href="/(auth)/login" asChild>
            <IconButton
              icon={({ color }) => (
                <Ionicons name="arrow-back" size={24} color="#111" />
              )}
              onPress={() => {}}
            />
          </Link>
          <Logo size="md" />
          <View style={styles.headerSpacer} />
        </Animated.View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.flex}
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
                style={styles.titleSection}
              >
                <Typography variant="h1" style={styles.title}>
                  Créer un compte ✨
                </Typography>
                <Typography variant="bodyLarge" style={styles.subtitle}>
                  Rejoignez-nous et organisez votre vie
                </Typography>
              </Animated.View>

              {/* Form */}
              <Animated.View
                entering={FadeInDown.delay(200).springify()}
                style={styles.form}
              >
                <Input
                  label="Nom d'utilisateur"
                  value={username}
                  onChangeText={setUsername}
                  placeholder="johndoe"
                  leftIcon="account-outline"
                />

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
                  placeholder="Minimum 8 caractères"
                  secureTextEntry
                  helperText="Doit contenir au moins 8 caractères"
                  leftIcon="lock-outline"
                />

                <Input
                  label="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirmez votre mot de passe"
                  secureTextEntry
                  leftIcon="shield-check-outline"
                />

                {error ? (
                  <View style={styles.errorBox}>
                    <Typography variant="caption" style={styles.errorText}>
                      {error}
                    </Typography>
                  </View>
                ) : null}

                <Typography variant="caption" style={styles.termsText}>
                  En créant un compte, vous acceptez nos{" "}
                  <Typography variant="caption" style={styles.linkText}>
                    Conditions d'utilisation
                  </Typography>{" "}
                  et notre{" "}
                  <Typography variant="caption" style={styles.linkText}>
                    Politique de confidentialité
                  </Typography>
                </Typography>

                <Button onPress={handleSignup} isLoading={isLoading} fullWidth>
                  Créer mon compte
                </Button>
              </Animated.View>
            </View>
          </ScrollView>

          {/* Footer */}
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            style={styles.footer}
          >
            <Typography style={styles.footerText}>Déjà un compte ? </Typography>
            <Link href="/(auth)/login" asChild>
              <Pressable>
                <Typography style={styles.footerLink}>Se connecter</Typography>
              </Pressable>
            </Link>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}