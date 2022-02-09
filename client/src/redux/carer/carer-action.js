import CarerActionTypes from "./carer-type";
import axios from "axios";

export const BASE_URL = "http://127.0.0.1:1000/api/v1/users";

export const getCarers = () => ({
  type: CarerActionTypes.GET_CARERS,
});

export const setCarer = (carer) => ({
  type: CarerActionTypes.SET_CARERS,
  payload: carer,
});

export const getCarerFailure = () => ({
  type: CarerActionTypes.GET_CARERS_FAILURE,
});

export const createCarer = (carer) => ({
  type: CarerActionTypes.CREATE_CARERS,
  payload: carer,
});

export function fetchCarers() {
  return async (dispatch) => {
    dispatch(getCarers());

    try {
      const carerData = await axios.get(BASE_URL);

      let {
        data: {
          data: { users },
        },
      } = carerData;

      dispatch(setCarer(users));
      console.log("function fetcCARERaction called");
    } catch (error) {
      dispatch(getCarerFailure());
    }
  };
}

export function createNewCarer(data, callBack) {
  return async (dispatch) => {
    try {
      axios.post(BASE_URL, data).then((res) => {
        console.log("RESSS", res);

        dispatch(createCarer(res));
        callBack();
      });
    } catch (error) {
      console.log(error);
    }
  };
}
