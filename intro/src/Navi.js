import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import CartSummary from "./CartSummary";
import { GiGamepad } from "react-icons/gi";

const Navi = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" light expand="lg">
        <NavbarBrand href="/" style={{ color: "#2BAEB9"}}>
          Oyuncu Mağazası <GiGamepad/>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar style={{ marginLeft: "680px" }}>

            <CartSummary
              removeFromCart={props.removeFromCart}
              cart={props.cart}
            />
          </Nav>
        </Collapse>
      </Navbar>
      
    </div>
  );
};

export default Navi;
