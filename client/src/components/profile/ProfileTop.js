import React, { Fragment } from "react";

const ProfileTop = ({
	profile: {
		user: { _id, name, avatar },
		status,
		company,
		location,
		skills,
		linkedin,
	},
}) => {
	return (
		<Fragment>
			<div className="profile-top bg-primary p-2">
				<img className="round-img my-1" src={avatar} alt="" />
				<h1 className="large">{name}</h1>
				<p className="lead">
					{status} {company && <span> at {company}</span>}
				</p>
				<p>{location && <span>{location}</span>}</p>
				<div className="icons my-1">
					{linkedin && (
						<a
							href={linkedin}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-linkedin fa-2x"></i>
						</a>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileTop;
