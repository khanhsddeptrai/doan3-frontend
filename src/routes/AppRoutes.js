import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import Users from '../components/Users/Users';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import NotFound from '../components/NotFound/NotFound';
import Home from '../components/Home/Home';
import Doctors from '../components/Doctors/Doctors';
import DoctorDetail from '../components/Doctors/DoctorDetail';
import Booking from '../components/Bookings/Bookings';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Routes không cần bảo mật */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/" element={<Home />} />
            {/* Routes bảo mật */}
            <Route element={<PrivateRoutes />}>
                <Route path="users" element={<Users />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="doctors/:id" element={<DoctorDetail />} />
                <Route path="bookings" element={<Booking />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
