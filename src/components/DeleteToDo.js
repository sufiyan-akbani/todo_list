import React, { useEffect } from "react";
import { Model } from "./Model";
import { fetchUserTodos, toUpdateTodoList } from "../store/todoSlice";
import { useDispatch } from "react-redux";
const DeleteToDo = ({
  todoId,
  title,
  description,
  todoStatus,
  databaseId,
  todos
}) => {
  const dispatch = useDispatch();
  const unfrozenTodoObj = JSON.parse(JSON.stringify(todos));
  const handleDelete = async () => {
    const newTodosList = unfrozenTodoObj.filter((todo) => todo.id !== todoId);
    dispatch(
      toUpdateTodoList({
        unfrozenTodoObj: newTodosList,
        databaseId: databaseId,
      })
    );
    dispatch(fetchUserTodos());
  };
  useEffect(() => {
    dispatch(fetchUserTodos());
  }, [dispatch]);
  return (
    <Model modelTitle="Delete" todoId={todoId}>
      <div className="modal-body delete">
        <h5 className="text-center">
          Are you sure you want to delete this todo?
        </h5>
        <p></p>
        <p>Title: {title}</p>
        <p>Description : {description}</p>
        <p>Status : {todoStatus}</p>
        <p></p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="button"
          data-bs-dismiss="modal"
          className="btn btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </Model>
  );
};

export default DeleteToDo;
