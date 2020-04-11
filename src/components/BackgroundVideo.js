import React from "react";
import { withStyles } from "@material-ui/core";
import Video from "./Video";

export default React.memo(
  withStyles({
    video: {
      width: "100%",
      height: "100%",
      opacity: 0.7,
      objectFit: "cover",
    },
  })(({ classes, ...props }) => (
    <Video className={classes.video} {...props} autoPlay />
  ))
);
