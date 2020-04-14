import React, { useState } from "react";
import { makeStyles, Divider } from "@material-ui/core";
import { useStore, useOvermind } from "@mugglecloud/web-runtime";
import { Frame, Stack, useMotionValue, useTransform, Color } from "framer";

import { FrameFiber } from "common/frame";
import Canvas from "components/Canvas";
import { useEffect } from "react";
// import SwiperGroup, { useSwiper } from "components/SwiperGroup";
import { useMobile } from "common/utils";
import DragSwiper from "components/DragSwiper";

const useStyles = makeStyles(({ border, color }) => ({
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

const CanvasInfo = ({
  children,
  breakpoint,
  duration,
  direction,
  isMobile,
  fontSize,
  ...props
}) => {
  const classes = useStyles();
  const { backgroundColor = "inherit", text } = breakpoint;
  // const { direction } = useSwiper();

  const color = "#320d7f";

  const dividerStyle = {
    transition: `transform ${duration}s ease-out`,
    transform: isMobile ? "" : `translateX(${direction * 100}%)`,
    backgroundColor: color,
  };

  return (
    <Frame
      {...props}
      width="100%"
      height="100%"
      className={classes.info}
      backgroundColor={
        isMobile ? Color.alpha(Color(backgroundColor), 0.4) : backgroundColor
      }
    >
      <div>
        <p style={{ fontSize: isMobile ? "13px" : "20px", color }}>{text}</p>
        <Divider style={dividerStyle} classes={{ root: classes.divider }} />
      </div>
    </Frame>
  );
};

const variants = {
  closed: {
    x: "-100%",
  },
  opened: {
    x: 0,
  },
};

const CanvasImageList = (props) => {
  const classes = useStyles();
  const [count, setCount] = useState(props.scroll.get());
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

  const src = `https://muggleoss.github.io/feedmusic.com/images/frame-high/${
    count + 1
  }.jpg`;

  const duration = 0.8;

  useEffect(
    () =>
      props.scroll.onChange((v) => {
        setCount(v);
      }),
    []
  );

  const isMobile = useMobile();

  return (
    <Frame width="100%" height="100%">
      <Frame
        width={isMobile ? "100%" : "30%"}
        height="100%"
        className={classes.swiperContainer}
        animate={opened ? { x: 0 } : { x: "-100%" }}
      >
        <Stack
          width="100%"
          height="100%"
          direction="vertical"
          transition={{ duration }}
          animate={{ y: `-${active * 100}%` }}
          gap="0"
        >
          {breakpoints.map((v, i) => {
            return (
              <CanvasInfo
                key={`ani-swiper-${i}`}
                breakpoint={v}
                duration={duration}
                direction={active - i}
                isMobile={isMobile}
              />
            );
          })}
        </Stack>
      </Frame>
      <Frame
        size="100%"
        className={classes.canvas}
        animate={opened && !isMobile ? { x: "16%" } : { x: 0 }}
      >
        <Canvas
          src={src}
          width={document.body.offsetWidth}
          height={document.body.offsetHeight}
        />
      </Frame>
    </Frame>
  );
};

export default React.forwardRef(({ ...scrollProps }, ref) => {
  const {
    state: {
      spotlight: { size },
    },
  } = useStore();

  const { actions } = useOvermind();

  const [drag, setDrag] = useState(false);

  const scroll = useMotionValue(0);

  const y = useTransform(scroll, (value) => (value / size) * 100);

  const handleValue = (step) => {
    const value = Math.min(size, Math.max(0, scroll.get() + step));
    scroll.set(value);
    actions.header.setValue(y.get());
    enableDragSwiper();
  };

  const enableDragSwiper = () => {
    if (y.get() <= 0 || y.get() >= 100) setDrag(true);
    else setDrag(false);
  };

  const handleScroll = (v) => {
    const sign = v.deltaY / Math.abs(v.deltaY);
    handleValue(sign);
  };

  const handlePan = (event, info) => {
    FrameFiber.run(() => {
      const sign =
        info.offset.y === 0 ? 0 : info.offset.y / Math.abs(info.offset.y);
      handleValue(-sign);
      console.log(info.offset.y);
    });
  };

  useEffect(() => {
    for (let i = 0; i < size + 1; i++) {
      const src = `https://muggleoss.github.io/feedmusic.com/images/frame-high/${
        i + 1
      }.jpg`;
      fetch(src);
    }
  }, []);

  return (
    <DragSwiper
      onUp={scrollProps.onPrev}
      onDown={scrollProps.onNext}
      drag="y"
      dragMomentum={false}
      dragPropagation={drag}
    >
      <Frame
        size="100%"
        onWheel={handleScroll}
        drag="y"
        onDrag={handlePan}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0}
        dragMomentum={false}
      >
        <CanvasImageList scroll={scroll} />
      </Frame>
    </DragSwiper>
  );
});
