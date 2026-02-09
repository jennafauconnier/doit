import { StyleSheet, View } from "react-native";
import { Divider as PaperDivider, Text } from "react-native-paper";

type DividerSpacing = "sm" | "md" | "lg";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  spacing?: DividerSpacing;
  label?: string;
}

const spacingMap: Record<DividerSpacing, number> = {
  sm: 8,
  md: 16,
  lg: 24,
};

export function Divider({ 
  orientation = "horizontal", 
  spacing = "md", 
  label 
}: DividerProps) {
  const margin = spacingMap[spacing];

  if (label) {
    return (
      <View style={[styles.labelContainer, { marginVertical: margin }]}>
        <PaperDivider style={styles.flex} />
        <Text variant="bodySmall" style={styles.label}>
          {label}
        </Text>
        <PaperDivider style={styles.flex} />
      </View>
    );
  }

  if (orientation === "vertical") {
    return (
      <View style={[styles.vertical, { marginHorizontal: margin }]} />
    );
  }

  return <PaperDivider style={{ marginVertical: margin }} />;
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex: {
    flex: 1,
  },
  label: {
    paddingHorizontal: 16,
    opacity: 0.6,
  },
  vertical: {
    width: 1,
    height: "100%",
    backgroundColor: "#E5E5E5",
  },
});