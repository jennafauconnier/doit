import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 24,
  },
  titleSection: {
    marginTop: 16,
    marginBottom: 32,
  },
  title: {
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
  },
  form: {
    gap: 16,
  },
  errorBox: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    padding: 16,
  },
  errorText: {
    color: "#DC2626",
  },
  termsText: {
    color: "#9CA3AF",
    textAlign: "center",
  },
  linkText: {
    color: "#2563EB",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 24,
  },
  footerText: {
    color: "#6B7280",
  },
  footerLink: {
    color: "#2563EB",
    fontWeight: "600",
  },
});