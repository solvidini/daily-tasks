import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import Text from '../components/Text';
import Colors from '../constants/Colors';
import * as TasksActions from '../store/actions/tasks';

const CreateTaskScreen = (props) => {
	const [titleValue, setTitleValue] = useState('');

	const dispatch = useDispatch();

	const titleChangeHandler = (text) => {
		setTitleValue(text);
	};

	const createTaskHandler = () => {
		dispatch(TasksActions.createTask(titleValue));
		props.navigation.goBack();
	};

	return (
		<View style={styles.screen}>
			<Text style={styles.label}>Title</Text>
			<TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />
			<Button color={Colors.accent} title="Create" onPress={createTaskHandler} />
		</View>
	);
};

export const screenOptions = (navData) => {
	return {
		headerTitle: 'Create a Task!',
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
	label: {
		marginBottom: 5,
		textAlign: 'left',
		width: 200,
		maxWidth: '50%',
		color: Colors.accent,
	},
	textInput: {
		color: Colors.font,
		fontSize: 16,
		borderBottomColor: Colors.grey,
		borderBottomWidth: 1,
		paddingVertical: 2,
		paddingHorizontal: 4,
		width: 200,
		maxWidth: '50%',
		marginBottom: 10,
	},
});

export default CreateTaskScreen;
