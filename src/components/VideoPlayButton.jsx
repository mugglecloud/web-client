import React from "react";
import PlayArrow from "@material-ui/icons/PlayArrow";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: props => ({
    position: "relative",
    display: "inline-block",
    borderRadius: "50%",
    margin: "0 auto 26px",
    cursor: "pointer",
    width: "70px",
    height: "70px",
    transition: "all .5s ease",

    "& > *": {
      padding: "14px",
      boxSizing: "border-box",
      width: "100%",
      height: "100%"
    },

    "&:before, &:after": {
      position: "absolute",
      left: 0,
      top: 0,
      width: "inherit",
      height: "inherit",
      opacity: 1,
      boxShadow: props.animation ? "0 0 0 2px rgba(255,255,255,.5)" : "",
      transition: "box-shadow .4s ease",
      content: '""',
      borderRadius: "50%",
      zoom: 1,
      transform: "translateZ(0)",
      pointerEvents: "none"
    },

    "&:before": {
      animation: props.animation ? "anim-effect-ivana-1 2s infinite" : "none"
    },
    "&:after": {
      animation: props.animation && "anim-effect-ivana-2 2s infinite"
    },

    "&:hover": {
      color: "#35017F",
      backgroundColor: "#fff",
      textDecoration: "none",
      "&:before,&:after": {
        animation: "none",
        boxShadow: "none"
      }
    },

    fontSize: "38px",
    lineHeight: "42px"
  })
}));

export default React.forwardRef((props, ref) => {
  const classes = useStyles({ animation: props.animation || true });

  return (
    <i ref={ref} {...props} className={classes.root}>
      <PlayArrow />
    </i>
  );
});
