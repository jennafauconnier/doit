import { View, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Typography, Button, Card } from "@/components/ui";
import { useAuthStore } from "@/stores/auth.store";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Déconnexion",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/(auth)/login");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flex} edges={["top"]}>
        <View style={styles.content}>
          <Typography variant="h2" style={styles.pageTitle}>
            Mon profil
          </Typography>

          {/* User Info Card */}
          <Card variant="outlined" padding="lg" style={styles.userCard}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color="#d946ef" />
              </View>
              <Typography variant="h3" style={styles.username}>
                {user?.username}
              </Typography>
              <Typography variant="caption" style={styles.email}>
                {user?.email}
              </Typography>
            </View>
          </Card>

          {/* Settings */}
          <Card variant="outlined" padding="none" style={styles.settingsCard}>
            <MenuItem
              icon="notifications-outline"
              label="Notifications"
              onPress={() => {}}
            />
            <MenuItem
              icon="moon-outline"
              label="Thème sombre"
              onPress={() => {}}
            />
            <MenuItem
              icon="help-circle-outline"
              label="Aide"
              onPress={() => {}}
              isLast
            />
          </Card>

          {/* Logout */}
          <Button variant="outline" fullWidth onPress={handleLogout}>
            Se déconnecter
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

function MenuItem({
  icon,
  label,
  onPress,
  isLast = false,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  isLast?: boolean;
}) {
  return (
    <View
      style={[styles.menuItem, !isLast && styles.menuItemBorder]}
      onTouchEnd={onPress}
    >
      <Ionicons name={icon as any} size={22} color="#6b7280" />
      <Typography style={styles.menuLabel}>{label}</Typography>
      <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
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
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  pageTitle: {
    color: "#111827",
    marginBottom: 24,
  },
  userCard: {
    marginBottom: 24,
  },
  userInfo: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: "#FDF4FF",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  username: {
    color: "#111827",
  },
  email: {
    color: "#6B7280",
  },
  settingsCard: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuLabel: {
    flex: 1,
    marginLeft: 12,
    color: "#374151",
  },
});