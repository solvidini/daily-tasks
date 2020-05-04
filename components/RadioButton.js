import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

/**
 * Komponent implementujący własne rozwiązanie przycisku typu radio.
 * 
 * @param {Object} props - właściwości przekazywane do komponentu.  
 * @memberof module:Komponenty
*/
const RadioButton = (props) => {
	return <View style={styles.main}>{props.selected ? <View style={styles.selected} /> : null}</View>;
};

const styles = StyleSheet.create({
	main: {
		height: 24,
		width: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: Colors.accent,
		alignItems: 'center',
		justifyContent: 'center',
	},
	selected: {
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: Colors.accent,
	},
});

export default RadioButton;
