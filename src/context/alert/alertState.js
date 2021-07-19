import { useReducer } from 'react';
import {v4 as uuid} from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from '../types';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // set alert
    const setAlert = (msg, type) => {
        const id = uuid();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        });

        setTimeout(() => {
            dispatch({type: REMOVE_ALERT, payload: id })
        }, 3000);
    };
    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;