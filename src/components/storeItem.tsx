/** @format */
import { format } from "../utilities/fortmatCurrency";
import { Card, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/useContex";

type storeItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

export default function StoreItem({
  id,
  price,
  name,
  imgUrl,
  quantity,
}: storeItemProps) {
  const { increaseCartQuantity, getItemQuantity, decreasCartQuantity, remove } =
    useShoppingCart();
  const quantity2 = getItemQuantity(id);

  return (
    <Card style={{ height: "100%" }}>
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      ></Card.Img>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-4">{name}</span>
          <span className="ms-1 text-muted">{format(price)}</span>
        </Card.Title>
      </Card.Body>
      {quantity2 == 0 ? (
        <Button onClick={() => increaseCartQuantity(id)}>Add To Cart</Button>
      ) : (
        <>
          <div className="d-flex align-items-center flex-column">
            <div className="d-flex align-items-center justify-content-center">
              <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              <div className="p-1">
                <span className="fs-3 ">{quantity2}</span>
                <span>in cart</span>
              </div>
              <Button onClick={() => decreasCartQuantity(id)}>-</Button>
            </div>
            <Button onClick={() => remove(id)} variant="danger" size="sm">
              Remove
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
