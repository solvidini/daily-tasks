import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateTaskScreen = (props) => {
	return (
		<View style={styles.centered}>
			<Text>Create Task Screen</Text>
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

export default CreateTaskScreen;
