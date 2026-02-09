import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { Typography } from "@/components/ui";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  validatedAt?: string;
  proofPhotoUrl?: string;
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
  onValidate,
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onValidate: () => void;
}) {
  const isValidated = !!task.validatedAt;

  return (
    <Pressable onPress={onToggle} style={styles.container}>
      <View
        style={[
          styles.checkbox,
          isValidated && styles.checkboxValidated,
          !isValidated && task.completed && styles.checkboxCompleted,
          !isValidated && !task.completed && styles.checkboxEmpty,
        ]}
      >
        {isValidated && <Ionicons name="checkmark" size={14} color="#fff" />}
      </View>

      <View style={styles.content}>
        <Typography
          style={[styles.title, isValidated && styles.titleValidated]}
        >
          {task.title}
        </Typography>
        {isValidated && (
          <Typography variant="caption" style={styles.validatedLabel}>
            ✓ Validée avec photo
          </Typography>
        )}
      </View>

      {/* Bouton Valider (si non validée) */}
      {!isValidated && (
        <IconButton
          icon={({ color }) => (
            <Ionicons name="camera-outline" size={18} color="#d946ef" />
          )}
          size={20}
          mode="contained-tonal"
          onPress={onValidate}
        />
      )}

      <IconButton
        icon={({ color }) => (
          <Ionicons name="trash-outline" size={20} color="#9ca3af" />
        )}
        size={20}
        onPress={onDelete}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxValidated: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },
  checkboxCompleted: {
    backgroundColor: "#D946EF",
    borderColor: "#D946EF",
  },
  checkboxEmpty: {
    borderColor: "#D1D5DB",
  },
  content: {
    flex: 1,
  },
  title: {
    color: "#1F2937",
  },
  titleValidated: {
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  validatedLabel: {
    color: "#16A34A",
  },
});