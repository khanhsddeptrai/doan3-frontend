import React, { useState, useEffect } from "react";

import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(
        {
            isLoading: true,
            isAuthenticated: false,
            token: "",
            account: {}
        });

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
            let data = {
                isLoading: false,
                isAuthenticated: true,
                token: token,
                account: { email, name }
            }
            setUser(data);

        }
    }

    useEffect(() => {
        if (window.location.pathname !== '/') {
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