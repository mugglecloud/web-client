import React, { useState, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Frame } from "framer";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    width: "100%",
    height: "100%",
    transition: "transform 36s ease-out",
    position: "absolute",
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    backgroundImage: `url(${props.backgroundImage})`,
    transform: `scale(${props.scale})`,
  }),
}));

export default (props) => {
  const [scale, setScale] = useState(1);
  const classes = useStyles({ backgroundImage: props.src, scale });

  useLayoutEffect(() => {
    setScale(1.4);
  }, []);

  return (
    <Frame width="100%" height="100%" overflow="hidden">
      <div className={classes.root}></div>
    </Frame>
  );
};
