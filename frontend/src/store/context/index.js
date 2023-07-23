import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();

const examineTheCartCookies = () => {
  console.log(Cookies.get("cart"));
  let cartCookies = Cookies.get("cart"); // cookies is string always
  try {
    let jsonParsedCartCookie = JSON.parse(cartCookies);
    if (jsonParsedCartCookie.length > 0) {
      return JSON.parse(cartCookies);
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  currentUser: Cookies.get("currentUser"),
  userInfo: null,
  cart: examineTheCartCookies(), // for guest cart
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
    case "UPDATE_CART":
      let itemFoundd = state.userInfo.cart.find(
        (x) => x.productId === action.payload.id
      );

      // expect id and quantity from payload
      if (itemFoundd) {
        let newCart = state.userInfo.cart.map((x) => {
          return { ...x };
        });
        newCart.find((x) => x.productId === action.payload.id).quantity =
          Number(itemFoundd.quantity) + Number(action.payload.quantity);

        if (
          Number(itemFoundd.quantity) + Number(action.payload.quantity) ==
          0
        ) {
          return {
            ...state,
            userInfo: {
              ...state.userInfo,
              cart: state.userInfo.cart.filter(
                (x) => x.productId !== action.payload.id
              ),
            },
          };
        }

        return {
          ...state,
          userInfo: {
            ...state.userInfo,
            cart: newCart,
          },
        };
      } else {
        return {
          ...state,
          userInfo: {
            ...state.userInfo,
            cart: [...state.userInfo.cart, action.payload],
          },
        };
      }
    case "EDIT_GUEST_CART": // EDIT ITEM - for guest / cookies
      let itemFound = state.cart?.find(
        (x) => x.productId === action.payload.id
      );
      let updatedCartArray;

      if (itemFound) {
        updatedCartArray = state.cart.map((x) => {
          return { ...x };
        });

        if (itemFound.quantity + action.payload.quantity == 0) {
          Cookies.set(
            "cart",
            JSON.stringify(
              state.cart.filter((x) => x.productId !== action.payload.id)
            )
          );
          return {
            ...state,
            cart: state.cart.filter((x) => x.productId !== action.payload.id),
          };
        } else {
          updatedCartArray.find(
            (x) => x.productId === action.payload.id
          ).quantity = itemFound.quantity + action.payload.quantity;
          Cookies.set("cart", JSON.stringify(updatedCartArray));
          return { ...state, cart: updatedCartArray };
        }
      } else {
        // push new item
        updatedCartArray = [...state.cart, action.payload];
        Cookies.set("cart", JSON.stringify(updatedCartArray));
        return { ...state, cart: [...state.cart, action.payload] };
      }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
