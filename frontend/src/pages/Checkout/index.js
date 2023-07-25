import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../store/context";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import client from "../../utils/build-client";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Checkout() {
  const [shippingAddress, setShippingAddress] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [subTotal, setSubTotal] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("FPX");
  const [total, setTotal] = useState(null);
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  console.log(paymentMethod);

  const TAX = 0.006;

  const handlePaymentMethodChange = (e) => {
    console.log("change payment method");
    console.log(e.target.innerText);
    console.log(paymentMethod);
    setPaymentMethod(e.target.innerText);
    // setPaymentMethod("target.innerText");
  };

  // to retrieve item details
  const populateCart = async () => {
    // setIsLoading(true);
    console.log("populateCart");
    let cartToDisplay;
    let productDetails;

    try {
      const userInfo = await client.get("/currentuser");

      if (userInfo?.data?.id) {
        cartToDisplay = userInfo.data.cart;
      } else {
        // cartToDisplay = cart;
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

        let subTotal = productDetails
          .reduce((a, c) => a + c.quantity * c.price, 0)
          .toFixed(2);

        let taxPercentageOfSubtotal = (subTotal * TAX).toFixed(2);

        setSubTotal(subTotal);
        setTotal(Number(subTotal) + Number(taxPercentageOfSubtotal));
        setCartItem(productDetails);
        // setIsLoading(false);
      }
    } catch (error) {
      // setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    populateCart();
  }, []);

  // useEffect(() => {
  //   // get user info for delivery - address
  //   // populate product details
  // }, []);

  return (
    <>
      <div>
        <h1>Checkout</h1>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardHeader title="Shipping Address"></CardHeader>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {userInfo?.shippingAddress ? (
                  <>{userInfo?.shippingAddress}</>
                ) : (
                  <>
                    Oops, seems like you didn't set your shipping address yet.
                    <NavLink to={"/profile"} style={{ textDecoration: "none" }}>
                      <Link sx={{ textDecoration: "none" }}> Add new</Link>
                    </NavLink>
                  </>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {/* Products Ordered */}
          <Card variant="outlined">
            <CardHeader title="Products Ordered"></CardHeader>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="right">Price (RM)</TableCell>
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
                        <TableCell align="center">{x.quantity}</TableCell>
                        <TableCell align="right">
                          {Number(x.price * x.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell rowSpan={3} />
                      <TableCell colSpan={2}>Subtotal (RM)</TableCell>
                      <TableCell align="right">{subTotal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tax</TableCell>
                      <TableCell align="right">0.60%</TableCell>
                      <TableCell align="right">
                        {(subTotal * TAX).toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell align="right">{total}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardHeader title="Payment Method"></CardHeader>
            <CardContent>
              <Stack direction="row" spacing={1}>
                <Chip
                  label="VISA"
                  variant={paymentMethod === "VISA" ? "filled" : "outlined"}
                  onClick={handlePaymentMethodChange}
                />
                <Chip
                  label="FPX"
                  variant={paymentMethod === "FPX" ? "filled" : "outlined"}
                  onClick={handlePaymentMethodChange}
                />
                <Chip
                  label="Paypal"
                  variant={paymentMethod === "Paypal" ? "filled" : "outlined"}
                  onClick={handlePaymentMethodChange}
                />
                <Chip
                  label="Stripe"
                  variant={paymentMethod === "Stripe" ? "filled" : "outlined"}
                  onClick={handlePaymentMethodChange}
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                sx={{ marginLeft: "auto", marginRight: "1rem" }}
              >
                Place Order
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
