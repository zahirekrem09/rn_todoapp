import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzjqKmQTcRXW4wCa5xCqYIu_DCf-85tp8",
  authDomain: "rntodoapp-d5c5f.firebaseapp.com",
  databaseURL: "https://rntodoapp-d5c5f.firebaseio.com",
  projectId: "rntodoapp-d5c5f",
  storageBucket: "rntodoapp-d5c5f.appspot.com",
  messagingSenderId: "588909320192",
  appId: "1:588909320192:web:40b1dcef884cc37d86e0e5",
  measurementId: "G-XFBF1FR2TQ",
};

class Firebase {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((err) => {
            callback(err);
          });
      }
    });
  }

  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");
    this.unsubcsribe = ref.onSnapshot((snapshot) => {
      lists = [];
      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
    });
  }
  get userId() {
    return firebase.auth().currentUser.uid;
  }
}

export default Firebase;
