import {
    VALID_USER,
    INVALID_USER,
    LOGED_OUT,
    USER_CREATED,
    FETCH_USER_DATA_SUCCESS,
} from "../constants/actionsTypes";

const initialState = {
    fetched: false,
    userId: '',
    userData: {},
    userCreated: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case VALID_USER:
            console.log('Reducer received user valid!');
            console.log(action.payload);
            return {
                ...state,
                fetched: true,
                userId: action.payload
            };
        case USER_CREATED:
            return {
                ...state,
                userCreated: true,
            };
        case INVALID_USER:
            console.log('Reducer received user invalid!');
            return {
                ...state,
                fetched: true
            };
        case FETCH_USER_DATA_SUCCESS:
            console.log(`Reducer received userData ${JSON.stringify(action.userData)}`);
            return {
                ...state,
                userData: action.userData
            };
        case LOGED_OUT:
            console.log('Loging out!');
            state = initialState;
            return state;
        default:
            return state;
    }
};
