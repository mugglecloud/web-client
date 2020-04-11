import { json } from "overmind";

export const setActive = ({ state }, active) => {
  state.header.active = active;
};

export const toggleMenu = ({ state }) => {
  state.header.menuCollapsed = !state.header.menuCollapsed;
};

export const init = ({ state }, header) => {
  Object.assign(state.header, json(header));
};

export const setValue = ({ state }, v) => {
  const current = state.header.current;
  if (current) current.value = v;
};

export const setVisible = ({ state }, visible) => {
  state.header.visible = visible;
};
