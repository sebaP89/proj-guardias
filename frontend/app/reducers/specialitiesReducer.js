import {
    FETCH_SPECIALITIES_SUCCESS,
    FETCH_HEALTH_INSURANCES_SUCCESS,
    FETCH_CLINICS_FOR_SPECIALITY_SUCCESS,
    COORDINATES_REFRESH
} from "../constants/actionsTypes";
import getDistance from 'geolib/es/getDistance';

const initialState = {
    specialities: [],
    clinics: [],
    healthInsurances: [],
    userCoordinates : null
};

export default function specialitiesReducer(state = initialState, action) {
    switch (action.type) {
        case COORDINATES_REFRESH:
            return {
                ...state,
                userCoordinates: action.coordinates
            };
        case FETCH_HEALTH_INSURANCES_SUCCESS:
            console.log('Reducer received health insurances');
            return {
                ...state,
                healthInsurances: action.healthInsurances
            };
        case FETCH_SPECIALITIES_SUCCESS:
            console.log('Reducer received specialities');
            return {
                ...state,
                specialities: action.specialities
            };
        case FETCH_CLINICS_FOR_SPECIALITY_SUCCESS:
            console.log('Reducer received clinics for speciality');

            action.clinics.forEach(function(item,index,array) {
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

            action.clinics.sort((a, b) => (a.distance > b.distance) ? 1 : -1)

            return {
                ...state,
                clinics: action.clinics
            };
        default:
            return state;
    }
};
