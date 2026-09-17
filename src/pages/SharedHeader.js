import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
const SharedHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default SharedHeader;
