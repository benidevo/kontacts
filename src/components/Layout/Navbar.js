import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext); 

    const { isAuthenticated, user, logout } = authContext;
    const {clearContacts} = contactContext;

    const onLogout = () => {
        logout();
        clearContacts();
    }


    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {!isAuthenticated &&
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                }

                {isAuthenticated ?
                    <li>
                        <Link to="/" onClick={onLogout}><i className="fas fa-sign-out-alt" /> Logout</Link>
                    </li>
                    :
                    <li>
                        <Link to="/login">Login</Link>
                    </li>   
                }
                
                {user && <li>Hello {user.user.name.charAt(0).toUpperCase() + user.user.name.slice(1)}</li>}   
            </ul>
        </div>
    )
}

Navbar.defaultProps = {
    title: 'Kontacts',
    icon: 'fas fa-id-card-alt'
}

export default Navbar;
