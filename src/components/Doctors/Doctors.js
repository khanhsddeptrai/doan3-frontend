import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllDoctor } from "../../services/userService";
import ModalDoctor from "./ModalDoctor";

const Doctors = (props) => {
    const [listDoctors, setListDoctors] = useState([]);
    const [isShowModalBooking, setIsShowModalBooking] = useState(false);


    const [dataDoctor, setDataDoctor] = useState({})

    const navigate = useNavigate(); // Khai báo hook điều hướng

    const fetchDoctor = async () => {
        let respone = await fetchAllDoctor();
        console.log("check respone:", respone);
        if (respone && +respone.EC === 0) {
            setListDoctors(respone.DT);
        }
    };

    useEffect(() => {
        fetchDoctor();
    }, []);

    const handleViewDetailDoctor = (doctor) => {
        navigate(`/doctors/${doctor.id}`)
    }

    const handleBooking = (doctor) => {
        setIsShowModalBooking(true);
        setDataDoctor(doctor);

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
                        </div>
                    </div>
                ))}
            </ul>

            <ModalDoctor
                show={isShowModalBooking}
                handleCloseModal={handleCloseModalBooking}
                dataDoctor={dataDoctor}
            />
        </>
    );
};

export default Doctors;
