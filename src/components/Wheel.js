/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useCallback,
  useContext,
  useState,
  useMemo,
} from "react";
import { useMemoizedShortId } from "common/utils";
import { createContext } from "react";
import tree from "common/wheel";

const ParentContext = createContext(null);

const useParent = () => useContext(ParentContext);

const WheelContenxt = createContext({});

export const useWheel = () => useContext(WheelContenxt);

export const WheelProvider = ({ children, value = {}, parent = null }) => (
  <WheelContenxt.Provider value={value}>
    <ParentContext.Provider value={parent}>{children}</ParentContext.Provider>
  </WheelContenxt.Provider>
);

export const Wheel = (props) => {
  const id = useMemoizedShortId();
  const parent = useParent();

  const [event, setEvent] = useState({ id });

  const item = useMemo(() => {
    tree.set(id, { id, children: new Map(), callback: null });
    return tree.get(id);
  }, []);

  item.callback = (e) => {
    const evt = { event: e, id };
    setEvent(evt);
    return props.onWheel && props.onWheel(evt);
  };

  useEffect(() => {
    if (parent) {
      parent.children.set(id, item);
    }

    return () => {
      parent && parent.children.delete(id);
      tree.remove(id);
    };
  }, []);

  return (
    <WheelProvider value={event} parent={item}>
      {props.children}
    </WheelProvider>
  );
};

export const withWheel = (C) => (props) => (
  <Wheel>
    <C {...props} />
  </Wheel>
);

export default Wheel;
