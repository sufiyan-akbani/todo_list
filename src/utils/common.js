import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const handleErrorToast = (message, error = "") => {
    toast.error(`${message} ${error}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  
  export const handleWarningToast = (message) => {
    toast.warning(`${message}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };