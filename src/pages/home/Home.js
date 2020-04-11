import React, { useEffect } from "react";
import { useOvermind, useStore } from "@mugglecloud/web-runtime";
import { Page, Frame } from "framer";

import Intro from "./Introduction";
import ImageVideo from "./ImageVideo";
import CanvasImage from "./CanvasImage";
// import More from "./More";
import Why from "./Why";

const groups = [<Intro />, <ImageVideo />, <CanvasImage />, <Why />];

const Home = () => {
  const ctx = useStore();
  const { state, actions } = useOvermind();

  useEffect(() => {
    actions.header.init({ navs: ctx.state.navs });
  }, [ctx.state.navs, actions.header]);

  const active = state.header.active;

  return (
    <Page
      {...ctx.state.theme}
      width={"100%"}
      height={"100%"}
      center
      direction="horizontal"
      defaultEffect={"coverflow"}
      onChangePage={(current, previous) => {
        actions.header.setActive(current);
      }}
      currentPage={active}
    >
      {groups.map((g, i) => {
        return (
          <Frame size="100%" key={i}>
            {React.cloneElement(g, { isActive: active === i })}
          </Frame>
        );
      })}
    </Page>
  );
};

export default Home;
