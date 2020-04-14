import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Platform, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import Text from '../components/Text';
import TaskItem from '../components/TaskItem';
import * as tasksActions from '../store/actions/tasks';

const AllTasksScreen = (props) => {
	const sequentialTasks = useSelector((state) => state.tasks.sequentialTasks);
	const allTasks = useSelector((state) => state.tasks.allTasks);
	const [showSequentialTasks, setShowSequentialTasks] = useState(true);
	const [showAllTasks, setShowAllTasks] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(tasksActions.loadTasks());
	}, [dispatch]);

	useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			dispatch(tasksActions.loadTasks());
		});

		return () => {
			unsubscribe();
		};
	}, [dispatch]);

	return (
		<SafeAreaView style={styles.screen}>
			<View style={styles.group}>
				<Text style={styles.sectionTitle}>Sequential Tasks</Text>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => {
						setShowSequentialTasks((previousValue) => !previousValue);
					}}
				>
					<Text>{showSequentialTasks ? 'Hide List' : 'Show List'}</Text>
				</TouchableOpacity>
			</View>
			{showSequentialTasks && (
				<FlatList
					data={sequentialTasks}
					keyExtractor={(task) => task.id.toString()}
					renderItem={(taskData) => (
						<TaskItem
							task={taskData.item}
							onRemove={() => {
								dispatch(tasksActions.removeTask(taskData.item.id));
							}}
						/>
					)}
				/>
			)}
			<View style={styles.group}>
				<Text style={styles.sectionTitle}>All Tasks</Text>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => {
						setShowAllTasks((previousValue) => !previousValue);
					}}
				>
					<Text>{showAllTasks ? 'Hide List' : 'Show List'}</Text>
				</TouchableOpacity>
			</View>
			{showAllTasks && (
				<FlatList
					data={allTasks}
					keyExtractor={(task) => task.id.toString()}
					renderItem={(taskData) => (
						<TaskItem
							task={taskData.item}
							onRemove={() => {
								dispatch(tasksActions.removeTask(taskData.item.id));
							}}
						/>
					)}
				/>
			)}
		</SafeAreaView>
	);
};

export const screenOptions = (navData) => {
	return {
		headerTitle: 'All Your Tasks',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Create"
					iconName={Platform.OS === 'android' ? 'md-add' : 'md-add'}
					onPress={() => {
						navData.navigation.navigate('CreateTask');
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: 'black',
		color: 'white',
		justifyContent: 'flex-start',
	},
	group: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 2,
	},
	sectionTitle: {
		color: Colors.accent,
	},
});

export default AllTasksScreen;
