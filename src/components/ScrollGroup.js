import React, { useMemo, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

const noop = () => {};
const ScrollContext = React.createContext();

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    left: 0,
    top: 0,
    background: "transparent",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
}));

export const Scroll = React.forwardRef(
  ({ children, className, onScroll, ...props }, ref) => {
    const classes = useStyles();

    console.log("render scroll");

    const handleWheel = (e) => {
      const { deltaY } = e;

      const next = () => {
        const direction = Math.round(deltaY / Math.abs(deltaY));
        onScroll && onScroll(direction);
      };

      next();
    };

    return (
      <div
        {...props}
        className={[classes.root, className].join(" ")}
        onWheel={handleWheel}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

const ScrollGroup = React.forwardRef(
  (
    {
      children,
      threshold = 1,
      size = 100,
      value = 0,
      onScroll = noop,
      onThreshold = noop,
      ...rest
    },
    ref
  ) => {
    let count = useMemo(() => ({ value }), [value]);
    let force = 0;

    const handleScroll = (direction) => {
      const c = count.value + direction;
      if (c > size || c < 0) {
        force += direction;
        if (Math.abs(force) > threshold) return;

        if (Math.abs(force) === threshold) {
          onThreshold(direction);
        }

        return;
      } else {
        force = 0;
        count.value = c;
      }

      onScroll(count.value);
    };

    return (
      <Scroll {...rest} ref={ref} onScroll={handleScroll}>
        {children}
      </Scroll>
    );
  }
);

export default ScrollGroup;

export const ScrollProvider = (props) => (
  <ScrollContext.Provider value={props.value}>
    {props.children}
  </ScrollContext.Provider>
);

export const useScroll = () => {
  const e = React.useContext(ScrollContext);
  return e;
};
