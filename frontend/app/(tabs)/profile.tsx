import { View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Typography, Button, Card } from "@/components/ui";
import { MenuItem } from "@/components/profile/menu-item.component";
import { useAuthStore } from "@/stores/auth.store";

import { layout, colors } from "@/styles";
import { styles } from "./profile.styles";

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
    <View style={layout.container}>
      <SafeAreaView style={layout.flex} edges={["top"]}>
        <View style={styles.content}>
          <Typography variant="h2" style={styles.pageTitle}>
            Mon profil
          </Typography>

          <Card variant="outlined" padding="lg" style={styles.userCard}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color={colors.fuchsia[500]} />
              </View>
              <Typography variant="h3">{user?.username}</Typography>
              <Typography variant="caption">{user?.email}</Typography>
            </View>
          </Card>

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