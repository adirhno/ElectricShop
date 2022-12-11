/** @format */

import { getActiveElement } from "@testing-library/user-event/dist/utils";
import {
  Nav,
  Navbar as NavbarBs,
  Container,
  Button,
  Col,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/useContex";

export default function Navbar() {
  const { getItemQuantity, cartQuantity } = useShoppingCart();

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav style={{ width: "800px" }}>
          <Nav.Link to={"/"} as={NavLink}>
            Home
          </Nav.Link>

          <Nav.Link to={"/about"} as={NavLink}>
            Contact
          </Nav.Link>

          <Nav.Link
            to={"/cart"}
            as={NavLink}
            style={{
              position: "absolute",
              right: "10px",
              bottom: "0px",
              top: "-4px",
            }}
          >
            <Button
              className="rounded-circle d-flex justify-content-center"
              variant="outline-primary"
              style={{
                width: "3rem",
                height: "3em",
                position: "relative",
              }}
            >
              <img src="https://img.icons8.com/ios-glyphs/30/1A1A1A/shopping-cart-loaded.png" />
              <div
                className="rounded-circle bg-danger d-flex justify-content-center"
                style={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  transform: "translate(25%, 25%)",
                }}
              >
                {cartQuantity}
              </div>
            </Button>
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBs>
  );
}
