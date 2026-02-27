import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#1F2937",
  },
  deleteButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  label: {
    color: "#6B7280",
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusValidated: {
    backgroundColor: "#F0FDF4",
  },
  statusPending: {
    backgroundColor: "#FDF4FF",
  },
  statusText: {
    fontWeight: "600",
  },
  statusTextValidated: {
    color: "#16A34A",
  },
  statusTextPending: {
    color: "#D946EF",
  },
  title: {
    color: "#1F2937",
  },
  description: {
    color: "#4B5563",
    lineHeight: 24,
  },
  date: {
    color: "#4B5563",
  },
  proofImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
  },
});
