import { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import moment from 'moment';

const basicNotification = { title: 'Daily tasks', body: 'Remember about your daily tasks!' };

/**
 * Komponent implementujący całą logikę odnośnie powiadomień stosowanych w aplikacji.
 * 
 * @param {Object} props - właściwości przekazywane do komponentu.  
 */
const NotificationsManager = (props) => {
	const dailyTasks = useSelector((state) => state.tasks.dailyTasks);

	useEffect(() => {
		verifyPermissions();

		const listener = Notifications.addListener(handleNotification);
		return () => listener.remove();
	}, []);

	useEffect(() => {
		console.log('useEffect verify');

		verifyPermissions()
			.then(() => {
				return Notifications.cancelAllScheduledNotificationsAsync();
			})
			.then(() => {
				setNotifications();
			})
			.catch((err) => {
				console.log(err);
			});
	}, [setNotifications, dailyTasks]);

	const verifyPermissions = async () => {
		// iOS only
		const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		if (result.status !== 'granted') {
			Alert.alert(
				'Remember!',
				'With notifications you can fully use the potential of the application. It will remind you about your daily tasks.',
				[{ text: 'Okay' }]
			);
			return false;
		}
		if (Constants.isDevice && result.status === 'granted') {
			return true;
		}
		return false;
	};

	const setNotifications = useCallback(() => {
		// console.log('setNotifications', new Date(), moment(2, 'minutes'));
		const numberOfTasks = dailyTasks.length;

		const weeklySchedulingOptions = {
			time: new Date(moment().add(1, 'weeks')),
		};

		let morningSchedulingOptions;

		let localNotification = {
			title: 'Daily tasks',
			body: `You have ${numberOfTasks} tasks left for today. Click here to manage your tasks!`,
		};

		const weeklyReminder = {
			title: 'Where are you?',
			body: `You haven't set any tasks for a week already!`,
		};

		//SEND NOTIFICATION IN ONE WEEK
		Notifications.scheduleLocalNotificationAsync(weeklyReminder, weeklySchedulingOptions);

		if (new Date().setHours(7, 0, 0) > new Date()) {
			morningSchedulingOptions = {
				time: new Date().setHours(7, 0, 0),
			};
		} else {
			morningSchedulingOptions = {
				time: new Date().setHours(31, 0, 0),
			};
			localNotification.body = 'Click to set some new tasks!';
		}

		//SEND NOTIFICATION IN THE MORNING // IN THE MORNING NEXT DAY
		Notifications.scheduleLocalNotificationAsync(localNotification, morningSchedulingOptions);

		if (new Date().setHours(15, 0, 0) > new Date() && numberOfTasks > 0) {
			const schedulingOptions = {
				time: new Date().setHours(15, 0, 0),
			};
			//SEND NOTIFICATION IN THE AFTERNOON
			Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
		}

		if (new Date().setHours(20, 0, 0) > new Date() && numberOfTasks > 0) {
			const schedulingOptions = {
				time: new Date().setHours(20, 0, 0),
			};
			//SEND NOTIFICATION IN THE EVENING
			Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
		}
	}, [dailyTasks]);

	const handleNotification = () => {
		console.warn('Notification recevied');
	};

	return props.children;
};

export default NotificationsManager;
