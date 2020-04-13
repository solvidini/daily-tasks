import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import tasksReducer from './store/reducers/tasks';
import AppNavigator from './navigation/AppNavigator';
import Colors from './constants/Colors';
import { init } from './helpers/db';

init()
	.then(() => {
		console.log('Initialized database');
	})
	.catch((err) => {
		console.log('Initializing db failed.');
		console.log(err);
	});

const rootReducer = combineReducers({
	tasks: tasksReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => {
					setFontLoaded(true);
				}}
			/>
		);
	}

	return (
		<Provider store={store}>
			<StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
			<AppNavigator />
		</Provider>
	);
}
