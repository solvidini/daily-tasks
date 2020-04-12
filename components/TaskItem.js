import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors';
import Text from './Text';
import RadioButton from './RadioButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TaskItem = (props) => {
	const [isSelected, setIsSelected] = useState(false);
	const [intervalStatus, setIntervalStatus] = useState(5);

	useEffect(() => {
		let timer;
		let interval;

		if (isSelected) {
			timer = setTimeout(() => {
				props.onSelect();
			}, 5000);
			interval = setInterval(() => {
				setIntervalStatus((previousVal) => previousVal - 1);
			}, 1000);
		}

		if (!isSelected) {
			clearTimeout(timer);
			clearInterval(interval);
			setIntervalStatus(5);
		}

		return () => {
			clearTimeout(timer);
			clearInterval(interval);
		};
	}, [isSelected]);

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
		marginVertical: 8,
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
		color: '#f44',
	},
});

export default TaskItem;
