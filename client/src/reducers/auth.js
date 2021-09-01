import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	DELETE_ACCOUNT,
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};

		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
		case DELETE_ACCOUNT:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			};

		case USER_LOADED:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loading: false,
			};

		default:
			return state;
	}
}
