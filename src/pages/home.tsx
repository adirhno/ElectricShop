/** @format */
import storeItems from "../data/items.json";
import { Row, Col } from "react-bootstrap";
import StoreItem from "../components/storeItem";
import { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCartProvider, useShoppingCart } from "../context/useContex";
type storeItems = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
export const Home: React.FC = () => {
  const [quantity, setQuantity] = useState(3);
  const { fetchedData } = useShoppingCart();

  return (
    <>
      <span className="fs-1 mb-2">
        <strong>STORE</strong>
      </span>
      <Row md={3} lg={3} xs={1} className="g-3 mb-4 mt-4">
        {fetchedData
          ? fetchedData.map((item) => (
              <Col key={item.id} className="mb-5">
                <StoreItem {...item} quantity={quantity} />
              </Col>
            ))
          : null}
      </Row>
    </>
  );
};
