import React, { useReducer } from 'react';
import { v4 as uuid } from "uuid";
import ContactContext from './contactContext';
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Ben Idewor",
                email: "bwor@gmail.com",
                phone: "08166943923",
                type: "professional"
            },
            {
                id: 2,
                name: "Imoru Jane",
                email: "jane@gmail.com",
                phone: "08184593403",
                type: "professional"
            },
            {
                id: 3,
                name: "Oluka Fred",
                email: "fred@gmail.com",
                phone: "0808783923",
                type: "professional"
            },
            {
                id: 4,
                name: "Ronaldo Christian",
                email: "ronaldo@gmail.com",
                phone: "0704833403",
                type: "professional"
            },
        ],
        current: null,
        filtered: null
    };
    
    const [state, dispatcher] = useReducer(contactReducer, initialState);

    // add contact
    const addContact = contact => {
        contact.id = uuid();
        dispatcher({type: ADD_CONTACT, payload: contact})
    };

    // delete contact
    const deleteContact = id => {
        dispatcher({type: DELETE_CONTACT, payload: id})
    };

    // set current
    const setCurrent = contact => {
        dispatcher({type: SET_CURRENT, payload: contact})
    };

    // clear current
    const clearCurrent = () => {
        dispatcher({type: CLEAR_CURRENT})
    };

    // update contact
    const updateContact = contact => {
        dispatcher({type: UPDATE_CONTACT, payload: contact})
    };

    // filter contact
    const filterContacts = text => {
        dispatcher({type: FILTER_CONTACTS, payload: text})
    };

    // clear filter
    const clearFilter = () => {
        dispatcher({type: CLEAR_FILTER})
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;