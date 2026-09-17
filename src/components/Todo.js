import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteToDo from "./DeleteToDo";
import EditToDo from "./EditToDo";
import { useDispatch } from "react-redux";

const Todo = ({
  todo,
  databaseId,
  todos,
  fetchUserTodos,
  index
}) => {
  const [deleteDisable, setDeleteDisable] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (todo.status === "Completed") {
      setDeleteDisable("disabled");
    } else {
      setDeleteDisable("");
    }
    dispatch(fetchUserTodos());
  },[dispatch, fetchUserTodos, todo.status]);
  return (
    <>
      <tbody>
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{todo.title}</td>
          <td>{todo.description}</td>
          <td>{todo.status}</td>
          <td>
            <Link
              to={`/todos/delete/${todo.id}`}
              type="submit"
              className={`btn btn-outline-danger btn-sm mx-2 ${deleteDisable}`}
              data-bs-toggle="modal"
              data-bs-target={`#DeleteModal-${todo.id}`}
            >
              <i className="fa-regular fa-trash-can"></i>
            </Link>
            <Link
              to={`/todos/edit/${todo.id}`}
              type="submit"
              className="btn btn-outline-info btn-sm mt-1 mt-sm-0"
              data-bs-toggle="modal"
              data-bs-target={`#EditModal-${todo.id}`}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
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
