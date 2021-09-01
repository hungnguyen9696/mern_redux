import React, { Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = (props) => {
	const profile = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

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
					<Education education={profile.profile.education} />

					<div className="my-2">
						<button
							className="btn btn-danger"
							onClick={() => dispatch(deleteAccount())}
						>
							<i className="fas fa-user-minus"></i>
							Delete My Account
						</button>
					</div>
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

export default connect(null, { getCurrentProfile, deleteAccount })(Dashboard);
