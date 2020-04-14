import React, { useEffect } from "react";
import { makeStyles, useMediaQuery } from "@material-ui/core";
import { Frame } from "framer";
import { useOvermind } from "@mugglecloud/web-runtime";

import VideoPopup from "components/VideoPopup";
import Background from "components/Background";
import Scroll from "components/Scroll";
import DragSwiper from "components/DragSwiper";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.background,
  },
  video: {
    // maxWidth: "80%"
  },
}));

export default React.forwardRef(({ isActive, ...scrollProps }, ref) => {
  const classes = useStyles();

  const matches = useMediaQuery("(max-width:600px)");
  console.log("render image video with matches", matches);

  const { actions } = useOvermind();

  const sources = [
    {
      src:
        "https://muggleoss.github.io/feedmusic.com/videos/introducing-feed.mp4",
      type: "video/mp4",
    },
  ];

  const handleFull = (v) => {
    actions.header.setVisible(v);
  };

  useEffect(() => {
    if (!isActive) actions.header.setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <DragSwiper onUp={scrollProps.onPrev} onDown={scrollProps.onNext}>
      <Background src="https://muggleoss.github.io/feedmusic.com/images/presentation-background.jpg" />
      <Frame
        visible={isActive}
        width="100%"
        height="100%"
        background="transparent"
      >
        <VideoPopup
          className={classes.video}
          value={100}
          onFull={handleFull}
          sources={sources}
          play={isActive}
        />
      </Frame>
    </DragSwiper>
  );
});
