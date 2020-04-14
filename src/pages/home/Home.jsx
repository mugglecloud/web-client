import React, { useEffect, useRef } from "react";
import { useOvermind, useStore } from "@mugglecloud/web-runtime";
import { Page, Frame, useMotionValue } from "framer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import Intro from "./Introduction";
import ImageVideo from "./ImageVideo";
import CanvasImage from "./CanvasImage";
// import More from "./More";
import Why from "./Why";
import ScrollDown from "components/ScrollDown";
import { useMobile } from "common/utils";

const groups = [<Intro />, <ImageVideo />, <CanvasImage />, <Why />];

const Home = () => {
  const ctx = useStore();
  const { state, actions } = useOvermind();

  const isMobile = useMobile();

  useEffect(() => {
    actions.header.init({ navs: ctx.state.navs });
  }, [ctx.state.navs, actions.header]);

  const active = state.header.active;

  const handlePageChange = (current, prev) => {
    actions.header.setActive(current);
  };

  const handleScroll = (v) => {
    actions.header.setValue(v);
  };

  const handleNext = () => {
    if (active + 1 === ctx.state.navs.length) return;
    actions.header.setActive(active + 1);
  };

  const handlePrev = () => {
    if (active - 1 < 0) return;
    actions.header.setActive(active - 1);
  };

  console.log(active);

  const onScrollDown = (i) => {
    actions.header.setActive(i + 1);
  };

  const theme = state.header.current
    ? {
        scrollDownBorderColor: state.header.current.barColorPrimary,
        scrollDownHoverPointColor: state.header.current.colorPrimary,
      }
    : {};

  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Page
        {...ctx.state.theme}
        width={"100%"}
        height={"100%"}
        center
        direction={isMobile ? "vertical" : "horizontal"}
        defaultEffect="coverflow"
        onChangePage={handlePageChange}
        currentPage={active}
        dragEnabled={isMobile ? false : true}
      >
        {groups.map((g, i) => {
          const style = isMobile
            ? { visibility: active === i ? "visible" : "hidden" }
            : null;

          return (
            <Frame size="100%" key={i} style={style}>
              {React.cloneElement(g, {
                isActive: active === i,
                onScroll: handleScroll,
                onNext: handleNext,
                onPrev: handlePrev,
              })}
              {i + 1 < groups.length && (
                <ScrollDown onClick={() => onScrollDown(i)}></ScrollDown>
              )}
            </Frame>
          );
        })}
      </Page>
    </ThemeProvider>
  );
};

export default Home;
