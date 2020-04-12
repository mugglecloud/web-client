import React, { useLayoutEffect, useRef, useState } from "react";

function SizeMe({ children }) {
  const ref = useRef();
  const [size, setSize] = useState(null);

  useLayoutEffect(() => {
    const parentElement = ref.current.parentElement;

    let ro = null;

    if (ResizeObserver) {
      ro = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentBoxSize) {
            const height = entry.contentBoxSize.blockSize;
            const width = entry.contentBoxSize.inlineSize;
            setSize({ width, height });
          } else {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
          }
        }
      });
      ro.observe(parentElement);
    } else {
      setTimeout(() => {
        setSize({
          width: parentElement.offsetWidth,
          height: parentElement.offsetHeight,
        });
      });
    }

    return () => {
      if (ro) ro.unobserve(parentElement);
    };
  }, []);

  return size == null ? (
    <div ref={ref} style={{ height: "0" }}>
      {children}
    </div>
  ) : (
    React.cloneElement(children, { size })
  );
}

export const withSize = () => (C) => (props) => (
  <SizeMe>
    <C {...props} />
  </SizeMe>
);

export default SizeMe;
