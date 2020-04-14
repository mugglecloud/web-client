import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useStore } from "@mugglecloud/web-runtime";
import { motion } from "framer";

import BackgroundVideo from "components/BackgroundVideo";
import Scroll from "components/Scroll";

const useStyles = makeStyles(({ background, border }) => ({
  video: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    border,
    background,
  },
  paragraph: {
    position: "absolute",
    width: "100%",
    height: "auto",
    top: 0,
    left: 0,
    fontSize: "24px",
    textAlign: "center",
    padding: "300px 0",
  },
}));

const Introduction = React.forwardRef(({ isActive, ...scrollProps }, ref) => {
  const classes = useStyles();
  const {
    state: {
      intro: { sources, paragraphs },
    },
  } = useStore();

  console.log("render instroduction");

  return (
    <>
      <BackgroundVideo
        className={classes.video}
        play={isActive}
        sources={sources}
      />
      <Scroll {...scrollProps}>
        <div className={classes.paragraph}>
          {paragraphs.map((text, i) => {
            return <motion.p key={i}>{text}</motion.p>;
          })}
        </div>
      </Scroll>
    </>
  );
});

export default React.memo(Introduction);
