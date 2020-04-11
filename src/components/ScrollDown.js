import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: "150px",
    height: "auto",
    bottom: "20px",
    zIndex: 50,
    textAlign: "center",

    cursor: "pointer",

    "& *": {
      transition: "all .3s ease",
      opacity: 1,
    },

    "&:hover > i": {
      backgroundColor: "#fff",
      borderColor: "#fff",
    },
    "&:hover > span": {
      opacity: 0,
      letterSpacing: "5px",
    },
  },
  icon: {
    width: "26px",
    height: "44px",
    display: "block",
    borderRadius: "13px",
    border: "2px solid #b3b3b3",
    margin: "0 auto",

    "&:before": {
      position: "absolute",
      top: "6px",
      width: "6px",
      height: "6px",
      content: '""',
      backgroundColor: "#b3b3b3",
      left: "50%",
      marginLeft: "-3px",
      borderRadius: "50%",
      animation: "scroll-down-knob-animation 2s ease infinite",
    },
  },
  text: {
    position: "relative",
    top: "-24px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#fff",
    fontSize: "12px",
    lineHeight: 1.4,
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <span {...props} className={classes.root}>
      <i className={classes.icon}></i>
      <span className={classes.text}>scroll down</span>
    </span>
  );
};
