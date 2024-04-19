import React, { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';


const UserContext = createContext(null);
const UserUpdateContext = createContext(() => {});

export function useUser(){
    return useContext(UserContext);
}

export function useUserUpdate(){
    return useContext(UserUpdateContext);
}

export function UserProvider({children}){
    const [user, setUser] = useState(null);

    function updateUser(newUser){
        setUser(newUser);
        localStorage.setItem('token', newUser ? 'enter_token_here' : null);
    }

    return (
        <UserContext.Provider value={{user}}>
            <UserUpdateContext.Provider value={{updateUser}}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
}