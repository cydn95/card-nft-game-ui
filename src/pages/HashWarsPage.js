import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useWallet } from "use-wallet";
import { Tab, Nav } from "react-bootstrap";
import styled from "styled-components";
import cn from "classnames";

import UnlockWalletPage from "./UnlockWalletPage";
import SectionTitle from "../component/SectionTitle";
import { finishedWars } from "../helper/dummy";

const HashWars = () => {
  const [redTeamHash, setRedTeamHash] = useState(60);
  const [myTeam, setMyTeam] = useState('RED');

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
            {myTeam === null && <div>
              <div className="d-flex flex-wrap justify-content-center animation-fadeInRight">
                <p className="round p2-text-bold">
                  Round 1
                </p>
              </div>
              <div className="d-flex flex-wrap justify-content-center animation-fadeInRight">
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
              <div className="hash-wars-round-detail animation-fadeInLeft">
                <div className="hash-wars-round-detail-hash">
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
              <div className="hash-wars-round-join animation-fadeIn">
                <div role="button" className="join-red p1-text yellow" onClick={() => setMyTeam('RED')}>Join RED</div>
                <div role="button" className="join-blue p1-text yellow" onClick={() => setMyTeam('BLUE')}>Join BLUE</div>
              </div>
            </div>}
            {myTeam !== null && <div className="my-round">
              <p className={cn("p1-text", myTeam === 'RED' ? "red" : "blue")}>{myTeam}</p>
              <div className="my-round-detail">
                <div className="my-round-detail-team">
                  <div className="flex-center">
                    <p className={cn("team-round", myTeam === 'RED' ? "team-round--red" : "team-round--blue", "p2-text-bold", "yellow" )}>Round 1</p>
                    <a className="p3-text sky">Join Team chat</a>
                  </div>
                  <div className="detail-board">
                    <div className="team-value-detail">
                      <img className="margin-auto" src={`/static/images/icons/hash-day.png`} alt="hash-day" height="80"/>
                      <p className="p2-text sky">Hashes/Day</p>
                      <p className="p1-text yellow">1200</p>
                    </div>
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
                    <div className="team-value-detail">
                      <img className="margin-auto" src={`/static/images/icons/players.png`} alt="players" height="80"/>
                      <p className="p2-text sky">Players</p>
                      <p className="p1-text yellow">120</p>
                    </div>
                  </div>
                </div>
                <div className="my-round-detail-my-stats">
                  <div>
                    <p className="team-round team-round--sky p2-text-bold yellow">My Stats</p>
                  </div>
                  <div className="detail-board">
                    <div className="team-value-detail">
                      <img className="margin-auto" src={`/static/images/icons/hash-day.png`} alt="hash-day" height="80"/>
                      <p className="p2-text sky">Hashes/Day</p>
                      <p className="p1-text yellow">1200</p>
                    </div>
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
              <div className="hash-wars-round-join animation-fadeIn">
                <div role="button" className="stake-button stake-button--pink p1-text yellow">Stake NFT</div>
                <div role="button" className="stake-button stake-button--sky p1-text">Stake NDR</div>
              </div>
              <div className="">
                <SectionTitle title="Select cards to stake" long />
                <SectionTitle title="Get more power" long />
              </div>
            </div>
            }
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
    margin-bottom: 40px;
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
      margin: auto;
      margin-top: 40px;
      width: calc(100% - 20px);
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
  .team-value {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &-detail {
      display: inline-grid;
      margin-left: 1rem;
      text-align: center;
    }
  }

  .hash-wars-round-detail {
    margin-top: 60px;
    &-hash {
      width: calc(100% - 20px);
      max-width: 1139px;
      height: 52px;
      margin: auto;
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
      justify-content: space-around;
      margin-top: 2rem;
      width: calc(100% - 20px);
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

  .my-round {
    &-detail {
      display: flex;
      margin: auto;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      .team-round {
        background-size: 100% 100%;
        width: 207px;
        height: 47px;
        display: flex;
        justify-content: center;
        align-items: center;
        &--red {
          background-image: url("/static/images/bg/pages/hash-wars/round-red.png");
        }
        &--blue {
          background-image: url("/static/images/bg/pages/hash-wars/round-blue.png");
        }
        &--sky {
          background-image: url("/static/images/bg/pages/hash-wars/round.png");
        }
      }
      &-team {
        margin-right: 2rem;
        a {
          text-decoration: underline;
          margin-top: 4px;
          margin-left: 2rem;
        }
      }
      &-my-stats {

      }
      .detail-board {
        border: 3px solid #80f1ed;
        box-shadow: 0px 5px 3px #80f1ed80;
        padding: 1rem;
      }
    }
    .stake-button {
      background-size: 100% 100%;
      max-width: 364px;
      height: 84px;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      &--pink {
        background-image: url("/static/images/bg/pink-button.png");
      }
      &--sky {
        background-image: url("/static/images/bg/sky-button.png");
      }
    }
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
