import axios from "axios";
import { setAlert } from "./alert";

import { GET_POSTS, POST_ERROR } from "./types";

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
