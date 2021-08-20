import { REGISTER_FAIL, REGISTER_SUCCESS } from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case REGISTER_SUCCESS:

		case REGISTER_FAIL:

		default:
			return state;
	}
}
