import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import Text from '../components/Text';

const AllTasksScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Text>All Tasks Screen</Text>
		</View>
	);
};

export const screenOptions = (navData) => {
	return {
		headerTitle: 'Your All Tasks',
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
		backgroundColor: 'black',
		color: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default AllTasksScreen;
