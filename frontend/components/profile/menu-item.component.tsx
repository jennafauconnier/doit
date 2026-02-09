import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/components/ui";
import { colors } from "@/styles";
import { menuItemStyles as styles } from "@/app/(tabs)/profile.styles";

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  isLast?: boolean;
}

export function MenuItem({ icon, label, onPress, isLast = false }: MenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, !isLast && styles.border]}
    >
      <Ionicons name={icon} size={22} color={colors.gray[500]} />
      <Typography style={styles.label}>{label}</Typography>
      <Ionicons name="chevron-forward" size={20} color={colors.gray[300]} />
    </Pressable>
  );
}