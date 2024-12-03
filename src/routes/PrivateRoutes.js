import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);

    let history = useNavigate();
    useEffect(() => {
        if (!user || user.isAuthenticated !== true) {
            history("/login")
        }

    }, [user, history])
    if (user && user.isAuthenticated === true) {
        return (
            props.children
        );
    }


};

export default PrivateRoutes;
