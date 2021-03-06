import React, { useState } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">The MovieSearcher</NavbarBrand>
        <NavbarToggler
          onClick={() => {
            toggle();
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/">
                Discover
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/search">
                Search
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/favourites">
                Favourites
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
