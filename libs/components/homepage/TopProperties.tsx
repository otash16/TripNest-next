// import React, { useState } from 'react';
// import { Stack, Box } from '@mui/material';
// import useDeviceDetect from '../../hooks/useDeviceDetect';
// import WestIcon from '@mui/icons-material/West';
// import EastIcon from '@mui/icons-material/East';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination } from 'swiper';
// import TopPropertyCard from './TopPropertyCard';
// import { PropertiesInquiry } from '../../types/property/property.input';
// import { Property } from '../../types/property/property';

// interface TopPropertiesProps {
// 	initialInput: PropertiesInquiry;
// }

// const TopProperties = (props: TopPropertiesProps) => {
// 	const { initialInput } = props;
// 	const device = useDeviceDetect();
// 	const [topProperties, setTopProperties] = useState<Property[]>([]);

// 	/** APOLLO REQUESTS **/
// 	/** HANDLERS **/

// 	if (device === 'mobile') {
// 		return (
// 			<Stack className={'top-properties'}>
// 				<Stack className={'container'}>
// 					<Stack className={'info-box'}>
// 						<span>Top properties</span>
// 					</Stack>
// 					<Stack className={'card-box'}>
// 						<Swiper
// 							className={'top-property-swiper'}
// 							slidesPerView={'auto'}
// 							centeredSlides={true}
// 							spaceBetween={15}
// 							modules={[Autoplay]}
// 						>
// 							{topProperties.map((property: Property) => {
// 								return (
// 									<SwiperSlide className={'top-property-slide'} key={property?._id}>
// 										<TopPropertyCard property={property} />
// 									</SwiperSlide>
// 								);
// 							})}
// 						</Swiper>
// 					</Stack>
// 				</Stack>
// 			</Stack>
// 		);
// 	} else {
// 		return (
// 			<Stack className={'top-properties'}>
// 				<Stack className={'container'}>
// 					<Stack className={'info-box'}>
// 						<Box component={'div'} className={'left'}>
// 							<span>Top properties</span>
// 							<p>Check out our Top Properties</p>
// 						</Box>
// 						<Box component={'div'} className={'right'}>
// 							<div className={'pagination-box'}>
// 								<WestIcon className={'swiper-top-prev'} />
// 								<div className={'swiper-top-pagination'}></div>
// 								<EastIcon className={'swiper-top-next'} />
// 							</div>
// 						</Box>
// 					</Stack>
// 					<Stack className={'card-box'}>
// 						<Swiper
// 							className={'top-property-swiper'}
// 							slidesPerView={'auto'}
// 							spaceBetween={15}
// 							modules={[Autoplay, Navigation, Pagination]}
// 							navigation={{
// 								nextEl: '.swiper-top-next',
// 								prevEl: '.swiper-top-prev',
// 							}}
// 							pagination={{
// 								el: '.swiper-top-pagination',
// 							}}
// 						>
// 							{topProperties.map((property: Property) => {
// 								return (
// 									<SwiperSlide className={'top-property-slide'} key={property?._id}>
// 										<TopPropertyCard property={property} />
// 									</SwiperSlide>
// 								);
// 							})}
// 						</Swiper>
// 					</Stack>
// 				</Stack>
// 			</Stack>
// 		);
// 	}
// };

// TopProperties.defaultProps = {
// 	initialInput: {
// 		page: 1,
// 		limit: 8,
// 		sort: 'propertyRank',
// 		direction: 'DESC',
// 		search: {},
// 	},
// };

// export default TopProperties;

import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import PopularPropertyCard from './PopularPropertyCard';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { PropertiesInquiry } from '../../types/property/property.input';
import TopPropertyCard from './TopPropertyCard';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';

interface TopPropertiesProps {
	initialInput: PropertiesInquiry;
}

const TopProperties = (props: TopPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topProperties, setTopProperties] = useState<Property[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getProperties,
		data: getPropertiesData,
		error: getAgentPropertiesError,
		refetch: getPropertiesRefetch,
	} = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopProperties(data?.getProperties?.list);
		},
	});
	/** HANDLERS **/
	// if (!popularProperties) return null;
	if (device === 'mobile') {
		return (
			<Stack className={'top-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Top properties</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-property-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={25}
							modules={[Autoplay]}
						>
							{topProperties.map((property: Property) => {
								return (
									<SwiperSlide key={property._id} className={'top-property-slide'}>
										<TopPropertyCard property={property} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'top-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Top Destinations</span>
							<p>Check out our Top Destinations</p>
						</Box>
						{/* <Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<Link href={'/property'}>
									<span>See All Categories</span>
								</Link>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box> */}
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-property-swiper'}
							slidesPerView={'auto'}
							spaceBetween={25}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-popular-next',
								prevEl: '.swiper-popular-prev',
							}}
							pagination={{
								el: '.swiper-popular-pagination',
							}}
						>
							{topProperties.map((property: Property) => {
								return (
									<SwiperSlide key={property._id} className={'top-property-slide'}>
										<TopPropertyCard property={property} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-top-prev'} />
						<div className={'swiper-top-pagination'}></div>
						<EastIcon className={'swiper-top-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TopProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'propertyRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopProperties;
