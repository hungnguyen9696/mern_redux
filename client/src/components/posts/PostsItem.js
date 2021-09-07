import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const PostsItem = ({ post }) => {
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
					<button type="button" className="btn btn-light">
						<i className="fas fa-thumbs-up"></i>
						<span>{post.likes.length}</span>
					</button>

					<Link to={`/post/${post._id}`} className="btn btn-primary">
						Comment{" "}
						<span className="comment-count">
							{post.comments.length}
						</span>
					</Link>
					<button type="button" className="btn btn-danger">
						Delete
					</button>
				</div>
			</div>
		</Fragment>
	);
};

export default PostsItem;
