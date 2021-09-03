import React, { Fragment } from "react";
import Moment from "react-moment";

const ProfileExperience = ({ experience }) => {
	const expList = experience.map((item) => (
		<div key={item._id}>
			<h3 className="text-dark">{item.company}</h3>
			<Moment format="YYYY/MM/DD">{item.from}</Moment> -{" "}
			{item.to === null ? (
				"Current"
			) : (
				<Moment format="YYYY/MM/DD">{item.to}</Moment>
			)}
			<p>
				<strong>Position: </strong>
				{item.title}
			</p>
			{item.description && (
				<p>
					{" "}
					<strong>Description: </strong>
					{item.description}{" "}
				</p>
			)}
		</div>
	));
	return <Fragment>{expList}</Fragment>;
};

export default ProfileExperience;
