import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import AddTodoModal from "./AddTodoModal";

export default TodoList = (props) => {
  const completedCount = props.list.todos.filter((todo) => todo.isDone).length;
  const remainCount = props.list.todos.length - completedCount;
  const [showListVisible, setShowListVisible] = React.useState(false);
  const handleOpenModal = () => {
    setShowListVisible((showListVisible) => !showListVisible);
  };
  return (
    <View>
      <Modal
        animationType="slide"
        visible={showListVisible}
        onRequestClose={() => handleOpenModal()}
      >
        <AddTodoModal
          closeModal={() => handleOpenModal()}
          list={props.list}
          updateList={props.updateList}
          showListVisible={showListVisible}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => handleOpenModal()}
        style={[styles.listContainer, { backgroundColor: props.list.color }]}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {props.list.name}
        </Text>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{remainCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}> Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
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
