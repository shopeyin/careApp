import UserActionTypes from "./user-type";
import axios from "axios";

export const BASE_URL = "http://127.0.0.1:1000/api/v1/carers/login";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
export const logOutUser = () => ({
  type: UserActionTypes.SIGN_OUT,
});

export function login(userdata) {
  return async () => {
    try {
      const loggedInUser = await axios.post(BASE_URL, userdata);
      console.log(loggedInUser);
      let { data } = loggedInUser;

      localStorage.setItem("Authtoken", data.token);
      //dispatch(setCurrentUser(data.user));
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

export const fetchUserData = () => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Authtoken")}`,
      },
    };
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:1000/api/v1/private`,
        config
      );
      console.log(data.data);
      dispatch(setCurrentUser(data.data));
    } catch (error) {
      localStorage.removeItem("Authtoken");
    }
  };
};
