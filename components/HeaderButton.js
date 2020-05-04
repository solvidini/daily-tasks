import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

/**
 * Własna implementacja komponentu HeaderButton.
 * 
 * @param {Object} props - właściwości przekazywane do komponentu.  
 * @memberof module:Komponenty
*/
const CustomHeaderButton = (props) => {
	return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Colors.font} />;
};

export default CustomHeaderButton;
