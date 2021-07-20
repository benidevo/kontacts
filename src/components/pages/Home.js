import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactsFilter from '..//contacts/ContactsFilter';
import AuthContext from '../../context/auth/authContext';

const Home = props => {
    const authContext = useContext(AuthContext);

    const {isAuthenticated, loadUser} = authContext;
    
    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])
    
    return (
    <>
        {!isAuthenticated ? (props.history.push('/login')) :
            (<div className="grid-2">
                <div>
                    <ContactForm />
                </div>
                <div>
                    <ContactsFilter />
                    <Contacts />
                </div>
            </div>)
        }
    </>
    )
}

export default Home;
