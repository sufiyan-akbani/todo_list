import React from "react";

const Error = () => {
  return (
    <div className="m-auto col-8">
      <img
        alt="Error 404"
        className="w-50 rounded mx-auto d-block"
        src={require("../assets/img/error-404-img.png")}
      />
      <div className="text-center fw-bold fs-4 text-uppercase text-danger">
        Page not found.
      </div>
    </div>
  );
};

export default Error;
