import UserActionTypes from "./user-type";
import axios from "axios";
import { BASE_URL } from "../../App";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
export const logOutUser = () => ({
  type: UserActionTypes.SIGN_OUT,
});

export function login(userdata) {
  return async (dispatch) => {
    try {
      const loggedInUser = await axios.post(
        `${BASE_URL}/carers/login`,
        userdata
      );
      console.log(loggedInUser);
      let { data } = loggedInUser;

      localStorage.setItem("Authtoken", data.token);
      dispatch(setCurrentUser(data.user));
    } catch (error) {
      console.log(error.response.data);
      localStorage.removeItem("Authtoken");
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
      const { data } = await axios.get(`${BASE_URL}/private`, config);
      console.log(data.data);
      dispatch(setCurrentUser(data.data));
    } catch (error) {
      localStorage.removeItem("Authtoken");
    }
  };
};
