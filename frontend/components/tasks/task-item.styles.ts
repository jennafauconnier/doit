import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxValidated: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },
  checkboxCompleted: {
    backgroundColor: "#D946EF",
    borderColor: "#D946EF",
  },
  checkboxEmpty: {
    borderColor: "#D1D5DB",
  },
  content: {
    flex: 1,
  },
  title: {
    color: "#1F2937",
  },
  titleValidated: {
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  validatedLabel: {
    color: "#16A34A",
  },
});
