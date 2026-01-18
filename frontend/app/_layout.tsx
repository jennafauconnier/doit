import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useAuthStore } from "@/stores/auth.store";
import { Logo } from "@/components/ui";
import "@/global.css";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading, hydrate } = useAuthStore();

  // Hydrate au lancement
  useEffect(() => {
    hydrate();
  }, []);

  // Redirection automatique
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && inAuthGroup) {
      // Connecté mais sur page auth -> aller aux tabs
      router.replace("/(tabs)");
    } else if (!isAuthenticated && !inAuthGroup) {
      // Non connecté et pas sur auth -> aller au login
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, isLoading, segments]);

  // Écran de chargement
  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Logo size="lg" />
        <ActivityIndicator size="large" color="#d946ef" style={{ marginTop: 24 }} />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        <ThemeProvider value={DefaultTheme}>
          <AuthGate>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack>
          </AuthGate>
          <StatusBar style="dark" />
        </ThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}