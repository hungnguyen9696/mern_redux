import React, { useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { getPostById } from "../../actions/posts";
import Spinner from "../layout/Spinner";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const Post = (props) => {
	//postId is not a random one.
	//It comes from <Route path="" component={Post}/>
	const { postId } = useParams();
	const dispatch = useDispatch();

	const post = useSelector((state) => state.post);

	useEffect(() => {
		dispatch(getPostById(postId));
	}, []);

	return (
		<Fragment>
			{post.post === null || post.loading === true ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/posts" className="btn">
						Back To Posts
					</Link>
					<div className="post bg-white p-1 my-1">
						<div>
							<Link to={`/profile/${post.post.user}`}>
								<img
									className="round-img"
									src={post.post.avatar}
									alt=""
								/>
								<h4>{post.post.name}</h4>
							</Link>
						</div>
						<div>
							<p className="my-1">{post.post.text}</p>
						</div>
					</div>

					<CommentForm postId={postId} />

					<div className="comments">
						{post.post.comments.map((item) => (
							<CommentItem
								key={item._id}
								comment={item}
								postId={postId}
							/>
						))}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default connect(null, { getPostById })(Post);
