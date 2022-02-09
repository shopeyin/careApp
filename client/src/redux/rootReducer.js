import { combineReducers } from "redux";
import serviceUserReducer from "./serviceUser/serviceuser-reducer";
import remountReducer from "./remount/remount-reducer";
import CarerReducer from "./carer/carer-reducer";

const rootReducer = combineReducers({
  serviceUsers: serviceUserReducer,
  carers: CarerReducer,
  remount: remountReducer,
});
export default rootReducer;
