import axios from "../setUp/axios"

const fetchAllDoctor = () => {
    return axios.get(`/api/doctor/read`)
}

const fetchDoctor = (id) => {
    return axios.get(`/api/doctor/read/${id}`)
}


// const fetchDoctorSchedule = (doctorId) => {
//     return axios.get(`/api/doctor/doctor-schedule/${doctorId}`)

// }



export {
    fetchAllDoctor, fetchDoctor
}