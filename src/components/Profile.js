import React from "react";
import { IoLogOut } from "react-icons/io5";
import { Model } from "./Model";
import { logout } from "../action/authAction";
import { useDispatch } from "react-redux";
const Profile = ({ userName, user }) => {
  const dispatch = useDispatch();
  if (user) {
    return (
      <div className="text-white">
        <span title={`User : ${userName}`} className="me-2">
          <b>
            <i className="fa-regular fa-user"></i> {userName} {}
          </b>
        </span>
        <button
          type="button"
          className="btn btn-danger text-center "
          data-bs-toggle="modal"
          data-bs-target={`#LogoutModal-1`}
        >
          <IoLogOut className="fs-4" />
          Logout
        </button>
        <Model modelTitle={"Logout"} todoId={1}>
          <div className="modal-body">
            <h4 className="text-black">Are you sure you want to logout?</h4>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
              onClick={() => dispatch(logout())}
            >
              Yes
            </button>
          </div>
        </Model>
      </div>
    );
  } else {
    return;
  }
};

export default Profile;
