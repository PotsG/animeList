import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import AnimeOverview from './common/animeOverview';

const AnimeRender = () => {
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const totalCount = useRef(0);
	const itemsPerPage = useRef(0);

	const handlePageClick = (event) => {
		console.log(totalCount);
		const newOffset =
			(event.selected * itemsPerPage.current) % totalCount.current;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

	useEffect(() => {
		const fetchData = async () => {
			console.log('fetch');
			const limit = 10;
			const url = `https://kitsu.io/api/edge/anime?page[limit]=${limit}&page[offset]=${itemOffset}`;
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'application/vnd.api+json',
					'Content-Type': 'application/vnd.api+json',
				},
			});

			const data = await response.json();
			totalCount.current = data.meta.count;
			itemsPerPage.current = limit;

			setItems(data.data);
			setPageCount(Math.ceil(totalCount.current / itemsPerPage.current));
			setLoading(false);

			//TODO create handleButton Click with new call
		};
		fetchData();
	}, [itemOffset]);

	return (
		<React.Fragment>
			<AnimeOverview data={items} loading={loading} />
			<ReactPaginate
				pageCount={pageCount}
				className='pagination'
				pageClassName='pagination-item'
				pageLinkClassName='pagination-link'
				activeLinkClassName='pagination-link-active'
				previousLinkClassName='pagination-prev'
				nextLinkClassName='pagination-next'
				disabledClassName='pagination-disabled'
				disabledLinkClassName='pagination-disabled'
				onPageChange={handlePageClick}
			/>
		</React.Fragment>
	);
};

export default AnimeRender;
