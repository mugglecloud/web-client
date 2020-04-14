import React, { useRef, useLayoutEffect } from "react";
import { withSize } from "./SizeMe";

const CANVAS_RATIO = 1920 / 1080;

const loadImage = (src) => {
  const img = new Image();
  img.src = src;
  return new Promise((resolve, reject) => {
    img.onload = function () {
      resolve(img);
    };
    img.onerror = reject;
  });
};

function adjustSize(width, height, ratio = CANVAS_RATIO) {
  const size = { width, height };
  if (size.width > 0 && size.height > 0) {
    if (size.width / size.height > ratio) {
      size.height = size.width / ratio;
    } else {
      size.width = ratio * size.height;
    }
  }

  return size;
}

const Canvas = ({
  src,
  width,
  height,
  size = {},
  ratio = CANVAS_RATIO,
  ...props
}) => {
  const ref = useRef();

  if (width) size.width = width;
  if (height) size.height = height;

  useLayoutEffect(() => {
    const ctx = ref.current.getContext("2d");
    let aborted = false;

    loadImage(src).then((img) => {
      if (aborted) return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const sizeAdjusted = adjustSize(size.width, size.height, ratio);
      const x = -(sizeAdjusted.width - size.width) / 2,
        y = -(sizeAdjusted.height - size.height) / 2;
      ctx.drawImage(img, x, y, sizeAdjusted.width, sizeAdjusted.height);
    });

    return () => {
      aborted = true;
    };
  }, [src, size]);

  return (
    <canvas
      {...props}
      width={size.width}
      height={size.height}
      ref={ref}
    ></canvas>
  );
};

export default withSize()(Canvas);
