import React from "react";
import { Route, Redirect } from "react-router-dom";

import { connect, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";

//...rest= exact, path, etc
const PrivateRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const loading = useSelector((state) => state.auth.loading);
	return (
		<Route
			{...rest}
			render={(props) =>
				loading ? (
					<Spinner />
				) : !isAuthenticated ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default connect(null)(PrivateRoute);
