import * as React from "react";
import ImageMapper from "react-img-mapper";
import { CustomArea, AreaEvent, ImageEvent } from "react-img-mapper";
import { data } from "./coords";
import "./map.scss";

const Map: React.FC = () => {
  const URL = "./img/blr_office.png";
  const MAP = {
    name: "my-map",
    areas: data,
  };
  const [state, setState] = React.useState<{
    hoveredArea: CustomArea | null;
    msg: string | null;
    moveMsg: string | null;
  }>({ hoveredArea: null, msg: null, moveMsg: null });

  const enterArea = (area: CustomArea) => {
    setState((prevState) => ({ ...prevState, hoveredArea: area }));
  };

  const leaveArea = (area: CustomArea) => {
    setState((prevState) => ({ ...prevState, hoveredArea: null }));
  };

  const load = () => {
    setState((prevState) => ({ ...prevState, msg: "Interact with image !" }));
  };

  const getTipPosition = (area: CustomArea) => {
    return { top: `${area.center?.[1]}px`, left: `${area.center?.[0]}px` };
  };

  const clicked = (area: CustomArea) => {
    setState((prevState) => ({
      ...prevState,
      msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
        area.coords
      )} !`,
    }));
  };
  const moveOnArea = (area: CustomArea, evt: AreaEvent) => {
    const coords = {
      x: evt.nativeEvent.movementX,
      y: evt.nativeEvent.movementY,
    };
    setState((prevState) => ({
      ...prevState,
      moveMsg: `You moved on ${area.shape} ${
        area.coords
      } at coords ${JSON.stringify(coords)} !`,
    }));
  };

  const clickedOutside = (evt: ImageEvent) => {
    const coords = { x: evt.nativeEvent.x, y: evt.nativeEvent.y };
    setState((prevState) => ({
      ...prevState,
      msg: `You clicked on the image at coords ${JSON.stringify(coords)} !`,
    }));
  };
  const moveOnImage = (evt: ImageEvent) => {
    const coords = { x: evt.nativeEvent.x, y: evt.nativeEvent.y };
    setState((prevState) => ({
      ...prevState,
      moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`,
    }));
  };

  return (
    <div className="container container-background navbar">
      <ImageMapper
        src={URL}
        map={MAP}
        width={1000}
        onLoad={() => load()}
        onClick={(area) => clicked(area)}
        onMouseEnter={(area) => enterArea(area)}
        onMouseLeave={(area) => leaveArea(area)}
        onMouseMove={(area, _, evt) => moveOnArea(area, evt)}
        onImageClick={(evt) => clickedOutside(evt)}
        onImageMouseMove={(evt) => moveOnImage(evt)}
      />
      {state.hoveredArea && (
        <span
          className="tooltip"
          style={{ ...getTipPosition(state.hoveredArea) }}
        >
          {state.hoveredArea && state.hoveredArea.id}
        </span>
      )}
    </div>
  );
};

export default Map;
