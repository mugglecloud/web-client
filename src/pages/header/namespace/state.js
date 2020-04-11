export const state = {
  navs: [],
  active: 0,

  value(state) {
    return state.current && state.current.value;
  },

  current(state) {
    return state.navs[state.active];
  },

  visible: true,
  menuCollapsed: true,
};
