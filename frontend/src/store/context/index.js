import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  currentUser: Cookies.get("currentUser"),
  userInfo: null,
  cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [], // for guest
};

function reducer(state, action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "ADD_USER_INFO":
      return { ...state, userInfo: action.payload };
    case "REMOVE_USER_INFO":
      return { ...state, userInfo: null };
    case "ADD_ITEM_INTO_CART": // for guest, store the cart info inside cookies and React context
      // check if item already exist in the cart
      let itemFound = state.cart?.find((x) => x.id === action.payload.id);
      let updatedCartArray;

      if (itemFound) {
        // create new array
        updatedCartArray = state.cart.map((x) => {
          return { ...x };
        });
        let currentQty = updatedCartArray.find(
          (x) => x.id === action.payload.id
        ).qty;
        updatedCartArray.find((x) => x.id === action.payload.id).qty =
          currentQty + action.payload.qty;

        Cookies.set("cart", JSON.stringify(updatedCartArray));
        return { ...state, cart: updatedCartArray };
      }

      // push new item
      updatedCartArray = [...state.cart, action.payload];
      Cookies.set("cart", JSON.stringify(updatedCartArray));
      return { ...state, cart: [...state.cart, action.payload] };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
