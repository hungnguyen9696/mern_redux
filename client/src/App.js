import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

//https://stackoverflow.com/questions/36426521/what-does-export-default-do-in-jsx/36426988
import "./App.css";

import { loadUser } from "./actions/auth";
import store from "./store";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";

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
						<Route exact path="/profiles" component={Profiles} />
						<Route
							exact
							path="/profile/:userId"
							component={Profile}
						/>
						<PrivateRoute
							exact
							path="/dashboard"
							component={Dashboard}
						/>
						<PrivateRoute
							exact
							path="/create-profile"
							component={CreateProfile}
						/>
						<PrivateRoute
							exact
							path="/edit-profile"
							component={EditProfile}
						/>
						<PrivateRoute
							exact
							path="/add-experience"
							component={AddExperience}
						/>
						<PrivateRoute
							exact
							path="/add-education"
							component={AddEducation}
						/>
					</Switch>
				</section>
			</Fragment>
		</Router>
	);
};

export default App;
