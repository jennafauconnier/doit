import { Pressable, ActivityIndicator } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const iconButtonVariants = tv({
  base: "items-center justify-center rounded-full",
  variants: {
    variant: {
      solid: "bg-typography-950",
      outline: "bg-transparent border-2 border-typography-200",
      ghost: "bg-transparent",
      soft: "bg-typography-100",
    },
    size: {
      sm: "w-9 h-9",
      md: "w-11 h-11",
      lg: "w-14 h-14",
    },
    disabled: {
      true: "opacity-50",
    },
  },
  defaultVariants: {
    variant: "ghost",
    size: "md",
  },
});

type IconButtonVariants = VariantProps<typeof iconButtonVariants>;

interface IconButtonProps extends IconButtonVariants {
  icon: React.ReactNode;
  onPress?: () => void;
  isLoading?: boolean;
}

export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  disabled,
  isLoading,
  onPress,
}: IconButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
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
      className={iconButtonVariants({ variant, size, disabled: isDisabled })}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === "solid" ? "#fff" : "#171717"}
          size="small"
        />
      ) : (
        icon
      )}
    </AnimatedPressable>
  );
}
