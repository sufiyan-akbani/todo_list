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
      <Link to={linkTo} className="navbar-brand text-white ">
        <i className="fa-solid fa-list-check"></i> ToDo list
      </Link>
      <Profile userName={name} user={user} />
    </nav>
  );
};

export default Header;
