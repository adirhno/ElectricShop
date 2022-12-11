/** @format */
import { Row, Col, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/useContex";
import { format } from "../utilities/fortmatCurrency";

export default function ShoppingCart() {
  const handleOrderSubmit = () => {
    cartItems.forEach((e) => remove(e.id));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Oreder Has Been Placed Successfuly!",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  const {
    cartItems,
    remove,
    increaseCartQuantity,
    decreasCartQuantity,
    fetchedData,
  } = useShoppingCart();
  var totalPrice;
  var totalBeforConv: number = 0;

  return (
    <Container style={{ height: "100%" }}>
      <Row md={1} lg={1} xs={1} className="g-3" style={{ height: "100%" }}>
        {cartItems.length > 0 ? (
          cartItems.map((el) => {
            return fetchedData.map((it) => {
              if (el.id === it.id) {
                var price = format(it.price * el.quantity);
                totalBeforConv += it.price * el.quantity;
                totalPrice = format(totalBeforConv);

                return (
                  <>
                    <Col className="p-3">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex  justify-content-center justify-content-space-between ">
                          <img
                            src={it.imgUrl}
                            style={{ height: "120px", width: "140px" }}
                          ></img>
                        </div>
                        <div
                          className="fs-5"
                          style={{ height: "170px", width: "90px" }}
                        >
                          {it.name}
                          <div
                            className="fs-5 text-muted"
                            style={{ height: "170px", width: "40px" }}
                          >
                            {el.quantity > 1 ? "X " + el.quantity : null}
                          </div>
                        </div>

                        <div className="fs-6">Price: {price}</div>
                        <div style={{ maxWidth: "30%", height: "2.5em" }}>
                          <Button
                            variant="danger"
                            onClick={() => remove(it.id)}
                          >
                            remove
                          </Button>
                          {/* <Button
                            onClick={() => {
                              increaseCartQuantity(it.id);
                            }}
                          >
                            +
                          </Button>
                          <Button onClick={() => decreasCartQuantity(it.id)}>
                            -
                          </Button> */}
                        </div>
                      </div>
                    </Col>
                  </>
                );
              }
            });
          })
        ) : (
          <div className="fs-1 d-flex justify-content-center">
            Your Cart Is Empty
          </div>
        )}
        {cartItems.length > 0 ? (
          <div
            className="flex-column justify-content-center mt-2"
            style={{ alignItems: "flex-end" }}
          >
            <div className="fs-5">
              Total Price: <span className="fs-4 ">{totalPrice}</span>
            </div>
            <div>
              <Link to="/">
                <Button
                  onClick={() => handleOrderSubmit()}
                  style={{ alignItems: "center", width: "70%" }}
                >
                  Place Order
                </Button>
              </Link>
            </div>
          </div>
        ) : null}
      </Row>
    </Container>
  );
}
