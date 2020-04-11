import React, { useState, useEffect } from "react";
import SvgInline from "react-svg-inline";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: props => ({
    width: "inherit",
    height: "inherit",
    color: "inerit",

    "& > svg": {
      width: "inherit",
      height: "inherit",
      color: "inherit",
      "& *": {
        fill: props.fill,
        stroke: props.stroke
      }
    }
  })
});

export default ({ src, title, fill, stroke, ...rest }) => {
  const [svg, setSvg] = useState(null);

  const classes = useStyles({ fill, stroke });

  useEffect(() => {
    let aborted = false;
    window
      .fetch(src)
      .then(r => r.text())
      .then(source => {
        if (aborted) return;
        setSvg(source);
      });

    return () => {
      aborted = true;
    };
  }, [src]);

  return (
    <>
      {svg && (
        <SvgInline
          className={classes.root}
          accessibilityLabel={title}
          svg={svg}
          {...rest}
        />
      )}
    </>
  );
};
