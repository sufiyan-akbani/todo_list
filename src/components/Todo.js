import React, { useEffect, useState } from "react";
import { GrInProgress } from "react-icons/gr";
import { SiGoogletasks } from "react-icons/si";
import { MdOutlineNotStarted } from "react-icons/md";
import DeleteToDo from "./DeleteToDo";
import EditToDo from "./EditToDo";
import { useDispatch } from "react-redux";

const Todo = ({ todo, databaseId, todos, fetchUserTodos, index }) => {
  const [deleteDisable, setDeleteDisable] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (todo.status === "Completed") {
      setDeleteDisable("disabled");
    } else {
      setDeleteDisable("");
    }
    dispatch(fetchUserTodos());
  }, [dispatch, fetchUserTodos, todo.status]);
  return (
    <>
      <tbody>
        <tr
          className={
            todo.status === "Completed" ? "text-decoration-line-through" : ""
          }
        >
          <th scope="row">{index + 1}</th>
          <td>{todo.title}</td>
          <td>{todo.description}</td>
          <td>
            {todo.status === "Not Started" ? (
              <MdOutlineNotStarted className="text-info" />
            ) : todo.status === "In Progress" ? (
              <GrInProgress className="text-warning" />
            ) : (
              <SiGoogletasks className="text-success" />
            )}{" "}
            {todo.status}
          </td>
          <td>
            {todo.status !== "Completed" && (
              <button
                className={`btn btn-outline-danger btn-sm mx-2 ${deleteDisable}`}
                data-bs-toggle="modal"
                data-bs-target={`#DeleteModal-${todo.id}`}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            )}
            <button
              className="btn btn-outline-info btn-sm mt-1 mt-sm-0"
              data-bs-toggle="modal"
              data-bs-target={`#EditModal-${todo.id}`}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
      {
        <EditToDo
          todoId={todo.id}
          toEditTitle={todo.title}
          toEditDescription={todo.description}
          toEditStatus={todo.status}
          id={todo.id}
          databaseId={databaseId}
          todos={todos}
          fetchUserTodos={fetchUserTodos}
        />
      }
      {
        <DeleteToDo
          todoId={todo.id}
          title={todo.title}
          description={todo.description}
          todoStatus={todo.status}
          databaseId={databaseId}
          todos={todos}
          fetchUserTodos={fetchUserTodos}
        />
      }
    </>
  );
};
export default Todo;
