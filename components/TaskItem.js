import React from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';

import Colors from '../constants/Colors';
import Text from './Text';

/**
 * Komponent do zarządzania zadaniami na ekranie allTasks.
 * 
 * @param {Object} props - właściwości przekazywane do komponentu.  
 * @memberof module:Komponenty
*/
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

	let options;

	if (props.task.type !== 'anyTime' && props.task.isSequential) {
		options = (
			<>
				<View style={styles.group}>
					<Text style={styles.fieldTitle}>Task date: </Text>
					<Text>{props.task.readableDate}</Text>
				</View>
				<View style={styles.group}>
					<Text style={styles.fieldTitle}>Repeat every </Text>
					<Text>{props.task.sequentialInterval}</Text>
					<Text style={styles.fieldTitle}> days.</Text>
				</View>
			</>
		);
	} else if (props.task.type !== 'anyTime' && !props.task.isSequential) {
		options = (
			<>
				<View style={styles.group}>
					<Text style={styles.fieldTitle}>Task date: </Text>
					<Text>{props.task.readableDate}</Text>
				</View>
			</>
		);
	}

	return (
		<View style={styles.container} activeOpacity={0.6}>
			<View style={styles.group}>
				<Text style={styles.fieldTitle}>Title: </Text>
				<Text>{props.task.title}</Text>
			</View>
			{options}
			<View style={styles.buttonContainer}>
				<Button color={Colors.danger} title="REMOVE" onPress={deleteHandler} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		marginVertical: 10,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
		width: '96%',
		marginHorizontal: '2%',
        backgroundColor: Colors.primary,
        overflow: 'hidden'
	},
	group: {
		flexDirection: 'row',
		marginVertical: 2,
	},
	fieldTitle: {
		color: Colors.accent,
		marginHorizontal: 5,
	},
	buttonContainer: {
		alignItems: 'flex-end',
	},
});

export default TaskItem;
