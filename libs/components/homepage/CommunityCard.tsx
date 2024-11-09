import React from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Divider, Stack, Typography } from '@mui/material';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface CommunityCardProps {
	article: BoardArticle;
}

// const CommunityCard = (props: CommunityCardProps) => {
// 	const { vertical, article, index } = props;
// 	const device = useDeviceDetect();
// 	const articleImage = article?.articleImage
// 		? `${process.env.REACT_APP_API_URL}/${article?.articleImage}`
// 		: '/img/event.svg';

// 	if (device === 'mobile') {
// 		return <div>COMMUNITY CARD (MOBILE)</div>;
// 	} else {
// 		if (vertical) {
// 			return (
// 				<Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
// 					<Box component={'div'} className={'vertical-card'}>
// 						<div className={'community-img'} style={{ backgroundImage: `url(${articleImage})` }}>
// 							<div>{index + 1}</div>
// 						</div>
// 						<strong>{article?.articleTitle}</strong>
// 						<span>Free Board</span>
// 					</Box>
// 				</Link>
// 			);
// 		} else {
// 			return (
// 				<>
// 					<Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
// 						<Box component={'div'} className="horizontal-card">
// 							<img src={articleImage} alt="" />
// 							<div>
// 								<strong>{article.articleTitle}</strong>
// 								<span>
// 									<Moment format="DD.MM.YY">{article?.createdAt}</Moment>
// 								</span>
// 							</div>
// 						</Box>
// 					</Link>
// 				</>
// 			);
// 		}
// 	}
// };

const CommunityCard = (props: CommunityCardProps) => {
	const { article } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="article-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${article?.articleImage[0]})` }}
				>
					<div className="like-btn-wrapper">
						<IconButton color={'default'}>
							{article?.meLiked && article?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon style={{ color: 'red' }} />
							) : (
								<FavoriteIcon />
							)}
						</IconButton>
					</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{article.articleTitle}</strong>

					{/* <div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{property?.propertyBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{property?.propertyBath} baths</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{property?.propertyGuests} guests</span>
						</div>
					</div> */}
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					{/* <div className={'bott'}>
						<p>{property?.propertyFamily ? 'Family' : 'Seasonal'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
						</div>
					</div> */}
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="article-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${article?.articleImage})` }}
					// style={{ backgroundImage: `url(img/banner/header.svg)` }}
					// height={'300px'}
				></Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{article.articleTitle}</strong>
					<p className={'desc'}>{article.articleContent ?? 'no content'}</p>
					{/* <div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{property?.propertyBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/bath.svg" alt="" />
							<span>{property?.propertyBath} baths</span>
						</div>
						<div>
							<img src="/img/icons/guests.svg" alt="" />
							<span>{property?.propertyGuests} guests</span>
						</div>
					</div> */}
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{article.articleCategory}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{article?.articleViews}</Typography>
							<IconButton color={'default'}>
								{article?.meLiked && article?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{article?.articleLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default CommunityCard;
