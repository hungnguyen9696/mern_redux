import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";

//https://stackoverflow.com/questions/36426521/what-does-export-default-do-in-jsx/36426988
import "./App.css";

import { loadUser } from "./actions/auth";
import store from "./store";

const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			store.dispatch(loadUser());
		}
	}, []);
	return (
		<Router>
			<Fragment>
				<Navbar />
				<Route exact path="/" component={Landing} />
				<section className="container">
					<Alert />
					<Switch>
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
					</Switch>
				</section>
			</Fragment>
		</Router>
	);
};

export default App;
