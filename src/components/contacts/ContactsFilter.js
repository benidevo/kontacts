import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactsFilter = () => {
    const contactContext = useContext(ContactContext);
    const { filterContacts, clearFilter, filtered } = contactContext;


    const text = useRef('');

    useEffect(() => {
        if (!filtered) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if (text.current.value) {
            filterContacts(e.target.value)
        } else {
            clearFilter()
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        if (text) {
            filterContacts(text);
        } else {
            clearFilter();
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                ref={text}
                name="text"
                onChange={onChange}
                placeholder="filter" />
        </form>
    )
}

export default ContactsFilter;
