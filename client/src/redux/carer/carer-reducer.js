import CarerActionTypes from "./carer-type";

const INITIAL_STATE = {
  carers: [],
  loading: false,
  hasErrors: false,
};

const CarerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CarerActionTypes.GET_CARERS:
      return { ...state, loading: true };

    case CarerActionTypes.SET_CARERS:
      return { carers: action.payload, loading: false, hasErrors: false };

    case CarerActionTypes.GET_CARERS_FAILURE:
      return { ...state, loading: false, hasErrors: true };

    case CarerActionTypes.CREATE_CARERS:
      return state;
    default:
      return state;
  }
};

export default CarerReducer;
