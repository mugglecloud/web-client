import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  border: {
    transition: "all .3s cubic-bezier(.7,0,.3,1)",
    opacity: 0,
    transform: "translateY(100%)",
    position: "absolute",
    height: "5px",
    backgroundColor: "#b3b3b3",
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1
  },
  line: {}
}));

export default props => {
  const classes = useStyles();

  return (
    <div className={classes.border}>
      <div className={classes.line}>{props.children}</div>
    </div>
  );
};
