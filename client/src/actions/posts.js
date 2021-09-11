import axios from "axios";
import { setAlert } from "./alert";

import { GET_POSTS, POST_ERROR, ADD_POST, UPDATE_LIKES } from "./types";

//get all posts
export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/posts");

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);

		dispatch({
			type: POST_ERROR,
			//https://axios-http.com/docs/handling_errors
			//err.response.data = backend return
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
	}
};

//create/add post
export const addPost = (text) => async (dispatch) => {
	const axiosConfig = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		const res = await axios.post("/api/posts", text, axiosConfig);
		dispatch({
			type: ADD_POST,
			payload: res.data,
		});
		dispatch(setAlert("Post created", "success"));
	} catch (err) {
		console.log(err.response);

		dispatch({
			type: POST_ERROR,
			//https://axios-http.com/docs/handling_errors
			//err.response.data = backend return
			payload: {
				msg: err.response.statusText, //bad request
				status: err.response.status, //400
			},
		});
	}
};

//like/unlike a post
export const likePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/posts/like/${postId}`);
		//res: new array of likes
		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
		});
	} catch (err) {
		console.log(err.response);

		dispatch({
			type: POST_ERROR,
			//https://axios-http.com/docs/handling_errors
			//err.response.data = backend return
			payload: {
				msg: err.response.statusText, //bad request
				status: err.response.status, //400
			},
		});
	}
};
