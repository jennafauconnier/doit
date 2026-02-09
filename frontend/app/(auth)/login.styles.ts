import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius } from "@/styles";

export const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginVertical: spacing[6],
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: spacing[6],
  },
  headerSection: {
    marginBottom: spacing[10],
  },
  subtitle: {
    color: colors.text.secondary,
  },
  form: {
    gap: spacing[5],
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: spacing[6],
  },
  footerText: {
    color: colors.text.secondary,
  },
  footerLink: {
    color: colors.text.link,
    fontWeight: "600",
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
  linkText: {
    color: "#2563EB",
  },
  title: {
    color: "#111827",
  },
});