import React from 'react';
import SpecialitiesScreen from './views/SpecialitiesScreen';
import ClinicsScreen from './views/ClinicsScreen';
import BookingScreen from './views/BookingScreen';
import LoginScreen from './views/LoginScreen';
import SignUpScreen from './views/SignUpScreen';
import AuthLoadingScreen from './views/AuthLoadingScreen';

import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';


export const UrgenciesStack = createStackNavigator({ Specialities: SpecialitiesScreen, Clinics: ClinicsScreen, Booking: BookingScreen });
export const AuthStack = createStackNavigator({ Login: LoginScreen, SignUp: SignUpScreen });

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Urgencies: UrgenciesStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
export default AppContainer;  