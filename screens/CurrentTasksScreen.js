import React from 'react';
import { View, StyleSheet, Button, Platform, FlatList, SafeAreaView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import Text from '../components/Text';
import TaskItem from '../components/TaskItem';
import * as tasksActions from '../store/actions/tasks';

const CurrentTasksScreen = (props) => {
	const tasks = useSelector((state) => state.tasks.tasks);

	const dispatch = useDispatch();

	return (
		<SafeAreaView style={styles.screen}>
			<FlatList
				data={tasks}
				keyExtractor={(task) => task.id}
				renderItem={(taskData) => (
					<TaskItem
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
		padding: 10,
		backgroundColor: 'black',
		color: 'white',
	},
});

export default CurrentTasksScreen;
