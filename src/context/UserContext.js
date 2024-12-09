import React, { useState, useEffect } from "react";

import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    }
    const [user, setUser] = useState(userDefault);

    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };

    const fetchUser = async () => {
        let respone = await getUserAccount();
        if (respone && respone.EC === 0) {
            let email = respone.DT.email;
            let name = respone.DT.name;
            let token = respone.DT.token;
            let id = respone.DT.id;
            let data = {
                isLoading: false,
                isAuthenticated: true,
                token: token,
                account: { email, name, id }
            }
            setUser(data);
        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }

    useEffect(() => {
        if (window.location.pathname !== '/' && window.location.pathname !== 'login') {
            fetchUser();
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider };