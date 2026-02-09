import { StyleSheet, type ViewStyle } from "react-native";
import { Card as PaperCard, Surface } from "react-native-paper";

type CardVariant = "elevated" | "outlined" | "filled";
type CardRounded = "sm" | "md" | "lg" | "xl";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  rounded?: CardRounded;
  padding?: CardPadding;
  style?: ViewStyle;
}

const modeMap: Record<CardVariant, "elevated" | "outlined" | "contained"> = {
  elevated: "elevated",
  outlined: "outlined",
  filled: "contained",
};

const radiusMap: Record<CardRounded, number> = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

const paddingMap: Record<CardPadding, number> = {
  none: 0,
  sm: 12,
  md: 16,
  lg: 24,
};

export function Card({
  children,
  variant = "elevated",
  rounded = "lg",
  padding = "md",
  style,
}: CardProps) {
  return (
    <PaperCard
      mode={modeMap[variant]}
      style={[
        { borderRadius: radiusMap[rounded] },
        style,
      ]}
      contentStyle={{ padding: paddingMap[padding] }}
    >
      <PaperCard.Content>
        {children}
      </PaperCard.Content>
    </PaperCard>
  );
}