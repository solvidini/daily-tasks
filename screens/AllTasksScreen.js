import React, { useEffect } from 'react';
import { View, StyleSheet, Button, Platform, FlatList, SafeAreaView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import Text from '../components/Text';
import TaskItem from '../components/TaskItem';
import * as tasksActions from '../store/actions/tasks';

const AllTasksScreen = (props) => {
	const dailyTasks = useSelector((state) => state.tasks.dailyTasks);
	const sequentialTasks = useSelector((state) => state.tasks.sequentialTasks);
	const anyTimeTasks = useSelector((state) => state.tasks.anyTimeTasks);
	const allTasks = useSelector((state) => state.tasks.allTasks);
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
			<Text style={styles.sectionTitle}>Daily Tasks</Text>
			<FlatList
				data={dailyTasks}
				keyExtractor={(task) => task.id.toString()}
				renderItem={(taskData) => (
					<TaskItem
						title={taskData.item.title}
						onRemove={() => {
							dispatch(tasksActions.removeTask(taskData.item.id));
						}}
					/>
				)}
			/>
			<Text style={styles.sectionTitle}>Any Time Tasks</Text>
			<FlatList
				data={anyTimeTasks}
				keyExtractor={(task) => task.id.toString()}
				renderItem={(taskData) => (
					<TaskItem
						title={taskData.item.title}
						onRemove={() => {
							dispatch(tasksActions.removeTask(taskData.item.id));
						}}
					/>
				)}
			/>
			<Text style={styles.sectionTitle}>Sequential Tasks</Text>
			<FlatList
				data={sequentialTasks}
				keyExtractor={(task) => task.id.toString()}
				renderItem={(taskData) => (
					<TaskItem
						title={taskData.item.title}
						onRemove={() => {
							dispatch(tasksActions.removeTask(taskData.item.id));
						}}
					/>
				)}
			/>
			<Text style={styles.sectionTitle}>All Tasks</Text>
			<FlatList
				data={allTasks}
				keyExtractor={(task) => task.id.toString()}
				renderItem={(taskData) => (
					<TaskItem
						title={taskData.item.title}
						onRemove={() => {
							dispatch(tasksActions.removeTask(taskData.item.id));
						}}
					/>
				)}
			/>
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
	},
	sectionTitle: {
		color: Colors.accent,
	},
});

export default AllTasksScreen;
