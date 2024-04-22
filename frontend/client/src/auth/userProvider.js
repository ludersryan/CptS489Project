import React, {createContext, useState} from 'react';
import UserContext from './userContext';


export const UserProvider = ({children}) => {

    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        return (token && id) ? {token, id} : null;
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
        console.log('User logged out');
    }

    return (
        <UserContext.Provider value={{user, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}