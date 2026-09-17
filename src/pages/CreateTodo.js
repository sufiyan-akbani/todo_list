import React, { useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addNewTodo, fetchUserTodos } from "../store/todoSlice";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { MESSAGES } from "../utils/messages";
import { useDispatch, useSelector } from "react-redux";
import { handleErrorToast } from "../utils/common";
const CreateTodo = () => {
  const [user, loading] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [databaseId, setDatabaseId] = useState();
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: todos, newTodoID } = useSelector((state) => state.todo);
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    dispatch(fetchUserTodos());
    onSnapshot(
      query(collection(db, "Todos"), where("Firebase-uid", "==", user.uid)),
      (snapshot) => {
        snapshot.docs.map((doc) => setDatabaseId(doc.id));
      }
    );
  }, [dispatch, loading, navigate, user]);
  const addTodo = async () => {
    if (!title) {
      handleErrorToast(MESSAGES.TITLE_MESSAGE);
      return;
    } else if (!description) {
      handleErrorToast(MESSAGES.DESCRIPTION_MESSAGE);
      return;
    }
    const todoObj = {
      perviousTodos: todos,
      newTodoID: newTodoID,
      title: title,
      description: description,
      databaseId: databaseId,
    };
    dispatch(addNewTodo(todoObj));
    // dispatch(fetchUserTodos());
    navigate("/todos");
  };
  return (
    <div className="col-12">
      <div className="col-6 text-center m-auto">
        <h1 className="card-title my-3 text-primary">Create/Add todo</h1>
        <div className="mb-3 text-start col-12">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            To-do Title<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="exampleFormControlInput1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3 text-start col-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description<span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control form-control-lg"
            id="exampleFormControlTextarea1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <fieldset disabled>
          <div className="mb-3 col-12 text-start">
            <label htmlFor="disabledTextInput" className="form-label">
              Status<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="disabledTextInput"
              className="form-control form-control-lg"
              placeholder="Not Started"
            />
          </div>
        </fieldset>
        <button
          type="button"
          className="btn btn-outline-primary btn-lg"
          onClick={() => addTodo()}
        >
          Add
        </button>
        <p className="mb-1"></p>
      </div>
    </div>
  );
};

export default CreateTodo;
