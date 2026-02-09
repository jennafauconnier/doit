import { StyleSheet } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#171717",
    secondary: "#737373",
    background: "#FFFFFF",
    surface: "#F6F6F6",
    error: "#DC2626",
    onPrimary: "#FFFFFF",
    onBackground: "#171717",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#FAFAFA",
    secondary: "#A3A3A3",
    background: "#121212",
    surface: "#262626",
    error: "#EF4444",
    onPrimary: "#171717",
    onBackground: "#FEFEFE",
  },
};

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    marginTop: 24,
  },
});