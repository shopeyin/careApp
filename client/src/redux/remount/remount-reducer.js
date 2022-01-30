import remountActionTypes from "./remount-type";
const INITIAL_STATE = {
  reload: false,
};

const remountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case remountActionTypes.REMOUNT:
      return { reload: !state.reload };

    default:
      return state;
  }
};

export default remountReducer;
