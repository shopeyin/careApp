import ServiceUserActionTypes from "./serviceuser-type";
const INITIAL_STATE = {
  serviceUsers: [],
  loading: false,
  hasErrors: false,
};

const serviceUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ServiceUserActionTypes.GET_SERVICEUSERS:
      return { ...state, loading: true };

    case ServiceUserActionTypes.SET_SERVICEUSERS:
      return { serviceUsers: action.payload, loading: false, hasErrors: false };

    case ServiceUserActionTypes.GET_SERVICEUSERS_FAILURE:
      return { ...state, loading: false, hasErrors: true };

    case ServiceUserActionTypes.CREATE_SERVICEUSER:
      //console.log("created", action.payload);
      return state;
    default:
      return state;
  }
};

export default serviceUserReducer;
