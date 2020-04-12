import React from "react";

export default ({ visible, children }) => {
  if (!visible) return null;
  return <>{children}</>;
};
