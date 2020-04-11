import React, { useState } from "react";
import ScrollGroup, { Scroll, ScrollProvider } from "components/ScrollGroup";

export { useScroll } from "components/ScrollGroup";

const NormalGroup = React.forwardRef(
  ({ children, size, value, onScroll, onThreshold, ...rest }, ref) => {
    const step = 100 / size;

    const [count, setCount] = useState(Math.round(value / step));

    const handleScroll = e => {
      setCount(e);
      onScroll && onScroll(e, e * step);
    };

    const handleThreshold = direction => {
      onThreshold && onThreshold(direction);
    };

    return (
      <ScrollGroup
        {...rest}
        size={size}
        value={count}
        onScroll={handleScroll}
        onThreshold={handleThreshold}
        ref={ref}
      >
        <ScrollProvider value={count}>{children}</ScrollProvider>
      </ScrollGroup>
    );
  }
);

const SimpleScroll = React.forwardRef((props, ref) => {
  return (
    <Scroll onScroll={props.onThreshold} ref={ref}>
      {props.children}
    </Scroll>
  );
});

export default React.forwardRef((props, ref) => {
  if (!props.size)
    return <SimpleScroll {...props}>{props.children}</SimpleScroll>;

  return (
    <NormalGroup {...props} ref={ref}>
      {props.children}
    </NormalGroup>
  );
});
