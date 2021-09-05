import React, { useEffect, Fragment } from "react";

import { connect, useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Spinner from "../layout/Spinner";

const Posts = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPosts());
	}, []);
	return (
		<Fragment>
			<div>posts</div>
		</Fragment>
	);
};

export default connect(null, { getPosts })(Posts);
