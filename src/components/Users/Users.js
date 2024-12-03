import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

import { fetchAllUser, deleteUser } from '../../services/userService';
import ModalDeleteConfirm from "./ModalDeleteConfirm";
import ModalUser from "./ModalUser";
// import { UserContext } from "../../context/UserContext";

const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(4);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowDeleteConfirm, setIsShowDeleteConfirm] = useState(false);
    const [dataModal, setDataModal] = useState({})  //modal delete
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState("CREATE");
    const [dataModalUser, setDataModalUser] = useState({})  //modal update/create
    useEffect(() => {
        fetchUser();
    }, [currentPage])

    const fetchUser = async () => {
        let respone = await fetchAllUser(currentPage, currentLimit);

        if (respone && respone.EC === 0) {
            setListUsers(respone.DT.users)
            setTotalPages(respone.DT.totalPages)
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    }

    const handleDeleteUser = async (user) => {
        setDataModal(user)
        setIsShowDeleteConfirm(true);

    }

    const handleClose = () => {
        setIsShowDeleteConfirm(false);
        setDataModal({});
    }

    const confirmDeleteUser = async () => {
        let respone = await deleteUser(dataModal)
        if (respone && respone.EC === 0) {
            toast.success(respone.EM)
            setIsShowDeleteConfirm(false);
            await fetchUser();
        } else {
            toast.error(respone.EM)
        }
    }

    const handleCreateNewUser = () => {
        setActionModalUser("CREATE")
        setIsShowModalUser(true);
    }

    const handleCloseUserModal = async () => {
        setIsShowModalUser(false);
        setDataModalUser({})
        await fetchUser();

    }

    const handleEditUser = (user) => {
        setActionModalUser("UPDATE")
        setDataModalUser(user)
        setIsShowModalUser(true);
    }

    return (
        <>
            <div className="container">
                <div className="users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table Users</h3>
                        </div>
                        <div className="action">
                            <button className="btn btn-success">Refresh</button>
                            <button className="btn btn-primary"
                                onClick={() => { handleCreateNewUser() }}
                            >Add new user</button>
                        </div>
                    </div>

                    <div className="user-cotent">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentLimit * (currentPage - 1)) + (index + 1)}</td>
                                                    <td>{item.User.email}</td>
                                                    <td>{item.User.name}</td>
                                                    <td>{item.User.phone}</td>
                                                    <th>
                                                        <button className="btn btn-warning mx-3"
                                                            onClick={() => { handleEditUser(item) }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-danger"
                                                            onClick={() => { handleDeleteUser(item) }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </th>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td>
                                                Not Found User
                                            </td>
                                        </tr>
                                    </>
                                }


                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={4}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>
            </div>

            <ModalDeleteConfirm
                show={isShowDeleteConfirm}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />

            <ModalUser
                action={actionModalUser}
                show={isShowModalUser}
                handleCloseModal={handleCloseUserModal}
                dataModalUser={dataModalUser}
            />
        </>
    )
}

export default Users;

// const [account, setAccount] = useState({})
// useEffect(() => {
//   let session = sessionStorage.getItem('account');
//   if (session) {
//     setAccount(JSON.parse(session));
//   }
// }, [])