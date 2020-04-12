import React, { useEffect } from "react";
import { makeStyles, useMediaQuery } from "@material-ui/core";
import { Frame } from "framer";
import { useOvermind } from "@mugglecloud/web-runtime";

import VideoPopup from "components/VideoPopup";
import Background from "components/Background";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.background,
  },
  video: {
    // maxWidth: "80%"
  },
}));

export default React.forwardRef((props, ref) => {
  const classes = useStyles();

  const matches = useMediaQuery("(max-width:600px)");
  console.log("render image video with matches", matches);

  const { actions } = useOvermind();

  const sources = [
    {
      src:
        "https://mugglecloud.github.io/oss/feedmusic.com/videos/introducing-feed.mp4",
      type: "video/mp4",
    },
  ];

  const handleFull = (v) => {
    actions.header.setVisible(v);
  };

  useEffect(() => {
    if (!props.isActive) actions.header.setVisible(true);
  }, [props.isActive]);

  return (
    <Frame width="100%" height="100%">
      <Background src="https://mugglecloud.github.io/oss/feedmusic.com/images/presentation-background.jpg" />
      <Frame
        visible={props.isActive}
        width="100%"
        height="100%"
        background="transparent"
      >
        <VideoPopup
          className={classes.video}
          value={100}
          onFull={handleFull}
          sources={sources}
          play={props.isActive}
        />
      </Frame>
    </Frame>
  );
});
