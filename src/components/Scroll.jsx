import React, { useRef } from "react";
import { Scroll, Frame, useMotionValue } from "framer";

export default ({
  children,
  threshold = 100,
  onScroll,
  onNext,
  onPrev,
  ...scrollProps
}) => {
  const childrenContainer = useRef();
  const percentRef = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const isAnimating = useMotionValue(false);

  const handleScroll = (info) => {
    const container = childrenContainer.current;
    if (container) {
      const viewHeight = window.visualViewport.height;
      const y = offsetY.get();
      const h = container.offsetHeight;
      const percent = h > viewHeight ? -y / (h - viewHeight) : 1;

      percentRef.set(percent);

      if (h - viewHeight + y + threshold / 2 < 0 || y - threshold / 2 > 0) {
        console.log(y, isAnimating.get());
      }

      if (h - viewHeight + y + threshold < 0) {
        if (isAnimating.get()) return;
        isAnimating.set(true);
        return onNext && onNext();
      } else if (y - threshold > 0) {
        if (isAnimating.get()) return;
        isAnimating.set(true);
        return onPrev && onPrev();
      } else {
        isAnimating.set(false);
      }

      const p = Math.min(100, Math.max(0, Math.round(percent * 100)));
      onScroll && onScroll(p);
    }
  };

  return (
    <Scroll
      width={"100%"}
      top={0}
      left={0}
      height={"100%"}
      onScroll={handleScroll}
      contentOffsetY={offsetY}
      {...scrollProps}
    >
      <Frame width={"100%"} height="auto">
        {React.cloneElement(children, { ref: childrenContainer })}
      </Frame>
    </Scroll>
  );
};
