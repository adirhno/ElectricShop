/** @format */

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
export const shoppingCartContext = createContext({} as functions);

export function useShoppingCart() {
  return useContext(shoppingCartContext);
}
type cartItemsProps = {
  id: number;
  quantity: number;
};
type storeItems = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

type functions = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreasCartQuantity: (id: number) => void;
  remove: (id: number) => void;
  cartQuantity: number;
  cartItems: cartItemsProps[];
  fetchedData: storeItems[];
};

type aa = {
  children: ReactNode;
};

export function ShoppingCartProvider({ children }: aa) {
  const [cartItems, setCartItems] = useState<cartItemsProps[]>([]);
  const [fetchedData, setData] = useState<storeItems[]>([]);
  const [ord, setOrd] = useState(false);

  var cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  useEffect(() => {
    axios.get("https://shopp-market-server.herokuapp.com/").then((results) => {
      console.log(results.data);
      setData(results.data);
      console.log(fetchedData);
    });
  }, []);

  const increaseCartQuantity = (id: number) => {
    setCartItems((currItem) => {
      if (currItem.find((item) => item.id === id) == null) {
        return [...currItem, { id, quantity: 1 }];
      } else {
        return currItem.map((el) => {
          if (el.id === id) {
            return { ...el, quantity: el.quantity + 1 };
          } else return el;
        });
      }
    });
  };
  const decreasCartQuantity = (id: number) => {
    setCartItems((currItem) => {
      if (currItem.find((item) => item.id === id)?.quantity == 1) {
        return currItem.filter((el) => el.id !== id);
      } else {
        return currItem.map((el) => {
          if (el.id === id) {
            return { ...el, quantity: el.quantity - 1 };
          } else return el;
        });
      }
    });
  };

  const getItemQuantity = (id: number): number => {
    return cartItems.find((el) => el.id === id)?.quantity || 0;
  };
  const remove = (id: number) => {
    setCartItems((pre) => {
      return pre.filter((item) => item.id !== id);
    });
  };

  return (
    <shoppingCartContext.Provider
      value={{
        increaseCartQuantity,
        getItemQuantity,
        cartQuantity,
        decreasCartQuantity,
        remove,
        cartItems,
        fetchedData,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
}
