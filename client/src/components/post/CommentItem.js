import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect, useSelector, useDispatch } from "react-redux";
import { deleteCommentById } from "../../actions/posts";

const CommentItem = ({ comment, postId }) => {
	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const onClick = () => {
		dispatch(deleteCommentById(postId, comment._id));
	};
	return (
		<Fragment>
			<div className="post bg-white p-1 my-1">
				<div>
					<Link to={`/profile/${comment.user}`}>
						<img
							className="round-img"
							src={comment.avatar}
							alt=""
						/>
						<h4>{comment.name}</h4>
					</Link>
				</div>
				<div>
					<p className="my-1">{comment.text}</p>
					<p className="post-date">
						Posted on{" "}
						<Moment format="YYYY/MM/DD">{comment.date}</Moment>
					</p>

					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === comment.user && (
							<button
								onClick={onClick}
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

export default connect(null, { deleteCommentById })(CommentItem);
