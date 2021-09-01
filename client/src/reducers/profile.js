import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_PROFILES,
} from "../actions/types";

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
		case CLEAR_PROFILE:
			return {
				...state,
				loading: false,
				profile: null,
				repo: [],
			};
		case UPDATE_PROFILE:
			return {
				...state,
				loading: false,
				profile: action.payload,
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}
