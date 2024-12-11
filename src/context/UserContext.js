import React, { useState, useEffect } from "react"

import { getUserAccount } from "../services/userService"

const UserContext = React.createContext(null)

const UserProvider = ({ children }) => {

    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    }
    const [user, setUser] = useState(userDefault)

    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
        fetchUser();
    }

    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }))
    }

    const fetchUser = async () => {
        let respone = await getUserAccount()
        console.log("check user account ", respone)
        if (respone && respone.EC === 0) {
            let email = respone.DT.email
            let name = respone.DT.name
            let token = respone.DT.access_token
            let id = respone.DT.id
            let data = {
                isLoading: false,
                isAuthenticated: true,
                token: token,
                account: { email, name, id }
            }
            setUser(data)
        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }