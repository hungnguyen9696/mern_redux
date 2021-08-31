import React, { Fragment, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = (props) => {
	const profile = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		props.getCurrentProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return auth.loading && profile.profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large-text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user">
					Welcome {auth.user && auth.user.name}
				</i>
			</p>

			{profile.profile !== null ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.profile.experience} />
				</Fragment>
			) : (
				<Fragment>
					<p>You dont have a profile yet</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						{" "}
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

export default connect(null, { getCurrentProfile })(Dashboard);
