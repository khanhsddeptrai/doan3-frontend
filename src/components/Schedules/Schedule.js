// import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import { toast } from "react-toastify";
// import { fetchSchedule } from "../../services/scheduleService";
// // import { UserContext } from "../../context/UserContext";
// import { UserContext } from "../../context/UserContext";

// const Schedule = (props) => {
//     const { user } = useContext(UserContext);
//     const [schedules, setSchedules] = useState([])

//     useEffect(() => {
//         fetchScheduleByDoctorId();
//     }, [])

//     const fetchScheduleByDoctorId = async () => {
//         // console.log("check respone schedule:", user.account.doctorId);
//         let respone = await fetchSchedule(user.account.doctorId);
//         console.log("check respone schedule:", respone);
//         if (respone && +respone.EC === 0) {
//             setSchedules(respone.DT);
//         }
//     }

//     return (
//         <>
//             <div className="container">
//                 <div className="users-container">
//                     <div className="user-header">
//                         <div className="title">
//                             <h3>Lịch khám của tôi</h3>
//                         </div>
//                         <div className="action">
//                             <button className="btn btn-success">Refresh</button>
//                             <button className="btn btn-primary"
//                             // onClick={() => { handleCreateNewUser() }}
//                             >Add new user</button>
//                         </div>
//                     </div>

//                     <div className="user-cotent">
//                         <table className="table table-bordered table-hover">
//                             <thead>
//                                 <tr>
//                                     <th scope="col">STT</th>
//                                     <th scope="col">Họ tên</th>
//                                     <th scope="col">Điện thoại</th>
//                                     <th scope="col">Ngày khám</th>
//                                     <th scope="col">Giờ khám</th>
//                                     <th scope="col">Trạng thái</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {schedules && schedules.length > 0 ?
//                                     <>
//                                         {schedules.map((item, index) => {
//                                             return (
//                                                 <tr key={`row-${index}`}>
//                                                     <td>{(index + 1)}</td>
//                                                     <td>{item.User.email}</td>
//                                                     <td>{item.User.name}</td>
//                                                     <td>{item.User.phone}</td>
//                                                     <td>{item.User.phone}</td>
//                                                     <th>
//                                                         <button className="btn btn-warning mx-3"
//                                                         // onClick={() => { handleEditUser(item) }}
//                                                         >
//                                                             Edit
//                                                         </button>
//                                                         <button className="btn btn-danger"
//                                                         // onClick={() => { handleDeleteUser(item) }}
//                                                         >
//                                                             Delete
//                                                         </button>
//                                                     </th>
//                                                 </tr>
//                                             )
//                                         })}
//                                     </>
//                                     :
//                                     <>
//                                         <tr>
//                                             <td>
//                                                 Không có lịch hẹn
//                                             </td>
//                                         </tr>
//                                     </>
//                                 }


//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Schedule;
