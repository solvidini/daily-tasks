import React, { useReducer, useEffect } from 'react';
import { StyleSheet, TextInput, View, Platform, Switch } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Text from './Text';
import Colors from '../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_TOUCHED = 'INPUT_TOUCHED';

const inputReducer = (state, action) => {
	switch (action.type) {
		case INPUT_CHANGE:
			return {
				...state,
				value: action.value,
				isValid: action.isValid,
			};
		case INPUT_TOUCHED:
			return {
				...state,
				touched: true,
			};
		default:
			return state;
	}
};

/**
 * Komponent do utworzenia pola tekstowego, bądź pól wyboru wraz z walidacją.
 * 
 * @param {Object} props - właściwości przekazywane do komponentu.  
 * @memberof module:Komponenty
*/
const Input = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue ? props.initialValue : '',
		isValid: props.initiallyValid,
		touched: false,
	});
	let inputType;

	const { onInputChange } = props;

	useEffect(() => {
		onInputChange(inputState.value, inputState.isValid);
	}, [inputState, onInputChange]);

	const textChangeHandler = (text) => {
		let isValid = true;
		if (props.repeat) {
			text = text.toString().replace(/[^0-9]/g, '');
		}
		if (props.min != null && +text < props.min) {
			isValid = false;
		}
		if (props.required && text.trim().length === 0) {
			isValid = false;
		}
		if (props.minLength != null && text.length < props.minLength) {
			isValid = false;
		}
		dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
	};

	const onFocusHandler = () => {
		dispatch({ type: INPUT_TOUCHED });
	};

	switch (props.type) {
		case 'picker':
			inputType = (
				<RNPickerSelect
					placeholder={{}}
					useNativeAndroidPickerStyle={false}
					style={pickerSelectStyles}
					value={inputState.value}
					onValueChange={textChangeHandler}
					items={[
						{ label: 'Daily', value: 'daily' },
						{ label: 'Any time', value: 'anyTime' },
					]}
				/>
			);
			break;
		case 'switch':
			inputType = (
				<Switch
					trackColor={{ true: Colors.accent, false: Colors.grey }}
					thumbColor={Platform.OS === 'android' ? Colors.accent : ''}
					value={inputState.value}
					onValueChange={textChangeHandler}
				/>
			);
			break;
		default:
			inputType = (
				<TextInput
					{...props}
					selectionColor={Colors.accent}
					style={props.repeat ? { ...styles.textInput, width: 50 } : styles.textInput}
					value={inputState.value}
					onChangeText={textChangeHandler}
					onFocus={onFocusHandler}
				/>
			);
	}

	return (
		<View style={styles.formControl}>
			<View style={{ ...styles.row, justifyContent: 'space-between' }}>
				<Text style={styles.label}>{props.label}</Text>
				{inputType}
				{props.repeat ? <Text style={{ color: Colors.accent }}>days.</Text> : null}
			</View>
			{!inputState.isValid && inputState.touched && (
				<View style={{ ...styles.row, justifyContent: 'center' }}>
					<Text style={styles.error}>{props.errorText}</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	formControl: {
		marginVertical: 10,
		width: '80%',
	},
	label: {
		color: Colors.accent,
		marginRight: 10,
	},
	picker: {
		height: Platform.OS === 'android' ? 50 : 50,
		width: Platform.OS === 'android' ? 120 : 110,
		color: Colors.font,
		borderColor: Colors.grey,
		borderWidth: 1,
		justifyContent: 'center',
		borderRadius: 5,
		overflow: 'hidden',
	},
	itemStyle: {
		color: Colors.font,
	},
	textInput: {
		color: Colors.font,
		fontSize: 18,
		borderBottomColor: Colors.grey,
		borderBottomWidth: 1,
		paddingVertical: 2,
		paddingHorizontal: 4,
		width: 200,
		marginBottom: 10,
		textAlign: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	error: {
		color: Colors.danger,
		textAlign: 'center',
	},
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: Colors.grey,
		borderRadius: 4,
		color: 'white',
		paddingRight: 30, // to ensure the text is never behind the icon
		textAlign: 'center',
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderWidth: 1,
		borderColor: Colors.grey,
		borderRadius: 4,
		color: 'white',
		paddingRight: 30, // to ensure the text is never behind the icon
		textAlign: 'center',
	},
});

export default Input;
