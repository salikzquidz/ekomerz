import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Container,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Store } from "../store/context";
import Cookies from "js-cookie";

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
  const { darkMode } = state;

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

  return (
    <div>
      <Helmet>
        <title>{title ? title + " - Ekomerz" : "Ekomerz"}</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyAppBar>
          <Toolbar>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <MyTypography>Ekomerz</MyTypography>
            </Link>
            <div style={{ flex: 1 }}></div>{" "}
            {/* gap between shop name and link */}
            <Switch
              checked={darkMode}
              onChange={darkModeChangeHandler}
            ></Switch>
            <Link
              href="/cart"
              style={{ textDecoration: "none", color: "white" }}
            >
              Cart
            </Link>
            <Link
              href="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </Toolbar>
        </MyAppBar>
        <MyContainer>{children}</MyContainer>
        <MyFooter>
          <Typography>All rights reserved. 2023 Ekomerz.</Typography>
        </MyFooter>
      </ThemeProvider>
    </div>
  );
}
