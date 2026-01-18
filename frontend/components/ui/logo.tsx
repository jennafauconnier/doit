import { View, Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export function Logo({ size = "md" }: LogoProps) {
  const sizes = {
    sm: { text: "text-2xl", dot: "w-1.5 h-1.5" },
    md: { text: "text-3xl", dot: "w-2 h-2" },
    lg: { text: "text-4xl", dot: "w-2.5 h-2.5" },
  };

  return (
    <Animated.View
      entering={FadeIn.duration(600)}
      className="flex-row items-center"
    >
      <Text
        className={`${sizes[size].text} font-black text-gray-900 tracking-tight`}
      >
        DO
      </Text>
      <View
        className={`${sizes[size].dot} bg-fuchsia-500 rounded-full mx-1.5`}
      />
      <Text
        className={`${sizes[size].text} font-black text-gray-900 tracking-tight`}
      >
        IT
      </Text>
    </Animated.View>
  );
}
