import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import logo from "../../assets/img/WebvilleeLogo.png";
import { Link } from 'react-router-dom';

const LMSNavbar = (props) => {
  
  return (
    <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="50"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            &nbsp; Webvillee LMS
          </Navbar.Brand>
          <div><Link to={"/login"} onClick={() => { props.signout(); localStorage.clear();}} className='text-decoration-none text-black'>Logout</Link></div>
        </Container>
      </Navbar>
  )
}

export default LMSNavbar;