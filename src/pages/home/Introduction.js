import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useStore, useOvermind } from "@mugglecloud/web-runtime";
import { Scroll, Frame } from "framer";
import { motion, useMotionValue, useTransform } from "framer-motion";

import BackgroundVideo from "components/BackgroundVideo";
import ScrollListener from "components/ScrollListener";

const ScrollParagraph = React.memo(({ paragraphs, onScroll }) => {
  const offsetHeight = useMotionValue(Infinity);
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  const handleScroll = (info) => {
    scrollY.set(scrollY.get() + info.delta.y);
    scrollYProgress.set(
      Math.abs(Math.max(-1, Math.min(0, scrollY.get() / offsetHeight.get())))
    );

    onScroll && onScroll(scrollYProgress.get());
  };

  const len = paragraphs.length;
  const sizer = (i) => (value) =>
    Math.pow(1 - value * Math.abs(i / len - value), 1.6);

  // useEffect(
  //   () =>
  //     scrollYProgress.onChange(() => {
  //       onScroll && onScroll(scrollYProgress.get());
  //     }),
  //   [scrollYProgress, onScroll]
  // );

  return (
    <Scroll
      width={"100%"}
      top={0}
      left={0}
      height={"100%"}
      style={{ fontSize: "24px", textAlign: "center" }}
      onScroll={handleScroll}
    >
      <Frame width={"100%"} height="auto">
        <ScrollListener scrollOffsetHeight={offsetHeight} />
        <div style={{ padding: "300px 0" }}>
          {paragraphs.map((text, i) => {
            const opacity = useTransform(scrollYProgress, sizer(i));
            const scale = useTransform(scrollYProgress, sizer(i));

            return (
              <motion.p key={i} opacity={opacity} scale={scale}>
                {text}
              </motion.p>
            );
          })}
        </div>
      </Frame>
    </Scroll>
  );
});

const useStyles = makeStyles(({ background, border }) => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    border,
    background,
  },
}));

const Introduction = React.forwardRef(({ isActive }, ref) => {
  const classes = useStyles();
  const {
    state: {
      intro: { sources, paragraphs },
    },
  } = useStore();
  const { actions } = useOvermind();

  console.log("render instroduction");

  const handleScroll = (v) => {
    actions.header.setValue(v * 100);
  };

  return (
    <div ref={ref} className={classes.root}>
      <BackgroundVideo play={isActive} sources={sources} />
      <ScrollParagraph paragraphs={paragraphs} onScroll={handleScroll} />
    </div>
  );
});

export default React.memo(Introduction);
