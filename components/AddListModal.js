import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tempData from "../tempData";

const AddListModal = (props) => {
  const background = [
    "#5cd859",
    "#24a6d9",
    "#595bd9",
    "#8022d9",
    "#d159d8",
    "#d85963",
    "#d88559",
  ];
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState(background[0]);
  const [displayList, setDisplayList] = React.useState(tempData);
  const handelCreateTodo = () => {
    const newTodoList = {
      name: name,
      color: color,
      todos: [],
    };
    setDisplayList([newTodoList, ...displayList]);
    setName("");
    props.closeModal();
  };
  const renderColors = () => {
    return background.map((clr) => {
      return (
        <TouchableOpacity
          onPress={() => setColor(clr)}
          key={clr}
          style={[styles.colorBox, { backgroundColor: clr }]}
        ></TouchableOpacity>
      );
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "#24a6d9",
        }}
        onPress={props.closeModal}
      >
        <MaterialCommunityIcons name="close" size={32} color="#fff" />
      </TouchableOpacity>
      <View
        style={{
          alignItems: "stretch",
          marginHorizontal: 30,
          //   flexDirection: "row",
        }}
      >
        <Text style={[styles.title, { color: color }]}>Create Todo List</Text>
        <TextInput
          style={[styles.input, { color: color }]}
          placeholder="Add Todo List Name..."
          onChangeText={(val) => setName(val)}
        />
        <View style={styles.colorPalet}>{renderColors()}</View>
        <TouchableOpacity
          onPress={() => handelCreateTodo()}
          style={[styles.addButton, { backgroundColor: color }]}
        >
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddListModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#24a6d9",
    fontSize: 24,
    fontWeight: "700",
    alignSelf: "center",
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#24a6d9",
    paddingHorizontal: 15,
    height: 50,
    width: 300,
    borderRadius: 5,
    marginTop: 8,
    fontSize: 18,
  },
  addButton: {
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#a7cbd9",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#24a6d9",
    height: 50,
  },
  createText: {
    color: "#fff",
    fontSize: 18,
  },
  colorBox: {
    height: 30,
    width: 30,
    borderRadius: 5,
  },
  colorPalet: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
