import { combineReducers } from "redux";
import serviceUserReducer from "./serviceUser/serviceuser-reducer";
import remountReducer from "./remount/remount-reducer";

const rootReducer = combineReducers({
  serviceUsers: serviceUserReducer,
  remount: remountReducer,
});
export default rootReducer;
