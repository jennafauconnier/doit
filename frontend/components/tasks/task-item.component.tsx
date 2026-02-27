import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { Typography } from "@/components/ui";
import { styles } from "./task-item.styles";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  validatedAt?: string;
  proofPhotoUrl?: string;
}

export function TaskItem({
  task,
  onPress,
  onDelete,
  onValidate,
}: {
  task: Task;
  onPress: () => void;
  onDelete: () => void;
  onValidate: () => void;
}) {
  const isValidated = !!task.validatedAt;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Pressable
        onPress={onValidate}
        style={[
          styles.checkbox,
          isValidated && styles.checkboxValidated,
          !isValidated && task.completed && styles.checkboxCompleted,
          !isValidated && !task.completed && styles.checkboxEmpty,
        ]}
      >
        {isValidated && <Ionicons name="checkmark" size={14} color="#fff" />}
      </Pressable>

      <View style={styles.content}>
        <Typography variant="bodyLarge" style={styles.title}>
          {task.title}
        </Typography>
        {isValidated && (
          <Typography variant="caption" style={styles.validatedLabel}>
            ✓ Validée avec photo
          </Typography>
        )}
      </View>

      <IconButton
        icon={() => <Ionicons name="trash-outline" size={20} color="#9ca3af" />}
        size={20}
        onPress={onDelete}
      />
    </Pressable>
  );
}
