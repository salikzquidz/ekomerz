import React, { useState, useContext } from "react";
import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Client from "../../utils/build-client";
import { Store } from "../../store/context";

const MyForm = styled("form")({
  marginTop: 40,
  maxWidth: 800,
  marginLeft: "auto",
  marginRight: "auto",
});

export default function Login() {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("send login request ");
    try {
      const response = await Client.post(
        "login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response?.data?.userInfo) {
        dispatch({ type: "ADD_USER_INFO", payload: response.data.userInfo });
        navigate("/");
      } else {
        console.log("invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MyForm>
        <Typography variant="h1" component="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </ListItem>
        </List>
      </MyForm>
    </>
  );
}
