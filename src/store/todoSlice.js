import { db } from "../utils/firebase";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { STATUSES } from "../utils/messages";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: [],
    todoStatus: STATUSES.IDLE,
    newTodoID: "",
    status: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTodos.pending, (state, action) => {
        state.todoStatus = STATUSES.LOADING;
      })
      .addCase(fetchUserTodos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.newTodoID =
          action.payload[action.payload.length - 1] !== undefined
            ? parseInt(action.payload[action.payload.length - 1].id) + 1
            : 1;
        state.todoStatus = STATUSES.IDLE;
      })
      .addCase(fetchUserTodos.rejected, (state, action) => {
        state.todoStatus = STATUSES.ERROR;
      });
    builder
      .addCase(addNewTodo.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
    builder
      .addCase(toUpdateTodoList.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(toUpdateTodoList.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(toUpdateTodoList.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

// To fetch Todos from database.
export const fetchUserTodos = createAsyncThunk("todos/fetch", async () => {
  const UserUID = localStorage.getItem("user-uid");
  const q = query(
    collection(db, "Todos"),
    where("Firebase-uid", "==", UserUID)
  );
  const doc = await getDocs(q);
  const data = doc.docs[0].data();
  return data.Todos;
});

// To add and create new todo in database.
export const addNewTodo = createAsyncThunk(
  "todos/create",
  async ({ perviousTodos, newTodoID, title, description, databaseId }) => {
    const q = doc(db, "Todos", databaseId);
    const updateTodo = await updateDoc(q, {
      Todos: [
        ...perviousTodos,
        {
          id: newTodoID,
          title: title,
          description: description,
          status: "Not Started",
        },
      ],
    });
    return updateTodo;
  }
);

// to edit and delete todo list.
export const toUpdateTodoList = createAsyncThunk(
  "todos/edit",
  async ({ unfrozenTodoObj, databaseId }) => {
    const q = doc(db, "Todos", databaseId);
    const updateTodo = await updateDoc(q, {
      Todos: unfrozenTodoObj,
    });
    return updateTodo;
  }
);

export default todoSlice.reducer;
