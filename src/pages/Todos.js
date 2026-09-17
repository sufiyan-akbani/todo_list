import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTodos } from "../store/todoSlice";
import { STATUSES } from "../utils/messages";
const Todos = () => {
  const [user, loading] = useAuthState(auth);
  const [databaseId, setDatabaseId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: todos, todoStatus } = useSelector((state) => state.todo);
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    localStorage.setItem("user-uid", user.uid);
    dispatch(fetchUserTodos());
    onSnapshot(
      query(collection(db, "Todos"), where("Firebase-uid", "==", user.uid)),
      (snapshot) => {
        snapshot.docs.map((doc) => setDatabaseId(doc.id));
      }
    );
  }, [user, loading, dispatch, navigate]);
  const todosHandle = () => {
    const todosEmpty = todos.length === 0;
    const todosLoading = todoStatus === STATUSES.LOADING;
    const todosError = todoStatus === STATUSES.ERROR;
    const loadingTodosTd = (
      <tbody>
        <tr>
          <td className="text-warning pt-2 fw-bolder" colSpan={5}>
            Loading...
          </td>
        </tr>
      </tbody>
    );
    const errorTodosTd = (
      <tbody>
        <tr>
          <td className="text-danger pt-2 fw-bolder" colSpan={5}>
            Error while fetching todos. Please try to refresh the page.
          </td>
        </tr>
      </tbody>
    );
    const emptyTodosTd = (
      <tbody>
        <tr>
          <td className="text-info pt-2 fw-bolder" colSpan={5}>
            No Todos avialable.
          </td>
        </tr>
      </tbody>
    );
    return todosEmpty && todosLoading
      ? loadingTodosTd
      : todosEmpty && todosError
      ? errorTodosTd
      : todos.length === 0
      ? emptyTodosTd
      : todos.map((todo, index) => (
          <Todo
            todo={todo}
            databaseId={databaseId}
            todos={todos}
            fetchUserTodos={fetchUserTodos}
            index={index}
            todoStatus={todoStatus}
          />
        ));
  };
  return (
    <>
      <section className="h-100">
        <div className="container h-75">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="pt-3">
              <div className="card rounded-3">
                <div className="card-body p-4 text-center">
                  <h1 className="my-3 pb-3 text-primary">
                    <i className="fa-solid fa-list-check"></i> To Do App
                  </h1>
                  <div className="col-12 me-5">
                    <Link
                      to="/todos/createTodo"
                      type="submit"
                      className="btn btn-primary btn-lg"
                    >
                      Create Todo
                    </Link>
                  </div>
                  <hr></hr>
                  <div className="overflow-auto col-12">
                    <table className="table ">
                      <thead className="overflow-scroll col-12">
                        <tr className="">
                          <th scope="col">No.</th>
                          <th scope="col">Todo Title</th>
                          <th scope="col">Todo Description</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      {todosHandle()}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Todos;
