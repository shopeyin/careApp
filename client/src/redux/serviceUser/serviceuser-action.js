import ServiceUserActionTypes from "./serviceuser-type";
import axios from "axios";
import { BASE_URL } from "../../App";

export const getServiceUser = () => ({
  type: ServiceUserActionTypes.GET_SERVICEUSERS,
});

export const setServiceUser = (serviceuser) => ({
  type: ServiceUserActionTypes.SET_SERVICEUSERS,
  payload: serviceuser,
});

export const getServiceUserFailure = () => ({
  type: ServiceUserActionTypes.GET_SERVICEUSERS_FAILURE,
});

export const createServiceUser = (serviceuser) => ({
  type: ServiceUserActionTypes.CREATE_SERVICEUSER,
  payload: serviceuser,
});

export function fetchServiceUsers() {
  return async (dispatch) => {
    dispatch(getServiceUser());

    try {
      const serviceUserData = await axios.get(`${BASE_URL}/serviceusers`);

      let {
        data: {
          data: { serviceusers },
        },
      } = serviceUserData;

      dispatch(setServiceUser(serviceusers));
    } catch (error) {
      dispatch(getServiceUserFailure());
    }
  };
}

export function createNewServiceUser(data) {
  return async (dispatch) => {
    try {
      axios.post(`${BASE_URL}/serviceusers`, data).then((res) => {
        console.log("HERE OO", res);
        dispatch(createServiceUser(res));
      });
    } catch (error) {
      console.log(error);
    }
  };
}
