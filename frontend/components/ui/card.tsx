import { View, type ViewProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv({
  base: "bg-white overflow-hidden",
  variants: {
    variant: {
      elevated: "shadow-md",
      outlined: "border border-gray-200",
      filled: "bg-gray-50",
    },
    rounded: {
      sm: "rounded-lg",
      md: "rounded-xl",
      lg: "rounded-2xl",
      xl: "rounded-3xl",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "elevated",
    rounded: "xl",
    padding: "md",
  },
});

type CardVariants = VariantProps<typeof cardVariants>;

interface CardProps extends ViewProps, CardVariants {
  children: React.ReactNode;
}

export function Card({
  children,
  variant,
  rounded,
  padding,
  className,
  ...props
}: CardProps) {
  return (
    <View
      className={cardVariants({ variant, rounded, padding, className })}
      {...props}
    >
      {children}
    </View>
  );
}