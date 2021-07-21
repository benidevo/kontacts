import { useReducer } from 'react';
import axios from 'axios';
import setToken from '../../utils/setAuthToken';
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
import AuthContext from './authContext';
import AuthReducer from './authReducer';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null
    };

    const [ state, dispatch ] = useReducer(AuthReducer, initialState)
    // Register User
    const register = async formData => {
        const config = {
            headers: {
                contentType: 'application/json'
            }
        }
        try {
            const res = await axios.post('api/users', formData, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            });
          
        }
    };

    // load user
    const loadUser = async () => {
        if (localStorage.token) {
            setToken(localStorage.token)
        }

        try {
            const response = await axios.get('api/auth');
            dispatch({ type: USER_LOADED, payload: response.data });
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    // login user
    const login = async formData => {
        const config = {
            headers: {
                contentType: 'application/json'
            }
        }
        try {
            const response = await axios.post('api/auth', formData, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            });
        }
    };

    // logout user
    const logout = () => dispatch({type: LOGOUT});

    // clear errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS})
    
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                user: state.user,
                register,
                clearErrors,
                loadUser,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
