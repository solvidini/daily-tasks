import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

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
