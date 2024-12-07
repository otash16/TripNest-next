import { Button, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const NotifacationModal = (prop: any) => {
	const device = useDeviceDetect();

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

export default NotifacationModal;
