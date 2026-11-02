import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./Profile";
import { collection, getDocs, query, where } from "firebase/firestore";

const Header = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState();
  const linkTo = user ? "/todos" : "/";

  useEffect(() => {
    if (!user) {
      setName(undefined);
      return;
    }
    const fetchUserName = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("Firebase-uid", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs[0].data();
        setName(data.Name);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserName();
  }, [user]);

  return (
    <nav className="navbar bg-primary px-2 col-12 ">
      <Link to={linkTo} className="navbar-brand text-white ms-2">
        <img src={require("../assets/img/to-do-list.png")} alt="ToDo list" className="img-fluid mb-1" width="30" height="30" /> Todo List
      </Link>
      <Profile userName={name} user={user} />
    </nav>
  );
};

export default Header;
