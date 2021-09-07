import React, { useEffect, Fragment } from "react";

import { connect, useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import Spinner from "../layout/Spinner";
import PostsItem from "./PostsItem";
import PostForm from "./PostForm";
const Posts = (props) => {
	const dispatch = useDispatch();
	const post = useSelector((state) => state.post);
	useEffect(() => {
		dispatch(getPosts());
	}, []);
	const postsList =
		post.posts === null || post.loading === true ? (
			<Spinner />
		) : (
			post.posts.map((item) => <PostsItem key={item._id} post={item} />)
		);
	return (
		<Fragment>
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Welcome to the community!
			</p>
			<PostForm />

			<div className="posts">{postsList}</div>
		</Fragment>
	);
};

export default connect(null, { getPosts })(Posts);
