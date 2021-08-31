import React, { Fragment, useState } from "react";

import { connect, useDispatch } from "react-redux";
import { addEducation } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";

const AddEducation = (props) => {
	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
	});

	const history = props.history;
	const dispatch = useDispatch();

	const { school, degree, fieldofstudy, from, to, current, description } =
		formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(addEducation(formData, history));
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Add An Education</h1>
			<p className="lead">
				<i className="fas fa-code-branch"></i> Add any degree that you
				have had in the past
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="* School"
						name="school"
						required
						value={school}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* degree"
						name="degree"
						required
						value={degree}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Field of study"
						name="fieldofstudy"
						value={fieldofstudy}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input
						type="date"
						name="from"
						value={from}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							value={current}
							onChange={(e) => {
								setFormData({ ...formData, current: !current });
							}}
						/>{" "}
						Current School
					</p>
				</div>
				<div className="form-group">
					<h4>To Date</h4>
					<input
						type="date"
						name="to"
						value={to}
						onChange={onChange}
						disabled={current}
					/>
				</div>
				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						placeholder="Program Description"
						value={description}
						onChange={onChange}
					></textarea>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

export default connect(null, { addEducation })(withRouter(AddEducation));
//withRouter let component access match, history, location
