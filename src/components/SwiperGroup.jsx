import React, { useMemo, createContext, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { Frame, Stack } from "framer";

import { withWheel, useWheel } from "./Wheel";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    "& > *:first-child": {
      transform: "translate3d(0, 0, 0)",
    },
  },
  swiper: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    "& > *": {
      width: "inherit",
      height: "inherit",
    },
  },
}));

const SwiperContext = createContext();

export const useSwiper = () => useContext(SwiperContext);

const Swiper = React.forwardRef(({ children, style }, ref) => {
  const classes = useStyles();

  const defaultStyle = useMemo(
    () => ({
      transform: "translateY(100%)",
    }),
    []
  );

  return (
    <Frame
      width="100%"
      height="100%"
      ref={ref}
      // className={classes.swiper}
      // style={{
      //   ...defaultStyle,
      //   ...style,
      // }}
    >
      {children}
    </Frame>
  );
});

const SwiperGroup = ({ children, className, active = 0, duration = 800 }) => {
  const groupId = useMemo(() => Math.random().toString().substr(3, 4), []);

  const classes = useStyles();
  active = active < 0 ? 0 : active;

  return (
    <Stack
      width="100%"
      height="100%"
      // className={[classes.root, className].join(" ")}
    >
      {React.Children.map(children, (c, i) => {
        const direction = Math.min(1, Math.max(-1, active - i));
        const isActive = direction === 0;
        const transitionStyle = {
          transition: `all ${duration}ms ease-out`,
          transform: `translateY(${direction * -100}%)`,
          visibility: isActive ? "visible" : "hidden",
        };

        return (
          <SwiperContext.Provider value={{ direction }}>
            <Swiper
              key={`swiper-group-${groupId}-${i}`}
              // style={transitionStyle}
            >
              {c}
            </Swiper>
          </SwiperContext.Provider>
        );
      })}
    </Stack>
  );
};

export default withWheel(SwiperGroup);
