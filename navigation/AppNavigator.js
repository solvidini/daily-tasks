import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllTasksScreen from '../screens/AllTasksScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import CurrentTasksScreen from '../screens/CurrentTasksScreen';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';

const defaultOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const DailyTasksStackNavigator = createStackNavigator();

const DailyTasksNavigator = () => {
	return (
		<DailyTasksStackNavigator.Navigator screenOptions={defaultOptions}>
			<DailyTasksStackNavigator.Screen name="CurrentTasks" component={CurrentTasksScreen} options={{}} />
			<DailyTasksStackNavigator.Screen name="CreateTask" component={CreateTaskScreen} options={{}} />
		</DailyTasksStackNavigator.Navigator>
	);
};

const AllTasksStackNavigator = createStackNavigator();

const AllTasksNavigator = () => {
	return (
		<AllTasksStackNavigator.Navigator screenOptions={defaultOptions}>
			<AllTasksStackNavigator.Screen name="AllTasks" component={AllTasksScreen} options={{}} />
			<AllTasksStackNavigator.Screen name="CreateTask" component={CreateTaskScreen} options={{}} />
		</AllTasksStackNavigator.Navigator>
	);
};

const TasksBottomTabNavigator = createBottomTabNavigator();

const TasksNavigator = () => {
	return (
		<TasksBottomTabNavigator.Navigator>
			<TasksBottomTabNavigator.Screen name="Daily" component={DailyTasksNavigator} />
			<TasksBottomTabNavigator.Screen name="All" component={AllTasksNavigator} />
		</TasksBottomTabNavigator.Navigator>
	);
};

const AppNavigator = (props) => {
	return (
		<NavigationContainer>
			<TasksNavigator />
		</NavigationContainer>
	);
};

export default AppNavigator;
