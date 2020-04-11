import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const AllTasksScreen = (props) => {
	return (
		<View style={styles.centered}>
			<Text>All Tasks Screen</Text>
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

export default AllTasksScreen;
