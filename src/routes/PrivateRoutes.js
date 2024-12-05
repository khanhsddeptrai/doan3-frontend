import { useEffect, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.isAuthenticated !== true) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (user && user.isAuthenticated === true) {
        // Render children nếu có, hoặc Outlet nếu nested routes
        return props.children || <Outlet />;
    }

    return null; // Trong trường hợp user chưa xác thực
};

export default PrivateRoutes;
