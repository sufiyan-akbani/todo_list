import React, { useEffect, useState } from "react";
import { Model } from "./Model";
import { MESSAGES } from "../utils/messages";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTodos, toUpdateTodoList } from "../store/todoSlice";
import { handleErrorToast } from "../utils/common";
const EditToDo = ({
  todoId,
  toEditTitle,
  toEditDescription,
  toEditStatus,
  databaseId,
}) => {
  const [title, setTitle] = useState(toEditTitle);
  const [description, setDescription] = useState(toEditDescription);
  const [todoStatus, setTodoStatus] = useState(toEditStatus);
  const { data: todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const handleEdit = async (e) => {
    if (!title) {
      handleErrorToast(MESSAGES.TITLE_MESSAGE);
      return;
    } else if (!description) {
      handleErrorToast(MESSAGES.DESCRIPTION_MESSAGE);
      return;
    } else if (!todoStatus) {
      handleErrorToast(MESSAGES.STATUS_MESSAGE);
      return;
    }
    const editedData = {
      id: todoId,
      title: title,
      description: description,
      status: todoStatus,
    };
    const unfrozenTodoObj = JSON.parse(JSON.stringify(todos));
    unfrozenTodoObj[todoId - 1] = editedData;
    dispatch(
      toUpdateTodoList({
        unfrozenTodoObj: unfrozenTodoObj,
        databaseId: databaseId,
      })
    );
    dispatch(fetchUserTodos());
  };
  useEffect(() => {
    dispatch(fetchUserTodos());
  }, [dispatch]);
  return (
    <Model modelTitle="Edit" todoId={todoId}>
      <div className="modal-body">
        <div className="mb-3 col-12">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            To-do Title
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="exampleFormControlInput1"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder=""
          />
        </div>
        <div className="mb-3 col-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control form-control-lg"
            id="exampleFormControlTextarea1"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows="3"
          ></textarea>
        </div>
        <div className="form-floating">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            onChange={(e) => setTodoStatus(e.target.value)}
            value={todoStatus}
          >
            <option defaultValue value={todoStatus}>
              {todoStatus}
            </option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <label for="floatingSelect">Status</label>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          data-bs-dismiss="modal"
          className="btn btn-primary"
          onClick={handleEdit}
        >
          Save changes
        </button>
      </div>
    </Model>
  );
};
export default EditToDo;
