import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Frame, Stack } from "framer";

import VideoPlayButton from "./VideoPlayButton";
import CloseButton from "./CloseButton";
import Video from "./Video";

const variants = {
  hidden: {
    opacity: 0,
    y: 300,
    width: 656,
    scale: 1.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    width: 656,
    height: 300,
    scale: 1,
  },
  full: {
    width: "100%",
    height: "100%",
    scale: 1,
  },
};

const duration = 0.8;

export default (props) => {
  const [full, setFull] = useState(false);

  const toggleFull = (isFull) => {
    setFull(isFull);

    props.onFull && props.onFull(!isFull);
  };

  return (
    <Frame
      variants={variants}
      initial="hidden"
      animate={!full ? "visible" : "full"}
      transition={{ duration }}
      center
      border="12px solid #35017F"
      backgroundColor="rgba(0,0,0,.4)"
      style={{ maxWidth: "100%" }}
    >
      <Frame
        visible={!full}
        width="100%"
        height="100%"
        backgroundColor="transparent"
      >
        <Stack
          distribution="center"
          alignment="center"
          direction="vertical"
          width="inherit"
          height="inherit"
        >
          <Frame height="auto" width="auto" background="transparent">
            <VideoPlayButton onClick={() => toggleFull(true)} />
          </Frame>
          <Frame
            width="100%"
            height="auto"
            background="transparent"
            style={{ fontSize: "38px" }}
          >
            Introducing Feed
          </Frame>
        </Stack>
      </Frame>
      <Frame visible={full} width="100%" height="100%" backgroundColor="#000">
        <Video autoPlay sources={props.sources} play={props.play} />
        <CloseButton onClick={() => toggleFull(false)} />
      </Frame>
    </Frame>
  );
};
