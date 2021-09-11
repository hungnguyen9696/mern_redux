import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect, useSelector, useDispatch } from "react-redux";
import { likePost, removePost } from "../../actions/posts";

const PostsItem = ({ post }) => {
	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const onClick = () => {
		dispatch(likePost(post._id));
	};

	const remove = () => {
		dispatch(removePost(post._id));
	};
	return (
		<Fragment>
			<div className="post bg-white p-1 my-1">
				<div>
					<Link to={`/profile/${post.user}`}>
						<img className="round-img" src={post.avatar} alt="" />
						<h4>{post.name}</h4>
					</Link>
				</div>
				<div>
					<p className="my-1">{post.text}</p>
					<p className="post-date">
						Posted on
						<Moment format="YYYY/MM/DD">{post.date}</Moment>
					</p>
					<button
						onClick={onClick}
						type="button"
						className="btn btn-light"
					>
						<i className="fas fa-thumbs-up"></i>{" "}
						{post.likes.length > 0 && (
							<span>{post.likes.length}</span>
						)}
					</button>

					<Link to={`/post/${post._id}`} className="btn btn-primary">
						Comment{" "}
						{post.comments.length > 0 && (
							<span className="comment-count">
								{post.comments.length}
							</span>
						)}
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === post.user && (
							<button
								onClick={remove}
								type="button"
								className="btn btn-danger"
							>
								Delete
							</button>
						)}
				</div>
			</div>
		</Fragment>
	);
};

export default connect(null)(PostsItem);
