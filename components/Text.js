import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

/**
 * Komponent implementujący własny tekst.
 * 
 * @param {Object} props - właściwości przekazywane do komponentu.  
 * @memberof module:Komponenty
*/
const CustomText = (props) => {
	return <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
	text: {
		fontFamily: 'open-sans',
        color: Colors.font,
        fontSize: 16
	},
});

export default CustomText;
