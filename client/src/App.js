import { Fragment } from "react";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
//https://stackoverflow.com/questions/36426521/what-does-export-default-do-in-jsx/36426988
import "./App.css";

const App = () => {
	return (
		<Fragment>
			<Navbar />
			<Landing />
		</Fragment>
	);
};

export default App;
