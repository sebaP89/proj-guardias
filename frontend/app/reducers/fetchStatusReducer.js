import {
    FETCHING_DATA,
    DATA_FETCHED,
    ERROR_FETCHING_DATA,
    REFRESHING,
    FINISH_REFRESHING,
} from "../constants/actionsTypes";

const initialState = {
    loading: false,
    error: null,
    refreshing: false,
};

export default function fetchStatusReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_DATA:
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
            };
        case DATA_FETCHED:
            return {
                ...state,
                loading: false,
            };
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
