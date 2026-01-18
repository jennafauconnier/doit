import { View, Text } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

const dividerVariants = tv({
  base: "bg-outline-100",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
    spacing: {
      sm: "my-2",
      md: "my-4",
      lg: "my-6",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    spacing: "md",
  },
});

type DividerVariants = VariantProps<typeof dividerVariants>;

interface DividerProps extends DividerVariants {
  label?: string;
}

export function Divider({ orientation, spacing, label }: DividerProps) {
  if (label) {
    return (
      <View
        className={`flex-row items-center ${
          spacing === "sm" ? "my-2" : spacing === "lg" ? "my-6" : "my-4"
        }`}
      >
        <View className="flex-1 h-px bg-outline-100" />
        <Text className="px-4 text-sm text-typography-400">{label}</Text>
        <View className="flex-1 h-px bg-outline-100" />
      </View>
    );
  }

  return <View className={dividerVariants({ orientation, spacing })} />;
}
