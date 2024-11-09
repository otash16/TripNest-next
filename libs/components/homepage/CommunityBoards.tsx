import React, { useState } from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack, Typography } from '@mui/material';
import CommunityCard from './CommunityCard';
import { BoardArticle } from '../../types/board-article/board-article';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { T } from '../../types/common';

// const CommunityBoards = () => {
// 	const device = useDeviceDetect();
// 	const [searchCommunity, setSearchCommunity] = useState({
// 		page: 1,
// 		sort: 'articleViews',
// 		direction: 'DESC',
// 	});
// 	const [boardArticles, setBoardArticles] = useState<BoardArticle[]>([]);
// 	const [freeArticles, setFreeArticles] = useState<BoardArticle[]>([]);
// };

interface BoardArticlesProps {
	initialInput: BoardArticlesInquiry;
}

/** APOLLO REQUESTS **/
// const {
// 	loading: getArticlesLoading,
// 	data: getArticlesData,
// 	error: getArticlesError,
// 	refetch: getArticlesRefetch,
// } = useQuery(GET_ARTICLES, {
// 	fetchPolicy: 'cache-and-network',
// 	variables: { input: initialInput },
// 	notifyOnNetworkStatusChange: true,
// 	onCompleted: (data: T) => {
// 		setBoardArticles(data?.getArticles?.list);
// 	},
// });

/** APOLLO REQUESTS **/

// if (!boardArticles) return null;

// if (device === 'mobile') {
// 	return (
// 		<Stack className={'board-articles'}>
// 			<Stack className={'container'}>
// 				<Stack className={'info-box'}>
// 					<span>Popular Articles</span>
// 				</Stack>
// 				<Stack className={'card-box'}>
// 					{boardArticles.map((article: BoardArticle) => (
// 						<SwiperSlide key={article._id} className={'board-article-slide'}>
// 							<CommunityCard article={article} />
// 						</SwiperSlide>
// 					))}
// 				</Stack>
// 			</Stack>
// 		</Stack>
// 	);
// } else {
// 	return (
// 		<Stack className={'board-articles'}>
// 			<Stack className={'container'}>
// 				<Stack className={'info-box'}>
// 					<Box component={'div'} className={'left'}>
// 						<span>Popular Articles</span>
// 						<p>Trending articles selected by views</p>
// 					</Box>
// 				</Stack>
// 				<Stack className={'card-box'}>
// 					{boardArticles.map((article: BoardArticle) => (
// 						<CommunityCard article={article} />
// 					))}
// 				</Stack>
// 				<Box component={'div'} className={'right'}>
// 					<div className={'more-box'}>
// 						<Link href={'/articles'}>
// 							<span>Show more</span>
// 						</Link>
// 					</div>
// 				</Box>
// 			</Stack>
// 		</Stack>
// 	);
// }

// BoardArticles.defaultProps = {
// 	initialInput: {
// 		page: 1,
// 		limit: 7,
// 		sort: 'articleViews',
// 		direction: 'DESC',
// 		search: {},
// 	},
// };

const BoardArticles = (props: BoardArticlesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [boardArticles, setBoardArticles] = useState<BoardArticle[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getArticles,
		data: getArticlesData,
		error: getAgentArticlesError,
		refetch: getArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setBoardArticles(data?.getBoardArticles?.list);
		},
	});
	/** HANDLERS **/

	if (!boardArticles) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'board-articles'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Popular properties</span>
					</Stack>
					<Stack className={'card-box'}>
						{boardArticles.map((article: BoardArticle) => {
							return (
								<SwiperSlide key={article._id} className={'board-article-slide'}>
									<CommunityCard article={article} />
								</SwiperSlide>
							);
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'board-articles'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Popular destinations</span>
							<p>Popularity ranked by views</p>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{boardArticles.map((article: BoardArticle) => {
							return <CommunityCard article={article} />;
						})}
					</Stack>
					{/* <Box component={'div'} className={'right'}>
						<div className={'more-box'}>
							<Link href={'/property'}>
								<span>Show more</span>
							</Link>
						</div>
					</Box> */}
				</Stack>
			</Stack>
		);
	}
};

BoardArticles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'articleViews',
		direction: 'DESC',
		search: {},
	},
};

export default BoardArticles;
