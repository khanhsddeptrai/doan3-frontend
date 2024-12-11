import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

// import { UserContext } from "../../context/UserContext";

const Users = (props) => {

    useEffect(() => {
    }, [currentPage])

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
                            // onClick={() => { handleCreateNewUser() }}
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
                                                        // onClick={() => { handleEditUser(item) }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-danger"
                                                        // onClick={() => { handleDeleteUser(item) }}
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
                                                Không có lịch hẹn
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
        </>
    )
}

export default Users;
