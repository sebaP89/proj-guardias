import {
    FETCHING_DATA,
    ERROR_FETCHING_DATA,
    DATA_FETCHED,
    BOOKING_SUCCESS,
    FETCH_BOOKING_SUCCESS,
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

const bookingSuccess = (bookingNumber) => ({
    type: BOOKING_SUCCESS,
    bookingNumber: bookingNumber
});

const fetchBookingSuccess = (booking) => ({
    type: FETCH_BOOKING_SUCCESS,
    booking: booking
});

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
            dispatch(dataFetched());
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
            dispatch(dataFetched());
            dispatch(fetchBookingSuccess(response.booking));
            return response.booking;
        })
        .catch(error => {
            dispatch(errorFetchingData(error));
        })
    }
};