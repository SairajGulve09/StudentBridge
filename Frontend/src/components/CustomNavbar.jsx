import React, {  useContext, useEffect, useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import { doLogout, getCurrUser, isLoggedIn } from '../Auth/Auth';
 import userContext from '../context/userContext';
 import "./CustomNavbar.css";


 
const CustomNavbar = () => {

   const userContextData=useContext(userContext)

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrUser());
  }, [login]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      userContextData.setUser({
        data: null,
        login: false
      })
      navigate('/');
    });
  };

  return (
    <Navbar color="dark" dark expand="md" className="px-3 py-3">
      <NavbarBrand tag={ReactLink} to="/home" className="text-warning">
        StudentBridge
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={ReactLink} to="/" className="text-white">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ReactLink} to="/about" className="text-white">
              About
            </NavLink>
          </NavItem>
        </Nav>

        


        <Nav className="ml-auto" navbar>
          {!login && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/login" className="text-warning">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/signup" className="text-warning">
                  Signup
                </NavLink>
              </NavItem>
            </>
          )}

            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to={`/user/profile/${user.id}`} className="text-white">
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard" className="text-white">
                    Post
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} onClick={logout} className="text-white">
                    <span className="text-warning" >Logout</span>
                  </NavLink>
                  
                </NavItem>
              </>
          )}


        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
