import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = (props) => {
	const profile = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		props.getCurrentProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <div>dashboard</div>;
};

export default connect(null, { getCurrentProfile })(Dashboard);
