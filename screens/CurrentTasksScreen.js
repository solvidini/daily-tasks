import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Button, Platform, FlatList, SafeAreaView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import Text from '../components/Text';
import DailyTaskItem from '../components/DailyTaskItem';
import * as tasksActions from '../store/actions/tasks';

const CurrentTasksScreen = (props) => {
	const anyTimeTasks = useSelector((state) => state.tasks.anyTimeTasks);
	const dailyTasks = useSelector((state) => state.tasks.dailyTasks);
	const dispatch = useDispatch();

	const fetchTasks = useCallback(() => {
		dispatch(tasksActions.loadTasks());
	}, [dispatch]);

	useEffect(() => {
		fetchTasks();
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
					<DailyTaskItem
						title={taskData.item.title}
						onSelect={() => {
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
					<DailyTaskItem
						title={taskData.item.title}
						onSelect={() => {
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
		headerTitle: 'Your Current Tasks',
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
		color: Colors.accent
	}
});

export default CurrentTasksScreen;
