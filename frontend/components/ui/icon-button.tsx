import { StyleSheet } from "react-native";
import { IconButton as PaperIconButton } from "react-native-paper";

type IconButtonVariant = "solid" | "outline" | "ghost" | "soft";
type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps {
  icon: string; // Paper utilise des noms d'icônes Material
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
}

const modeMap: Record<IconButtonVariant, "contained" | "outlined" | "contained-tonal" | undefined> = {
  solid: "contained",
  outline: "outlined",
  ghost: undefined,
  soft: "contained-tonal",
};

const sizeMap: Record<IconButtonSize, number> = {
  sm: 36,
  md: 44,
  lg: 56,
};

const iconSizeMap: Record<IconButtonSize, number> = {
  sm: 20,
  md: 24,
  lg: 28,
};

export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  disabled,
  isLoading,
  onPress,
}: IconButtonProps) {
  return (
    <PaperIconButton
      icon={isLoading ? "loading" : icon}
      mode={modeMap[variant]}
      size={iconSizeMap[size]}
      disabled={disabled || isLoading}
      onPress={onPress}
      style={{ width: sizeMap[size], height: sizeMap[size] }}
    />
  );
}