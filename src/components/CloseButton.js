import React from "react";
import { makeStyles } from "@material-ui/core";

const barStyle = {
  transition: "all .3s cubic-bezier(.7,0,.3,1)",
  position: "absolute",
  left: 0,
  width: "100%",
  height: "4px",
  backgroundColor: "#fff",
  display: "block",
  content: '""',
  top: 0
};

const hoverStyle = {
  "&:hover > *:before": {
    transform: "translateY(0px)rotate(-55deg)"
  },
  "&:hover > *:after": {
    transform: "translateY(0px)rotate(55deg)"
  }
};

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "15px",
    right: "25px",
    display: "inline-block",
    width: "26px",
    height: "26px",
    cursor: "pointer",
    transition: "all .5s cubic-bezier(.7,0,.3,1)",

    transform: "rotate(90deg)",

    "& > *:before": {
      ...barStyle,
      transform: "translateY(0)rotate(-45deg)"
    },

    "& > *:after": {
      ...barStyle,
      transform: "translateY(0)rotate(45deg)",
      "&:hover": {
        transform: "translateY(2px)rotate(0)"
      }
    },

    ...hoverStyle
  },
  lines: {
    transition: "all .3s cubic-bezier(.7,0,.3,1)",
    position: "relative",
    width: "100%",
    height: "4px",
    display: "block",
    top: "50%",
    marginTop: "-2px"
  }
});

export default props => {
  const classes = useStyles();

  return (
    <i {...props} className={classes.root}>
      <span className={classes.lines}></span>
    </i>
  );
};
