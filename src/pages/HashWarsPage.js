import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import { Tab, Nav } from "react-bootstrap";
import styled from "styled-components";
import cn from "classnames";
import { ArrowBack } from "@material-ui/icons";
import Countdown from "react-countdown";
import { toast } from "react-toastify";

import UnlockWalletPage from "./UnlockWalletPage";
import SectionTitle from "../component/SectionTitle";
import { finishedWars } from "../helper/dummy";
import { timeFormatBlockTime } from "../helper/utils";
import { activeHashWars, finishedHashWars } from "../helper/contractBattle";
import { RESPONSE } from "../helper/constant";
import hashWarsAction from "../redux/hashWars/actions";
import "../vendor/index.scss";

const HashWars = () => {
  const { account } = useWallet();
  const endDate = useSelector((state) => state.HashWars.endDate);
  // teamId = "0": not join any team, teamId = "1": RED team, teamId = "2": BLUE team
  const teamId = useSelector((state) => state.HashWars.teamId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hashWarsAction.getBattleStartDateStatus("endDate"));
    dispatch(hashWarsAction.getTeamIdPerUserStatus());
  }, [dispatch]);

  const [redTeamHash, setRedTeamHash] = useState(60);
  const [myTeam, setMyTeam] = useState(null);
  const [openTeam, setOpenTeam] = useState(null);
  const [openRound, setOpenRound] = useState(null);
  const [selectTeamId, setSelectTeamId] = useState("0");
  const [selectTeamLoading, setSelectTeamLoading] = useState(false);

  const handleOpenTeam = (team, round) => {
    setOpenTeam(team);
    setOpenRound(round);
  }

  const handleResetOpenTeam = () => {
    setOpenTeam(null);
    setOpenRound(null);
  }

  const handleSelectTeam = (teamId) => {
    if (selectTeamLoading) {
      return;
    }
    setSelectTeamLoading(true);
    setSelectTeamId(teamId);
    dispatch(
      hashWarsAction.selectTeam(teamId, (status) => {
        setMyTeam('RED');
        setSelectTeamLoading(false);
        if (status === RESPONSE.SUCCESS) {
          toast.success("Success");
        } else {
          toast.error("Failed...");
        }
      })
    );
  };

  if (!account) {
    return <UnlockWalletPage />;
  }

  // Random component
  const Completionist = () => <span>The Battle ended!</span>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span>{days}d - {hours}h - {minutes < 10 ? '0'+minutes : minutes}m - {seconds < 10 ? '0'+seconds : seconds}s</span>;
    }
  };

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
                  Round {activeHashWars.round}
                </p>
              </div>
              <div className="d-flex flex-wrap justify-content-center animation-fadeInRight">
                <div className="d-flex hash-wars-round">
                  <div className="time-left">
                    <p className="p2-text sky">Time left:</p>
                    <p className="p1-text yellow"><Countdown date={timeFormatBlockTime(endDate)} renderer={renderer}/></p>
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
              {teamId === "0" && <div className="hash-wars-round-join animation-fadeIn">
                {selectTeamLoading && selectTeamId === "1" ? (
                  <div role="button" className="join-red p1-text yellow">
                    <div className="loading-wrapper">
                      <img
                        src="/static/images/icons/loading.gif"
                        height="25"
                        alt=""
                        style={{ marginTop: 3, marginRight: 5 }}
                      />{" "}
                      Joining...
                    </div>
                  </div>
                ) : (
                  <div role="button" className="join-red p1-text yellow" onClick={(e) => !selectTeamLoading && handleSelectTeam("1")}>Join RED</div>
                )}
                {selectTeamLoading && selectTeamId === "2" ? (
                  <div role="button" className="join-blue p1-text yellow">
                    <div className="loading-wrapper">
                      <img
                        src="/static/images/icons/loading.gif"
                        height="25"
                        alt=""
                        style={{ marginTop: 3, marginRight: 5 }}
                      />{" "}
                      Joining...
                    </div>
                  </div>
                ) : (
                  <div role="button" className="join-blue p1-text yellow" onClick={(e) => !selectTeamLoading && handleSelectTeam("2")}>Join BLUE</div>
                )}
              </div>
              }
              {teamId === "1" && <div className="hash-wars-round-join animation-fadeIn">
                <div role="button" className="join-red p1-text yellow" onClick={() => setMyTeam('RED')}>Open RED</div>
              </div>}
              {teamId === "2" && <div className="hash-wars-round-join animation-fadeIn">
                <div role="button" className="join-blue p1-text yellow" onClick={() => setMyTeam('BLUE')}>Open BLUE</div>
              </div>}
            </div>}
            {myTeam !== null && <div className="my-round">
              <div className="flex-center my-round-header">
                <div className="flex-center" role="button" onClick={() => setMyTeam(null)} style={{ zIndex: 1, width: 0}}>
                  <ArrowBack style={{ color: '#80F1ED', fontSize: '30'}}/>
                  <p className="p2-text sky">Back</p>
                </div>
                <p className={cn("p1-text", myTeam === 'RED' ? "red" : "blue", "my-round-header-title")}>{myTeam} Team</p>
              </div>
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
              <div>
                <SectionTitle title="Select cards to stake" long />
                <SectionTitle title="Get more power" long />
              </div>
            </div>
            }
          </Tab.Pane>
          <Tab.Pane eventKey="FINISHED">
            {openTeam === null && <div
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
                    <div role="button" className="open-button-red p2-text-bold yellow" onClick={() => handleOpenTeam('RED', key.id)}>Open Red</div>
                    <div className="space-temp"></div>
                    <div role="button" className="open-button-blue p2-text-bold yellow" onClick={() => handleOpenTeam('BLUE', key.id)}>Open Blue</div>
                  </div>
                </div>
              ))}
            </div>}
            {openTeam !== null && <div className="my-round">
              <div className="flex-center my-round-header">
                <div className="flex-center" role="button" onClick={() => handleResetOpenTeam()} style={{ zIndex: 1, width: 0}}>
                  <ArrowBack style={{ color: '#80F1ED', fontSize: '30'}}/>
                  <p className="p2-text sky">Back</p>
                </div>
                <p className={cn("p1-text", openTeam === 'RED' ? "red" : "blue", "my-round-header-title")}>Open {openTeam}</p>
              </div>
              <div className="my-round-detail">
                <div className="my-round-detail-team">
                  <div className="flex-center">
                    <p className={cn("team-round", openTeam === 'RED' ? "team-round--red" : "team-round--blue", "p2-text-bold", "yellow" )}>{openRound}</p>
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
                <div role="button" className="stake-button stake-button--pink p1-text yellow">Unstake All</div>
              </div>
              <div className="">
                <SectionTitle title="Select cards to stake" long />
              </div>
            </div>}
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
      &:nth-child(n+2) {
        margin-left: 1rem;
      }
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
    &-header {
      padding-left: 1rem;
      &-title {
        width: calc(100% - 1rem);
      }
      @media screen and (min-width: 1320px) {
        padding-left: 2rem;
        &-title {
          width: calc(100% - 2rem);
        }
      }
      @media screen and (min-width: 1440px) {
        padding-left: 4rem;
        &-title {
          width: calc(100% - 4rem);
        }
      }
    }
    &-detail {
      margin: auto;
      padding: 1rem;
      @media screen and (min-width: 769px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
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
        @media screen and (min-width: 769px) {
          margin-right: 2rem;
          margin-bottom: 0;
        }
        margin-bottom: 1rem;
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
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
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
