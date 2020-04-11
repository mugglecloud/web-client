import { FrameFiber } from "./frame";

const WheelTree = class {
  constructor() {
    this.cache = new Map();
  }

  get(id) {
    if (this.cache.has(id)) return this.cache.get(id);
    return null;
  }

  set(id, item) {
    this.cache.set(id, item);
  }

  remove(id) {
    this.cache.delete(id);
  }

  get leafs() {
    return Array.from(this.cache.values()).filter(
      (v) => !v.children || !v.children.size
    );
  }
};

const tree = new WheelTree();
const touchEvent = {
  started: false,
  current: null,
};
const wheelEvent = {
  current: null,
};

const handleWheel = (e) => {
  const frame = () => {
    tree.leafs.forEach((w) => {
      let { callback, parent } = w;
      while (callback && callback(e) === true && parent != null) {
        callback = parent.callback;
        parent = parent.parent;
      }
    });
  };

  FrameFiber.run(frame);
};

window.onwheel = (e) => {
  let deltaT = wheelEvent.current
    ? e.timeStamp - wheelEvent.current.timeStamp
    : new Date() - performance.timeOrigin;
  if (!wheelEvent.current) {
    wheelEvent.current = e;
  }

  const { deltaX, deltaY } = e;

  handleWheel({
    deltaX: deltaX && deltaX / Math.abs(deltaX),
    deltaY: deltaY && deltaY / Math.abs(deltaY),
    deltaZ: 0,
    deltaMode: 0,
    deltaT,
  });

  wheelEvent.current = e;
};

window.ontouchstart = (e) => {
  touchEvent.started = true;
  touchEvent.current = e;
};

window.ontouchmove = (e) => {
  if (touchEvent.started) {
    const deltaT = e.timeStamp - touchEvent.current.timeStamp;
    if (deltaT < 16.7) return;

    const touch = e.touches[0];
    const current = touchEvent.current.touches[0];
    const deltaX = touch.pageX - current.pageX;
    const deltaY = touch.pageY - current.pageY;

    console.log("deltaT", deltaT);

    handleWheel({
      deltaX: deltaX && (deltaX / Math.abs(deltaX)) * -1,
      deltaY: deltaY && (deltaY / Math.abs(deltaY)) * -1,
      deltaZ: 0,
      deltaMode: 0,
      deltaT,
    });
    touchEvent.current = e;
  }
};

window.ontouchend = () => {
  touchEvent.started = false;
};

export { WheelTree };

export default tree;
