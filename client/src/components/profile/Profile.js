import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link, useHistory, useParams } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";

const Profile = (props) => {
	const profile = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	//userId is not a random one.
	//It comes from <Route path="/profile/:userId" component={Profile}/>
	const { userId } = useParams();
	useEffect(() => {
		dispatch(getProfileById(userId));
	}, []);
	//logged in user can only see edit profile button on their own profile
	return (
		<Fragment>
			{profile.profile === null || profile.loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/profiles" className="btn btn-light">
						Back to profiles
					</Link>

					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.profile.user._id && (
							<Link to="/edit-profile" className="btn btn-dark">
								Edit your profile
							</Link>
						)}

					<div class="profile-grid my-1">
						<ProfileTop profile={profile.profile} />
						<ProfileAbout profile={profile.profile} />
						<div className="profile-exp bg-white p-2">
							<h2 className="text-primary">Experience</h2>
							{profile.profile.experience &&
							profile.profile.experience.length > 0 ? (
								<ProfileExperience
									experience={profile.profile.experience}
								/>
							) : (
								<h4>No experience credentials</h4>
							)}
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default connect(null, { getProfileById })(Profile);
