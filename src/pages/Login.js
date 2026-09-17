import React, { useState, useEffect, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import {
  logInWithEmailAndPassword,
  sendPasswordReset,
  signInWithGoogle,
} from "../action/authAction";
import { useAuthState } from "react-firebase-hooks/auth";
import { MESSAGES } from "../utils/messages";
import { handleErrorToast } from "../utils/common";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const Id = useId();
  const signIn = () => {
    if (!email) {
      handleErrorToast(MESSAGES.EMAIL_MESSAGE);
      return;
    } else if (!password) {
      handleErrorToast(MESSAGES.PASSWORD_MESSAGE);
      return;
    } else {
      dispatch(logInWithEmailAndPassword(email, password));
    }
  };
  const handleGoogleSignup = (Id) => {
    dispatch(signInWithGoogle(Id));
  };
  const handlePasswordReset = (e) => {
    e.preventDefault();
    dispatch(sendPasswordReset(email));
  };
  useEffect(() => {
    if (loading) return;
    if (user) {
      localStorage.setItem("user-uid", user.uid);
      navigate(`/todos`);
    }
  }, [user, loading, navigate]);
  return (
    <section className="mt-3">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="login"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <button
                  type="button"
                  className="btn btn-primary btn-floating mx-1"
                  onClick={() => handleGoogleSignup(Id)}
                >
                  <i className="fa-brands fa-google"></i>
                </button>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter a Email address or Username"
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email or Username
                </label>
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="p-0 btn btn-link"
                  onClick={(e) => handlePasswordReset(e)}
                >
                  Forgot password?
                </button>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg "
                  style={{
                    paddingLeft: "2.5rem",
                    paddingRight: "2.5rem",
                  }}
                  onClick={signIn}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?&nbsp;
                  <Link to="/register" className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
