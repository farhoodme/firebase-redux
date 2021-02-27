import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import firestore from "../database/firebase";

// Initial state

const initialState = {
  tasks: [],
};

// Reducer

const updateTask = async (task) => {
  const doc = firestore.collection("tasks").doc(task.id);
  const complete = !task.complete;
  doc
    .update({
      complete,
    })
    .then(() => {
      console.log("success");
    })
    .catch((error) => {
      console.log(error);
    });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setTasks":
      return { ...state, tasks: action.payload };

    case "toggleTaskStatus":
      updateTask(action.payload);

    default:
      return state;
  }
};

// Store

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

// Action Creators

const toggleTaskStatus = (task) => {
  return {
    type: "toggleTaskStatus",
    payload: task,
  };
};

const setTasks = (tasks) => {
  return {
    type: "setTasks",
    payload: tasks,
  };
};

const getTasks = () => {
  return function (dispatch) {
    firestore.collection("tasks").onSnapshot((querySnapshot) => {
      var tasks = [];
      querySnapshot.forEach((doc) => {
        let taskId = doc.id;
        tasks.push({ id: taskId, ...doc.data() });
      });
      dispatch(setTasks(tasks));
    });
  };
};

export { toggleTaskStatus, getTasks };
