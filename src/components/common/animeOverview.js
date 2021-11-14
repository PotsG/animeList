const AnimeOverview = (props) => {
	const { data, loading } = props;
	return (
		<div>
			{loading ? (
				<div className='text-center text-green-500'>loading...</div>
			) : (
				data && (
					<div className='grid grid-cols-5 gap-4 max-w-7xl m-auto'>
						{data.map((item, idx) => {
							const { attributes } = item;
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

export default AnimeOverview;
