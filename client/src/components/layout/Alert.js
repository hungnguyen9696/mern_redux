import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
	const alert = useSelector((state) => state.alert);

	const alertMessage =
		alert !== null &&
		alert.length > 0 &&
		alert.map((item) => (
			<div key={item.id} className={`alert alert-${item.alertType}`}>
				{item.msg}
			</div>
		));

	return alertMessage;
};

//const mapStateToProps = (state) => ({ alert: state.alert });

export default Alert;
