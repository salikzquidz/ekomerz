import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import axios from "axios";

export default function Slug(props) {
  const [product, setProduct] = useState(null);
  let { id } = useParams();

  const getProductDetails = async () => {
    try {
      let productFetched = await axios.get(
        `http://localhost:3300/api/v1/product/${id}`
      );
      const { data } = productFetched;
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);

  return <Layout title={product?.name}>Slug {product?.name} </Layout>;
}
