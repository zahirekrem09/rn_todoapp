import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default TodoList = (props) => {
  const completedCount = props.list.todos.filter((todo) => todo.isDone).length;
  const remainCount = props.list.todos.length - completedCount;
  return (
    <View style={[styles.listContainer, { backgroundColor: props.list.color }]}>
      <Text style={styles.listTitle} numberOfLines={1}>
        {props.list.name}
      </Text>
      <View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.count}>{remainCount}</Text>
          <Text style={styles.subtitle}> remaining</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.count}>{completedCount}</Text>
          <Text style={styles.subtitle}> Completed</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 12,
    paddingVertical: 30,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 5,

    width: 180,
  },
  listTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  count: { color: "#fff", fontSize: 40, fontWeight: "200" },
  subtitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
