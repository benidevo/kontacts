import {
    REGISTER_SUCCESS,
    REGISTER_FAIL, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    CLEAR_ERRORS, 
    AUTH_ERROR, 
    USER_LOADED, 
    LOGOUT
} from '../types';

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                error: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
                token: null,
                user: null,
                error: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
                token: null,
                user: null,
            }
        default:
            return state;
    };
};
