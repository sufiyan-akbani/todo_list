import { handleSuccessToast, handleErrorToast } from "../utils/common";
import { MESSAGES } from "../utils/messages";
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGES.GOOGLE_LOGIN_SUCCESSFULLY:
      handleSuccessToast(MESSAGES.GOOGLE_LOGIN_SUCCESSFULLY);
      return state;
    case MESSAGES.GOOGLE_LOGIN_ERROR:
      handleErrorToast(MESSAGES.GOOGLE_LOGIN_ERROR, action.error);
      return state;
    case MESSAGES.EMAIL_ACCOUNT_CREATED_SUCCESSFULLY:
      handleSuccessToast(MESSAGES.EMAIL_ACCOUNT_CREATED_SUCCESSFULLY);
      return state;
    case MESSAGES.EMAIL_ACCOUNT_CREATED_ERROR:
      handleErrorToast(MESSAGES.EMAIL_ACCOUNT_CREATED_ERROR, action.error);
      return state;
    case MESSAGES.EMAIL_ACCOUNT_SIGNIN_SUCCESSFULLY:
      handleSuccessToast(MESSAGES.EMAIL_ACCOUNT_SIGNIN_SUCCESSFULLY);
      return state;
    case MESSAGES.EMAIL_ACCOUNT_SIGNIN_ERROR:
      handleErrorToast(MESSAGES.EMAIL_ACCOUNT_SIGNIN_ERROR, action.error);
      return state;
    case MESSAGES.PASSWORD_RESET_LINK_SEND:
      handleSuccessToast(MESSAGES.PASSWORD_RESET_LINK_SEND);
      return state;
    case MESSAGES.PASSWORD_RESET_LINK_SEND_ERROR:
      handleErrorToast(MESSAGES.PASSWORD_RESET_LINK_SEND_ERROR, action.error);
      return state;
    case MESSAGES.LOGOUT_SUCCESFULLY:
      handleSuccessToast(MESSAGES.LOGOUT_SUCCESFULLY);
      return state;
    case MESSAGES.LO:
      handleErrorToast(MESSAGES.EMAIL_ACCOUNT_CREATED_ERROR, action.error);
      return state;
    default:
      return state;
  }
};

export default authReducer;
