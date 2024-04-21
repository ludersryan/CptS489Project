import React, {createContext, useState} from 'react';
import UserContext from './userContext';


export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        token: localStorage.getItem('token'),
        id: localStorage.getItem('id')
    });

    const login = (token, id) => {
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        setUser({token, id});
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        setUser(null);
    }

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}