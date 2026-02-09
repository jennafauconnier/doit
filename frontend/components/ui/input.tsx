import { useState, forwardRef } from "react";
import { View, StyleSheet, TextInput as RNTextInput } from "react-native";
import { TextInput, HelperText, Text } from "react-native-paper";

interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  leftIcon?: string; // Paper utilise des noms d'icônes
  rightIcon?: string;
  required?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

export const Input = forwardRef<RNTextInput, InputProps>(
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
    const [isSecure, setIsSecure] = useState(secureTextEntry);
    const hasError = Boolean(error);

    const labelText = required ? `${label} *` : label;

    return (
      <View style={styles.container}>
        <TextInput
          ref={ref}
          label={labelText}
          mode="outlined"
          disabled={disabled}
          error={hasError}
          secureTextEntry={isSecure}
          left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : undefined}
          right={
            secureTextEntry ? (
              <TextInput.Icon
                icon={isSecure ? "eye" : "eye-off"}
                onPress={() => setIsSecure(!isSecure)}
              />
            ) : rightIcon ? (
              <TextInput.Icon icon={rightIcon} />
            ) : undefined
          }
          outlineStyle={styles.outline}
          style={[styles.input, sizeStyles[size]]}
          {...props}
        />
        {(error || helperText) && (
          <HelperText type={hasError ? "error" : "info"} visible>
            {error || helperText}
          </HelperText>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

const sizeStyles = {
  sm: { height: 48 },
  md: { height: 56 },
  lg: { height: 64 },
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    backgroundColor: "transparent",
  },
  outline: {
    borderRadius: 16,
  },
});