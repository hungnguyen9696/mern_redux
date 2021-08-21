import axios from "axios";

//set global token header for all request once we have token in header
//https://github.com/axios/axios#global-axios-defaults
const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["x-auth-token"] = token;
	} else {
		delete axios.defaults.headers.common["x-auth-token"];
	}
};

export default setAuthToken;
