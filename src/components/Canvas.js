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

  if (width != null) size.width = width;
  if (height != null) size.height = height;

  useLayoutEffect(() => {
    const ctx = ref.current.getContext("2d");
    let aborted = false;

    loadImage(src).then((img) => {
      if (aborted) return;
      console.log(img.width, img.height);
      size = adjustSize(size.width, size.height, ratio);
      ctx.drawImage(img, 0, 0, size.width, size.height);
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
