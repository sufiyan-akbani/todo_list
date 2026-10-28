import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SharedHeader from "./SharedHeader";
import SignUp from "./SignUp";
import Error from "./Error";
import Todos from "./Todos";
import CreateTodo from "./CreateTodo";
import AboutUS from "./AboutUs";
export const Home = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedHeader />}>
            <Route index element={<Login />}></Route>
            <Route path="/todos" element={<Todos />} />
            <Route path="/todos/createTodo" element={<CreateTodo />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="about" element={<AboutUS />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
