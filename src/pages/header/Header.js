import React, { useState, useMemo, useCallback } from "react";
import { makeStyles, Fade, Hidden } from "@material-ui/core";

// import Fade from "components/Fade";
import Logo from "components/Logo";
import FlexPadding from "components/FlexPadding";

import Navigation from "./Navigation";
import ToggleButton from "./ToggleButton";
import MainMenu from "./MainMenu";
import { useOvermind } from "@mugglecloud/web-runtime";

const useStyles = makeStyles({
  root: {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 9999,
    padding: "46px 46px 10px",
    color: "white",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform .5s ease",
    transform: "translateY(0)",

    "& > *": {
      zIndex: 10,
    },
  },
  logo: {
    display: "block",
    zIndex: 10,
    width: 34,
    height: 34,
    color: "#fff",
  },
  nav: {
    flexGrow: 1,
    width: "100%",
  },
  toggle: {
    width: 34,
    height: 34,
  },
  "main-menu": {
    zIndex: 5,
  },
});

const Header = () => {
  const classes = useStyles();
  const { state } = useOvermind();

  const style = useMemo(
    () => (state.header.visible ? {} : { transform: "translateY(-100%)" }),
    [state.header.visible]
  );

  return (
    <header style={style} className={classes.root}>
      <Logo className={classes.logo} fill="white" svg="/logo.svg" />
      {/* <Hidden xsDown>
        <Navigation
          className={classes.nav}
          in={menuCollapsed}
          navs={navs}
          active={active}
          onActive={setActive}
        />
      </Hidden> */}
      <Navigation className={classes.nav} />
      <FlexPadding />
      <ToggleButton className={classes.toggle} />
      <Fade in={!state.header.menuCollapsed} timeout={1500}>
        <MainMenu className={classes["main-menu"]}></MainMenu>
      </Fade>
    </header>
  );
};

export default Header;
