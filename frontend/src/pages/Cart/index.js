import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../store/context";
import {
  Button,
  ButtonGroup,
  Card,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import client from "../../utils/build-client";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const [cartItem, setCartItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const removeItemHandler = async (id) => {
    try {
      let item = cartItem.find((x) => x._id == id);
      let newCart = cartItem.filter((x) => x._id !== item._id);
      if (userInfo?.id) {
        await client.post("/cart", {
          products: {
            productId: item._id,
            quantity: item.quantity * -1,
          },
        });
        dispatch({
          type: "UPDATE_CART",
          payload: { id: item._id, quantity: item.quantity * -1 },
        });
        setCartItem(newCart);
      } else {
        dispatch({
          type: "EDIT_GUEST_CART",
          payload: { id: item._id, quantity: item.quantity * -1 },
        });
        setCartItem(newCart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addQuantityHandler = async (id) => {
    console.log("in addQuantityHandler");
    let item = cartItem.find((x) => x._id == id);
    try {
      if (userInfo) {
        const response = await client.post("/cart", {
          products: {
            productId: item._id,
            quantity: 1,
          },
        });

        if (response.data.includes("updated")) {
          let selectedItemQuantity = cartItem.find(
            (x) => x._id == item._id
          ).quantity;
          let newCart = cartItem.map((x) => {
            return { ...x };
          });
          newCart.find((x) => x._id == item._id).quantity =
            selectedItemQuantity + 1;
          setCartItem(newCart);
        }
      } else {
        dispatch({
          type: "EDIT_GUEST_CART",
          payload: {
            id,
            quantity: 1,
          },
        });
        let selectedItemQuantity = cartItem.find(
          (x) => x._id == item._id
        ).quantity;
        let newCart = cartItem.map((x) => {
          return { ...x };
        });
        newCart.find((x) => x._id == item._id).quantity =
          selectedItemQuantity + 1;
        setCartItem(newCart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subQuantityHandler = async (id) => {
    let item = cartItem.find((x) => x._id == id);
    let newCart = cartItem.map((x) => {
      return { ...x };
    });

    try {
      if (item.quantity - 1 == 0) {
        removeItemHandler(item._id);
      } else {
        if (userInfo?.id) {
          await client.post("/cart", {
            products: {
              productId: item._id,
              quantity: -1,
            },
          });
          dispatch({
            type: "UPDATE_CART",
            payload: { id: item._id, quantity: -1 },
          });
          newCart.find((x) => x._id == item._id).quantity = item.quantity - 1;
          setCartItem(newCart);
        } else {
          dispatch({
            type: "EDIT_GUEST_CART",
            payload: {
              id,
              quantity: -1,
            },
          });
          newCart.find((x) => x._id == id).quantity = item.quantity - 1;
          setCartItem(newCart);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutHandler = async () => {
    if (userInfo?.id) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  // to retrieve item details
  const populateCart = async () => {
    setIsLoading(true);
    console.log("populateCart");
    let cartToDisplay;
    let productDetails;

    try {
      const userInfo = await client.get("/currentuser");

      if (userInfo?.data?.id) {
        cartToDisplay = userInfo.data.cart;
      } else {
        cartToDisplay = cart;
      }

      let extractQuantityFromCart = cartToDisplay.map((x) => ({
        quantity: x.quantity,
      }));

      if (cartToDisplay.length > 0) {
        productDetails = await Promise.all(
          cartToDisplay.map(async (x) => {
            let res = await client.get(`/product/${x.productId}`);
            return res.data;
          })
        );
        productDetails.forEach(function (x, index) {
          console.log(index);
          x.quantity = extractQuantityFromCart[index].quantity;
        });
        setCartItem(productDetails);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    populateCart();
  }, []);

  return (
    <>
      <div>
        <h1>Cart</h1>
      </div>
      {isLoading ? (
        <>Loading</>
      ) : cartItem?.length > 0 == 0 ? (
        <div>Cart is empty</div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItem?.map((x) => (
                    <TableRow>
                      <TableCell>
                        <img
                          src={`http://localhost:3300/${x.image}`}
                          width={50}
                          height={50}
                        />
                      </TableCell>
                      <TableCell>{x.name}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup
                          variant="text"
                          aria-label="outlined primary button group"
                        >
                          <Button
                            onClick={() => subQuantityHandler(x._id)}
                            disabled={x.quantity == 0}
                          >
                            -
                          </Button>
                          <Button disableRipple>{x.quantity}</Button>
                          {/* quantity of holding */}
                          <Button
                            onClick={() => addQuantityHandler(x._id)}
                            disabled={x.quantity == x.countInStock}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="right">
                        {Number(x.price * x.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(x._id)}
                        >
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h1" component={"h1"}>
                    Subtotal ({cartItem?.reduce((a, c) => a + c.quantity, 0)}
                    items) : RM{" "}
                    {cartItem
                      ?.reduce((a, c) => a + c.quantity * c.price, 0)
                      .toFixed(2)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={checkoutHandler}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}
