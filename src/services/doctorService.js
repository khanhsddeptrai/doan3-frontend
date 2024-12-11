import axios from "../setUp/axios"

const fetchAllDoctor = () => {
    return axios.get(`/api/doctor/read`)

}

const fetchDoctor = (id) => {
    return axios.get(`/api/doctor/read/${id}`)

}

// read?page=${page}&limit=${limit}

export {
    fetchAllDoctor, fetchDoctor
}