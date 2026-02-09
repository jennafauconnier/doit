import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    color: "#111827",
    flex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  taskTitle: {
    color: "#374151",
    marginBottom: 24,
  },
  previewContainer: {
    marginBottom: 24,
  },
  previewImage: {
    width: "100%",
    height: 256,
    borderRadius: 16,
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  optionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  optionCard: {
    flex: 1,
    height: 128,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLabel: {
    color: "#6B7280",
    marginTop: 8,
  },
});