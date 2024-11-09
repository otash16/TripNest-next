import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { PropertiesInquiry } from '../../types/property/property.input';
import { Property } from '../../types/property/property';
import { REACT_APP_API_URL } from '../../config';
import property from '../../../pages/property';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';

// interface EventData {
// 	eventTitle: string;
// 	city: string;
// 	description: string;
// 	imageSrc: string;
// }
// const eventsData: EventData[] = [
// 	{
// 		eventTitle: 'Paradise City Theme Park',
// 		city: 'Incheon',
// 		description:
// 			'Experience magic and wonder in Incheon with a visit to the night-themed indoor theme park Wonderbox at Paradise City!',
// 		imageSrc: '/img/events/INCHEON.webp',
// 	},
// 	{
// 		eventTitle: 'Taebaeksan Snow Festival',
// 		city: 'Seoul',
// 		description: 'If you have the opportunity to travel to South Korea, do not miss the Taebaeksan Snow Festival!',
// 		imageSrc: '/img/events/SEOUL.webp',
// 	},
// 	{
// 		eventTitle: 'Suseong Lake Event',
// 		city: 'Daegu',
// 		description: 'The Suseong Lake Festival is a culture and arts festival held alongside Suseongmot Lake!',
// 		imageSrc: '/img/events/DAEGU.webp',
// 	},
// 	{
// 		eventTitle: 'Sand Festival',
// 		city: 'Busan',
// 		description:
// 			'Haeundae Sand Festival, the nation’s largest eco-friendly exhibition on sand, is held at Haeundae Beach!',
// 		imageSrc: '/img/events/BUSAN.webp',
// 	},
// ];

interface SeaonalPropertiesProps {
	initialInput: PropertiesInquiry;
}

const EventCard = ({ property }: { property: Property }) => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack
				className="event-card"
				style={{
					backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<Box component={'div'} className={'info'}>
					<strong>{property?.propertyTitle}</strong>
					<span>{property?.propertyAddress}</span>
				</Box>
				<Box component={'div'} className={'more'}>
					<span>{property?.propertyDesc}</span>
				</Box>
			</Stack>
		);
	}
};

const SeasonalProperties = () => {
	const device = useDeviceDetect();
	const [seasonalProperties, setSeasonalProperties] = useState<Property[]>([]);

	const initialInput = {
		page: 1,
		limit: 4,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	};

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
			setSeasonalProperties(data?.getProperties?.list);
		},
	});

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span className={'white'}>New Relaxing Destinations in Seoul</span>
							<p className={'white'}>Explore the newest spots in Seoul for your perfect getaway!</p>
						</Box>
					</Stack>
					<Stack className={'card-wrapper'}>
						{seasonalProperties.map((property: Property) => {
							return <EventCard property={property} key={property?.propertyTitle} />;
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default SeasonalProperties;
