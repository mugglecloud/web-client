import React, { useRef } from "react";
// import videojs from "video.js";
import { makeStyles } from "@material-ui/core";
// import "video.js/dist/video-js.css";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "100%",
    height: "100%",
    objectFit: "scale-down",
  },
}));

export default ({ className, sources, play, ...props }) => {
  const classes = useStyles();
  const ref = useRef();

  const video = ref.current;

  if (video) {
    console.log(play, video.paused);
    if (play && video.paused) video.play();
    else video.pause();
  }

  return (
    <video
      controls
      {...props}
      className={[classes.video, className].join(" ")}
      loop
      muted
      ref={ref}
    >
      {sources.map(({ src, type }, i) => (
        <source key={`${src}-${type}-${i}`} src={src} type={type} />
      ))}
    </video>
  );
};
