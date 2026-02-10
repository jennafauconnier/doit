import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import { useAuthStore } from "@/stores/auth.store";
import { Logo } from "@/components/ui";

import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, styles } from "./_layout.styles";
import { notificationService } from "@/services/notifications/notifications.service";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, isLoading, segments]);

  useEffect(() => {
    // Setup notification listeners
    const cleanup = notificationService.setupNotificationListeners(
      (notification) => {
        console.log('Notification reçue:', notification);
      },
      (response) => {
        console.log('Notification tapée:', response);
        // Naviguer vers la tâche si nécessaire
        const taskId = response.notification.request.content.data?.taskId;
        if (taskId) {
          // router.push(`/validate/${taskId}`);
        }
      }
    );
  
    return cleanup;
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Logo size="lg" />
        <ActivityIndicator
          size="large"
          color="#d946ef"
          style={styles.loader}
        />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <ThemeProvider value={DefaultTheme}>
          <AuthGate>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="validate/[id]"
                options={{ presentation: "formSheet" }}
              />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack>
          </AuthGate>
          <StatusBar style="dark" />
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

