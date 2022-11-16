import React, { createContext, ReactNode, useContext, useState } from 'react';

type authContextTypes = {
    loggedIn: boolean;
    login: () => void;
    logout: () => void;
    registration: () => void;
}

const authDefaultValues: authContextTypes = {
    loggedIn: false,
    login: () => {},
    logout: () => {},
    registration: () => {},
}

const UserContext = createContext<authContextTypes>(authDefaultValues);

export function useAuth() {
    return useContext(UserContext);
}

type Props = {
    children: ReactNode;
}

const AuthContext = ({ children }: Props) => {

    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const login = () => {
        setLoggedIn(true);
    }

    const logout = () => {
        setLoggedIn(false);
    }

    const registration = () => {
        setLoggedIn(true);
    }

    const value = {
        loggedIn,
        login,
        logout,
        registration
    }

    return (
        <div>
            Context
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </div>
    )
}

export default AuthContext