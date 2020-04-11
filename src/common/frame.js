export const FrameFiber = {
  cache: [],
  isRunning: false,
  loop() {
    const frame = this.cache.shift();
    if (!frame) {
      this.isRunning = false;
      return;
    }
    requestAnimationFrame((timestamp) => {
      frame();
      this.loop();
    });
  },
  run(frame) {
    frame && this.cache.push(frame);
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  },
};
