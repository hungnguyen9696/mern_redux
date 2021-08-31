import React, { Fragment, useState, useEffect } from "react";

import { createProfile, getCurrentProfile } from "../../actions/profile";

import { connect, useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const EditProfile = (props) => {
	const [formData, setFormData] = useState({
		status: "",
		company: "",
		website: "",
		location: "",
		skills: "",
		githubusername: "",
		bio: "",
		linkedin: "",
	});
	//get current profile data
	const profile = useSelector((state) => state.profile.profile);
	const loading = useSelector((state) => state.profile.loading);
	const dispatch = useDispatch();
	const history = props.history;
	const {
		status,
		company,
		website,
		location,
		bio,
		skills,
		githubusername,
		linkedin,
	} = formData;

	const onChange = (e) => {
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		console.log("success");
		dispatch(createProfile(formData, history, true));
	};

	useEffect(() => {
		dispatch(getCurrentProfile());
		setFormData({
			status: loading || profile.status ? profile.status : "",
			company: loading || profile.company ? profile.company : "",
			website: loading || profile.website ? profile.website : "",
			location: loading || profile.location ? profile.location : "",
			skills: loading || profile.skills ? profile.skills.join() : "",
			githubusername:
				loading || profile.githubusername ? profile.githubusername : "",
			bio: loading || profile.bio ? profile.bio : "",
			linkedin: loading || profile.linkedin ? profile.linkedin : "",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, getCurrentProfile]);

	return (
		<Fragment>
			<h1 className="large text-primary">Edit Your Profile</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Let's get some information to
				make your profile stand out
			</p>
			<small>* = required field</small>
			<form onSubmit={onSubmit} className="form">
				<div className="form-group">
					<select name="status" value={status} onChange={onChange}>
						<option value="0">* Select Professional Status</option>
						<option value="Developer">Developer</option>
						<option value="Junior Developer">
							Junior Developer
						</option>
						<option value="Senior Developer">
							Senior Developer
						</option>
						<option value="Manager">Manager</option>
						<option value="Student">Student</option>
						<option value="Instructor">
							Instructor or Teacher
						</option>
						<option value="Intern">Intern</option>
						<option value="Other">Other</option>
					</select>
					<small className="form-text">
						Are you studying or working?
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Company"
						name="company"
						value={company}
						onChange={onChange}
					/>
					<small className="form-text">
						What company are you working for?
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Website"
						name="website"
						value={website}
						onChange={onChange}
					/>
					<small className="form-text">
						Personal website/blog/etc
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Skills"
						name="skills"
						value={skills}
						onChange={onChange}
					/>
					<small className="form-text">
						Please use comma separated values (eg.
						HTML,CSS,JavaScript,PHP)
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Github Username"
						name="githubusername"
						value={githubusername}
						onChange={onChange}
					/>
					<small className="form-text">
						Show what you have created
					</small>
				</div>
				<div className="form-group">
					<textarea
						placeholder="A short bio of yourself"
						name="bio"
						value={bio}
						onChange={onChange}
					></textarea>
					<small className="form-text">
						Tell us a little about yourself
					</small>
				</div>

				<div className="form-group ">
					<input
						type="text"
						placeholder="Linkedin URL"
						name="linkedin"
						value={linkedin}
						onChange={onChange}
					/>
					<small className="form-text">Let's connect</small>
				</div>

				<input type="submit" className="btn btn-primary my-1" />
				<Link to="/dashboard" className="btn btn-light my-1">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

export default connect(null, { createProfile, getCurrentProfile })(
	withRouter(EditProfile)
);
//withRouter let component access match, history, location
