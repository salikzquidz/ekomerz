import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  currentUser: Cookies.get("currentUser"),
  // userInfo: Cookies.get("userInfo"),
  userInfo: null,
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
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
