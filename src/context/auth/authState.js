import { useReducer } from 'react';
import axios from 'axios';
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
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            });
          
        }
    };

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
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;