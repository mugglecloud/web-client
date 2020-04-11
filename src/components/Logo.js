import React from "react";
import { Link } from "@material-ui/core";
import Svg from "components/Svg";

export default ({ className, svg, ...props }) => {
  return (
    <Link className={className}>
      <Svg src={svg} {...props} />
    </Link>
  );
};
