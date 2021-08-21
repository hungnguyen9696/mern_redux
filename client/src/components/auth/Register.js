import React, { Fragment, useState } from "react";

import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Register = (props) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const dispatch = useDispatch();

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const { name, email, password, password2 } = formData;

	const onChange = (e) => {
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			//props.setAlert("password not match", "danger");
			dispatch(setAlert("password not match", "danger"));
		} else {
			console.log("success");
			dispatch(register(email, name, password));
			// console.log(formData);
			// const newUser = {
			// 	name: name,
			// 	email: email,
			// 	password: password,
			// 	password2: password2,
			// };
			// try {
			// 	let axiosConfig = {
			// 		headers: {
			// 			"Content-Type": "application/json;charset=UTF-8",
			// 			"Access-Control-Allow-Origin": "*",
			// 		},
			// 	};
			// 	const body = JSON.stringify(newUser);
			// 	const res = await axios.post(
			// 		"/api/users",
			// 		newUser,
			// 		axiosConfig
			// 	);
			// 	console.log(res.data);
			// } catch (err) {
			// 	console.error(err.response.data);
			// }
		}
	};

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Fragment>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Create Your Account
			</p>
			<form onSubmit={onSubmit} className="form">
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={onChange}
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image,
						use a Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={onChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						value={password2}
						onChange={onChange}
					/>
				</div>
				<input
					type="submit"
					className="btn btn-primary"
					value="Register"
				/>
			</form>
			<p className="my-1">
				Already have an account? <Link to="/login">Signin</Link>
			</p>
		</Fragment>
	);
};

export default connect(null, { setAlert, register })(Register);
//https://react-redux.js.org/api/connect
