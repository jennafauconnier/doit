import { View, Alert } from "react-native";
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
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <View className="px-6 pt-4">
          <Typography variant="h2" className="text-gray-900 mb-6">
            Mon profil
          </Typography>

          {/* User Info Card */}
          <Card variant="outlined" padding="lg" className="mb-6">
            <View className="items-center">
              <View className="w-20 h-20 bg-fuchsia-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="person" size={40} color="#d946ef" />
              </View>
              <Typography variant="h3" className="text-gray-900">
                {user?.username}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                {user?.email}
              </Typography>
            </View>
          </Card>

          {/* Settings */}
          <Card variant="outlined" padding="none" className="mb-6">
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
      className={`flex-row items-center px-4 py-4 ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
      onTouchEnd={onPress}
    >
      <Ionicons name={icon as any} size={22} color="#6b7280" />
      <Typography className="flex-1 ml-3 text-gray-700">{label}</Typography>
      <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
    </View>
  );
}