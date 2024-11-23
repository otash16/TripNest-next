import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface PopularPropertyCardProps {
	property: Property;
	likePropertyHandler: any;
}

const PopularPropertyCard = (props: PopularPropertyCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailhandler = async (propertyId: string) => {
		console.log('ID;:', propertyId);
		await router.push({ pathname: '/property/detail', query: { id: propertyId } });
	};

	if (device === 'mobile') {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
				>
					<div className={'price'}>${property.propertyPrice}</div>
					<div className="like-btn-wrapper">
						<IconButton color={'default'}>
							{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon style={{ color: 'red' }} />
							) : (
								<FavoriteIcon />
							)}
						</IconButton>
					</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{property.propertyTitle}</strong>
					<p className={'desc'}>{property.propertyAddress}</p>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{property?.propertyFamily ? 'Family' : 'Seasonal'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					height={'300px'}
					onClick={() => {
						pushDetailhandler(property._id);
					}}
				>
					<div className={'price'}>${property.propertyPrice} / night</div>
					<div className="like-btn-wrapper">
						<IconButton
							color={'default'}
							onClick={(event) => {
								event.stopPropagation();
								likePropertyHandler(user, property?._id);
							}}
						>
							{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
								<FavoriteIcon style={{ color: 'red' }} />
							) : (
								<FavoriteIcon />
							)}
						</IconButton>
					</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{property.propertyTitle}</strong>
					<p className={'desc'}>{property.propertyDesc ?? 'no description'}</p>
					<div className="address-wrapper">
						<img className="location-icon" src="/img/icons/location.svg" alt="" />
						<p className={'address'}>{property.propertyAddress}</p>
					</div>
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
						<p>{property?.propertyFamily ? 'family' : 'seasonal'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default PopularPropertyCard;
