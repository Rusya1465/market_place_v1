import axios from "axios";
import React, { useReducer } from "react";
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice";
import { AUTH_API, JSON_API } from "../helpers/constants";

export const clientContext = React.createContext();

const INIT_STATE = {
  products: null,
  productsCountInCart: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0,
  cartData: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_AND_DELETE_PRODUCT_IN_CART":
      return { ...state, productsCountInCart: action.payload };
    case "GET_CART":
      return { ...state, cartData: action.payload };
    default:
      return state;
  }
};

const ClientContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    const { data } = await axios(JSON_API);
    dispatch({
      type: "GET_PRODUCTS",
      payload: data,
    });
  };

  const registerUser = async (newUser, history) => {
    try {
      const res = await axios.post(`${AUTH_API}/registration`, newUser);
      history.push("/signin");
      console.log(res);
    } catch {
      alert("Неправильная почта или пароль");
    }
  };

  const loginUser = async (user, history) => {
    try {
      const res = await axios.post(`${AUTH_API}/login`, user);
      console.log(res);
      history.push("/");
    } catch {
      alert("Error");
    }
  };

  function addAndDeleteProductInCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      product: product,
      count: 1,
      subPrice: 0,
    };

    newProduct.subPrice = calcSubPrice(newProduct);
    let newCart = cart.products.filter(
      (item) => item.product.id === product.id
    );
    if (newCart.length > 0) {
      cart.products = cart.products.filter(
        (item) => item.product.id !== product.id
      );
    } else {
      cart.products.push(newProduct);
    }
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: "ADD_AND_DELETE_PRODUCT_IN_CART",
      payload: cart.products.length,
    });
  }

  function checkProductInCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }

    let newCart = cart.products.filter((item) => item.product.id === id);
    return newCart.length > 0 ? true : false;
  }

  function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = [];
    }
    dispatch({
      type: "GET_CART",
      payload: cart.products,
    });
  }

  function changeCountProduct(count, id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = calcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  function makeOrder() {
    localStorage.setItem("cart", null);
  }

  return (
    <clientContext.Provider
      value={{
        products: state.products,
        getProducts,
        registerUser,
        addAndDeleteProductInCart,
        checkProductInCart,
        productsCountInCart: state.productsCountInCart,
        cartData: state.cartData,
        getCart,
        changeCountProduct,
        makeOrder,
        loginUser,
      }}
    >
      {children}
    </clientContext.Provider>
  );
};

export default ClientContextProvider;
