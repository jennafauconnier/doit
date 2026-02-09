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
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Input, Typography, Logo } from "@/components/ui";
import { IconButton } from "react-native-paper";
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
    <View style={styles.container}>
      <SafeAreaView style={styles.flex} edges={["top", "bottom"]}>
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
                  autoCapitalize="none"
                  leftIcon="account-outline"
                />

                <Input
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="votre@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 24,
  },
  titleSection: {
    marginTop: 16,
    marginBottom: 32,
  },
  title: {
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
  },
  form: {
    gap: 16,
  },
  errorBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    padding: 16,
  },
  errorText: {
    color: "#DC2626",
  },
  termsText: {
    color: "#9CA3AF",
    textAlign: "center",
  },
  linkText: {
    color: "#2563EB",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 24,
  },
  footerText: {
    color: "#6B7280",
  },
  footerLink: {
    color: "#2563EB",
    fontWeight: "600",
  },
});