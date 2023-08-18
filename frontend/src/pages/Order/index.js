import React, { useEffect, useState } from "react";
import client from "../../utils/build-client";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Order() {
  const [userOrder, setUserOrder] = useState(null);

  const getUserOrder = async () => {
    try {
      let response = await client.get(`/order`);
      console.log("getUserOrder");
      console.log(response.data);
      setUserOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);
  return (
    <>
      <div>
        <h1>Your Order History</h1>
      </div>
      <Grid container>
        {userOrder?.length < 1 && <h5>Oops, you dont have any orders yet!</h5>}
        {userOrder?.length > 1 &&
          userOrder.map((x) => (
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={`Order ${x._id}`}
                  subheader={x.date}
                  action={x.status}
                />
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {x.products?.map((y) => (
                          <TableRow>
                            <TableCell>
                              <img
                                src={`http://localhost:3300/${y.image}`}
                                alt="product"
                                width={50}
                                height={50}
                              />
                            </TableCell>
                            <TableCell>{y._id}</TableCell>
                            <TableCell align="center">{y.quantity}</TableCell>
                            <TableCell align="right">
                              {y.price.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "1rem",
                    }}
                  >
                    <>Order Total : RM{x.total.toFixed(2)} </>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
