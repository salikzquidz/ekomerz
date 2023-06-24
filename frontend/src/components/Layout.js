import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Link, styled } from "@mui/material";
import { Helmet } from "react-helmet";

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
});

export default function Layout({ title, children }) {
  return (
    <div>
      <Helmet>
        <title>{title ? title + " - Ekomerz" : "Ekomerz"}</title>
      </Helmet>
      <MyAppBar>
        <Toolbar>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <MyTypography>Ekomerz</MyTypography>
          </Link>
          <div style={{ flex: 1 }}></div> {/* gap between shop name and link */}
          <Link
            href="/cart"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Cart
          </Link>
          <Link
            href="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Login
          </Link>
        </Toolbar>
      </MyAppBar>
      <MyContainer>{children}</MyContainer>
      <MyFooter>
        <Typography>All rights reserved. 2023 Ekomerz.</Typography>
      </MyFooter>
    </div>
  );
}
