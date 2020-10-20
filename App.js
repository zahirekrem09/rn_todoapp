import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tempData from "./tempData";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import Firebase from "./server/firebase";

export default function App() {
  const [addTodoVisible, setAdTodoVisible] = React.useState(false);
  // const [user, SetUser] = React.useState({});
  const [lists, setLists] = React.useState(tempData);
  // const [lists, setLists] = React.useState([]);

  // useEffect(() => {
  //   firebase = new Firebase((error, user) => {
  //     if (error) {
  //       return alert("uh oh , something went wrong");
  //     }
  //     firebase.getLists((lists) => {
  //       setLists([{ ...lists }]);
  //     });
  //     SetUser({ user });
  //   });
  // }, []);

  const handleOpenModal = () => {
    setAdTodoVisible((addTodoVisible) => !addTodoVisible);
  };
  const addList = (list) => {
    setLists([{ ...list, id: lists.length + 1, todos: [] }, ...lists]);
  };
  const updateList = (list) => {
    setLists(
      lists.map((item) => {
        return item.id === list.id ? list : item;
      })
    );
  };
  const renderList = (list) => {
    return <TodoList list={list} updateList={updateList} />;
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={addTodoVisible}
        onRequestClose={() => handleOpenModal}
      >
        <AddListModal closeModal={() => handleOpenModal()} addList={addList} />
      </Modal>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo <Text style={{ fontWeight: "300", color: "#24a6d9" }}>App</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleOpenModal()}
        >
          <MaterialCommunityIcons name="plus" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.addButtonText}>Add Todo List</Text>
      </View>
      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: "#a7cbd9",
    height: 1,
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "#2d3436",
    paddingHorizontal: 40,
  },
  addButton: {
    borderWidth: 2,
    borderColor: "#a7cbd9",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#24a6d9",
  },
  addButtonText: {
    color: "#24a6d9",
    fontWeight: "600",
    fontSize: 16,
    marginTop: 8,
  },
});
