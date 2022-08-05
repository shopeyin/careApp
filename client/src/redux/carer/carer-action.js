import CarerActionTypes from "./carer-type";
import axios from "axios";
import { BASE_URL } from "../../App";


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
      const carerData = await axios.get(`${BASE_URL}/carers`);

      let {
        data: {
          data: { users },
        },
      } = carerData;

      dispatch(setCarer(users));
    } catch (error) {
      dispatch(getCarerFailure());
    }
  };
}

export function createNewCarer(dataInfo, callBack) {
  return async (dispatch) => {
    try {
      const newCarer = await axios.post(`${BASE_URL}/carers`, dataInfo);
      

      let {
        data: { user },
      } = newCarer;
      console.log("DATA", user);

      dispatch(createCarer(user));
      callBack();
    } catch (error) {
      console.log(error.message);
    }
  };
}

//
