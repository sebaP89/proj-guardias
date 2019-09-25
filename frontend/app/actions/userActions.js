import {
    FETCHING_DATA,
    ERROR_FETCHING_DATA,
    DATA_FETCHED,
    VALID_USER,
    INVALID_USER,
    LOGED_OUT,
    USER_CREATED,
    FETCH_USER_DATA_SUCCESS,
} from "../constants/actionsTypes";

const errorFetchingData = (error) => ({
    type: ERROR_FETCHING_DATA,
    error: error
});

const fetchingData = () => ({
    type: FETCHING_DATA
});

const dataFetched = () => ({
    type: DATA_FETCHED
});

const userValid = (idUser) => ({
    type: VALID_USER,
    payload: idUser,
});

const userInvalid = () => ({
    type: INVALID_USER
});

const userCreated = () => ({
    type: USER_CREATED
});

const fetchUserDataSuccess = (userData) => ({
    type: FETCH_USER_DATA_SUCCESS,
    userData: userData
});

export const logedout = () => ({
    type: LOGED_OUT
});

function isUserValid(user) {
    //return fetch('http://10.0.2.2:3000/api/v1/user/login/', {
    return fetch('https://proj-guardias.herokuapp.com/api/v1/user/login/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.username,
            password: user.password,
        }),
    })
    .then(response =>
        response.json())
};

export function validateUser(user) {
    return dispatch => {
        dispatch(fetchingData());
        return isUserValid(user)
            .then(
                response => {
                    dispatch(dataFetched());
                    if (response.user == undefined) {
                        dispatch(userInvalid());
                    }
                    else {
                        dispatch(userValid(response.user.id))
                    }
                },
                error => {
                    dispatch(userInvalid());
                    dispatch(errorFetchingData());
                }
            );
    }
};

export function createUser(user, idHealthInsurance) {
    return dispatch => {
        dispatch(fetchingData());
        //fetch('http://10.0.2.2:3000/api/v1/users', {
        fetch('https://proj-guardias.herokuapp.com/api/v1/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                idHealthInsurance: idHealthInsurance
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response.error) {
                throw(response.error);
            }
            dispatch(dataFetched());
            dispatch(userCreated());
            return response.message;
        })
        .catch(error => {
            dispatch(errorFetchingData(error));
        })
    }
};

export function updateUser(userId, user, idHealthInsurance) {
    return dispatch => {
        dispatch(fetchingData());
        //fetch('http://10.0.2.2:3000/api/v1/users/${userId}', {
        fetch(`https://proj-guardias.herokuapp.com/api/v1/users/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                idHealthInsurance: idHealthInsurance
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response.error) {
                console.log("Error:" + response.error)
                throw(response.error);
            }
            dispatch(dataFetched());
            return response.message;
        })
        .catch(error => {
            dispatch(errorFetchingData(error));
        })
    }
};

export function fetchUserData(userId) {
    return dispatch => {
        dispatch(fetchingData());
        //fetch(`http://10.0.2.2:3000/api/v1/user/urgency/${userId}`, {
        fetch(`https://proj-guardias.herokuapp.com/api/v1/users/${userId}`, {
        method: 'GET'})
        .then(response => response.json())
        .then(response => {
            if(response.error) {
                throw(response.error);
            }
            dispatch(dataFetched());
            dispatch(fetchUserDataSuccess(response.userData));
            return response.userData;
        })
        .catch(error => {
            dispatch(errorFetchingData(error));
        })
    }
};