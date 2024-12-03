import { useEffect, useState, useContext } from 'react';
import './Login.scss'
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';

const Login = (props) => {
    const { loginContext } = useContext(UserContext);

    let history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const HandleCreateNewAccount = () => {
        history('/register')
    }

    const handleLogin = async () => {
        if (!email) {
            toast.error("Please enter your email address!");
            return;
        }
        if (!password) {
            toast.error("Please enter your password!");
            return;
        }

        let respone = await loginUser(email, password);
        if (+respone.EC === 0) {
            let email = respone.DT.email;
            let name = respone.DT.name;
            let token = respone.DT.access_token;
            let userType = respone.DT.userType;
            let data = {
                isAuthenticated: true,
                token: token,
                account: { email, name, userType }
            }
            loginContext(data)
            toast.success(respone.EM);
            history("/users");
            // window.location.reload();

        } else {
            toast.error(respone.EM)
        }
    }

    const handlePressEnter = (event) => {
        if (event.code === "Enter") {
            handleLogin()
        }
    }

    return (
        <div className="login-container">
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
                        <input
                            value={email} type='text' className='form-control' placeholder='Enter your Email'
                            onChange={(event) => { setEmail(event.target.value) }}
                            onKeyUp={(event) => { handlePressEnter(event) }}
                        />
                        <input
                            value={password} type='password' className='form-control' placeholder='Enter your Password'
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyUp={(event) => { handlePressEnter(event) }}
                        />
                        <button onClick={() => { handleLogin() }} type='password' className='btn btn-primary'

                        >
                            Login
                        </button>
                        <span className='text-center'><a href='#' className='forgot-password'>Forgot your password?</a></span>
                        <hr />
                        <div className='text-center'>
                            <button onClick={() => HandleCreateNewAccount()} className='btn btn-success'>
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;