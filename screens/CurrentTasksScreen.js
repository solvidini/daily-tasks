import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../constants/Colors';

const CurrentTasksScreen = (props) => {
	return (
		<View style={styles.centered}>
			<Text>Current Tasks Screen</Text>
			<Button
				color={Colors.accent}
				title={'Go'}
				onPress={() => {
					props.navigation.navigate('AllTasks');
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default CurrentTasksScreen;
