import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss'
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from '../../context/UserContext';

const NavHeader = (props) => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                {/* <div className='topnav'>
                    <NavLink to="" >Home</NavLink>
                    <NavLink to="users">Users</NavLink>
                    <NavLink to="contact">Contact</NavLink>
                    <NavLink to="about">About</NavLink>
                </div> */}
                <div className='nav-header'>
                    <Navbar expand="lg" className="bg-header">
                        <Container>
                            <Navbar.Brand >QUICKCARE</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" className='nav-link'>Trang chủ</NavLink>
                                    <NavLink to="users" className='nav-link'>Người dùng</NavLink>
                                    <NavLink to="doctors" className='nav-link'>Bác sĩ</NavLink>
                                    <NavLink to="contact" className='nav-link'>Phòng khám</NavLink>
                                    <NavLink to="about" className='nav-link'>Cơ sở y tế</NavLink>
                                    <NavLink to="bookings" className='nav-link'>Lịch hẹn</NavLink>


                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true &&
                                        <Nav.Item className='nav-link'>Xin chào! {user.account.name}</Nav.Item>
                                    }

                                    <NavDropdown title="Hồ sơ" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Thông tin cá nhân</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Đổi mật khẩu
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Đăng xuất
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>

        );
    } else {
        return <></>
    }

}

export default NavHeader;