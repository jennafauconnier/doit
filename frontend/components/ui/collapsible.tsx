import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";

interface CollapsibleProps {
  title: string;
}

export function Collapsible({ 
  children, 
  title 
}: PropsWithChildren<CollapsibleProps>) {
  return (
    <List.Accordion
      title={title}
      titleStyle={styles.title}
      style={styles.accordion}
    >
      {children}
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: "transparent",
    paddingVertical: 0,
  },
  title: {
    fontWeight: "600",
  },
});