import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, googleProvider } from "../utils/firebase";
import { MESSAGES } from "../utils/messages";

// To add user data and todo list in firebase firestore database.
const addUserDataToDatabase = async (
  Id,
  userUID,
  name,
  authProvider,
  email,
  dob = null
) => {
  await addDoc(collection(db, "users"), {
    Id: Id,
    "Firebase-uid": userUID,
    Name: name,
    authProvider: authProvider,
    Email: email,
    "Date of Birth": dob,
  });
  await addDoc(collection(db, "Todos"), {
    "Firebase-uid": userUID,
    Todos: [],
  });
};

// to login using google account.
export const signInWithGoogle = (Id) => {
  return async (dispatch) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      localStorage.setItem("user-uid", user.uid);
      const q = query(
        collection(db, "users"),
        where("Firebase-uid", "==", user.uid)
      );
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        addUserDataToDatabase(
          Id,
          user.uid,
          user.displayName,
          "google",
          user.email
        );
      }
      dispatch({ type: MESSAGES.GOOGLE_LOGIN_SUCCESSFULLY });
    } catch (err) {
      dispatch({ type: MESSAGES.GOOGLE_LOGIN_ERROR, error: `: ${err.code}` });
    }
  };
};

// to create account using email.
export const registerWithEmailAndPassword = (
  Id,
  fname,
  lname,
  dob,
  email,
  password
) => {
  return async (dispatch) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const fullName = fname + " " + lname;
      addUserDataToDatabase(Id, user.uid, fullName, "email", user.email, dob);
      signOut(auth);
      dispatch({ type: MESSAGES.EMAIL_ACCOUNT_CREATED_SUCCESSFULLY });
    } catch (err) {
      dispatch({
        type: MESSAGES.EMAIL_ACCOUNT_CREATED_ERROR,
        error: `: ${err.code}`,
      });
    }
  };
};

// to login using email.
export const logInWithEmailAndPassword = (email, password) => {
  return async (dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: MESSAGES.EMAIL_ACCOUNT_SIGNIN_SUCCESSFULLY });
    } catch (err) {
      dispatch({
        type: MESSAGES.EMAIL_ACCOUNT_SIGNIN_ERROR,
        error: `: ${err.code}`,
      });
    }
  };
};

// to send reset password link on register mail Id.
export const sendPasswordReset = (email) => {
  return async (dispatch) => {
    try {
      await sendPasswordResetEmail(auth, email);
      dispatch({ type: MESSAGES.PASSWORD_RESET_LINK_SEND });
    } catch (err) {
      dispatch({
        type: MESSAGES.PASSWORD_RESET_LINK_SEND_ERROR,
        error: `: ${err.code}`,
      });
    }
  };
};

// to logout
export const logout = () => {
  return async (dispatch) => {
    try {
      localStorage.clear();
      signOut(auth);
      dispatch({ type: MESSAGES.LOGOUT_SUCCESFULLY });
    } catch (err) {
      dispatch({ type: MESSAGES.LOGOUT_ERROR, error: err.code });
    }
  };
};
