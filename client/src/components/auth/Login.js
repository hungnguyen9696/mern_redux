import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const { email, password } = formData;

	const onChange = (e) => {
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		dispatch(login(email, password));
	};

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<Fragment>
			<h1 className="large text-primary">Signin</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Signin to your account
			</p>
			<form onSubmit={onSubmit} className="form">
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={onChange}
					/>
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

				<input
					type="submit"
					className="btn btn-primary"
					value="Login"
				/>
			</form>
			<p className="my-1">
				Dont have an account? <Link to="/register">Signup</Link>
			</p>
		</Fragment>
	);
};

export default connect(null, { login })(Login);
