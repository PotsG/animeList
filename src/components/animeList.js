import React, { useState, useEffect } from 'react';

const AnimeList = () => {
	const [loading, setLoading] = useState(true);
	const [animeList, setAnimeList] = useState(null);

	useEffect(() => {
		const url = 'https://kitsu.io/api/edge/anime';
		const fetchData = async () => {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'application/vnd.api+json',
					'Content-Type': 'application/vnd.api+json',
				},
			});
			const data = await response.json();
			setAnimeList(data.data);
			setLoading(false);
			console.log(data.data[2].attributes);
		};
		fetchData();
	}, []);

	return (
		<div>
			{loading ? (
				<div className='text-center text-green-500'>loading...</div>
			) : (
				animeList && (
					<div className='grid grid-cols-3 gap-4 max-w-7xl m-auto'>
						{animeList.map((animeItem, idx) => {
							const { attributes } = animeItem;
							return (
								<div key={idx} className='anime-card'>
									<div className='img-wrap'>
										<img
											className='img-full'
											src={
												attributes.posterImage.original
													? attributes.posterImage
															.original
													: attributes.posterImage
															.medium
											}
											alt='Anime Cover'
										/>
									</div>
									<h2 className='text-center font-semibold mb-4 text-lg'>
										{attributes.canonicalTitle}
									</h2>
									<p className='line-clamp-3'>
										{attributes.description}
									</p>
								</div>
							);
						})}
					</div>
				)
			)}
		</div>
	);
};

export default AnimeList;
