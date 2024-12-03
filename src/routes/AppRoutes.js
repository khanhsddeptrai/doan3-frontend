import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Users from '../components/Users/Users';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import NotFound from '../components/NotFound/NotFound';
import Home from '../components/Home/Home';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}>
                    <Route
                        path='users'
                        element={
                            <PrivateRoutes children={<Users />} />
                            // <PrivateRoutes>
                            //     <Users />
                            // </PrivateRoutes>
                        }
                    />
                    <Route path='*' element={<NotFound />} />
                </Route>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Routes>
            < ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default AppRoutes;