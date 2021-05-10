import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useWallet } from "use-wallet";
import { Tab, Nav } from "react-bootstrap";
import styled from "styled-components";
import cn from "classnames";

import UnlockWalletPage from "./UnlockWalletPage";

import { finishedWars } from "../helper/dummy";

const HashWars = () => {
  const [redTeamHash, setRedTeamHash] = useState(60);

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
              <div className="hash-wars-round-detail-hash">
                {/* <div className="red-team-bar">60%</div>
                <div className="blue-team-bar">40%</div> */}
                <div className="hash-wars-round-detail-hash-title d-flex">
                  <p className="p1-text red" style={{ width: redTeamHash + '%' }}>RED</p>
                  <p className="p1-text blue" style={{ width: (100 - redTeamHash) + '%' }}>BLUE</p>
                </div>
                <div className="hash-wars-round-detail-bar">
                  <progress max="100" value={redTeamHash} className="css3">
                    <div className="progress-bar">{redTeamHash} %</div>
                  </progress>
                </div>
              </div>
              <div className="hash-wars-round-detail-per-value">
                <div className="team-value">
                  <div className="team-value-detail">
                    <img className="margin-auto" src={`/static/images/icons/hash.png`} alt="hash" height="80"/>
                    <p className="p2-text sky">Hashes</p>
                    <p className="p1-text yellow">1200</p>
                  </div>
                  <div className="team-value-detail">
                    <img className="margin-auto" src={`/static/images/icons/strength.png`} alt="power" height="80"/>
                    <p className="p2-text sky">Power</p>
                    <p className="p1-text yellow">100</p>
                  </div>
                  <div className="team-value-detail">
                    <img className="margin-auto" src={`/static/images/icons/ndr.png`} alt="ndr" height="80"/>
                    <p className="p2-text sky">NDR</p>
                    <p className="p1-text yellow">100</p>
                  </div>
                </div>
                <div className="team-value">
                  <div className="team-value-detail">
                    <img className="margin-auto" src={`/static/images/icons/hash.png`} alt="hash" height="80"/>
                    <p className="p2-text sky">Hashes</p>
                    <p className="p1-text yellow">1200</p>
                  </div>
                  <div className="team-value-detail">
                    <img className="margin-auto" src={`/static/images/icons/strength.png`} alt="power" height="80"/>
                    <p className="p2-text sky">Power</p>
                    <p className="p1-text yellow">100</p>
                  </div>
                  <div className="team-value-detail">
                    <img className="margin-auto" src={`/static/images/icons/ndr.png`} alt="ndr" height="80"/>
                    <p className="p2-text sky">NDR</p>
                    <p className="p1-text yellow">100</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hash-wars-round-join">
              <div role="button" className="join-red p1-text yellow">Join RED</div>
              <div role="button" className="join-blue p1-text yellow">Join BLUE</div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="FINISHED">
            <div
              className="animation-fadeInLeft"
              style={{ paddingBottom: 100 }}
            >
              {finishedWars.map((key) => (
                <div className="finished" key={key.id}>
                  <div className={cn("finished-hash-wars", key.win ==='RED'?"finished-hash-wars--red":"finished-hash-wars--blue", "d-flex", "flex-wrap")}>
                    <div className="red-team" style={{ width: '40%' }}>
                      <p className="p2-text sky">{key.win === 'RED' ? 'Win' : 'Lose'}</p>
                      <p className="p1-text red">RED {key.redValue}</p>
                    </div>
                    <p className="p2-text-bold yellow" style={{ width: '20%', maxWidth: '170px' }}>{key.id}</p>
                    <div className="blue-team" style={{ width: '40%' }}>
                      <p className="p2-text sky">{key.win === 'BLUE' ? 'Win' : 'Lose'}</p>
                      <p className="p1-text blue">BLUE {key.blueValue}</p>
                    </div>
                  </div>
                  <div className="open-button d-flex flex-wrap">
                    <div role="button" className="open-button-red p2-text-bold yellow">Open Red</div>
                    <div className="space-temp"></div>
                    <div role="button" className="open-button-blue p2-text-bold yellow">Open Blue</div>
                  </div>
                </div>
              ))}
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
    font-family: Orbitron-Bold;
    font-size: 26px;
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
    &-hash {
      width: 100%;
      max-width: 1139px;
      height: 52px;
      margin: auto;
      &-title {
        margin-top: 140px;
      }
    }
    &-bar {
      // background-image: url("/static/images/bg/progress-bar.png");
      // background-size: 100% 100%;
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
      justify-content: space-between;
      margin-top: 2rem;
      width: 100%;
      max-width: 1139px;
      margin-right: auto;
      margin-left: auto;
    }
  }
  progress[value] {
    width: 100%;
    height: 50px;
    color: #00A6F5;
  }

  .margin-auto {
    margin: auto;
  }

  .finished {
    margin-bottom: 35px;
    .finished-hash-wars {
      align-items: center;
      width: calc(100% - 4rem);
      max-width: 1160px;
      margin: auto;
      margin-bottom: 0.5rem;
      justify-content: space-evenly;
      &--red {
        border: 4px solid #FA0046;
        background-color: #3E0011;
      }
      &--blue {
        border: 4px solid #0287F0;
        background-color: #003156;
      }
    }
    .open-button {
      justify-content: space-evenly;
      width: calc(100% - 4rem);
      max-width: 1160px;
      margin: auto;
      &-red {
        background-image: url("/static/images/bg/red-button.png");
        background-size: 100% 100%;
        width: 40%;
        max-width: 341px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .space-temp {
        max-width: 170px;
        width: 20%;
      }
      &-blue {
        background-image: url("/static/images/bg/blue-button.png");
        background-size: 100% 100%;
        padding: 2px 24px;
        width: 40%;
        max-width: 341px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

export default HashWars;
