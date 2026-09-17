import React, { useEffect, useState, useId } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  logout,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../action/authAction";
import { MESSAGES } from "../utils/messages";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { handleErrorToast } from "../utils/common";
const SignUp = () => {
  const Id = useId();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [dob, setDob] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [user, loading] = useAuthState(auth);
  var regularExpression =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  const navigate = useNavigate();

  const register = () => {
    if (!fname) {
      handleErrorToast(MESSAGES.FNAME_MESSAGE);
      return;
    } else if (!lname) {
      handleErrorToast(MESSAGES.LNAME_MESSAGE);
      return;
    } else if (!email) {
      handleErrorToast(MESSAGES.EMAIL_MESSAGE);
      return;
    } else if (!password) {
      handleErrorToast(MESSAGES.PASSWORD_MESSAGE);
      return;
    } else if (!confirmPassword) {
      handleErrorToast(MESSAGES.CONFIRM_PASSWORD_MESSAGE);
      return;
    } else if (!(password === confirmPassword)) {
      handleErrorToast(MESSAGES.PASSWORD_NOTMACHED_MESSAGE);
      return;
    } else if (password === confirmPassword) {
      if (password.length < 8) {
        handleErrorToast(MESSAGES.PASSWORD_8CHARLONG_MESSAGE);
        return;
      } else if (!regularExpression.test(password)) {
        handleErrorToast(MESSAGES.PASSWORD_RULE_MESSAGE);
        return;
      } else {
        dispatch(
          registerWithEmailAndPassword(Id, fname, lname, dob, email, password)
        );
      }
    }
  };
  const handleGoogleSignup = (Id) => {
    dispatch(signInWithGoogle(Id));
    dispatch(logout());
  };
  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/");
    }
  }, [user, loading, navigate]);
  return (
    <>
      <section className="text-center text-lg-start">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-lg-0">
              <div className="">
                <div className="card-body px-5 text-center">
                  <h2 className="fw-bold text-primary">Sign up now</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input type="hidden" value={Id} />
                    <div className="row">
                      <div className="col-md-6 p-2">
                        <div className="form-outline">
                          <label
                            className="form-label m-0"
                            htmlFor="form3Example1"
                          >
                            First name<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 p-2">
                        <div className="form-outline">
                          <label
                            className="form-label m-0"
                            htmlFor="form3Example2"
                          >
                            Last name<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="form3Example2"
                            className="form-control"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-outline p-2">
                      <label className="form-label m-0" htmlFor="form3Example3">
                        Email address<span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-outline p-2">
                      <label className="form-label m-0" htmlFor="form3Example3">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="form3Example3"
                        className="form-control"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                    <div className="form-outline p-2">
                      <label className="form-label m-0" htmlFor="form3Example4">
                        Password<span className="text-danger">*</span>
                      </label>
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        value={password}
                        title={MESSAGES.PASSWORD_RULE_MESSAGE}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-outline p-1">
                      <label className="form-label m-0" htmlFor="form3Example4">
                        Confirm Password<span className="text-danger">*</span>
                      </label>
                      <input
                        type=""
                        id="form3Example4"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <button
                      to="/"
                      type="submit"
                      className="btn btn-primary btn-block mb-1"
                      onClick={() => register()}
                    >
                      Sign up
                    </button>
                    <div className="text-center">
                      <p className="mb-0">or sign up with:</p>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-floating mx-1"
                        onClick={(Id) => handleGoogleSignup(Id)}
                      >
                        <i className="fa-brands fa-google"></i>
                      </button>
                      <p className="mb-0">
                        Already have an account? <Link to="/">Login</Link> now.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-9 col-lg-7 col-xl-7">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sign up"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
