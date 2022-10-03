import * as React from "react";
import { TopologyView } from "@patternfly/react-topology";
import Map from "../map/map";
import LeaderBoard from "./leaderBoard";
import Controller from './controller';
import "./event.scss";

const Event: React.FC = () => {
  const [state, setState] = React.useState({ detailsShown: true });
  const { detailsShown } = state;
  const sideBar = (
    <LeaderBoard
      show={detailsShown}
      onClose={() => {
        setState({ detailsShown: false });
      }}
    />
  );

  return (
    <div className="event-topology">
      <TopologyView controlBar={<Controller />} sideBar={sideBar} sideBarOpen={true}>
        <Map />
      </TopologyView>
    </div>
  );
};

export default Event;
