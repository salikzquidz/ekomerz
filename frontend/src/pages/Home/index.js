import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState(null);

  async function getProductImages() {
    try {
      const productsFetched = await axios.get(
        "http://localhost:3300/api/v1/products"
      );
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
    <Layout>
      <div>
        <h1>Products</h1>
      </div>
      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid item md={4} key={product.name}>
            <Card sx={{ maxWidth: 345 }}>
              <Link href={`/product/${product._id}`}>
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
              <CardActions>
                <Typography>RM {product.price}</Typography>
                <Button size="small" color="primary">
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
