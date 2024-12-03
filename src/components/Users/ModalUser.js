import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _ from "lodash";

import { createNewUser, updateCurrentUser } from "../../services/userService";

const ModalUser = (props) => {
    const { action, dataModalUser } = props
    const [sex, setSex] = useState(["Male", "Female", "Other"]);

    const defaultUserData = {
        email: "",
        username: "",
        password: "",
        phone: "",
        sex: "",
        address: "",
        groupId: ""
    }

    const [userData, setUserData] = useState(defaultUserData);

    useEffect(() => {
        if (action === "UPDATE") {
            setUserData({ ...dataModalUser })

        }
    }, [dataModalUser])

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    const validateInput = () => {
        let arrCheck = ["email", "password", "groupId"];
        let check = true;
        for (let i = 0; i < arrCheck.length; i++) {
            if (!userData[arrCheck[i]]) {
                toast.error(`Empty input ${arrCheck[i]}`)
                check = false;
            }
            return check;

        }
    }

    const handleConfirmUser = async () => {
        let check = validateInput();
        if (check === true) {
            let respone = action === "CREATE" ? await createNewUser(userData) : await updateCurrentUser(userData);
            if (respone && respone.EC === 0) {
                toast.success(respone.EM)
                props.handleCloseModal()
                setUserData({ ...defaultUserData })
            } else {
                toast.error(respone.EM)
            }
        }
    }

    return (
        <>
            <Modal size="lg" show={props.show} onHide={props.handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>{action === "CREATE" ? "Create new user" : "Edit user"}</span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="content-body row">
                        <div className="col-12 col-sm-6 form-group">
                            <label>Email (<span className="text-danger">*</span>):</label>
                            <input type="email" className="form-control" value={userData.email}
                                onChange={(event) => { handleOnchangeInput(event.target.value, "email") }}
                                disabled={action === "UPDATE" ? true : false}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone number:</label>
                            <input type="text" className="form-control" value={userData.phone}
                                onChange={(event) => { handleOnchangeInput(event.target.value, "phone") }}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Username:</label>
                            <input type="text" className="form-control" value={userData.username}
                                onChange={(event) => { handleOnchangeInput(event.target.value, "username") }}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            {action === "CREATE" &&
                                <>
                                    <label>Password (<span className="text-danger">*</span>):</label>
                                    <input type="password" className="form-control" value={userData.password}
                                        onChange={(event) => { handleOnchangeInput(event.target.value, "password") }}
                                    />
                                </>
                            }
                        </div>

                        <div className="col-12  form-group">
                            <label>Address:</label>
                            <input type="text" className="form-control" value={userData.address}
                                onChange={(event) => { handleOnchangeInput(event.target.value, "address") }}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            <label>Sex:</label>
                            <select
                                className="form-select"
                                onChange={(event) => { handleOnchangeInput(event.target.value, "sex") }}
                                value={userData.sex}
                            >
                                {sex.length > 0 &&
                                    sex.map((item, index) => {
                                        return (
                                            <option value={item} key={`sex-${index}`}>{item}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={props.handleCloseModal}
                    >Close</Button>
                    <Button variant="primary"
                        onClick={() => { handleConfirmUser() }}
                    >{action === "CREATE" ? "Save" : "UPDATE"}

                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;