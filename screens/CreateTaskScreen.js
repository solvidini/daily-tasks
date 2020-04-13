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
	const [titleValue, setTitleValue] = useState('');
	const [typeValue, setTypeValue] = useState('daily');
	const [isSequentialValue, setIsSequentialValue] = useState(false);
	const [dateValue, setDateValue] = useState(new Date());
	const [sequentialIntervalValue, setSequentialIntervalValue] = useState('');

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const dispatch = useDispatch();

	const titleChangeHandler = (text) => {
		setTitleValue(text);
	};

	const typeChangeHandler = (text) => {
		setTypeValue(text);
	};

	const isSequentialChangeHandler = (text) => {
		setIsSequentialValue(text);
	};

	const dateChangeHandler = (selectedDate) => {
		hideDatePicker();
		setDateValue(selectedDate);
	};

	const sequentialIntervalChangeHandler = (text) => {
		setSequentialIntervalValue(text);
	};

	const createTaskHandler = () => {
		dispatch(TasksActions.createTask(titleValue, typeValue, isSequentialValue, dateValue, sequentialIntervalValue));
		props.navigation.goBack();
	};

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	let options;

	if (typeValue !== 'anyTime' && isSequentialValue) {
		options = (
			<>
				<Input label="Repeat?" type="switch" onChange={isSequentialChangeHandler} value={isSequentialValue} />
				<Input
					label="Repeat every"
					repeat
					onChange={sequentialIntervalChangeHandler}
					value={sequentialIntervalValue}
					keyboardType="numeric"
				/>
				<View style={styles.formControl}>
					<Text style={styles.label}>When?</Text>
					<TouchableHighlight style={styles.datePickerButton} title="Select date" onPress={showDatePicker}>
						<Text style={styles.dateText}>
							{new Date(dateValue).getDate().toString() +
								'-' +
								new Date(dateValue).getMonth().toString() +
								'-' +
								new Date(dateValue).getFullYear().toString()}
						</Text>
					</TouchableHighlight>
					<DateTimePickerModal
						date={dateValue}
						isVisible={isDatePickerVisible}
						mode="date"
						onConfirm={dateChangeHandler}
						onCancel={hideDatePicker}
					/>
				</View>
			</>
		);
	} else if (typeValue !== 'any' && !isSequentialValue) {
		options = (
			<>
				<Input label="Repeat?" type="switch" onChange={isSequentialChangeHandler} value={isSequentialValue} />
				<View style={styles.formControl}>
					<Text style={styles.label}>When?</Text>
					<TouchableHighlight style={styles.datePickerButton} title="Select date" onPress={showDatePicker}>
						<Text style={styles.dateText}>
							{new Date(dateValue).getDate().toString() +
								'-' +
								new Date(dateValue).getMonth().toString() +
								'-' +
								new Date(dateValue).getFullYear().toString()}
						</Text>
					</TouchableHighlight>
					<DateTimePickerModal
						date={dateValue}
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
				<Input label="Title" onChange={titleChangeHandler} value={titleValue} />
				<Input label="Type" type="picker" onChange={typeChangeHandler} value={typeValue} />
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
