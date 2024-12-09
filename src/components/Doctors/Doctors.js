import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllDoctor } from "../../services/userService";
import ModalDoctor from "./ModalDoctor";
import { UserContext } from "../../context/UserContext";

const Doctors = (props) => {
    const { user } = useContext(UserContext);

    const [listDoctors, setListDoctors] = useState([]);
    const [isShowModalBooking, setIsShowModalBooking] = useState(false);

    const [dataDoctor, setDataDoctor] = useState({})

    const navigate = useNavigate(); // Khai báo hook điều hướng

    const fetchDoctor = async () => {
        let respone = await fetchAllDoctor();
        // console.log("check respone:", respone);
        if (respone && +respone.EC === 0) {
            setListDoctors(respone.DT);
        }
    };

    // const fetchDoctor = async () => {
    //     let respone = await fetchAllDoctor();
    //     console.log("API response: ", respone); // Kiểm tra dữ liệu trả về
    //     if (respone && +respone.EC === 0) {
    //         // Lọc danh sách bác sĩ để loại bỏ bản ghi trùng lặp
    //         const uniqueDoctors = respone.DT.filter((doctor, index, self) =>
    //             index === self.findIndex(d => d.id === doctor.id) // So sánh ID để tìm phần tử duy nhất
    //         );
    //         setListDoctors(uniqueDoctors); // Cập nhật danh sách bác sĩ sau khi lọc
    //     }
    // };


    useEffect(() => {
        fetchDoctor();
    }, []);

    const handleViewDetailDoctor = (doctor) => {
        navigate(`/doctors/${doctor.id}`)
    }

    const handleBooking = (doctor) => {
        setIsShowModalBooking(true);
        setDataDoctor(doctor);
        // console.log("check doctor new: ", doctor)

    }
    const handleCloseModalBooking = () => {
        setIsShowModalBooking(false);
    }
    return (
        <>
            <h3>Danh sách bác sĩ</h3>
            <ul>
                {listDoctors.map((doctor, index) => (
                    <div className="card shadow-sm mb-4" key={index}>
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Thông tin bác sĩ</h5>
                        </div>
                        <div className="card-body">
                            <h6 className="card-title">
                                <strong>Bác sĩ:</strong> {doctor.User.name}
                            </h6>
                            <h6 className="card-title">
                                <strong>Chuyên khoa:</strong> {doctor.Specialty.name}
                            </h6>
                            <h6 className="card-title">
                                <strong>Nơi công tác:</strong> {doctor.Facility.name}
                            </h6>
                            <button
                                className="btn btn-secondary mt-3"
                                onClick={() => handleViewDetailDoctor(doctor)} // Chuyển hướng
                            >
                                Xem chi tiết
                            </button>
                            <button
                                className="ms-2 btn btn-primary mt-3"
                                onClick={() => handleBooking(doctor)} // Chuyển hướng
                            >
                                Đặt lịch
                            </button>

                            {/* {doctor && doctor.Schedules && doctor.Schedules.length > 0 &&
                                doctor.Schedules.map((item) => {
                                    <div>{item.id}</div>
                                })
                            } */}

                        </div>
                    </div>
                ))}
            </ul>

            <ModalDoctor
                show={isShowModalBooking}
                handleCloseModal={handleCloseModalBooking}
                dataDoctor={dataDoctor}
                user={user}
            />
        </>
    );
};

export default Doctors;
