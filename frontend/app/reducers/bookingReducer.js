import {
    BOOKING_SUCCESS,
    FETCH_BOOKING_SUCCESS,
} from "../constants/actionsTypes";

import { isEmpty } from '../utils/helper';

const initialState = {
    lastBookingNumber: null,
    bookingData: {},
};

export default function bookingReducer(state = initialState, action) {
    switch (action.type) {
        case BOOKING_SUCCESS:
            return {
                ...state,
                lastBookingNumber: action.bookingNumber
            };
        case FETCH_BOOKING_SUCCESS:
            return {
                ...state,
                bookingData: action.booking,
                lastBookingNumber: isEmpty(action.booking) ? -1 : action.booking.bookingNumber
            };
        default:
            return state;
    }
};
