import React, { useState } from 'react';
import { View, StyleSheet, Button, TouchableHighlight, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Text from '../components/Text';
import Colors from '../constants/Colors';
import * as TasksActions from '../store/actions/tasks';
import Input from '../components/Input';

/**
 * Ekran, w którym tworzymy zadanie.
 * 
 * @param {Object} props - właściwości przekazywane do komponentu.  
 * @memberof module:Ekrany
*/
const CreateTaskScreen = (props) => {
	const [title, setTitle] = useState('');
	const [type, setType] = useState('daily');
	const [isSequential, setIsSequential] = useState(false);
	const [date, setDate] = useState(new Date());
	const [sequentialInterval, setSequentialInterval] = useState('');

	const [titleValidity, setTitleValidity] = useState(false);
	const [sequentialIntervalValidity, setSequentialIntervalValidity] = useState(false);

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const dispatch = useDispatch();

	const titleChangeHandler = (text, isValid) => {
		setTitle(text);
		setTitleValidity(isValid);
	};

	const typeChangeHandler = (text) => {
		setType(text);
	};

	const isSequentialChangeHandler = (text) => {
		setIsSequential(text);
	};

	const dateChangeHandler = (selectedDate) => {
		if (new Date().setHours(0, 0, 0, 0) > new Date(selectedDate).getTime()) {
			Alert.alert('Error occurred', 'Date must be equal or greater than today.', [
				{
					text: 'Ok',
					style: 'default',
					onPress: () => {
						hideDatePicker();
					},
				},
			]);
			return;
		}
		hideDatePicker();
		setDate(selectedDate);
	};

	const sequentialIntervalChangeHandler = (text, isValid) => {
		setSequentialInterval(text);
		setSequentialIntervalValidity(isValid);
	};

	const submitHandler = () => {
		if (titleValidity && type === 'anyTime') {
			dispatch(TasksActions.createTask(title, type, isSequential, date, sequentialInterval));
			props.navigation.goBack();
			return;
		}
		if (!titleValidity || (isSequential && !sequentialIntervalValidity)) {
			Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
			return;
		}
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
					initiallyValid
					onInputChange={isSequentialChangeHandler}
					initialValue={false}
					value={isSequential}
					maxLength={24}
				/>
				<Input
					label="Repeat every"
					repeat
					required
					errorText="Days field must be greater than 0."
					onInputChange={sequentialIntervalChangeHandler}
					value={sequentialInterval}
					keyboardType="numeric"
					maxLength={3}
					min={1}
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
						isDarkModeEnabled
						onConfirm={dateChangeHandler}
						onCancel={hideDatePicker}
					/>
				</View>
			</>
		);
	} else if (type !== 'anyTime' && !isSequential) {
		options = (
			<>
				<Input
					label="Repeat?"
					type="switch"
					initialValue={false}
					initiallyValid
					onInputChange={isSequentialChangeHandler}
					value={isSequential}
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
	}

	return (
		<KeyboardAwareScrollView style={styles.screen}>
			<View style={styles.form}>
				<Input
					label="Title"
					required
					errorText="Title field cannot be empty."
					onInputChange={titleChangeHandler}
					value={title}
					maxLength={36}
				/>
				<Input
					label="Type"
					type="picker"
					initialValue="daily"
					initiallyValid
					onInputChange={typeChangeHandler}
					value={type}
				/>
				{options}
				<View style={styles.buttonContainer}>
					<Button color={Colors.accent} title="CREATE" onPress={submitHandler} />
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
