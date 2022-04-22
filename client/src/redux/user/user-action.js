import UserActionTypes from "./user-type";
import axios from "axios";

export const BASE_URL = "http://127.0.0.1:1000/api/v1/carers/login";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
export const logOutUser = () => ({
  type: UserActionTypes.SIGN_OUT
 
});
export function login(userdata) {
  return async (dispatch) => {
    try {
      const loggedInUser = await axios.post(BASE_URL, userdata);
      console.log(loggedInUser);
      let { data } = loggedInUser;

      localStorage.setItem("Authtoken", data.token);
      dispatch(setCurrentUser(data.user));
    } catch (error) {
      console.log(error.response.data);
    }
  };
}
