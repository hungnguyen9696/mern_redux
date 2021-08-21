import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	AUTH_ERROR,
	USER_LOADED,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("/api/auth");
		//user returned, everything but password
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const register = (email, name, password) => async (dispatch) => {
	const axiosConfig = {
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
			"Access-Control-Allow-Origin": "*",
		},
	};
	const newUser = { email: email, name: name, password: password };
	const body = JSON.stringify(newUser);

	try {
		const res = await axios.post("/api/users", body, axiosConfig);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		//https://axios-http.com/docs/handling_errors
		//err.response.data = backend return
		console.log(err.response.data);
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}
		dispatch({
			type: REGISTER_FAIL,
		});
	}
};
