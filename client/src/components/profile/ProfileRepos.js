import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGithubRepos } from "../../actions/profile";
import { connect, useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";

const ProfileRepos = ({ githubusername }) => {
	const profile = useSelector((state) => state.profile);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getGithubRepos(githubusername));
	}, []);

	//use Postman to fetch github repo to see how response obj look like
	//(html_url, name, description, stargazers_count,...)
	const reposList =
		profile.repos === null ? (
			<Spinner />
		) : (
			profile.repos.map((item) => (
				<div key={item.id} className="repo bg-white p-1 my-1">
					<div>
						<h4>
							<a
								// href={`/https://github.com/${item.full_name}`} doesnt work

								href={item.html_url}
								target="_blank"
								rel="noopener noreferrer"
							>
								{item.name}
							</a>
						</h4>
						{item.description && <p>{item.description}</p>}
					</div>
					<div>
						<ul>
							<li className="badge badge-primary">
								Stars: {item.stargazers_count}
							</li>
							<li className="badge badge-dark">
								Watchers: {item.watchers_count}
							</li>
							<li className="badge badge-light">
								Forks: {item.forks_count}
							</li>
						</ul>
					</div>
				</div>
			))
		);
	return (
		<Fragment>
			<div className="profile-github">
				<h2 className="text-primary my-1">
					<i className="fab fa-github"></i> Github Repos
				</h2>
				{reposList}
			</div>
		</Fragment>
	);
};

export default connect(null, { getGithubRepos })(ProfileRepos);
