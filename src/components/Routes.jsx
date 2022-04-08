import React from "react";
import { Route, Routes as AllRoutes, Navigate } from "react-router-dom";
import Results from "./Results";

const Routes = () => {
	return (
		<div className="p-4">
			<AllRoutes>
				<Route path="/" element={<Navigate to={"/search"} />} />
				{["/search", "/images", "/news", "/videos"].map((path, i) => (
					<Route path={path} element={<Results />} key={i} />
				))}
			</AllRoutes>
		</div>
	);
};

export default Routes;
