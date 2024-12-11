import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDoctor } from "../../services/doctorService";

const DoctorDetail = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    useEffect(() => {
        fetchDoctorDetail();

    }, []);

    const fetchDoctorDetail = async () => {
        let respone = await fetchDoctor(id);

        if (+respone.EC === 0) {
            setDoctor(respone.DT);
        }

    }
    console.log(doctor)
    return (
        <div>
            <h1>Chi tiết bác sĩ</h1>
            {doctor ? (
                <div>
                    <h3>{doctor.User.name}</h3>
                    <p>{doctor.Specialty.name}</p>
                    <p>{doctor.Facility.name}</p>
                    {/* Hiển thị thông tin chi tiết bác sĩ */}
                </div>
            ) : (
                <p>Đang tải...</p>
            )}
        </div>
    );
};

export default DoctorDetail;
