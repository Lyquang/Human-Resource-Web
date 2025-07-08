import React, { useState } from 'react';
import './AHeader.scss';
import { Navbar, NavDropdown, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          My App
        </NavLink>

        <NavDropdown
          title={
            <>
              <img
                className="avatar rounded-circle"
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="User Avatar"
                style={{ width: '30px', height: '30px', marginRight: '8px' }}
              />
              <span className="profile-name">Admin</span>
            </>
          }
          id="profile-dropdown"
        >
          <NavDropdown.Item as={NavLink} to="/login">
            Đăng xuất
          </NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default Header;
