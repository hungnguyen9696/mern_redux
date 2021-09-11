import React, { Fragment, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { addComment } from "../../actions/posts";

const CommentForm = ({ postId }) => {
	const [data, setData] = useState({
		text: "",
	});
	const { text } = data;
	const dispatch = useDispatch();

	const onChange = (e) => {
		setData({ text: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(addComment(data, postId));
		setData({ text: "" });
	};
	return (
		<Fragment>
			<div className="post-form">
				<div className="bg-primary p">
					<h3>Leave A Comment</h3>
				</div>
				<form onSubmit={onSubmit} className="form my-1">
					<textarea
						name="text"
						cols="30"
						rows="5"
						placeholder="Comment on this post"
						required
						value={text}
						onChange={onChange}
					></textarea>
					<input
						type="submit"
						className="btn btn-dark my-1"
						value="Submit"
					/>
				</form>
			</div>
		</Fragment>
	);
};

export default connect(null, { addComment })(CommentForm);
