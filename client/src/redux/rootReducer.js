import { combineReducers } from "redux";
import serviceUserReducer from "./serviceUser/serviceuser-reducer";
import remountReducer from "./remount/remount-reducer";
import CarerReducer from "./carer/carer-reducer";
import userReducer from "./user/user-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  serviceUsers: serviceUserReducer,
  carers: CarerReducer,
  remount: remountReducer,
});
export default rootReducer;
