import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

const textVariants = tv({
  base: "text-typography-900",
  variants: {
    variant: {
      h1: "text-4xl font-bold tracking-tight",
      h2: "text-3xl font-bold tracking-tight",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
      body: "text-base",
      bodyLarge: "text-lg",
      caption: "text-sm text-typography-500",
      label: "text-sm font-medium text-typography-700",
      link: "text-base text-info-500 underline",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    muted: {
      true: "text-typography-500",
    },
  },
  defaultVariants: {
    variant: "body",
    align: "left",
  },
});

type TextVariants = VariantProps<typeof textVariants>;

interface TextProps extends RNTextProps, TextVariants {
  children: React.ReactNode;
}

export function Typography({
  children,
  variant,
  align,
  muted,
  className,
  ...props
}: TextProps) {
  return (
    <RNText
      className={textVariants({ variant, align, muted, className })}
      {...props}
    >
      {children}
    </RNText>
  );
}
