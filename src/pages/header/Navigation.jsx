import React, { useState, useEffect } from "react";
import {
  makeStyles,
  withStyles,
  Link,
  Grow,
  LinearProgress,
  useTheme,
} from "@material-ui/core";
import { useOvermind } from "@mugglecloud/web-runtime";

// import LinkBar from "components/LinkBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
    margin: 0,
    padding: 0,
    listStyle: "none",

    "& *": {
      userSelect: "none",
    },

    "& > * + *": {
      // marginLeft: theme.spacing(3),
    },

    "& > *": {
      padding: `0 ${theme.spacing(3)}px`,
      fontSize: "15px",
    },

    "& a > *:last-child": {
      opacity: 0,
      transition: "all ease 300ms",
      transform: "translateY(5px)",
      paddingTop: "1px",
      marginTop: "3px",
    },

    "& a:hover, & a.active": {
      "& > *:last-child": {
        opacity: "1",
        transform: "translateY(0)",
      },
    },
  },
}));

const ColorLinearProgress = withStyles((theme) => ({
  colorPrimary: {
    backgroundColor: theme.colorPrimary || "#b3b3b3",
  },
  barColorPrimary: {
    backgroundColor: theme.barColorPrimary || "#fff",
  },
}))(LinearProgress);

const MemoizedProgress = (props) => {
  const { state } = useOvermind();
  const nav = state.header.navs[props.index];

  return <ColorLinearProgress variant="determinate" value={nav.value} />;
};

const MemoizedLink = ({ index, text, ...props }) => {
  const { state, actions } = useOvermind();

  const preventDefault = (e) => {
    e.preventDefault();
    actions.header.setActive(index);
  };

  const isActive = index === state.header.active;

  const theme = useTheme();

  return (
    <Link
      onClick={(e) => preventDefault(e)}
      color={"inherit"}
      underline="none"
      className={isActive ? "active" : ""}
      style={{ color: theme.linkColor }}
    >
      {text}
      <MemoizedProgress index={index} {...props} />
    </Link>
  );
};

export default ({ className, ...props }) => {
  const classes = useStyles();
  const { state } = useOvermind();

  const menuCollapsed = state.header.menuCollapsed;

  return (
    <ul {...props} className={[classes.root, className].join(" ")}>
      {state.header.navs.map((nav, i) => (
        <Grow
          key={nav.name}
          in={menuCollapsed}
          // style={{ transformOrigin: "0 0 0" }}
          timeout={i * 500}
        >
          <li>
            <MemoizedLink
              text={nav.text}
              index={i}
              backgroundColor={nav.backgroundColor}
            />
          </li>
        </Grow>
      ))}
    </ul>
  );
};
