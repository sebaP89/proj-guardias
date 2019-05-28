import AsyncStorage from '@react-native-community/async-storage';
import {
    GET_TOKEN,
    SAVE_TOKEN,
    REMOVE_TOKEN,
    LOADING,
    ERROR
  } from "../constants/actionsTypes";

const getToken = (token) => ({
    type: GET_TOKEN,
    token,
});

const saveToken = token => ({
    type: SAVE_TOKEN,
    token
});

const removeToken = () => ({
    type: REMOVE_TOKEN,
});

const loading = bool => ({
    type: LOADING,
    isLoading: bool,
});

const error = error => ({
    type: ERROR,
    error,
});

export const getUserToken = () => dispatch => 
    AsyncStorage.getItem('@userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(getToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

export const saveUserToken = (data) => dispatch =>
    AsyncStorage.setItem('@userToken', 'abc')
        .then((data) => {
            dispatch(loading(false));
            dispatch(saveToken('token saved'));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

export const removeUserToken = () => dispatch =>
    AsyncStorage.removeItem('@userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(removeToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })