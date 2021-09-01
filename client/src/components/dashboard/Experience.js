import React, { Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

//https://www.npmjs.com/package/react-moment
const Experience = (props) => {
	const dispatch = useDispatch();
	const experiencesList = props.experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className="hide-sm">{exp.title}</td>
			<td>
				<Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
				{exp.to === null ? (
					"Now"
				) : (
					<Moment format="YYYY/MM/DD">{exp.to}</Moment>
				)}
			</td>
			<td>
				<button
					onClick={() => dispatch(deleteExperience(exp._id))}
					className="btn btn-danger"
				>
					Delete
				</button>
			</td>
		</tr>
	));
	return (
		<Fragment>
			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm">Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{experiencesList}</tbody>
			</table>
		</Fragment>
	);
};

export default connect(null, { deleteExperience })(Experience);
