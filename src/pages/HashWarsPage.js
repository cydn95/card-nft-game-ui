import React from "react";
import { useSelector } from "react-redux";
import { useWallet } from "use-wallet";
import { Tab, Nav } from "react-bootstrap";
import styled from "styled-components";

import UnlockWalletPage from "./UnlockWalletPage";
import SectionTitle from "../component/SectionTitle";
import FarmBoard from "../container/FarmBoard";
import LockFarmBoard from "../container/LockFarmBoard";

import { farms } from "../helper/contractFarm";
import { getValueFromObject } from "../helper/utils";

const HashWars = () => {
  // const dispatch = useDispatch();

  const approved = useSelector((state) => state.Farms.approved);
  const balance = useSelector((state) => state.Farms.balance);
  const staked = useSelector((state) => state.Farms.staked);
  const claimable = useSelector((state) => state.Farms.claimable);
  const stats = useSelector((state) => state.Farms.stats);

  const { account } = useWallet();
  if (!account) {
    return <UnlockWalletPage />;
  }

  return (
    <HashWarsPageContainer>
      <Tab.Container defaultActiveKey="ACTIVE">
        <Nav
          variant="pills"
          className="justify-content-center animation-fadeIn"
        >
          <Nav.Item>
            <Nav.Link eventKey="ACTIVE" className="nav-active">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="FINISHED" className="nav-finished">Finished</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="ACTIVE">
            <div
              className="d-flex flex-wrap justify-content-center animation-fadeInLeft"
            >
              {/* <img src={`/static/images/bg/pages/hash-wars/round.png`} alt="ndr" ><span>Round 1</span></img> */}
              <div className="round">
                Round 1
              </div>
            </div>
            <div
              className="d-flex flex-wrap justify-content-center animation-fadeInLeft"
            >
              <div className="d-flex hash-wars-round">
                <div className="time-left">
                  <p className="p2-text sky">Time left:</p>
                  <p className="p1-text yellow">5d - 2h - 1m</p>
                </div>
                <div className="prize-pool">
                  <p className="p2-text sky">Prize pool</p>
                  <p className="p1-text yellow">$10439</p>
                </div>
              </div>
            </div>
            <div className="hash-wars-round-detail">
              <div className="hash-wars-round-detail-bar">
                <div className="red-team-bar">60%</div>
                <div className="blue-team-bar">40%</div>
              </div>
              <progress max="100" value="60" className="css3">
                <div className="progress-bar"></div>
              </progress>
              <div className="hash-wars-round-detail-per-value">
                <div className="team-value d-flex">
                  <div className="team-value-detail">
                    <img src={`/static/images/icons/hash.png`} alt="hash" height="80"/>
                    <p className="p2-text sky">Hashes</p>
                    <p className="p1-text yellow">1200</p>
                  </div>
                  <div className="team-value-detail">
                    <img src={`/static/images/icons/strength.png`} alt="power" height="80"/>
                    <p className="p2-text sky">Power</p>
                    <p className="p1-text yellow">100</p>
                  </div>
                  <div className="team-value-detail">
                    <img src={`/static/images/icons/ndr.png`} alt="ndr" height="80"/>
                    <p className="p2-text sky">NDR</p>
                    <p className="p1-text yellow">100</p>
                  </div>
                </div>
                <div className="team-value">
                  <div className="team-value-detail">
                    <img src={`/static/images/icons/hash.png`} alt="hash" height="80"/>
                    <p className="p2-text sky">Hashes</p>
                    <p className="p1-text yellow">1200</p>
                  </div>
                  <div className="team-value-detail">
                    <img src={`/static/images/icons/strength.png`} alt="power" height="80"/>
                    <p className="p2-text sky">Power</p>
                    <p className="p1-text yellow">100</p>
                  </div>
                  <div className="team-value-detail">
                    <img src={`/static/images/icons/ndr.png`} alt="ndr" height="80"/>
                    <p className="p2-text sky">NDR</p>
                    <p className="p1-text yellow">100</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hash-wars-round-join">
              <div role="button" className="join-red p2-text yellow">Join RED</div>
              <div role="button" className="join-blue p2-text yellow">Join BLUE</div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="FINISHED">
            <div
              className="d-flex flex-wrap justify-content-center animation-fadeInLeft"
              style={{ paddingBottom: 100 }}
            >
              {Object.keys(farms).map(
                (key) =>
                  !farms[key].active && (
                    <FarmBoard
                      key={`farm-${key}`}
                      token={key}
                      farm={farms[key]}
                      approved={getValueFromObject(approved, key)}
                      balance={getValueFromObject(balance, key)}
                      staked={getValueFromObject(staked, key)}
                      claimable={getValueFromObject(claimable, key)}
                      stats={getValueFromObject(stats, key)}
                    />
                  )
              )}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </HashWarsPageContainer>
  );
};

const HashWarsPageContainer = styled.div`
  width: 100vw;
  max-width: 100%;

  .nav-pills {
    margin-top: 0px;
    margin-bottom: 86px;
  }
  .nav-pills .nav-item {
    width: 50%;
  }
  .nav-pills .nav-item .nav-link {
    font-size: 30px;
    padding: 0 1rem;
  }
  .nav-active {
    text-align: end;
  }
  .nav-finished {
    text-align: start;
  }

  .round {
    background-image: url("/static/images/bg/pages/hash-wars/round.png");
    background-size: 100% 100%;
    padding: 4px 40px;
    font-size: 26px;
    font-weight: 700;
  }

  .hash-wars-round {
    border: 3px solid #80f1ed;
    box-shadow: 0px 5px 3px #80f1ed80;
    max-width: 840px;
    width: calc(100% - 20px);

    .time-left {
      border-right: 2px solid #80f1ed;
      display: grid;
      width: 50%;
      text-align: center;
    }
    .prize-pool {
      border-left: 2px solid #80f1ed;
      display: grid;
      width: 50%;
      text-align: center;
    }

    &-join {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 132px;
      .join-red {
        background-image: url("/static/images/bg/red-button.png");
        background-size: 100% 100%;
        font-weight: 700;
        max-width: 447px;
        height: 66px;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .join-blue {
        background-image: url("/static/images/bg/blue-button.png");
        background-size: 100% 100%;
        font-weight: 700;
        max-width: 447px;
        height: 66px;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .team-value-detail {
    display: inline-grid;
    margin-left: 1rem;
    text-align: center;
  }
  .hash-wars-round-detail {
    &-bar {
      background-image: url("/static/images/bg/progress-bar.png");
      background-size: 100% 100%;
      width: 100%;
      max-width: 1139px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;

      .red-team-bar {
        background-color: #FA0046;
        width: 60%;
        height: calc(100% - 8px);
      }
      .blue-team-bar {
        background-color: #aaa;
        width: 40%;
        height: calc(100% - 8px);
      }
    }
    &-per-value {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 2rem;
    }
  }
  progress[value] {
    width: 500px;
    height: 50px;
    background-image: url("/static/images/bg/progress-bar.png");
    background-size: 100% 100%;
  }
  progress[value]::-webkit-progress-bar {
    
  }
`;

export default HashWars;
