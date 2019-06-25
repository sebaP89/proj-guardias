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
} from "../constants/actionsTypes";

const initialState = {
    loading: false,
    fetched: false,
    idUser: '',
    userCreated: false,
    specialities: [],
    clinicsForSpeciality: [],
    error: null,
    clinics: []
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
        case FETCH_SPECIALITIES_ERROR:
        case FETCH_CLINICS_FOR_SPECIALITY_ERROR:
        case FETCH_CLINICS_ERROR:
        case ERROR_CREATING_USER:
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
