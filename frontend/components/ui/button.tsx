import { StyleSheet } from "react-native";
import { Button as PaperButton, ActivityIndicator } from "react-native-paper";

type ButtonVariant = "solid" | "outline" | "ghost" | "soft";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const modeMap: Record<ButtonVariant, "contained" | "outlined" | "text" | "contained-tonal"> = {
  solid: "contained",
  outline: "outlined",
  ghost: "text",
  soft: "contained-tonal",
};

const sizeStyles: Record<ButtonSize, { height: number; fontSize: number }> = {
  sm: { height: 40, fontSize: 14 },
  md: { height: 48, fontSize: 16 },
  lg: { height: 56, fontSize: 16 },
  xl: { height: 64, fontSize: 18 },
};

export function Button({
  children,
  variant = "solid",
  size = "lg",
  fullWidth,
  disabled,
  isLoading,
  onPress,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const sizeStyle = sizeStyles[size];

  return (
    <PaperButton
      mode={modeMap[variant]}
      onPress={onPress}
      disabled={disabled || isLoading}
      loading={isLoading}
      icon={leftIcon ? () => leftIcon : undefined}
      contentStyle={[
        styles.content,
        { height: sizeStyle.height },
        fullWidth && styles.fullWidth,
      ]}
      labelStyle={{ fontSize: sizeStyle.fontSize, fontWeight: "600" }}
      style={[styles.button, fullWidth && styles.fullWidth]}
    >
      {children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
  },
  content: {
    paddingHorizontal: 8,
  },
  fullWidth: {
    width: "100%",
  },
});