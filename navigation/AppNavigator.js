import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import CurrentTasksScreen, { screenOptions as CurrentTasksScreenOptions } from '../screens/CurrentTasksScreen';
import AllTasksScreen, { screenOptions as AllTasksScreenOptions } from '../screens/AllTasksScreen';
import CreateTaskScreen, { screenOptions as CreateTaskScreenOptions } from '../screens/CreateTaskScreen';
import Colors from '../constants/Colors';

const defaultOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : 'black',
		shadowColor: 'transparent',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
	headerTintColor: Colors.accent,
};

const DailyTasksStackNavigator = createStackNavigator();

const DailyTasksNavigator = () => {
	return (
		<DailyTasksStackNavigator.Navigator screenOptions={defaultOptions}>
			<DailyTasksStackNavigator.Screen
				name="CurrentTasks"
				component={CurrentTasksScreen}
				options={CurrentTasksScreenOptions}
			/>
			<DailyTasksStackNavigator.Screen
				name="CreateTask"
				component={CreateTaskScreen}
				options={CreateTaskScreenOptions}
			/>
		</DailyTasksStackNavigator.Navigator>
	);
};

const AllTasksStackNavigator = createStackNavigator();

const AllTasksNavigator = () => {
	return (
		<AllTasksStackNavigator.Navigator screenOptions={defaultOptions}>
			<AllTasksStackNavigator.Screen name="AllTasks" component={AllTasksScreen} options={AllTasksScreenOptions} />
			<AllTasksStackNavigator.Screen
				name="CreateTask"
				component={CreateTaskScreen}
				options={CreateTaskScreenOptions}
			/>
		</AllTasksStackNavigator.Navigator>
	);
};

const tabBarOptions = {
	activeTintColor: Colors.accent,
	inactiveTintColor: Colors.grey,
	style: { backgroundColor: Colors.primary, borderTopColor: 'transparent' },
};

const TasksBottomTabNavigator = createBottomTabNavigator();

const TasksNavigator = () => {
	return (
		<TasksBottomTabNavigator.Navigator tabBarOptions={tabBarOptions}>
			<TasksBottomTabNavigator.Screen
				name="Daily"
				component={DailyTasksNavigator}
				options={{
					tabBarLabel: 'Daily',
					tabBarIcon: ({ color, size }) => {
						return <Ionicons name="ios-list" color={color} size={size} />;
					},
				}}
			/>
			<TasksBottomTabNavigator.Screen
				name="All"
				component={AllTasksNavigator}
				options={{
					tabBarLabel: 'All',
					tabBarIcon: ({ color, size }) => {
						return (
							<Ionicons
								name={Platform.OS === 'android' ? 'md-folder' : 'ios-folder'}
								color={color}
								size={size}
							/>
						);
					},
				}}
			/>
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
