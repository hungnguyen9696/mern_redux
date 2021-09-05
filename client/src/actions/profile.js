import axios from "axios";
import { setAlert } from "./alert";

import {
	PROFILE_ERROR,
	GET_PROFILE,
	UPDATE_PROFILE,
	DELETE_ACCOUNT,
	CLEAR_PROFILE,
	GET_PROFILES,
	GET_REPOS,
} from "./types";

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
			type: CLEAR_PROFILE,
		});
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

//add experience
export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const axiosConfig = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const res = await axios.put(
			"/api/profile/experience",
			formData,
			axiosConfig
		);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Experience updated", "success"));

		history.push("/dashboard");
	} catch (err) {
		console.log(err.response);
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
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

//add education
export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const axiosConfig = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const res = await axios.put(
			"/api/profile/education",
			formData,
			axiosConfig
		);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Education updated", "success"));

		history.push("/dashboard");
	} catch (err) {
		console.log(err.response);
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
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

//delete experience
export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Experience deleted", "success"));
	} catch (err) {
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

//delete education
export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert("Education deleted", "success"));
	} catch (err) {
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

//delete account and profile (back to login)
export const deleteAccount = () => async (dispatch) => {
	if (window.confirm("Are you sure? This cant be undone!")) {
		try {
			const res = await axios.delete("/api/profile/");
			dispatch({
				type: CLEAR_PROFILE,
			});
			dispatch({
				type: DELETE_ACCOUNT,
			});
			dispatch(setAlert("Account deleted", "success"));
		} catch (err) {
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
	}
};

//get all profiles
export const getProfiles = () => async (dispatch) => {
	dispatch({
		type: CLEAR_PROFILE,
	});

	try {
		const res = await axios.get("/api/profile/all");

		dispatch({
			type: GET_PROFILES,
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

//get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);

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

//get github repos
export const getGithubRepos = (username) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/github/${username}`);

		dispatch({
			type: GET_REPOS,
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
