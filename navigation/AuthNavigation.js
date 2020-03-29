import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SignUp from '../screens/Auth/SignUp';
import Confirm from '../screens/Auth/Confirm';
import Login from '../screens/Auth/Login';
import AuthHome from '../screens/Auth/AuthHome';

const AuthNavigation = createStackNavigator();

export default () => {
	return (
		<NavigationContainer>
			<AuthNavigation.Navigator initialRouteName="AuthHome" headerMode="none">
				<AuthNavigation.Screen name="AuthHome" component={AuthHome} />
				<AuthNavigation.Screen name="SignUp" component={SignUp} />
				<AuthNavigation.Screen name="Login" component={Login} />
				<AuthNavigation.Screen name="Confirm" component={Confirm} />
			</AuthNavigation.Navigator>
		</NavigationContainer>
	);
};
