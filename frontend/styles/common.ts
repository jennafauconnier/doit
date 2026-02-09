import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius, fontSize, fontWeight } from "./theme";

/**
 * Layout utilities
 */
export const layout = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  
  // Flex
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  
  // Common padding
  screenPadding: {
    paddingHorizontal: spacing[6],
  },
  section: {
    marginBottom: spacing[6],
  },
});

/**
 * Typography presets
 */
export const typography = StyleSheet.create({
  h1: {
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.bold,
    color: colors.text.primary,
  },
  h3: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
  },
  body: {
    fontSize: fontSize.base,
    color: colors.text.primary,
  },
  bodyLarge: {
    fontSize: fontSize.lg,
    color: colors.text.primary,
  },
  caption: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text.secondary,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  },
  link: {
    fontSize: fontSize.base,
    color: colors.text.link,
  },
  muted: {
    color: colors.text.muted,
  },
});

/**
 * Form elements
 */
export const forms = StyleSheet.create({
  inputContainer: {
    gap: spacing[5],
  },
  errorBox: {
    backgroundColor: colors.error[50],
    borderWidth: 1,
    borderColor: colors.error[200],
    borderRadius: borderRadius.lg,
    padding: spacing[4],
  },
  errorText: {
    color: colors.error[600],
    fontSize: fontSize.sm,
  },
});

/**
 * Cards & Surfaces
 */
export const surfaces = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
  },
  cardOutlined: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray[200],
    padding: spacing[4],
  },
});

/**
 * Buttons
 */
export const buttons = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: spacing[6],
    right: spacing[6],
    width: 56,
    height: 56,
    backgroundColor: colors.fuchsia[500],
    borderRadius: borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[100],
  },
});