import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/assets/css/index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { app as firebase, auth } from "./utils/firebase";
import { createFirestoreInstance } from "redux-firestore";
import { isLoaded } from "react-redux-firebase";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root"));
const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance,
};
function AuthIsLoaded({ children }) {
  if (!isLoaded(auth))
    return (
      <div className="text-center">
        <div className="" role="status">
          <span className="">Loading...</span>
        </div>
      </div>
    );
  return children;
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
        <ToastContainer />
          <App />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>
);
