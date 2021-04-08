import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { navigationLinks } from "./constants/navigation-links";
// import { createBrowserHistory } from "history";
import { isLoggedIn } from "../../common/helpers";
import Logo from "./Logo";
import '../../components/Home.css'

// const history = createBrowserHistory();

const AppNavbar = ({ containerized, logout, user }) => {
  // const pages = navigationLinks.filter(nav => nav.useInNavbar === true);



  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      // bg="dark"
      // variant="dark"
      className="nav-transparent nav-tall bg-q "
    >
      {containerized ? (
        <Container>{navContent(user, logout)}</Container>
      ) : (
        navContent(user, logout)
      )}
    </Navbar>
  );
};

const navContent = (user, logout) => {
  const pages = navigationLinks.filter(nav => nav.useInNavbar === true);
  return (
    <React.Fragment>
      <Link to="/" className="navbar-brand">
        <Logo />
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0">
            {pages.map(page => (
              <Link className="nav-link mx-1" to={page.link} key={page.link}>
                {page.title}
              </Link>
            ))}
          </Nav>
          <Nav>
            {user && <a href='#' className="nav-link username">Hi {user.first_name}</a>}
            {!isLoggedIn() && (
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
            )}
            {isLoggedIn() && (
              <button className="btn btn-danger mr-1" onClick={logout}>
                Logout
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
    </React.Fragment>
  );
};

export default AppNavbar;
