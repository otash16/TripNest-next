// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { Stack, Box } from '@mui/material';
// import useDeviceDetect from '../../hooks/useDeviceDetect';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination } from 'swiper';
// import TopAgentCard from './TopAgentCard';
// import { Member } from '../../types/member/member';
// import { AgentsInquiry } from '../../types/member/member.input';
// import { Property } from '../../types/property/property';
// import TrendPropertyCard from './TrendPropertyCard';
// import { PropertiesInquiry } from '../../types/property/property.input';
// import { useQuery } from '@apollo/client';
// import { GET_PROPERTIES } from '../../../apollo/user/query';
// import { T } from '../../types/common';

// interface TrendPropertiesProps {
// 	initialInput: PropertiesInquiry;
// }

// const TrendProperties = (props: TrendPropertiesProps) => {
// 	const { initialInput } = props;
// 	const device = useDeviceDetect();
// 	const [trendProperties, setTrendProperties] = useState<Property[]>([]);

// 	/** APOLLO REQUESTS **/
// 	const {
// 		loading: getProperties,
// 		data: getPropertiesData,
// 		error: getAgentPropertiesError,
// 		refetch: getPropertiesRefetch,
// 	} = useQuery(GET_PROPERTIES, {
// 		fetchPolicy: 'cache-and-network',
// 		variables: { input: initialInput },
// 		notifyOnNetworkStatusChange: true,
// 		onCompleted: (data: T) => {
// 			setTrendProperties(data?.getProperties?.list);
// 		},
// 	});
// 	/** HANDLERS **/
// 	if (trendProperties) console.log('trendProperties: +++', trendProperties);

// 	if (device === 'mobile') {
// 		return (
// 			<Stack className={'trend-properties'}>
// 				<Stack className={'container'}>
// 					<Stack className={'info-box'}>
// 						<span>Liked & Loved</span>
// 					</Stack>
// 					<Stack className={'wrapper'}>
// 						<Swiper
// 							className={'top-properties-swiper'}
// 							slidesPerView={'auto'}
// 							centeredSlides={true}
// 							spaceBetween={29}
// 							modules={[Autoplay]}
// 						>
// 							{trendProperties.map((property: Property) => {
// 								return (
// 									<SwiperSlide className={'trend-property-slide'} key={property?._id}>
// 										<TrendPropertyCard property={property} />
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
// 			<Stack className={'trend-properties'}>
// 				<Stack className={'container'}>
// 					<Stack className={'info-box'}>
// 						<Box component={'div'} className={'left'}>
// 							<span>Liked & Loved</span>
// 							<p>A casual, friendly option suggesting users love these places</p>
// 						</Box>
// 						<Box component={'div'} className={'right'}>
// 							<div className={'more-box'}>
// 								<span>See All Destinations</span>
// 								<img src="/img/icons/rightup.svg" alt="" />
// 							</div>
// 						</Box>
// 					</Stack>
// 					<Stack className={'wrapper'}>
// 						<Box component={'div'} className={'switch-btn swiper-trend-properties-prev'}>
// 							<ArrowBackIosNewIcon />
// 						</Box>
// 						<Box component={'div'} className={'card-wrapper'}>
// 							<Swiper
// 								className={'trend-properties-swiper'}
// 								slidesPerView={'auto'}
// 								spaceBetween={29}
// 								modules={[Autoplay, Navigation, Pagination]}
// 								navigation={{
// 									nextEl: '.swiper-trend-properties-next',
// 									prevEl: '.swiper-trend-properties-prev',
// 								}}
// 							>
// 								{trendProperties.map((property: Property) => {
// 									return (
// 										<SwiperSlide className={'trend-properties-slide'} key={property?._id}>
// 											<TrendPropertyCard property={property} />
// 										</SwiperSlide>
// 									);
// 								})}
// 							</Swiper>
// 						</Box>
// 						<Box component={'div'} className={'switch-btn swiper-trend-properties-next'}>
// 							<ArrowBackIosNewIcon />
// 						</Box>
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

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopAgentCard from './TopAgentCard';
import { Member } from '../../types/member/member';
import { AgentsInquiry } from '../../types/member/member.input';
import { Property } from '../../types/property/property';

import { PropertiesInquiry } from '../../types/property/property.input';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { REACT_APP_API_URL } from '../../config';

interface TrendPropertiesProps {
	initialInput: PropertiesInquiry;
}

const TrendProperties = (props: TrendPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendProperties, setTrendProperties] = useState<Property[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

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
	const handleNext = () => {
		if (trendProperties.length > 0) {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % trendProperties.length);
		}
	};

	const handlePrev = () => {
		if (trendProperties.length > 0) {
			setCurrentIndex((prevIndex) => (prevIndex - 1 + trendProperties.length) % trendProperties.length);
		}
	};

	useEffect(() => {
		// Reset the index when the data is fetched or if the number of items changes
		setCurrentIndex(0);
	}, [trendProperties]);

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
										{/* <TrendPropertyCard property={property} /> */}
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
						<Box component={'div'} className={'card-wrapper'}>
							<div className="slide">
								{/* Render only the current property based on currentIndex */}
								{trendProperties.length > 0 && (
									<div
										className="item"
										key={trendProperties[currentIndex]?._id}
										style={{
											backgroundImage: `url(${REACT_APP_API_URL}/${trendProperties[currentIndex]?.propertyImages[0]})`,
										}}
									>
										<div className="content">
											<div className="name">{trendProperties[currentIndex]?.propertyTitle}</div>
											<div className="des">{trendProperties[currentIndex]?.propertyDesc}</div>
											<button>See More</button>
										</div>
									</div>
								)}
							</div>
						</Box>

						{/* Navigation buttons */}
						<div className="button">
							<button className="prev" onClick={handlePrev}>
								<ArrowBackIosNewIcon />
							</button>
							<button className="next" onClick={handleNext}>
								<ArrowForwardIosIcon />
							</button>
						</div>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TrendProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 6,
		sort: 'propertyLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendProperties;
