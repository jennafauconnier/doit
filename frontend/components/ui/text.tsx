import { Text as PaperText, type TextProps as PaperTextProps } from "react-native-paper";
import { StyleSheet, type TextStyle } from "react-native";

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "body" | "bodyLarge" | "caption" | "label" | "link";
type TextAlign = "left" | "center" | "right";

// Mapping vers les variants de Paper
const variantMap: Record<TypographyVariant, PaperTextProps["variant"]> = {
  h1: "displaySmall",
  h2: "headlineLarge",
  h3: "headlineMedium",
  h4: "headlineSmall",
  body: "bodyLarge",
  bodyLarge: "bodyLarge",
  caption: "bodySmall",
  label: "labelLarge",
  link: "bodyLarge",
};

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  align?: TextAlign;
  muted?: boolean;
  style?: TextStyle;
}

export function Typography({
  children,
  variant = "body",
  align = "left",
  muted,
  style,
}: TypographyProps) {
  return (
    <PaperText
      variant={variantMap[variant]}
      style={[
        { textAlign: align },
        muted && styles.muted,
        variant === "link" && styles.link,
        style,
      ]}
    >
      {children}
    </PaperText>
  );
}

const styles = StyleSheet.create({
  muted: {
    opacity: 0.6,
  },
  link: {
    color: "#0EA5E9",
    textDecorationLine: "underline",
  },
});