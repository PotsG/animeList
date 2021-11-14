import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import AnimeOverview from './common/animeOverview';

const AnimeRender = () => {
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState(null);
	const [count, setCount] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(0);

	useEffect(() => {
		const fetchData = async (currentPage = 1) => {
			const limit = 20;
			const url = `https://kitsu.io/api/edge/anime?page[limit]=${limit}`;
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'application/vnd.api+json',
					'Content-Type': 'application/vnd.api+json',
				},
			});
			const data = await response.json();
			setItems(data.data);
			setLoading(false);
			setCount(data.meta.count);
			setPageCount(Math.ceil(count / itemsPerPage));
			setItemsPerPage(limit);
			console.log(data);

			//TODO create handleButton Click with new call
			//TODO add styles to the pagination
		};
		fetchData();
	}, []);

	return (
		<React.Fragment>
			<AnimeOverview data={items} loading={loading} />
			<ReactPaginate pageCount={pageCount} />
		</React.Fragment>
	);
};

export default AnimeRender;
