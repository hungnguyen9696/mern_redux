import React, { Fragment } from "react";
import Moment from "react-moment";

const ProfileEducation = ({ education }) => {
	const eduList = education.map((item) => (
		<div key={item._id}>
			<h3 className="text-dark">{item.school}</h3>
			<Moment format="YYYY/MM/DD">{item.from}</Moment> -{" "}
			{item.to === null ? (
				"Current"
			) : (
				<Moment format="YYYY/MM/DD">{item.to}</Moment>
			)}
			<p>
				<strong>Degree: </strong>
				{item.degree}
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
	return <Fragment>{eduList}</Fragment>;
};

export default ProfileEducation;
