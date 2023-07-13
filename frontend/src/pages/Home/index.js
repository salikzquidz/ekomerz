import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import client from "../../utils/build-client";
import { NavLink } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState(null);

  async function getProductImages() {
    try {
      const productsFetched = await client.get("products");
      const { data } = productsFetched;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductImages();
  }, []);

  return (
    <>
      <div>
        <h1>Products</h1>
      </div>
      <Grid container spacing={3}>
        {products?.map((product, index) => (
          <Grid item md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <NavLink
                to={`/product/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <Link style={{ textDecoration: "none" }}>
                  <CardActionArea>
                    <CardMedia
                      sx={{ height: 500 }}
                      component="img"
                      image={`http://localhost:3300/${product.image}`}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </NavLink>
              <CardActions>
                <Typography>RM {product.price}</Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
