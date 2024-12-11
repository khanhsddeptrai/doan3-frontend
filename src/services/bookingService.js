import axios from "../setUp/axios"

const fetchBooking = (dataBooking) => {
    return axios.post(`/api/booking/create`, { ...dataBooking })

}

const fetchAllBooking = () => {
    return axios.get(`/api/booking/read`)
}
// read?page=${page}&limit=${limit}

export {
    fetchBooking, fetchAllBooking
}