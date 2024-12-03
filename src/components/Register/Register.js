import { useNavigate } from 'react-router-dom';
import './Register.scss'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { registerNewUser } from '../../services/userService';

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isValidInputs = () => {
        if (!email) {
            toast.error("Email is required !");
            return false;
        }
        if (!phone) {
            toast.error("Phone is required !");
            return false;
        }
        if (!password) {
            toast.error("Password is required !");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password is not same !");
            return false;
        }

        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("Email is invalid!");
            return false
        }
        return true
    }

    let history = useNavigate()
    const handleLogin = () => {
        history('/login')
    }

    const handleRegister = async () => {
        const check = isValidInputs()
        if (check) {
            let respone = await registerNewUser(email, phone, username, password);


            if (+respone.EC === 0) {
                toast.success(respone.EM)
                history('/login')
            } else {
                toast.error(respone.EM)
            }

        }
    }

    // useEffect(() => {
    //     axios.get("http://localhost:8080/api/test-api").then(data => {
    //         console.log("check data api: ", data)
    //     })


    // })

    return (
        <div className="register-container">
            <div className="container">
                <div className="row px-4">
                    <div className="contain-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='title'>
                            FaceBook
                        </div>
                        <div className='detail'>
                            FaceBook helps you connect and share with people in your life.
                        </div>
                    </div>
                    <div className="contain-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
                        <div className='title d-sm-none'>
                            FaceBook
                        </div>
                        <div className='form-group'>
                            <label>Email: </label>
                            <input value={email} name='email' type='text' className='form-control'
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone number: </label>
                            <input name='phone' type='text' className='form-control'
                                value={phone}
                                onChange={(event) => { setPhone(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>User name: </label>
                            <input name='username' type='text' className='form-control'
                                value={username}
                                onChange={(event) => { setUsername(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password: </label>
                            <input name='password' type='password' className='form-control'
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password: </label>
                            <input name='re-password' type='password' className='form-control'
                                value={confirmPassword}
                                onChange={(event) => { setConfirmPassword(event.target.value) }}
                            />
                        </div>

                        <button onClick={() => { handleRegister() }} type='password' className='btn btn-primary'>
                            Register
                        </button>
                        <hr />
                        <div className='text-center'>
                            <button onClick={() => handleLogin()} className='btn btn-success'>
                                Already've an account. Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;