import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Animated, { FadeIn } from "react-native-reanimated";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { fontSize: 24, dotSize: 6 },
  md: { fontSize: 30, dotSize: 8 },
  lg: { fontSize: 36, dotSize: 10 },
};

export function Logo({ size = "md" }: LogoProps) {
  const theme = useTheme();
  const { fontSize, dotSize } = sizes[size];

  return (
    <Animated.View entering={FadeIn.duration(600)} style={styles.container}>
      <Text style={[styles.text, { fontSize, color: theme.colors.onBackground }]}>
        DO
      </Text>
      <View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            backgroundColor: "#D946EF", // fuchsia-500
          },
        ]}
      />
      <Text style={[styles.text, { fontSize, color: theme.colors.onBackground }]}>
        IT
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "900",
    letterSpacing: -1,
  },
  dot: {
    borderRadius: 100,
    marginHorizontal: 6,
  },
});