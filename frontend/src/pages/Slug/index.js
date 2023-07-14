import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";
// import Cookies from "js-cookie";
import client from "../../utils/build-client";
import { Store } from "../../store/context";

const MyBackToHomepageLink = styled("div")({
  marginTop: 10,
  marginBottom: 10,
  textDecoration: "none",
});

export default function Slug(props) {
  const { state, dispatch } = useContext(Store);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0);
  let { id } = useParams();
  const navigate = useNavigate();

  const thisProductInCart = state.userInfo?.cart?.find(
    (x) => x.productId === id
  );

  const handleAddToCart = async () => {
    try {
      await client.post("/cart", {
        products: {
          productId: id,
          quantity: qty,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        let productFetched = await client.get(
          `http://localhost:3300/api/v1/product/${id}`
        );
        const { data } = productFetched;
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductDetails();
  }, [id]);

  return (
    <>
      <MyBackToHomepageLink>
        <Link
          component={ReactRouterLink}
          to="/"
          sx={{ textDecoration: "none" }}
        >
          Back to homepage
        </Link>
      </MyBackToHomepageLink>
      <Grid container>
        <Grid item md={6} xs={12}>
          <img
            src={`http://localhost:3300/${product?.image}`}
            alt={product?.name}
            width={540}
            height={540}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography variant="h1" component="h1">
                {product?.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description : {product?.description}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Price : RM {product?.price}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Stock : {product?.countInStock}
                {thisProductInCart && (
                  <>
                    &nbsp; &nbsp;
                    <b>
                      <i>{thisProductInCart.quantity} in your cart</i>
                    </b>
                  </>
                )}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Rating : {product?.numReviews}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                This item in your cart :{" "}
                {thisProductInCart
                  ? `GOT, now can only add ${
                      product?.countInStock - thisProductInCart.quantity
                    } more`
                  : "NO GOT"}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Quantity</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="number"
                      id="outlined-number"
                      size="small"
                      onClick={() => {}}
                      inputProps={{
                        min: product?.countInStock ? 0 : "Not in stock",
                        max: thisProductInCart
                          ? Math.abs(
                              thisProductInCart.quantity - product?.countInStock
                            )
                          : product?.countInStock,
                      }}
                      onInput={(e) => {
                        if (thisProductInCart) {
                          const max = Math.abs(
                            thisProductInCart.quantity - product?.countInStock
                          );
                          e.target.value =
                            e.target.value > max ? max : e.target.value;
                        } else {
                          e.target.value =
                            e.target.value > product?.countInStock
                              ? product?.countInStock
                              : e.target.value;
                        }
                      }}
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>RM {product?.price * qty}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  disabled={qty === 0}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
