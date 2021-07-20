import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';


const Login = props => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    
    const { setAlert } = alertContext; 
    const { login, isAuthenticated, error, clearErrors } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        };
        
        if (error) {
            setAlert(error, 'danger');
            clearErrors();
        };
        // eslint-disable-next-line
    }, [isAuthenticated, error, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        login({
            email,
            password
        });
    };

    return (
        <div className="form-container">
            <h1 className="text-primary">Login</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                 <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        minLength="6"
                    />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
      
            </form>
        </div>
    )
}

export default Login;
