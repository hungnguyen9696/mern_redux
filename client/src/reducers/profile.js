import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false,
			};
		case PROFILE_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
}
