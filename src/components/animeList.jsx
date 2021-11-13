import React, { useState, useEffect } from 'react';

const useFetch = (url) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'application/vnd.api+json',
					'Content-Type': 'application/vnd.api+json',
				},
			});

			const data = await response.json();
			const { attributes } = data.data[0];

			setData(attributes);
			setLoading(false);
		}
		fetchData();
	});

	return { data, loading };
};

const AnimeList = () => {
	const { data, loading } = useFetch('https://kitsu.io/api/edge/anime');

	return (
		<div>
			{loading ? (
				<div className='text-center text-green-500'>loading...</div>
			) : (
				<div>
					{data && (
						<div className='text-center text-green-500'>
							{data.canonicalTitle}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default AnimeList;
