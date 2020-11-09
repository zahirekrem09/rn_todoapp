import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";

const AddTodoModal = (props) => {
  // const [todoData, setTodoData] = React.useState({
  //   name: props.list.name,
  //   color: props.list.color,
  //   todos: props.list.todos,
  // });
  const [newTodo, setNewTodo] = React.useState("");
  //   console.log(todoData);console.log(todoData);
  const list = props.list;
  const taskCount = list.todos.length;
  const completedCount = list.todos.filter((todo) => todo.isDone).length;

  const toogleTodoCompleted = (index) => {
    let list = props.list;
    list.todos[index].isDone = !list.todos[index].isDone;
    // console.log(list);
    props.updateList(list);
  };
  const handelAddTodo = () => {
    let list = props.list;
    if (!list.todos.some((todo) => todo.title === newTodo)) {
      list.todos.push({ title: newTodo, isDone: false });
      props.updateList(list);
    } else {
      alert("this todo is on your list");
    }

    setNewTodo("");
    // Keyboard.dismiss();
  };
  const deleteTodo = (index) => {
    let list = props.list;
    list.todos.splice(index, 1);
    props.updateList(list);
  };
  const renderTodo = (todo, index) => {
    const time = moment(Date() || moment.now()).fromNow();
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => toogleTodoCompleted(index)}>
          <MaterialCommunityIcons
            name={
              todo.isDone
                ? "checkbox-multiple-marked"
                : "checkbox-multiple-blank-outline"
            }
            size={30}
            color={list.color}
          />
        </TouchableOpacity>
        <View style={[styles.todoView, { backgroundColor: list.color }]}>
          <Text
            style={[
              styles.todo,
              {
                textDecorationLine: todo.isDone ? "line-through" : "none",
                color: todo.isDone ? "#a4a4a4" : "#fff",
              },
            ]}
          >
            {todo.title}
          </Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        <TouchableOpacity onPress={() => deleteTodo(index)}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={30}
            color={list.color}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={props.closeModal}
        style={[
          {
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1000,
          },
          { backgroundColor: list.color },
        ]}
      >
        <MaterialCommunityIcons name="close" size={32} color="#fff" />
      </TouchableOpacity>
      <View
        style={[
          styles.section,
          styles.header,
          { borderBottomColor: list.color },
        ]}
      >
        <View>
          <Text style={[styles.title, { color: list.color }]}>{list.name}</Text>
          <Text style={styles.taskCount}>
            {completedCount} of {taskCount} taks
          </Text>
        </View>
      </View>
      <View style={[styles.section, { flex: 3 }]}>
        <FlatList
          data={list.todos}
          renderItem={({ item, index }) => renderTodo(item, index)}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 30, paddingVertical: 64 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={[
          styles.section,
          styles.footer,
          { borderBottomColor: list.color },
        ]}
      >
        {/* <Text style={[styles.title, { color: color }]}>Create Todo List</Text> */}
        <TextInput
          style={[styles.input, { color: list.color }]}
          placeholder="Add Todo Title..."
          onChangeText={(val) => setNewTodo(val)}
          value={newTodo}
        />

        <TouchableOpacity
          onPress={() => handelAddTodo()}
          style={[styles.addButton, { backgroundColor: list.color }]}
        >
          <MaterialCommunityIcons name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTodoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  section: { flex: 1, alignSelf: "stretch" },
  header: {
    justifyContent: "flex-end",
    marginLeft: 60,
    borderBottomWidth: 4,
    marginBottom: 20,
    borderRadius: 5,
    flex: 1,
  },
  taskCount: {
    marginTop: 5,
    marginBottom: 15,
    fontWeight: "600",
    color: "#a4a4a4",
    fontSize: 18,
  },
  title: { fontSize: 30, fontWeight: "800", color: "#2d3436" },
  input: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#24a6d9",
    paddingHorizontal: 15,
    height: 48,
    width: 300,
    borderRadius: 5,
    marginRight: 8,
    fontSize: 18,
  },
  addButton: {
    borderWidth: 1,
    marginLeft: 4,
    borderColor: "#a7cbd9",
    borderRadius: 5,
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todo: {
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 12,
    color: "#fff",
  },
  todoView: {
    backgroundColor: "red",
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  time: {
    fontWeight: "300",
    fontSize: 12,
    marginLeft: 12,
    marginTop: 8,
    color: "#fff",
  },
});
