import {
    VALID_USER,
    INVALID_USER,
    VALIDATE_USER_BEGIN,
    LOGED_OUT,
    USER_CREATED,
    ERROR_CREATING_USER,
    FETCH_SPECIALITIES_PENDING,
    FETCH_SPECIALITIES_ERROR,
    FETCH_SPECIALITIES_SUCCESS,
    FETCH_CLINICS_ERROR,
    FETCH_CLINICS_PENDING,
    FETCH_CLINICS_SUCCESS,
    FETCH_CLINICS_FOR_SPECIALITY_PENDING,
    FETCH_CLINICS_FOR_SPECIALITY_SUCCESS,
    FETCH_CLINICS_FOR_SPECIALITY_ERROR,
    BOOKING_SUCCESS,
    BOOKING_PENDING,
    BOOKING_ERROR,
    FETCH_BOOKING_SUCCESS,
    FETCH_BOOKING_PENDING,
    FETCH_BOOKING_ERROR
} from "../constants/actionsTypes";

const initialState = {
    loading: false,
    fetched: false,
    idUser: '',
    userCreated: false,
    specialities: [],
    clinicsForSpeciality: [],
    error: null,
    clinics: [],
    bookingNumber: null,
    booking: {}
};

export default function userReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case VALIDATE_USER_BEGIN:
        case FETCH_SPECIALITIES_PENDING:
        case FETCH_CLINICS_FOR_SPECIALITY_PENDING:
        case FETCH_CLINICS_PENDING:
        case BOOKING_PENDING:
        case FETCH_BOOKING_PENDING:
            console.log('Loading');
            return {
                ...state,
                loading: true,
            };
        case VALID_USER:
            console.log('Reducer received user valid!');
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                fetched: true,
                idUser: action.payload
            };
        case USER_CREATED:
                return {
                    ...state,
                    userCreated: true
                };
        case INVALID_USER:
            console.log('Reducer received user invalid!');
            return {
                ...state,
                loading: false,
                fetched: true
            };
        case FETCH_CLINICS_SUCCESS:
            console.log('Reducer received clinics');
            return {
                ...state,
                loading: false,
                clinics: action.clinics
            }
        case FETCH_SPECIALITIES_SUCCESS:
            console.log('Reducer received specialities');
            return {
                ...state,
                loading: false,
                specialities: action.specialities
            }
        case FETCH_CLINICS_FOR_SPECIALITY_SUCCESS:
            console.log('Reducer received clinics for speciality');
            return {
                ...state,
                loading: false,
                clinicsForSpeciality: action.clinicsForSpeciality
            }
        case BOOKING_SUCCESS:
            console.log(`Reducer received booking number ${action.bookingNumber}`);
            return {
                ...state,
                loading: false,
                bookingNumber: action.bookingNumber
            }
        case FETCH_BOOKING_SUCCESS:
            console.log(`Reducer received booking ${JSON.stringify(action.booking)}`);
            return {
                ...state,
                loading: false,
                booking: action.booking,
                bookingNumber: action.booking.bookingNumber
            }
        case FETCH_SPECIALITIES_ERROR:
        case FETCH_CLINICS_FOR_SPECIALITY_ERROR:
        case FETCH_CLINICS_ERROR:
        case ERROR_CREATING_USER:
        case BOOKING_ERROR:
        case FETCH_BOOKING_ERROR:
            console.log("error received");
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case LOGED_OUT:
            console.log('Loging out!');
            return {
                initialState
            };
        default:
            return state;
    }
};
