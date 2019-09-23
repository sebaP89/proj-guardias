import {
    FETCHING_DATA,
    ERROR_FETCHING_DATA,
    DATA_FETCHED,
    VALID_USER,
    INVALID_USER,
    LOGED_OUT,
    USER_CREATED,
    FETCH_USER_DATA_SUCCESS,
    FETCH_SPECIALITIES_SUCCESS,
    FETCH_HEALTH_INSURANCES_SUCCESS,
    FETCH_CLINICS_FOR_SPECIALITY_SUCCESS,
    BOOKING_SUCCESS,
    FETCH_BOOKING_SUCCESS,
    REFRESHING,
    FINISH_REFRESHING,
    COORDINATES_REFRESH
} from "../constants/actionsTypes";

const errorFetchingData = (error) => ({
    type: ERROR_FETCHING_DATA,
    error: error
});

export const fetchingData = () => ({
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

const coordinatesRefreshed = (coordinates) => ({
    type: COORDINATES_REFRESH,
    coordinates: coordinates
});

const fetchSpecialitiesSuccess = (specialities) => ({
    type: FETCH_SPECIALITIES_SUCCESS,
    specialities: specialities
});

const fetchHealthInsurancesSuccess = (healthInsurances) => ({
    type: FETCH_HEALTH_INSURANCES_SUCCESS,
    healthInsurances: healthInsurances
});

const fetchClinicsForSpecialitySuccess = (clinicsForSpeciality) => ({
    type: FETCH_CLINICS_FOR_SPECIALITY_SUCCESS,
    clinicsForSpeciality: clinicsForSpeciality
});

const bookingSuccess = (bookingNumber) => ({
    type: BOOKING_SUCCESS,
    bookingNumber: bookingNumber
});

const fetchBookingSuccess = (booking) => ({
    type: FETCH_BOOKING_SUCCESS,
    booking: booking
});

export const logedout = () => ({
    type: LOGED_OUT
});

const refreshing = () => ({
    type: REFRESHING
});

const finishRefreshing = () => ({
    type: FINISH_REFRESHING
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
                response => response.user == undefined ? dispatch(userInvalid()) : dispatch(userValid(response.user.id)),
                error => dispatch(userInvalid())
            );
    }
};

export function fetchHealthInsurances() {
    return dispatch => {
        dispatch(fetchingData());
        //fetch('http://10.0.2.2:3000/api/v1/healthInsurance', {
        fetch('https://proj-guardias.herokuapp.com/api/v1/healthInsurance', {
        method: 'GET'})
        .then(response => response.json())
        .then(response => {
            if(response.error) {
                throw(response.error);
            }
            dispatch(fetchHealthInsurancesSuccess(response.healthInsurances));
            return response.healthInsurances;
        })
        .catch(error => {
            dispatch(errorFetchingData(error));
        })
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
            dispatch(fetchUserDataSuccess(response.userData));
            return response.userData;
        })
        .catch(error => {
            dispatch(errorFetchingData(error));
        })
    }
};

export function refreshCoordinates(coordinates) {
    return dispatch => {
        dispatch(coordinatesRefreshed(coordinates));
    }
};

export function fetchSpecialities(userId) {
    return dispatch => {
        dispatch(fetchingData());
        //fetch(`http://10.0.2.2:3000/api/v1/user/specialities/${userId}`, {
        fetch(`https://proj-guardias.herokuapp.com/api/v1/user/specialities/${userId}`, {
            
        method: 'GET'})
        .then(response => response.json())
        .then(response => {
            if(response.error) {
                throw(response.error);
            }
            dispatch(fetchSpecialitiesSuccess(response.specialities));
            return response.specialities;
        })
        .catch(error => {
            dispatch(errorFetchingData(error));
        })
    }
};

export function fetchClinicsForSpeciality(userId, specialityId) {
    return dispatch => {
        dispatch(fetchingData());
        //fetch(`http://10.0.2.2:3000/api/v1/user/clinics/${userId}&${specialityId}`, {
        fetch(`https://proj-guardias.herokuapp.com/api/v1/user/clinics/${userId}&${specialityId}`, {
        method: 'GET'})
        .then(response => response.json())
        .then(response => {
            if(response.error) {
                throw(response.error);
            }
            dispatch(fetchClinicsForSpecialitySuccess(response.clinics));
            return response.clinics;
        })
        .catch(error => {
            dispatch(errorFetchingData(error));
        })
    }
};

export function book(idUser, idClinic, idSpeciality) {
    return dispatch => {
        dispatch(fetchingData());
        //fetch('http://10.0.2.2:3000/api/v1/user/urgency', {
        fetch('https://proj-guardias.herokuapp.com/api/v1/user/urgency', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser: idUser,
                idClinic: idClinic,
                idSpeciality: idSpeciality
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response.error) {
                throw(response.error);
            }
            dispatch(bookingSuccess(response.user.number));
            return response.message;
        })
        .catch(error => {
            dispatch(errorFetchingData(error));
        })
    }
};

export function fetchBooking(userId) {
    return dispatch => {
        dispatch(fetchingData());
        //fetch(`http://10.0.2.2:3000/api/v1/user/urgency/${userId}`, {
        fetch(`https://proj-guardias.herokuapp.com/api/v1/user/urgency/${userId}`, {
        method: 'GET'})
        .then(response => response.json())
        .then(response => {
            if(response.error) {
                throw(response.error);
            }
            dispatch(fetchBookingSuccess(response.booking));
            return response.booking;
        })
        .catch(error => {
            dispatch(errorFetchingData(error));
        })
    }
};

export function refreshSpecialities(userId) {
    return dispatch => {
        dispatch(refreshing());
        //fetch(`http://10.0.2.2:3000/api/v1/user/specialities/${userId}`, {
        fetch(`https://proj-guardias.herokuapp.com/api/v1/user/specialities/${userId}`, {
            
        method: 'GET'})
        .then(response => response.json())
        .then(response => {
            if(response.error) {
                throw(response.error);
            }
            dispatch(finishRefreshing());
            dispatch(fetchSpecialitiesSuccess(response.specialities));
            return response.specialities;
        })
        .catch(error => {
            dispatch(finishRefreshing());
            dispatch(errorFetchingData(error));
        })
    }
};

export function refreshClinicsForSpeciality(userId, specialityId) {
    return dispatch => {
        dispatch(refreshing());
        //fetch(`http://10.0.2.2:3000/api/v1/user/clinics/${userId}&${specialityId}`, {
        fetch(`https://proj-guardias.herokuapp.com/api/v1/user/clinics/${userId}&${specialityId}`, {
        method: 'GET'})
        .then(response => response.json())
        .then(response => {
            if(response.error) {
                throw(response.error);
            }
            dispatch(finishRefreshing());
            dispatch(fetchClinicsForSpecialitySuccess(response.clinics));
            return response.clinics;
        })
        .catch(error => {
            dispatch(finishRefreshing());
            dispatch(errorFetchingData(error));
        })
    }
};