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

const initialState = {
    loading: false,
    fetched: false,
    idUser: '',
    specialities: [],
    clinicsForSpeciality: [],
    error: null
};

export default function userReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case VALIDATE_USER_BEGIN:
        case FETCH_SPECIALITIES_PENDING:
        case FETCH_CLINICS_PENDING:
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
        case INVALID_USER:
            console.log('Reducer received user invalid!');
            return {
                ...state,
                loading: false,
                fetched: true
            };
        case FETCH_SPECIALITIES_SUCCESS:
            console.log('Reducer received specialities');
            return {
                ...state,
                loading: false,
                specialities: action.specialities
            }
        case FETCH_CLINICS_SUCCESS:
            console.log('Reducer received clinics');
            return {
                ...state,
                loading: false,
                clinicsForSpeciality: action.clinicsForSpeciality
            }
        case FETCH_SPECIALITIES_ERROR:
        case FETCH_CLINICS_ERROR:
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
