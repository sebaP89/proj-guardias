import {
    VALID_USER,
    INVALID_USER,
    FETCHING_DATA,
    DATA_FETCHED,
    ERROR_FETCHING_DATA,
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
import { isEmpty } from '../utils/helper';
import getDistance from 'geolib/es/getDistance';

const initialState = {
    loading: false,
    error: null,
    fetched: false,
    idUser: '',
    userData: {},
    userCreated: false,
    specialities: [],
    clinicsForSpeciality: [],
    healthInsurances: [],
    bookingNumber: null,
    booking: {},
    refreshing: false,
    userCoordinates : null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_DATA:
            console.log('Loading');
            return {
                ...state,
                loading: true,
            };
        case ERROR_FETCHING_DATA:
            console.log("error received" + action.error);
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case DATA_FETCHED:
            return {
                ...state,
                loading: false,
            }
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
                    userCreated: true,
                    loading: false,
                };
        case INVALID_USER:
            console.log('Reducer received user invalid!');
            return {
                ...state,
                loading: false,
                fetched: true
            };
        case COORDINATES_REFRESH:
            return {
                ...state,
                userCoordinates: action.coordinates
            }
        case FETCH_HEALTH_INSURANCES_SUCCESS:
            console.log('Reducer received health insurances');
            return {
                ...state,
                loading: false,
                healthInsurances: action.healthInsurances
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

            action.clinicsForSpeciality.forEach(function(item,index,array) {
                if (state.userCoordinates != null) {
                    let coordsArray = item.clinicCoords.split(', ');
                    let latitude = parseFloat(coordsArray[0]);
                    let longitude = parseFloat(coordsArray[1]);
                    const distance = getDistance(state.userCoordinates, {
                        latitude: latitude,
                        longitude: longitude,
                    });
                    item.distance = (distance/1000).toFixed(2);
                }
                else
                {
                    item.distance = 0;
                }
                array[index] = item;
            });

            action.clinicsForSpeciality.sort((a, b) => (a.distance > b.distance) ? 1 : -1)

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
        case FETCH_USER_DATA_SUCCESS:
            console.log(`Reducer received userData ${JSON.stringify(action.userData)}`);
            return {
                ...state,
                loading: false,
                userData: action.userData
            }
        case FETCH_BOOKING_SUCCESS:
            console.log(`Reducer received booking ${JSON.stringify(action.booking)}`);
            return {
                ...state,
                loading: false,
                booking: action.booking,
                bookingNumber: isEmpty(action.booking) ? -1 : action.booking.bookingNumber
            }
        case LOGED_OUT:
            console.log('Loging out!');
            state = initialState;
            return state;
        case REFRESHING:
            return {
                ...state,
                refreshing: true,
            };
        case FINISH_REFRESHING:
            return {
                ...state,
                refreshing: false,
            };
        default:
            return state;
    }
};
