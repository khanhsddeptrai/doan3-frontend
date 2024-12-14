import { useEffect, useState, useContext } from 'react'
import './Login.scss'
//import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { loginUser } from '../../services/userService'
import { UserContext } from '../../context/UserContext'

const Login = (props) => {
    const { loginContext } = useContext(UserContext)

    let history = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const HandleCreateNewAccount = () => {
        history('/register')
    }

    const handleLogin = async () => {
        if (!email) {
            toast.error("Vui lòng nhập Email của bạn!")
            return
        }
        if (!password) {
            toast.error("Vui lòng nhập mật khẩu!")
            return
        }

        let respone = await loginUser(email, password)
        // console.log("check user loggggin ", respone)
        if (+respone.EC === 0) {
            let email = respone.DT.email
            let name = respone.DT.name
            let token = respone.DT.access_token
            let userType = respone.DT.userType
            let id = respone.DT.id
            // let doctorId = respone.DT.userType
            let data = {
                isAuthenticated: true,
                token: token,
                account: { email, name, userType, id }
            }
            // console.log("check data login: ", data)
            // sessionStorage.setItem('userData', JSON.stringify(data));
            loginContext(data)
            toast.success(respone.EM)
            history("/users")

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

                        </div>
                        <div className='detail'>

                        </div>
                    </div>
                    <div className="contain-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
                        <div className='title d-sm-none'>
                            FaceBook
                        </div>
                        <input
                            value={email} type='email' className='form-control' placeholder='Nhập tài khoản của bạn'
                            onChange={(event) => { setEmail(event.target.value) }}
                            onKeyUp={(event) => { handlePressEnter(event) }}
                        />
                        <input
                            value={password} type='password' className='form-control' placeholder='Nhập mật khẩu'
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyUp={(event) => { handlePressEnter(event) }}
                        />

                        <div className='mt-3 d-flex justify-content-center'>
                            <button onClick={() => { handleLogin() }} type='password' className='btn btn-primary w-50'>
                                Đăng nhập
                            </button>
                        </div>

                        <span className='text-center'><a href='#' className='forgot-password'>Quên mật khẩu?</a></span>
                        <hr />
                        <div className='text-center'>
                            <a href='#' onClick={() => HandleCreateNewAccount()} className='forgot-password'>
                                Bạn chưa có tài khoản? Đăng ký
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login