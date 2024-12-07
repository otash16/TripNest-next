import { Button, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { useState } from 'react';
import { NotificationsInquiry } from '../../types/notification/notification.input';

interface NotificationsProps {
	initialInput: NotificationsInquiry;
}

const NotifacationModal = (props: NotificationsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [notifications, setNotifications] = useState<Notification[]>([]);

	const {
		loading: getNotifications,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNotifications(data?.getUserNotifications?.list);
		},
	});

	if (device === 'mobile') {
		return <div>Notification Modal(Mobile View)</div>;
	} else {
		return (
			<Stack className={'notification-modal'}>
				<div className="notification-modal-inner">
					<Stack className={'notification-modal-top'}>
						<Typography className={'notification-modal-title'}>Notifications</Typography>
						<Button className={'notification-modal-delete-btn'}>Delete all</Button>
					</Stack>
					<Stack className={'notifications-list'}>
						<Stack className={'notification-list-card'}>
							<img className={'notification-list-img'} src="/img/profile/defaultUser.svg" alt="" />
							<p className="notification-list-title">Some very important</p>
						</Stack>
					</Stack>
				</div>
				<Stack className={'notification-modal-btn'}>View All</Stack>
			</Stack>
		);
	}
};

NotifacationModal.defaultProps = {
	initialInput: {
		page: 1,
		limit: 4,
		sort: '',
		direction: 'DESC',
		search: {},
	},
};

export default NotifacationModal;
