/**
 * Design Tokens - Source de vérité pour tout le styling
 */

export const colors = {
  // Primary palette
  primary: "#171717",
  primaryLight: "#374151",
  
  // Accent
  fuchsia: {
    50: "#FDF4FF",
    100: "#FAE8FF",
    500: "#D946EF",
    600: "#C026D3",
  },
  
  // Semantic
  success: {
    50: "#F0FDF4",
    500: "#22C55E",
    600: "#16A34A",
  },
  error: {
    50: "#FEF2F2",
    200: "#FECACA",
    500: "#EF4444",
    600: "#DC2626",
  },
  warning: {
    500: "#F59E0B",
  },
  info: {
    500: "#3B82F6",
    600: "#2563EB",
  },
  
  // Neutrals
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  
  // Backgrounds
  background: "#FFFFFF",
  surface: "#F6F6F6",
  
  // Text shortcuts
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    muted: "#9CA3AF",
    inverse: "#FFFFFF",
    link: "#2563EB",
  },
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

export const borderRadius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  full: 9999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
} as const;

export const fontWeight = {
  normal: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  black: "900" as const,
};

export const shadow = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  fuchsia: {
    shadowColor: "#d946ef",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
};