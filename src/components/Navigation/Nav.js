import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss'
import { Link, useLocation } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import { render } from '@testing-library/react';

const Nav = (props) => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div className='topnav'>
                    <Link to="" >Home</Link>
                    <Link to="users">Users</Link>
                    <Link to="contact">Contact</Link>
                    <Link to="about">About</Link>
                </div>

            </>

        );
    } else {
        return <></>
    }

}

export default Nav;