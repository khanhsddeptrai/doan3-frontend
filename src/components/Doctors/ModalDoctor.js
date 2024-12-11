import { useEffect, useState, useContext } from "react"
import { Modal } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { toast } from "react-toastify"

import { fetchBooking } from "../../services/bookingService"
import { UserContext } from "../../context/UserContext";

const ModalDoctor = (props) => {
    const { dataDoctor } = props
    const { user } = useContext(UserContext);

    const [selectedDate, setSelectedDate] = useState("") // Lưu ngày khám được chọn
    const [filteredSchedules, setFilteredSchedules] = useState([]) // Lưu lịch khám được lọc
    const [errorMessage, setErrorMessage] = useState("") // Thông báo lỗi

    // const [selectedTimeslot, setSelectedTimeslot] = useState("")
    const [selectedScheduleId, setSelectedScheduleId] = useState(); // Lưu scheduleId được chọn



    useEffect(() => {
        console.log("check user::: ", user)
        // Lọc danh sách lịch khám dựa trên ngày
        if (selectedDate && dataDoctor && dataDoctor.Schedules) {
            const filtered = dataDoctor.Schedules.filter(schedule => schedule.date === selectedDate)
            setFilteredSchedules(filtered)
        } else {
            setFilteredSchedules([])
        }
    }, [selectedDate, dataDoctor])


    const handleDateChange = (event) => {
        const selected = event.target.value // Lấy ngày được chọn từ input
        const today = new Date() // Ngày hiện tại
        const selectedDate = new Date(selected) // Ngày được chọn

        // Kiểm tra ngày có lớn hơn hoặc bằng ngày hiện tại không
        if (selectedDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0)) {
            setSelectedDate(selected)
            setErrorMessage("") // Xóa thông báo lỗi nếu ngày hợp lệ
        } else {
            setSelectedDate("") // Reset ngày nếu không hợp lệ
            setErrorMessage("Ngày khám phải lớn hơn hoặc bằng ngày hiện tại.")
        }
    }

    const handleCloseModal = () => {
        setSelectedDate("")
        props.handleCloseModal()
    }

    const handleSubmit = async () => {
        const bookingData = {
            date: selectedDate,
            patientId: user.account.id,
            scheduleId: selectedScheduleId
        }
        console.log(bookingData)
        let response = await fetchBooking(bookingData)
        if (response && response.EC === 0) {
            toast.success(response.EM)
            handleCloseModal()
        } else {
            toast.error(response.EM)
        }
    }


    return (
        <>
            <Modal size="lg" show={props.show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>Đặt lịch</span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Ngày khám:</label>
                            <input
                                type="date"
                                className="form-control"
                                onChange={handleDateChange} // Gọi hàm kiểm tra khi thay đổi ngày
                                name="date"
                            />
                            {errorMessage && (
                                <small className="text-danger">{errorMessage}</small>
                            )}
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Bác sĩ:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dataDoctor.User ? dataDoctor.User.name : "zzz"}
                                readOnly
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Giờ khám: (<span className="text-danger">*</span>):</label>
                            <select
                                className="form-select"
                                disabled={!selectedDate || filteredSchedules.length === 0} // Vô hiệu hóa nếu không có ngày hoặc giờ khám
                                onChange={(event) => setSelectedScheduleId(event.target.value)}
                                value={selectedScheduleId || ""} // Giá trị mặc định là rỗng khi chưa chọn
                            >
                                {/* Tùy chọn mặc định */}
                                <option value="">Chọn giờ khám</option>

                                {selectedDate ? (
                                    filteredSchedules.length > 0 ? (
                                        filteredSchedules.map(schedule => (
                                            <option key={schedule.id} value={schedule.id}>
                                                {schedule.Timeslot.startTime} - {schedule.Timeslot.endTime}
                                                (Số lượng còn: {schedule.maxNumber - schedule.currentNumber})
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>Không có lịch khám khả dụng</option>
                                    )
                                ) : (
                                    <option value="" disabled>Vui lòng chọn ngày khám trước</option>
                                )}
                            </select>


                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Giá:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dataDoctor.User ? dataDoctor.price : "0"}
                                readOnly
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Cơ sở y tế:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dataDoctor.Facility ? dataDoctor.Facility.name : "###########"}
                                readOnly
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Chuyên khoa:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dataDoctor.Specialty ? dataDoctor.Specialty.name : "###########"}
                                readOnly
                            />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleCloseModal}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!selectedDate || errorMessage} // Disable nếu ngày không hợp lệ
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDoctor
