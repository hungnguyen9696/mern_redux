import { combineReducers } from "redux";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	post: postReducer,
});

export default rootReducer;
