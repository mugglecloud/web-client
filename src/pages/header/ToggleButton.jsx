import React, { useState } from "react";
import { Link, makeStyles } from "@material-ui/core";
import { useOvermind } from "@mugglecloud/web-runtime";

const barStyle = ({ top, backgroundColor }) => ({
  transition: "all .3s cubic-bezier(.7,0,.3,1)",
  position: "absolute",
  left: 0,
  width: "100%",
  height: "4px",
  backgroundColor: backgroundColor || "#fff",
  display: "block",
  content: '" "',
  top,
});

const hoverStyle = (toggle) =>
  toggle
    ? {
        "&:hover > *:before": {
          transform: "translateY(0px)rotate(-55deg)",
        },
        "&:hover > *:after": {
          transform: "translateY(0px)rotate(55deg)",
        },
      }
    : {
        "&:hover > *:before": {
          transform: "translateY(-2px)rotate(0)",
        },
        "&:hover > *:after": {
          transform: "translateY(2px)rotate(0)",
        },
      };

const useStyles = makeStyles((theme) => ({
  root: ({ toggle }) => ({
    cursor: "pointer",
    transition: "all .5s cubic-bezier(.7,0,.3,1)",

    transform: toggle ? "rotate(90deg)" : "rotate(0)",

    "& > *:before": {
      ...barStyle({
        top: toggle ? "0" : "-10px",
        backgroundColor: theme.toggleBackgroundColor,
      }),
      transform: toggle ? "translateY(0)rotate(-45deg)" : "rotate(0)",
    },

    "& > *:after": {
      ...barStyle({
        top: toggle ? "0" : "10px",
        backgroundColor: theme.toggleBackgroundColor,
      }),
      transform: toggle ? "translateY(0)rotate(45deg)" : "rotate(0)",
    },

    ...hoverStyle(toggle),
  }),
  lines: ({ toggle, backgroundColor }) => ({
    backgroundColor: toggle
      ? "transparent"
      : theme.toggleBackgroundColor || backgroundColor,
    transition: "all .3s cubic-bezier(.7,0,.3,1)",
    position: "relative",
    width: "100%",
    height: "4px",
    display: "block",
    top: "50%",
    marginTop: "-2px",
  }),
}));

export default ({ className }) => {
  const { state, actions } = useOvermind();
  const classes = useStyles({
    backgroundColor: "#fff",
    toggle: !state.header.menuCollapsed,
  });

  const handleClick = () => {
    actions.header.toggleMenu();
  };

  return (
    <Link className={[classes.root, className].join(" ")} onClick={handleClick}>
      <span className={classes.lines}></span>
    </Link>
  );
};
