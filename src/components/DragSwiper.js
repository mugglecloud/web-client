import React from "react";
import { Frame, useMotionValue } from "framer";

export default React.forwardRef(
  (
    { children, threshold = 200, onUp, onDown, drag = "y", ...dragProps },
    ref
  ) => {
    const isAnimating = useMotionValue(false);
    const d = ["x", "y"].includes(drag) ? drag : "";
    const handleDrag = (e, info) => {
      const v = info.offset[d];
      if (v - threshold > 0) {
        if (isAnimating.get()) return;
        isAnimating.set(true);
        onUp && onUp();
      } else if (v + threshold < 0) {
        if (isAnimating.get()) return;
        isAnimating.set(true);
        onDown && onDown();
      } else {
        isAnimating.set(false);
      }
    };

    return (
      <Frame
        width="100%"
        height="100%"
        drag={drag}
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        onDrag={handleDrag}
        ref={ref}
        {...dragProps}
      >
        {children}
      </Frame>
    );
  }
);
