import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  greetingLabel: {
    color: "#6B7280",
  },
  greetingName: {
    color: "#111827",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  statCardPending: {
    backgroundColor: "#FDF4FF",
  },
  statCardCompleted: {
    backgroundColor: "#F0FDF4",
  },
  statNumberPending: {
    color: "#C026D3",
  },
  statLabelPending: {
    color: "#C026D3",
    opacity: 0.7,
  },
  statNumberCompleted: {
    color: "#16A34A",
  },
  statLabelCompleted: {
    color: "#16A34A",
    opacity: 0.7,
  },
  tasksList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#6B7280",
    marginBottom: 12,
  },
  sectionTitleMuted: {
    color: "#9CA3AF",
    marginBottom: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    color: "#9CA3AF",
    marginTop: 16,
  },
  emptySubtitle: {
    color: "#9CA3AF",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    backgroundColor: "#D946EF",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#d946ef",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});