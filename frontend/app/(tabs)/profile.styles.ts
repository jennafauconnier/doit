import { StyleSheet } from "react-native";
import { colors, spacing, borderRadius } from "@/styles";

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[4],
  },
  pageTitle: {
    marginBottom: spacing[6],
  },
  userCard: {
    marginBottom: spacing[6],
  },
  userInfo: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: colors.fuchsia[50],
    borderRadius: borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[4],
  },
  settingsCard: {
    marginBottom: spacing[6],
  },
});

export const menuItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  label: {
    flex: 1,
    marginLeft: spacing[3],
    color: colors.gray[700],
  },
});