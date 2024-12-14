import axios from "../setUp/axios"

const fetchBooking = (dataBooking) => {
    return axios.post(`/api/booking/create`, { ...dataBooking })

}

const fetchAllBooking = (doctorId) => {
    return axios.get(`/api/booking/read/${doctorId}`)
}

export {
    fetchBooking, fetchAllBooking
}