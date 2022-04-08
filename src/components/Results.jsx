import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import Loader from "./Loader";

import { getResults } from "../helpers/getResults";
import { getResultsRequest, getResultsSuccess, getResultsFailure } from "../redux/results.slice";

const Results = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	// console.log(pathname);

	const { searchTerm, isLoading, data } = useSelector((state) => state.result);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let type;

				if (pathname === "/images") {
					type = "/image";
				} else if (pathname === "/videos") {
					type = "/video";
				} else {
					type = pathname;
				}

				dispatch(getResultsRequest());

				const response = await getResults({
					type: type,
					searchTerm: searchTerm || "Javascript Mastery",
				});

				dispatch(getResultsSuccess(response));
			} catch (error) {
				console.log(error.message);
				dispatch(getResultsFailure(error.message));
			}
		};

		fetchData();
	}, [dispatch, searchTerm, pathname]);

	if (isLoading) return <Loader />;

	switch (pathname) {
		case "/search":
			return (
				<div className="flex flex-wrap justify-between space-y-6 sm:px-56">
					{data?.map(({ title, link }, i) => (
						<div key={i} className="md:w-2/5 w-full">
							<a href={link} rel="noopener noreferrer" target="_blank">
								<p className="text-sm">
									{link.length > 30 ? link.substring(0, 30) + "..." : link}
								</p>
								<p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
									{title}
								</p>
							</a>
						</div>
					))}
				</div>
			);

		case "/news":
			return (
				<div className="flex flex-wrap justify-between space-y-6 sm:px-56">
					{data?.map(({ title, links, id, source }, index) => (
						<div key={id || index} className="md:w-2/5 w-full">
							<a
								href={links?.[0].href}
								rel="noopener noreferrer"
								target="_blank"
								className="hover:underline"
							>
								<p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
							</a>

							<div className="flex gap-4">
								<a href={source?.href} target="_blank" rel="noreferrer">
									{source?.href}
								</a>
							</div>
						</div>
					))}
				</div>
			);

		case "/videos":
			return (
				<div className="flex flex-wrap">
					{data?.map((video, index) => (
						<div key={index} className="p-2">
							{video?.additional_links?.[0].href && (
								<ReactPlayer
									url={video?.additional_links?.[0].href}
									controls
									width={"355px"}
									height="200px"
								/>
							)}
						</div>
					))}
				</div>
			);

		case "/images":
			return (
				<div className="flex flex-wrap justify-center items-center">
					{data?.map(({ image, link: { href, title } }, i) => (
						<a
							className="sm:p-3 p-5"
							href={href}
							key={i}
							rel="noopener noreferrer"
							target="_blank"
						>
							<img src={image?.src} alt={title} loading="lazy" />
							<p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
						</a>
					))}
				</div>
			);

		default:
			return "ERROR";
	}
};

export default Results;
