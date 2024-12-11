import axios from "../setUp/axios"

const registerNewUser = (email, phone, name, password) => {
    return axios.post("/api/register", {
        email, phone, name, password
    })
}

const loginUser = (email, password) => {
    return axios.post("/api/login", {
        email, password
    })
}

const fetchAllUser = (page, limit) => {
    return axios.get(`/api/user/read?page=${page}&limit=${limit}`)
}

const deleteUser = (user) => {
    return axios.delete(`/api/user/delete`, { data: { id: user.id } })
}

const createNewUser = (dataUser) => {
    return axios.post(`/api/user/create`, { ...dataUser })
}

const updateCurrentUser = (dataUser) => {
    return axios.put(`/api/user/update`, { ...dataUser })
}

const getUserAccount = () => {
    return axios.get(`/api/account`)
}


// read?page=${page}&limit=${limit}

export {
    registerNewUser, loginUser, fetchAllUser, deleteUser,
    createNewUser, updateCurrentUser, getUserAccount
}