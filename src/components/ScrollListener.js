import React, { useLayoutEffect, useRef } from "react";
// import { useMotionValue } from "framer-motion";

function ScrollListener({ children, scrollOffsetHeight }) {
  const ref = useRef();

  useLayoutEffect(() => {
    const parentElement = ref.current.parentElement;
    const viewHeight = document.body.offsetHeight;
    let ro = null;
    if (ResizeObserver) {
      ro = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentBoxSize) {
            scrollOffsetHeight.set(entry.contentBoxSize.blockSize - viewHeight);
          } else {
            scrollOffsetHeight.set(entry.contentRect.height - viewHeight);
          }
        }
      });
      ro.observe(parentElement);
    } else {
      setTimeout(() => {
        scrollOffsetHeight.set(parentElement.offsetHeight - viewHeight);
      });
    }

    return () => {
      if (ro) ro.unobserve(parentElement);
    };
  }, []);

  return (
    <div ref={ref} style={{ height: "0" }}>
      {children}
    </div>
  );
}

export default ScrollListener;
