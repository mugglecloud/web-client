import React from "react";
import { makeStyles, Divider } from "@material-ui/core";
import { useStore } from "@mugglecloud/web-runtime";
import { Scroll, Frame, Stack } from "framer";

import Canvas from "components/Canvas";
// import SwiperGroup, { useSwiper } from "components/SwiperGroup";

const useStyles = makeStyles(({ border, color }) => ({
  // root: {
  //   position: "relative",
  //   overflow: "hidden",
  //   transition: "all 800ms ease",
  //   border,

  //   "& > *": {
  //     position: "absolute",
  //     width: "100%",
  //     height: "100%",
  //     left: 0,
  //     top: 0,
  //     transition: "inherit",
  //   },
  // },
  opened: {
    "& > *:first-child": {
      transform: "translateX(0)",
    },
    "& > *:last-child": {
      transform: "translateX(16%)",
    },
  },
  swiperContainer: {
    zIndex: 10,
    transform: "translateX(-100%)",
    minWidth: "350px",
  },
  info: {
    position: "relative",
    overflow: "hidden",
    "& > *": {
      position: "absolute",
      bottom: 0,
      padding: "50px",
      color,
      fontSize: "20px",
    },
  },
  divider: {
    marginTop: "36px",
    height: "5px",
    backgroundColor: color,
  },
  canvas: {
    zIndex: 1,
    width: "100%",
    height: "100%",
  },
}));

const CanvasInfo = ({ children, breakpoint, duration }) => {
  const classes = useStyles();
  const { backgroundColor = "inherit", text } = breakpoint;
  // const { direction } = useSwiper();

  const dividerStyle = {
    transition: `transform ${duration}ms ease-out`,
    transform: `translateX(${1 * 100}%)`,
  };

  return (
    <Frame
      width="100%"
      height="100%"
      style={Object.assign({ backgroundColor })}
      className={classes.info}
    >
      <div>
        <p>{text}</p>
        <Divider style={dividerStyle} classes={{ root: classes.divider }} />
      </div>
    </Frame>
  );
};

const CanvasImageList = (props) => {
  const classes = useStyles();
  const count = 0;
  const {
    state: {
      spotlight: { start, breakpoints },
    },
  } = useStore();

  // const bp = breakpoints.find(v => v.start <= count && count <= v.end);
  const active = breakpoints.findIndex(
    (v) => v.start <= count && count <= v.end
  );
  const opened = count > start;

  const src = `https://mugglecloud.github.io/oss/feedmusic.com/images/frame-high/${
    count + 1
  }.jpg`;

  const classNames = [classes.root];
  if (opened) {
    classNames.push(classes.opened);
  }

  const duration = 800;

  return (
    <Frame width="100%" height="100%">
      <Stack
        width="30%"
        height="100%"
        direction="vertical"
        className={classes.swiperContainer}
      >
        {breakpoints.map((v, i) => {
          return (
            <CanvasInfo
              key={`ani-swiper-${i}`}
              breakpoint={v}
              duration={duration}
            />
          );
        })}
      </Stack>
      <Frame size="100%" className={classes.canvas}>
        <Canvas src={src} />
      </Frame>
    </Frame>
  );
};

export default React.forwardRef((props, ref) => {
  const {
    state: {
      spotlight: { size },
    },
  } = useStore();

  const handleScroll = (v) => {};

  return (
    <Frame size="100%" onScroll={handleScroll}>
      <CanvasImageList />
    </Frame>
  );
});
