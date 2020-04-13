import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';

import Colors from '../constants/Colors';
import Text from './Text';

const TaskItem = (props) => {
	const deleteHandler = () => {
		Alert.alert('Are you sure?', 'Do you really want to delete this task?', [
			{ text: 'No', style: 'default' },
			{
				text: 'Yes',
				style: 'destructive',
				onPress: () => {
					props.onRemove();
				},
			},
		]);
	};

	return (
		<View style={styles.container} activeOpacity={0.6}>
			<View style={styles.group}>
				<Text style={styles.title}>{props.title}</Text>
			</View>
			<View style={styles.group}>
				<TouchableOpacity onPress={deleteHandler}>
					<Text style={styles.countdown}>x</Text>
				</TouchableOpacity>
			</View>
		</View>
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
		color: '#f44',
		fontFamily: 'open-sans-bold',
	},
});

export default TaskItem;
