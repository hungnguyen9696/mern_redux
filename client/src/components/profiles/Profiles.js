import React, { Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = (props) => {
	const dispatch = useDispatch();
	const profiles = useSelector((state) => state.profile.profiles);
	const loading = useSelector((state) => state.profile.loading);

	useEffect(() => {
		dispatch(getProfiles());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className="large text-primary">Developers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop"></i>
						Browse and connect with other developers
					</p>

					<div className="profiles">
						{profiles.length > 0 ? (
							profiles.map((item) => (
								<ProfileItem key={item._id} profile={item} />
							))
						) : (
							<h4> No profiles found </h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default connect(null, { getProfiles })(Profiles);
