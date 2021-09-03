import React from "react";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const logoutUser = () => {
		dispatch(logout());
	};
	const authLinks = (
		<ul>
			<li>
				<Link to="/dashboard">
					<i className="fas fa-user" />{" "}
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/" onClick={logoutUser}>
					<i className="fas fa-sign-out-alt" />{" "}
					<span className="hide-sm">Logout</span>
				</Link>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>

			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	const trueLink = isAuthenticated ? authLinks : guestLinks;

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fas fa-code"></i> DevConnector
				</Link>
			</h1>
			{trueLink}
		</nav>
	);
};

export default connect(null, { logout })(Navbar);
