/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
  useState,
} from "react";
import { makeStyles } from "@material-ui/styles";
import anime from "animejs";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "absolute",
    width: "100%",
    top: "50%",
    height: "2em",
    marginTop: "-2em",
    fontSize: "24px",
    lineHeight: "2em",
    transform: "translate3d(0, -200%, 0)",
    boxSizing: "border-box",

    "& p": {
      position: "absolute",
      width: "100%",
      fontFamily: '"Avenir Next Regular",sans-serif',
      textAlign: "center",
      margin: "0 auto 5px",
    },
  },
}));

function getStyle(offset) {
  const min = -4,
    max = 7;
  offset = Math.max(min, Math.min(max, offset));
  const transform = offset * 150;
  const scale =
    1 -
    Math.pow(offset < 0 ? offset / Math.abs(min) : offset / Math.abs(max), 3);
  const opacity =
    1 - Math.abs(offset < 0 ? offset / Math.abs(min) : offset / Math.abs(max));

  const style = {
    opacity,
    transform: `translateY(${transform}%)`,
    translateY: transform,
    scale,
  };

  return style;
}

function renderParagraphs(paragraphs, count = 0) {
  return paragraphs.map((text, i) => {
    const style = getStyle(i - count);
    return (
      <p style={style} key={i}>
        {text}
      </p>
    );
  });
}

const map = (...args) => Array.prototype.map.call(...args);

const calcStyle = (start, end, factor) => start * (1 - factor) + end * factor;

const paint = (ref, animation, offset) => {
  const v = offset.value;

  animation.currentTimestamp = performance.now();

  const updateParagraphs = (factor) => {
    if (!ref.current) return;
    const targets = ref.current.children;

    const currentStyles = map(targets, (el, i) => getStyle(i - v));

    Array.prototype.forEach.call(targets, (el, i) => {
      const style = currentStyles[i];
      const preStyle = animation.currentStyles[i];
      const curStyle = {
        opacity: calcStyle(preStyle.opacity, style.opacity, factor).toFixed(2),
        translateY: Math.round(
          calcStyle(preStyle.translateY, style.translateY, factor)
        ),
        // scale: calcStyle(preStyle.scale, style.scale, factor).toFixed(2),
      };

      el.style = `opacity: ${curStyle.opacity}; transform: translate(0%, ${curStyle.translateY}%);`;

      animation.currentStyles[i] = curStyle;
    });
  };

  const animate = () => {
    animation.id = requestAnimationFrame((timestamp) => {
      if (timestamp === animation.prevTimestamp) {
        console.log("one more frame encountered");
        return;
      }
      console.log(timestamp - animation.prevTimestamp);
      let t = timestamp - animation.currentTimestamp;
      animation.prevTimestamp = timestamp;
      if (t > animation.duration) {
        return;
      }

      if (t > 0) {
        t = t / animation.duration;
        updateParagraphs(animation.easing(t));
      }

      animate();

      const elapsed = performance.now() - timestamp;
      if (elapsed > 15) {
        console.log(
          "render consumes:",
          Number(elapsed).toFixed(2) + "ms",
          t.toFixed(2)
        );
      }
    });
    console.log("paint animate", animation.id);
  };

  animate();
};

function cancelAnimation(animation) {
  if (animation.id != null) {
    cancelAnimationFrame(animation.id);
    console.log("cancel animation", animation.id);
    animation.id = null;
  }
}

const ParagraphList = ({
  paragraphs = [],
  className,
  defaultOffset = 0,
  duration = 1200,
}) => {
  const ref = useRef();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const offset = useMemo(() => ({ value: defaultOffset }), [defaultOffset]);

  const animation = useMemo(
    () => ({
      duration,
      easing: anime.easing("easeOutCubic"),
      prevTimestamp: null,
    }),
    []
  );

  useEffect(() => {
    animation.duration = duration;
  }, [duration]);

  cancelAnimation(animation);
  // paint(ref, animation, offset);

  useLayoutEffect(() => {
    animation.currentStyles = Array.prototype.map.call(
      ref.current.children,
      (el, i) => {
        return getStyle(i);
      }
    );

    setLoading(false);
  }, []);

  // console.log("render paragraphs list", offset.value);

  if (loading) {
    console.log("loading ...");
  }

  return (
    <div ref={ref} className={[classes.wrapper, className].join(" ")}>
      {renderParagraphs(paragraphs, defaultOffset)}
    </div>
  );
};

export default ParagraphList;
