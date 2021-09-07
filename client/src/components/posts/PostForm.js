import React, { Fragment, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { addPost } from "../../actions/posts";

const PostForm = (props) => {
	const [text, setText] = useState("");
	const dispatch = useDispatch();

	const onChange = (e) => {
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(addPost(text));
	};
	return (
		<Fragment>
			<div className="post-form">
				<div className="bg-primary p">
					<h3>Say Something...</h3>
				</div>
				<form onSubmit={onSubmit} className="form my-1">
					<textarea
						name="text"
						cols="30"
						rows="5"
						placeholder="Create a post"
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

export default connect(null, { addPost })(PostForm);
