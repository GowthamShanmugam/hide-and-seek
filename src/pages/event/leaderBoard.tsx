import * as React from "react";
import { Flex, FlexItem } from "@patternfly/react-core";
import { TopologySideBar } from "@patternfly/react-topology";
import "./leaderBoard.scss";

const LeaderBoard: React.FC<LeaderBoardProps> = (props) => {
  const { show } = props;

  return (
    <TopologySideBar
      show={show}
      className="leaderboard-background"
      header={
        <Flex className="leaderboard-player-header leaderboard-container">
          <FlexItem className="leaderboard-header1-font">10 Players</FlexItem>
          <FlexItem className="leaderboard-header2-font">
            Hide And Seek
          </FlexItem>
        </Flex>
      }
    >
      <Flex
        direction={{ default: "column" }}
        spaceItems={{ default: "spaceItemsXl" }}
        className="leaderboard-container"
      >
        {[...Array(10)].map((e, i) => (
          <Flex className="leaderboard-player" spaceItems={{ default: "spaceItemsXl" }}>
            <Flex>
              <FlexItem className="leaderboard_icon">
                <img src={`./img/avatar${i + 1}.png`} />
              </FlexItem>
            </Flex>
            <Flex
              className="leaderboard-font"
              direction={{ default: "column" }}
              spaceItems={{ default: "spaceItemsXs" }}
            >
              <FlexItem>Gowtham (You)</FlexItem>
              <FlexItem>100</FlexItem>
              <FlexItem>Seeking Spot</FlexItem>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </TopologySideBar>
  );
};

type LeaderBoardProps = {
  show: boolean;
  onClose: () => void;
};

export default LeaderBoard;
