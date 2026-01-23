import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography, IconButton } from "@/components/ui";

export function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: { id: string; title: string; completed: boolean };
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <Pressable
      onPress={onToggle}
      className="flex-row items-center bg-gray-50 rounded-xl p-4 mb-2"
    >
      <View
        className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
          task.completed ? "bg-green-500 border-green-500" : "border-gray-300"
        }`}
      >
        {task.completed && (
          <Ionicons name="checkmark" size={14} color="#fff" />
        )}
      </View>

      <Typography
        className={`flex-1 ${
          task.completed ? "text-gray-400 line-through" : "text-gray-800"
        }`}
      >
        {task.title}
      </Typography>

      <IconButton
        size="sm"
        variant="ghost"
        onPress={onDelete}
        icon={<Ionicons name="trash-outline" size={20} color="#9ca3af" />}
      />
    </Pressable>
  );
}