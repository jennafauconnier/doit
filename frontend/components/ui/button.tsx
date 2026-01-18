import { Pressable, Text, ActivityIndicator, View } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const buttonVariants = tv({
  base: "flex-row items-center justify-center rounded-2xl",
  variants: {
    variant: {
      solid: "bg-typography-950",
      outline: "bg-transparent border-2 border-typography-950",
      ghost: "bg-transparent",
      soft: "bg-typography-100",
    },
    size: {
      sm: "h-10 px-4 gap-2",
      md: "h-12 px-5 gap-2",
      lg: "h-14 px-6 gap-3",
      xl: "h-16 px-8 gap-3",
    },
    fullWidth: {
      true: "w-full",
    },
    disabled: {
      true: "opacity-50",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "lg",
  },
});

const textVariants = tv({
  base: "font-semibold",
  variants: {
    variant: {
      solid: "text-typography-0",
      outline: "text-typography-950",
      ghost: "text-typography-950",
      soft: "text-typography-800",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-base",
      xl: "text-lg",
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "lg",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonVariants {
  children: string;
  onPress?: () => void;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = "solid",
  size = "lg",
  fullWidth,
  disabled,
  isLoading,
  onPress,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const isDisabled = disabled || isLoading;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={animatedStyle}
      className={buttonVariants({
        variant,
        size,
        fullWidth,
        disabled: isDisabled,
      })}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === "solid" ? "#fff" : "#171717"}
          size="small"
        />
      ) : (
        <>
          {leftIcon}
          <Text className={textVariants({ variant, size })}>{children}</Text>
          {rightIcon}
        </>
      )}
    </AnimatedPressable>
  );
}
