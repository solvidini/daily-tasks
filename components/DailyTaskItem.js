import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Text from './Text';
import RadioButton from './RadioButton';
import Colors from '../constants/Colors';

const DailyTaskItem = (props) => {
	const [isSelected, setIsSelected] = useState(false);
	const [intervalStatus, setIntervalStatus] = useState(3);

	useEffect(() => {
		let interval;

		if (isSelected) {
			interval = setInterval(() => {
				setIntervalStatus((previousVal) => previousVal - 1);
			}, 1000);
		}

		if (!isSelected) {
			clearInterval(interval);
			setIntervalStatus(3);
		}

		return () => {
			clearInterval(interval);
		};
	}, [isSelected, setIntervalStatus]);

	useEffect(() => {
		if (intervalStatus === 0) {
			props.onSelect();
		}
	}, [intervalStatus]);

	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.6}
			onPress={() => setIsSelected((previousVal) => !previousVal)}
		>
			<View style={styles.group}>
				<RadioButton selected={isSelected} />
				<Text style={styles.title}>{props.title}</Text>
			</View>
			<View style={styles.group}>
				<Text style={isSelected ? styles.countdown : {}}>{isSelected ? intervalStatus : ''}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
		width: '96%',
		marginHorizontal: '2%',
	},
	group: {
		flexDirection: 'row',
	},
	title: {
		marginLeft: 10,
	},
	countdown: {
		fontSize: 18,
		color: Colors.danger,
		fontFamily: 'open-sans-bold',
	},
});

export default DailyTaskItem;
