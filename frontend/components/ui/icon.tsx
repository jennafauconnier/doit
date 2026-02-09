import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { type ComponentProps } from "react";

type IoniconsName = ComponentProps<typeof Ionicons>["name"];
type MaterialName = ComponentProps<typeof MaterialCommunityIcons>["name"];

interface IconProps {
  name: IoniconsName;
  size?: number;
  color?: string;
}

export function Icon({ name, size = 24, color }: IconProps) {
  const theme = useTheme();
  
  return (
    <Ionicons 
      name={name} 
      size={size} 
      color={color ?? theme.colors.onSurface} 
    />
  );
}

export function createIcon(name: IoniconsName, size?: number) {
  return ({ color }: { color: string }) => (
    <Ionicons name={name} size={size ?? 24} color={color} />
  );
}