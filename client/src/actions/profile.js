import axios from "axios";
import { setAlert } from "./alert";

import { PROFILE_ERROR, GET_PROFILE } from "./types";

//get current profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
		dispatch({
			type: PROFILE_ERROR,
			//https://axios-http.com/docs/handling_errors
			//err.response.data = backend return
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

//create/update profile
export const createProfile =
	(formData, history, edit = false) =>
	async (dispatch) => {
		try {
			const axiosConfig = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const res = await axios.post("/api/profile", formData, axiosConfig);
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
			dispatch(
				setAlert(
					edit ? "Profile updated" : "Profile created",
					"success"
				)
			);

			if (!edit) {
				history.push("/dashboard");
			}
		} catch (err) {
			console.log(err.response);
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: PROFILE_ERROR,
				//https://axios-http.com/docs/handling_errors
				//err.response.data = backend return
				payload: {
					msg: err.response.statusText, //bad request
					status: err.response.status, //400
				},
			});
		}
	};
