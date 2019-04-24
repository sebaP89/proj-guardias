import React from 'react';
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import SignUpScreen from './views/SignUpScreen';
import OtherScreen from './views/OtherScreen';
import AuthLoadingScreen from './views/AuthLoadingScreen';

import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';


export const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
export const AuthStack = createStackNavigator({ Login: LoginScreen, SignUp: SignUpScreen });

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
export default AppContainer;  