import {
    FETCHING_DATA,
    ERROR_FETCHING_DATA,
    DATA_FETCHED,
    FETCH_SPECIALITIES_SUCCESS,
    FETCH_HEALTH_INSURANCES_SUCCESS,
    FETCH_CLINICS_FOR_SPECIALITY_SUCCESS,
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

const fetchSpecialitiesSuccess = (specialities) => ({
    type: FETCH_SPECIALITIES_SUCCESS,
    specialities: specialities
});

const fetchHealthInsurancesSuccess = (healthInsurances) => ({
    type: FETCH_HEALTH_INSURANCES_SUCCESS,
    healthInsurances: healthInsurances
});

const fetchClinicsForSpecialitySuccess = (clinics) => ({
    type: FETCH_CLINICS_FOR_SPECIALITY_SUCCESS,
    clinics: clinics
});

const refreshing = () => ({
    type: REFRESHING
});

const finishRefreshing = () => ({
    type: FINISH_REFRESHING
});

const coordinatesRefreshed = (coordinates) => ({
    type: COORDINATES_REFRESH,
    coordinates: coordinates
});

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
            dispatch(dataFetched());
            dispatch(fetchHealthInsurancesSuccess(response.healthInsurances));
            return response.healthInsurances;
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
            dispatch(dataFetched());
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
            dispatch(dataFetched());
            dispatch(fetchClinicsForSpecialitySuccess(response.clinics));
            return response.clinics;
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