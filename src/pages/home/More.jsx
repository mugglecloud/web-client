import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import { useStore } from "@mugglecloud/web-runtime";

import ScrollGroup from "containers/ScrollGroup";

const useStyles = makeStyles(
  ({ color, hoverColor, background, hoverBackground, border }) => ({
    root: {
      background,
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      border
    },
    linkWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
      height: "100%",
      textAlign: "center",
      background: "inherit",

      "&:hover": {
        background: hoverBackground,
        color: hoverColor,
        "& *": {
          borderColor: hoverColor,
          borderRadius: "50%",
          height: "280px"
        }
      },

      "& > *": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "280px",
        height: "120px",
        fontSize: "32px",
        color: "inherit",
        textTransform: "uppercase",
        lineHeight: "1.1",
        padding: "18px",
        border: `12px solid ${color}`,
        transition: "all .4s cubic-bezier(.7,0,.3,1)",

        "&:hover": {
          textDecoration: "none",
          backgroundColor: hoverColor,
          color: color
        }
      }
    }
  })
);

const OtherLink = ({ path, title }) => {
  const classes = useStyles();
  return (
    <div className={classes.linkWrapper}>
      <Link to={path} component={RouterLink}>
        {title}
      </Link>
    </div>
  );
};

export default React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { state } = useStore();

  const links = state.more.links;

  return (
    <ScrollGroup ref={ref} className={classes.root}>
      {links.map(v => (
        <OtherLink key={v.title} {...v} />
      ))}
    </ScrollGroup>
  );
});
