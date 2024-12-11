import { useNavigate } from 'react-router-dom'
import './Register.scss'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { registerNewUser } from '../../services/userService'

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const isValidInputs = () => {
        if (!email) {
            toast.error("Email is required !")
            return false
        }
        if (!phone) {
            toast.error("Phone is required !")
            return false
        }
        if (!password) {
            toast.error("Password is required !")
            return false
        }
        if (password !== confirmPassword) {
            toast.error("Password is not same !")
            return false
        }

        let regx = /\S+@\S+\.\S+/
        if (!regx.test(email)) {
            toast.error("Email is invalid!")
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
            let respone = await registerNewUser(email, phone, name, password)


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
                            QuickCare
                        </div>
                        <div className='detail'>
                            QuickCare chăm sóc và hỗ trợ sức khỏe của ĐÓM
                        </div>
                    </div>
                    <div className="contain-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
                        <div className='title d-sm-none'>
                            QuickCare
                        </div>

                        <div className='form-group'>
                            <label>Email (<span className='text-danger'>*</span>): </label>
                            <input value={email} name='email' type='email' className='form-control'
                                onChange={(event) => { setEmail(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Điện thoại (<span className='text-danger'>*</span>): </label>
                            <input name='phone' type='text' className='form-control'
                                value={phone}
                                onChange={(event) => { setPhone(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Họ và tên (<span className='text-danger'>*</span>): </label>
                            <input name='name' type='text' className='form-control'
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Mật khẩu (<span className='text-danger'>*</span>): </label>
                            <input name='password' type='password' className='form-control'
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                                placeholder="Mật khẩu phải có ít nhất 8 ký tự trong đó có chữ thường và số"
                            />
                        </div>
                        <div className='form-group'>
                            <label>Nhập lại mật khẩu (<span className='text-danger'>*</span>): </label>
                            <input name='re-password' type='password' className='form-control'
                                value={confirmPassword}
                                onChange={(event) => { setConfirmPassword(event.target.value) }}
                            />
                        </div>

                        <div className='mt-3 d-flex justify-content-center'>
                            <button onClick={() => { handleRegister() }} type='password' className='btn btn-primary w-50'>
                                Đăng ký
                            </button>
                        </div>
                        <hr />
                        <div className='text-center'>
                            <a href='#' className='forgot-password' onClick={() => handleLogin()}>
                                Bạn đã có tài khoản? Đăng nhập.
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register