import { combineReducers } from 'redux';
import userReducer from './userReducer';
import specialitiesReducer from './specialitiesReducer';
import fetchStatusReducer from './fetchStatusReducer';
import bookingReducer from './bookingReducer';

export default combineReducers({
    user: userReducer,
    specialities: specialitiesReducer,
    fetchStatus: fetchStatusReducer,
    booking: bookingReducer
});

