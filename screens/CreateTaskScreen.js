import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Switch, TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Text from '../components/Text';
import Colors from '../constants/Colors';
import * as TasksActions from '../store/actions/tasks';
import Input from '../components/Input';

const CreateTaskScreen = (props) => {
	const [title, setTitle] = useState('');
	const [type, setType] = useState('daily');
	const [isSequential, setIsSequential] = useState(false);
	const [date, setDate] = useState(new Date());
	const [sequentialInterval, setSequentialInterval] = useState('');

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const dispatch = useDispatch();

	const titleChangeHandler = (text) => {
		setTitle(text);
	};

	const typeChangeHandler = (text) => {
		setType(text);
	};

	const isSequentialChangeHandler = (text) => {
		setIsSequential(text);
	};

	const dateChangeHandler = (selectedDate) => {
		hideDatePicker();
		setDate(selectedDate);
	};

	const sequentialIntervalChangeHandler = (text) => {
		const transformedText = text.toString().replace(/[^0-9]/g, '');
		setSequentialInterval(transformedText);
	};

	const createTaskHandler = () => {
		dispatch(TasksActions.createTask(title, type, isSequential, date, sequentialInterval));
		props.navigation.goBack();
	};

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	let options;

	if (type !== 'anyTime' && isSequential) {
		options = (
			<>
				<Input
					label="Repeat?"
					type="switch"
					onChange={isSequentialChangeHandler}
					value={isSequential}
					maxLength={24}
				/>
				<Input
					label="Repeat every"
					repeat
					onChange={sequentialIntervalChangeHandler}
					value={sequentialInterval}
					keyboardType="numeric"
					maxLength={3}
				/>
				<View style={styles.formControl}>
					<Text style={styles.label}>When?</Text>
					<TouchableHighlight style={styles.datePickerButton} title="Select date" onPress={showDatePicker}>
						<Text style={styles.dateText}>
							{new Date(date).getDate().toString() +
								'-' +
								new Date(date).getMonth().toString() +
								'-' +
								new Date(date).getFullYear().toString()}
						</Text>
					</TouchableHighlight>
					<DateTimePickerModal
						date={date}
						isVisible={isDatePickerVisible}
						mode="date"
						onConfirm={dateChangeHandler}
						onCancel={hideDatePicker}
					/>
				</View>
			</>
		);
	} else if (type !== 'anyTime' && !isSequential) {
		options = (
			<>
				<Input label="Repeat?" type="switch" onChange={isSequentialChangeHandler} value={isSequential} />
				<View style={styles.formControl}>
					<Text style={styles.label}>When?</Text>
					<TouchableHighlight style={styles.datePickerButton} title="Select date" onPress={showDatePicker}>
						<Text style={styles.dateText}>
							{new Date(date).getDate().toString() +
								'-' +
								new Date(date).getMonth().toString() +
								'-' +
								new Date(date).getFullYear().toString()}
						</Text>
					</TouchableHighlight>
					<DateTimePickerModal
						date={date}
						isVisible={isDatePickerVisible}
						mode="date"
						onConfirm={dateChangeHandler}
						onCancel={hideDatePicker}
					/>
				</View>
			</>
		);
	}

	return (
		<KeyboardAwareScrollView style={styles.screen}>
			<View style={styles.form}>
				<Input label="Title" onChange={titleChangeHandler} value={title} maxLength={36} />
				<Input label="Type" type="picker" onChange={typeChangeHandler} value={type} />
				{options}

				<View style={styles.buttonContainer}>
					<Button color={Colors.accent} title="CREATE" onPress={createTaskHandler} />
				</View>
			</View>
		</KeyboardAwareScrollView>
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
	},
	form: {
		margin: 20,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	formControl: {
		flexDirection: 'row',
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '80%',
	},
	label: {
		color: Colors.accent,
		marginRight: 10,
	},
	dateText: {
		fontSize: 18,
	},
	buttonContainer: {
		marginVertical: 10,
	},
});

export default CreateTaskScreen;
