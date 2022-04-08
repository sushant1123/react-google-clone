import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
	return (
		<div className="flex justify-center items-center">
			<RotatingLines width="100" />
		</div>
	);
};

export default Loader;
