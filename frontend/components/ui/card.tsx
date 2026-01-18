import { View, type ViewProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv({
  base: "bg-background-0 overflow-hidden",
  variants: {
    variant: {
      elevated: "shadow-soft-2",
      outlined: "border border-outline-100",
      filled: "bg-background-50",
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
