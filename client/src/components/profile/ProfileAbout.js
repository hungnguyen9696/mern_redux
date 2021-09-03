import React, { Fragment } from "react";

const ProfileAbout = ({
	profile: {
		user: { _id, name, avatar },
		status,
		company,
		location,
		skills,
		linkedin,
		bio,
	},
}) => {
	const skillsList = skills.map((item, index) => (
		<div key={index} className="p-1">
			<i className="fa fa-check"></i> {item}
		</div>
	));
	return (
		<Fragment>
			<div className="profile-about bg-light p-2">
				{bio && (
					<Fragment>
						<h2 className="text-primary">{name}'s Bio</h2>
						<p>{bio}</p>
						<div className="line"></div>
					</Fragment>
				)}

				<h2 className="text-primary">Skill Set</h2>
				<div className="skills">{skillsList}</div>
			</div>
		</Fragment>
	);
};

export default ProfileAbout;
