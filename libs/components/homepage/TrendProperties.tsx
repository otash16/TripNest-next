// import React, { useState } from 'react';
// import { Stack, Box } from '@mui/material';
// import useDeviceDetect from '../../hooks/useDeviceDetect';
// import WestIcon from '@mui/icons-material/West';
// import EastIcon from '@mui/icons-material/East';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination } from 'swiper';
// import { Property } from '../../types/property/property';
// import { PropertiesInquiry } from '../../types/property/property.input';
// import TrendPropertyCard from './TrendPropertyCard';

// interface TrendPropertiesProps {
// 	initialInput: PropertiesInquiry;
// }

// const TrendProperties = (props: TrendPropertiesProps) => {
// 	const { initialInput } = props;
// 	const device = useDeviceDetect();
// 	const [trendProperties, setTrendProperties] = useState<Property[]>([]);

// 	/** APOLLO REQUESTS **/
// 	/** HANDLERS **/

// 	if (trendProperties) console.log('trendProperties:', trendProperties);
// 	if (!trendProperties) return null;

// 	if (device === 'mobile') {
// 		return (
// 			<Stack className={'trend-properties'}>
// 				<Stack className={'container'}>
// 					<Stack className={'info-box'}>
// 						<span>Trend Properties</span>
// 					</Stack>
// 					<Stack className={'card-box'}>
// 						{trendProperties.length === 0 ? (
// 							<Box component={'div'} className={'empty-list'}>
// 								Trends Empty
// 							</Box>
// 						) : (
// 							<Swiper
// 								className={'trend-property-swiper'}
// 								slidesPerView={'auto'}
// 								centeredSlides={true}
// 								spaceBetween={15}
// 								modules={[Autoplay]}
// 							>
// 								{trendProperties.map((property: Property) => {
// 									return (
// 										<SwiperSlide key={property._id} className={'trend-property-slide'}>
// 											<TrendPropertyCard property={property} />
// 										</SwiperSlide>
// 									);
// 								})}
// 							</Swiper>
// 						)}
// 					</Stack>
// 				</Stack>
// 			</Stack>
// 		);
// 	} else {
// 		return (
// 			<Stack className={'trend-properties'}>
// 				<Stack className={'container'}>
// 					<Stack className={'info-box'}>
// 						<Box component={'div'} className={'left'}>
// 							<span>Trend Properties</span>
// 							<p>Trend is based on likes</p>
// 						</Box>
// 						<Box component={'div'} className={'right'}>
// 							<div className={'pagination-box'}>
// 								<WestIcon className={'swiper-trend-prev'} />
// 								<div className={'swiper-trend-pagination'}></div>
// 								<EastIcon className={'swiper-trend-next'} />
// 							</div>
// 						</Box>
// 					</Stack>
// 					<Stack className={'card-box'}>
// 						{trendProperties.length === 0 ? (
// 							<Box component={'div'} className={'empty-list'}>
// 								Trends Empty
// 							</Box>
// 						) : (
// 							<Swiper
// 								className={'trend-property-swiper'}
// 								slidesPerView={'auto'}
// 								spaceBetween={15}
// 								modules={[Autoplay, Navigation, Pagination]}
// 								navigation={{
// 									nextEl: '.swiper-trend-next',
// 									prevEl: '.swiper-trend-prev',
// 								}}
// 								pagination={{
// 									el: '.swiper-trend-pagination',
// 								}}
// 							>
// 								{trendProperties.map((property: Property) => {
// 									return (
// 										<SwiperSlide key={property._id} className={'trend-property-slide'}>
// 											<TrendPropertyCard property={property} />
// 										</SwiperSlide>
// 									);
// 								})}
// 							</Swiper>
// 						)}
// 					</Stack>
// 				</Stack>
// 			</Stack>
// 		);
// 	}
// };

// TrendProperties.defaultProps = {
// 	initialInput: {
// 		page: 1,
// 		limit: 8,
// 		sort: 'propertyLikes',
// 		direction: 'DESC',
// 		search: {},
// 	},
// };

// export default TrendProperties;

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopAgentCard from './TopAgentCard';
import { Member } from '../../types/member/member';
import { AgentsInquiry } from '../../types/member/member.input';
import { Property } from '../../types/property/property';
import TrendPropertyCard from './TrendPropertyCard';
import { PropertiesInquiry } from '../../types/property/property.input';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';

interface TrendPropertiesProps {
	initialInput: PropertiesInquiry;
}

const TrendProperties = (props: TrendPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendProperties, setTrendProperties] = useState<Property[]>([]);

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
			setTrendProperties(data?.getProperties?.list);
		},
	});
	/** HANDLERS **/
	if (trendProperties) console.log('trendProperties: +++', trendProperties);

	if (device === 'mobile') {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Liked & Loved</span>
					</Stack>
					<Stack className={'wrapper'}>
						<Swiper
							className={'top-properties-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={29}
							modules={[Autoplay]}
						>
							{trendProperties.map((property: Property) => {
								return (
									<SwiperSlide className={'trend-property-slide'} key={property?._id}>
										<TrendPropertyCard property={property} />
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
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Liked & Loved</span>
							<p>A casual, friendly option suggesting users love these places</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<span>See All Destinations</span>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className={'wrapper'}>
						<Box component={'div'} className={'switch-btn swiper-trend-properties-prev'}>
							<ArrowBackIosNewIcon />
						</Box>
						<Box component={'div'} className={'card-wrapper'}>
							<Swiper
								className={'trend-properties-swiper'}
								slidesPerView={'auto'}
								spaceBetween={29}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-trend-properties-next',
									prevEl: '.swiper-trend-properties-prev',
								}}
							>
								{trendProperties.map((property: Property) => {
									return (
										<SwiperSlide className={'trend-properties-slide'} key={property?._id}>
											<TrendPropertyCard property={property} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						</Box>
						<Box component={'div'} className={'switch-btn swiper-trend-properties-next'}>
							<ArrowBackIosNewIcon />
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TrendProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'propertyLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendProperties;
