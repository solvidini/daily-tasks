/**
* @module Nawigacja
*/

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

/**
 * Obiekt przekazujący opcje domyślne do nawigatorów
 * @memberof module:Nawigacja
*/
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

/**
 * Komponent nawigacyjny zarządzający stosem ekranów przekazywanych we właściwościach "component" danego ekranu
 * 
 * @param {Object} props - właściwości przekazywane do komponentu.  
 * @memberof module:Nawigacja
*/
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

/**
 * Komponent nawigacyjny zarządzający stosem ekranów przekazywanych we właściwościach "component" danego ekranu
 * 
 * @param {Object} props - właściwości przekazywane do komponentu.  
 * @memberof module:Nawigacja
*/
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

/**
 * Komponent nawigacyjny dający nam możliwość nawigacji przez dolny pasek nawigacji.
 * 
 * @param {Object} props - właściwości przekazywane do komponentu.  
 * @memberof module:Nawigacja
*/
const TasksNavigator = () => {
	return (
		<TasksBottomTabNavigator.Navigator tabBarOptions={tabBarOptions}>
			<TasksBottomTabNavigator.Screen
				name="Current"
				component={DailyTasksNavigator}
				options={{
					tabBarLabel: 'Current',
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

/**
 * Kontener na komponenty nawigacyjne.
 * 
 * @param {Object} props - właściwości przekazywane do komponentu.  
 * @memberof module:Nawigacja
*/
const AppNavigator = (props) => {
	return (
		<NavigationContainer>
			<TasksNavigator />
		</NavigationContainer>
	);
};

export default AppNavigator;
