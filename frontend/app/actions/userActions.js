import {
    VALID_USER,
    INVALID_USER,
    VALIDATE_USER_BEGIN,
    LOGED_OUT,
    FETCH_SPECIALITIES_PENDING,
    FETCH_SPECIALITIES_ERROR,
    FETCH_SPECIALITIES_SUCCESS,
    FETCH_CLINICS_ERROR,
    FETCH_CLINICS_PENDING,
    FETCH_CLINICS_SUCCESS,
} from "../constants/actionsTypes";

const userValid = (idUser) => ({
    type: VALID_USER,
    payload: idUser,
});

const userInvalid = () => ({
    type: INVALID_USER
});

const validatingUser = () => ({
    type: VALIDATE_USER_BEGIN
});

export const fetchSpecialitiesPending = () => ({
    type: FETCH_SPECIALITIES_PENDING
});

const fetchSpecialitiesSuccess = (specialities) => ({
    type: FETCH_SPECIALITIES_SUCCESS,
    specialities: specialities
});

const fetchSpecialitiesError = (error) => ({
    type: FETCH_SPECIALITIES_ERROR,
    error: error
});

export const fetchClinicsForSpecialityPending = () => ({
    type: FETCH_CLINICS_PENDING
});

const fetchClinicsForSpecialitySuccess = (clinicsForSpeciality) => ({
    type: FETCH_CLINICS_SUCCESS,
    clinicsForSpeciality: clinicsForSpeciality
});

const fetchClinicsForSpecialityError = (error) => ({
    type: FETCH_CLINICS_ERROR,
    error: error
});

export const logedout = () => ({
    type: LOGED_OUT
});

function isUserValid(user) {
    return fetch('http://10.28.120.140:3000/api/v1/user/login/', {
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
        dispatch(validatingUser());
        return isUserValid(user)
            .then(
                response => response.user == undefined ? dispatch(userInvalid()) : dispatch(userValid(response.user.id)),
                error => dispatch(userInvalid())
            );
    }
};

export function fetchSpecialities(userId) {
    return dispatch => {
        dispatch(fetchSpecialitiesPending());
        fetch(`http://10.28.120.140:3000/api/v1/user/specialities/${userId}`, {
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
            dispatch(fetchSpecialitiesError(error));
        })
    }
};

export function fetchClinicsForSpeciality(userId, specialityId) {
    return dispatch => {
        dispatch(fetchClinicsForSpecialityPending());
        fetch(`http://10.28.120.140:3000/api/v1/user/clinics/${userId}&${specialityId}`, {
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
            dispatch(fetchClinicsForSpecialityError(error));
        })
    }
};