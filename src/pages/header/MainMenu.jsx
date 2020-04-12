import React from "react";
import { makeStyles } from "@material-ui/core";
import { useOvermind } from "@mugglecloud/web-runtime";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#320d7f",
    textAlign: "center",
    fontSize: "42px",
    textTransform: "uppercase"
  }
}));

export default React.forwardRef(
  ({ children, style, className, ...props }, ref) => {
    const classes = useStyles();
    const {
      state: {
        config: { routes }
      }
    } = useOvermind();

    return (
      <div
        {...props}
        ref={ref}
        style={style}
        className={[classes.root, className].join(" ")}
      >
        {children}
      </div>
    );
  }
);
