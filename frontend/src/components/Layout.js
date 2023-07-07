import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Badge,
  Container,
  CssBaseline,
  Switch,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Store } from "../store/context";
import Cookies from "js-cookie";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import client from "../utils/build-client";

const MyAppBar = styled(AppBar)({
  backgroundColor: "#203040",
  position: "static",
  "& a": {
    marginLeft: 10,
  },
});

const MyContainer = styled(Container)({
  minHeight: "80vh",
});

const MyFooter = styled("footer")({
  textAlign: "center",
});

const MyTypography = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: "white",
});

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode, userInfo } = state;
  console.log("in layout");
  console.log(darkMode);
  console.log(userInfo);
  const navigate = useNavigate();

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#108080",
      },
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    Cookies.set("darkMode", darkMode ? "OFF" : "ON");
  };

  const logoutHandler = async () => {
    try {
      await client.post("logout");
      dispatch({ type: "REMOVE_USER_INFO" }); // add to react context
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkCurrentUser = async () => {
      console.log("checking current user");
      try {
        const currentUser = await client.get("/currentuser");
        const { data } = currentUser;
        if (data?.id) {
          console.log("id exist");
          dispatch({ type: "ADD_USER_INFO", payload: data }); // add to react context
        } else {
          dispatch({ type: "REMOVE_USER_INFO" }); // add to react context
        }
      } catch (error) {
        if (error.message.includes("Please login")) {
          console.log("omg this user is not login");
          navigate("/login");
        }
      }
    };
    checkCurrentUser();
  }, [navigate, dispatch]);

  return (
    <div>
      <Helmet>
        <title>{title ? title + " - Ekomerz" : "Ekomerz"}</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyAppBar>
          <Toolbar>
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MyTypography>Ekomerz</MyTypography>
            </NavLink>
            <div style={{ flex: 1 }}></div>{" "}
            {/* gap between shop name and link */}
            <Switch
              checked={darkMode}
              onChange={darkModeChangeHandler}
            ></Switch>
            <Badge
              style={{ color: "white" }}
              badgeContent={userInfo?.cart?.length}
            >
              <NavLink
                to="/cart"
                style={{ textDecoration: "none", color: "white" }}
              >
                Cart
              </NavLink>
            </Badge>
            {userInfo ? (
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                onClick={logoutHandler}
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </NavLink>
            )}
          </Toolbar>
        </MyAppBar>
        <MyContainer>
          <Outlet />
        </MyContainer>
        <MyFooter>
          <Typography>All rights reserved. 2023 Ekomerz.</Typography>
        </MyFooter>
      </ThemeProvider>
    </div>
  );
}
