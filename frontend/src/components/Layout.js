import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Badge,
  Button,
  Container,
  CssBaseline,
  Menu,
  MenuItem,
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
  const { darkMode, userInfo, cart } = state;
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
      setAnchorEl(null);
      await client.post("logout");
      dispatch({ type: "REMOVE_USER_INFO" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Menu MUI
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const checkCurrentUser = async () => {
      console.log("checking current user");
      try {
        const currentUser = await client.get("/currentuser");
        const { data } = currentUser;

        if (data?.id) {
          dispatch({ type: "ADD_USER_INFO", payload: data }); // add to react context
        } else {
          dispatch({ type: "REMOVE_USER_INFO" }); // add to react context
        }
      } catch (error) {
        console.log(error);
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
              badgeContent={userInfo ? userInfo.cart?.length : cart?.length}
            >
              <NavLink
                to="/cart"
                style={{ textDecoration: "none", color: "white" }}
              >
                Cart
              </NavLink>
            </Badge>
            {userInfo ? (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  style={{ color: "#ffffff", textTransform: "initial" }}
                >
                  {userInfo.email}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </>
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
