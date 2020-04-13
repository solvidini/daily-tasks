import React from 'react';
import { StyleSheet, TextInput, Picker, View, Platform, Switch } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Text from './Text';
import Colors from '../constants/Colors';

const Input = (props) => {
	let inputType;

	switch (props.type) {
		case 'picker':
			inputType = (
				<RNPickerSelect
					placeholder={{}}
					useNativeAndroidPickerStyle={false}
					style={pickerSelectStyles}
					value={props.value}
					onValueChange={props.onChange}
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
					value={props.value}
					onValueChange={props.onChange}
				/>
			);
			break;
		default:
			inputType = (
				<TextInput
					{...props}
					selectionColor={Colors.accent}
					style={props.repeat ? { ...styles.textInput, width: 50 } : styles.textInput}
					onChangeText={props.onChange}
					value={props.value}
				/>
			);
	}

	return (
		<View style={styles.formControl}>
			<Text style={styles.label}>{props.label}</Text>
			{inputType}
			{props.repeat ? <Text style={{ color: Colors.accent }}>days.</Text> : null}
		</View>
	);
};

const styles = StyleSheet.create({
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
