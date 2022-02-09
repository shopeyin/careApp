import ServiceUserActionTypes from "./serviceuser-type";
import axios from "axios";

export const BASE_URL = "http://127.0.0.1:1000/api/v1/serviceusers";

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
      const serviceUserData = await axios.get(BASE_URL);

      let {
        data: {
          data: { serviceusers },
        },
      } = serviceUserData;

      dispatch(setServiceUser(serviceusers));
      console.log("function fetchserviceuseraction called");
    } catch (error) {
      dispatch(getServiceUserFailure());
    }
  };
}

export function createNewServiceUser(data) {
  return async (dispatch) => {
    try {
      axios.post(BASE_URL, data).then((res) => {
        console.log("SERVICERESSS", res);
        dispatch(createServiceUser(res));
      });
    } catch (error) {
      console.log(error);
    }
  };
}
