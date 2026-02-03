import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography, IconButton } from "@/components/ui";

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
    <Pressable
      onPress={onToggle}
      className="flex-row items-center bg-gray-50 rounded-xl p-4 mb-2"
    >
      <View
        className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
          isValidated
            ? "bg-green-500 border-green-500"
            : task.completed
            ? "bg-fuchsia-500 border-fuchsia-500"
            : "border-gray-300"
        }`}
      >
        {isValidated && <Ionicons name="checkmark" size={14} color="#fff" />}
      </View>

      <View className="flex-1">
        <Typography
          className={`${
            isValidated ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {task.title}
        </Typography>
        {isValidated && (
          <Typography variant="caption" className="text-green-600">
            ✓ Validée avec photo
          </Typography>
        )}
      </View>

      {/* Bouton Valider (si non validée) */}
      {!isValidated && (
        <IconButton
          size="sm"
          variant="soft"
          onPress={onValidate}
          icon={<Ionicons name="camera-outline" size={18} color="#d946ef" />}
        />
      )}

      <IconButton
        size="sm"
        variant="ghost"
        onPress={onDelete}
        icon={<Ionicons name="trash-outline" size={20} color="#9ca3af" />}
      />
    </Pressable>
  );
}