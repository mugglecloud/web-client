import React from "react";
import { useOvermind } from "@mugglecloud/web-runtime";

import ParagraphList from "components/ParagraphList";
import Wheel from "components/Wheel";

const WheelParagraph = ({ paragraphs, threshold = 5 }) => {
  const { state, actions } = useOvermind();
  const step = 100 / paragraphs.length;
  const defaultOffset = Math.round(state.header.value / step) || 0;

  const handleWheel = ({ event, id }) => {
    const v = defaultOffset + event.deltaY;
    actions.header.setValue(v * step);
    console.log(id, event.deltaY, defaultOffset, v, v * step);
    return false;
  };

  return (
    <Wheel onWheel={handleWheel}>
      <ParagraphList
        paragraphs={paragraphs}
        duration={2000}
        defaultOffset={defaultOffset}
      />
    </Wheel>
  );
};

export default WheelParagraph;
