import { useState, forwardRef } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  type TextInputProps,
} from "react-native";
import { tv, type VariantProps } from "tailwind-variants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const AnimatedView = Animated.createAnimatedComponent(View);

const inputContainerVariants = tv({
  base: "rounded-2xl border bg-gray-50 overflow-hidden",
  variants: {
    size: {
      sm: "h-12",
      md: "h-14",
      lg: "h-16",
    },
    error: {
      true: "border-red-300 bg-red-50",
      false: "border-gray-200",
    },
    disabled: {
      true: "opacity-60 bg-gray-100",
    },
  },
  defaultVariants: {
    size: "md",
    error: false,
  },
});

const inputVariants = tv({
  base: "flex-1 text-typography-900 px-4",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const labelVariants = tv({
  base: "text-gray-900 font-semibold mb-2",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    error: {
      true: "text-red-600",
    },
    required: {
      true: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type InputVariants = VariantProps<typeof inputContainerVariants>;

interface InputProps extends Omit<TextInputProps, "editable">, InputVariants {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = "md",
      leftIcon,
      rightIcon,
      required,
      disabled,
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(secureTextEntry);
    const focusValue = useSharedValue(0);

    const animatedBorderStyle = useAnimatedStyle(() => {
      return {
        borderColor: error
          ? "#fca5a5" // red-300
          : interpolateColor(focusValue.value, [0, 1], ["#e5e7eb", "#6b7280"]), // gray-200 → gray-500
      };
    });

    const handleFocus = () => {
      setIsFocused(true);
      focusValue.value = withTiming(1, { duration: 200 });
    };

    const handleBlur = () => {
      setIsFocused(false);
      focusValue.value = withTiming(0, { duration: 200 });
    };

    const hasError = Boolean(error);

    return (
      <View className="w-full">
        {/* Label */}
        {label && (
          <Text className={labelVariants({ size, error: hasError })}>
            {label}
            {required && <Text className="text-error-500"> *</Text>}
          </Text>
        )}

        {/* Input Container */}
        <AnimatedView
          style={animatedBorderStyle}
          className={inputContainerVariants({
            size,
            error: hasError,
            disabled,
          })}
        >
          <View className="flex-1 flex-row items-center">
            {/* Left Icon */}
            {leftIcon && <View className="pl-4">{leftIcon}</View>}

            {/* Text Input */}
            <TextInput
              ref={ref}
              editable={!disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              secureTextEntry={isSecure}
              placeholderTextColor="#a3a3a3"
              className={inputVariants({ size })}
              {...props}
            />

            {/* Password Toggle or Right Icon */}
            {secureTextEntry ? (
              <Pressable
                onPress={() => setIsSecure(!isSecure)}
                className="pr-4"
              >
                <Ionicons
                  name={isSecure ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color="#737373"
                />
              </Pressable>
            ) : rightIcon ? (
              <View className="pr-4">{rightIcon}</View>
            ) : null}
          </View>
        </AnimatedView>

        {/* Error or Helper Text */}
        {(error || helperText) && (
          <Text
            className={`mt-1.5 text-sm ${
              error ? "text-error-500" : "text-typography-500"
            }`}
          >
            {error || helperText}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";
