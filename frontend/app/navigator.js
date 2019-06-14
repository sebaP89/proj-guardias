import React from 'react';
import AuthLoadingScreen from './views/AuthLoadingScreen';

import BurgerMenu from "./components/BurgerMenu";
import MainScreen from './views/MainScreen';
import AccountSettingsScreen from './views/AccountSettingsScreen';
import SpecialitiesScreen from './views/SpecialitiesScreen';
import ClinicsScreen from './views/ClinicsScreen';
import BookingScreen from './views/BookingScreen';

import LoginScreen from './views/LoginScreen';
import SignUpScreen from './views/SignUpScreen';

import { Icon } from "react-native-elements";

import { createStackNavigator,
         createDrawerNavigator, 
         createSwitchNavigator,
         createAppContainer } from 'react-navigation';

         
const MainScreenStack = createStackNavigator({ MainScreen });

MainScreenStack.navigationOptions = {
    drawerLabel: "Planificar Salud",
    drawerIcon: ({ tintColor }) => <Icon name="md-cog" type="ionicon" color={tintColor} />
};

const UrgenciesStack = createStackNavigator(
    { Specialities: SpecialitiesScreen,
      Clinics: ClinicsScreen,
      Booking: BookingScreen
    }
);

UrgenciesStack.navigationOptions = ({ navigation }) => {
    let drawerLockMode = "unlocked";
    if (navigation.state.index > 0) {
      drawerLockMode = "locked-closed";
    }
    return {
        drawerLockMode,
        drawerLabel: "Guardias",
        drawerIcon: ({ tintColor }) => <Icon name="md-home" type="ionicon" color={tintColor} />
    }
};

const AccountSettingsStack = createStackNavigator({ AccountSettingsScreen });

AccountSettingsStack.navigationOptions = {
    drawerLabel: "Cuenta",
    drawerIcon: ({ tintColor }) => <Icon name="md-cog" type="ionicon" color={tintColor} />
};

const MainNavigator = createDrawerNavigator(
    { MainScreen: MainScreenStack,
      Urgencies: UrgenciesStack,
      AccountSettings: AccountSettingsStack
    },{ contentComponent: BurgerMenu }
);

MainNavigator.navigationOptions = {
    drawerLabel: "Principal",
    drawerIcon: ({ tintColor }) => <Icon name="md-home" type="ionicon" color={tintColor} />
};

const AuthStack = createStackNavigator(
    { Login: LoginScreen,
      SignUp: SignUpScreen
    }
);

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Main: MainNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
export default AppContainer;  