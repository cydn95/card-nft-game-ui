import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Countdown from "react-countdown";
import { toast } from "react-toastify";

import { timeFormatBlockTime } from "../../helper/utils";
import { activeHashWars } from "../../helper/contractBattle";
import { RESPONSE } from "../../helper/constant";
import hashWarsAction from "../../redux/hashWars/actions";
import "../../vendor/index.scss";

const ActiveTeam = ({
  teamId,
  totalHashPerTeam1,
  totalHashPerTeam2,
  setMyTeam
}) => {
  const endDate = useSelector((state) => state.HashWars.endDate);
  const totalPowerPerTeam1 = useSelector((state) => state.HashWars.totalPowerPerTeam1);
  const totalPowerPerTeam2 = useSelector((state) => state.HashWars.totalPowerPerTeam2);
  const totalNDRPerTeam1 = useSelector((state) => state.HashWars.totalNDRPerTeam1);
  const totalNDRPerTeam2 = useSelector((state) => state.HashWars.totalNDRPerTeam2);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hashWarsAction.getBattleStartDateStatus("endDate"));
    dispatch(hashWarsAction.getTotalPowerPerTeamStatus());
    dispatch(hashWarsAction.getTotalNDRPerTeamStatus());
  }, [dispatch]);

  const [selectTeamId, setSelectTeamId] = useState("0");
  const [selectTeamLoading, setSelectTeamLoading] = useState(false);
  const [redTeamHash, setRedTeamHash] = useState(60);

  const init = (teamId) => {
    dispatch(hashWarsAction.getTeamIdPerUserStatus());
    dispatch(hashWarsAction.getDayHashPerTeamStatus(teamId));
    dispatch(hashWarsAction.getTotalHashPerUserStatus());
    dispatch(hashWarsAction.getDayHashPerUserStatus());
    dispatch(hashWarsAction.getTotalPowerPerTeamStatus());
    dispatch(hashWarsAction.getTotalPowerPerUserStatus());
    dispatch(hashWarsAction.getTotalNDRPerTeamStatus());
    dispatch(hashWarsAction.getTotalNDRPerUserStatus());
    dispatch(hashWarsAction.getTeamPlayersCountStatus(teamId));
  };

  const handleSelectTeam = (teamId) => {
    if (selectTeamLoading) {
      return;
    }
    setSelectTeamLoading(true);
    setSelectTeamId(teamId);
    dispatch(
      hashWarsAction.selectTeam(teamId, (status) => {
        setSelectTeamLoading(false);
        if (status === RESPONSE.SUCCESS) {
          init(teamId);
          setMyTeam(teamId);
          toast.success("Success");
        } else {
          toast.error("Failed...");
        }
      })
    );
  };

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
    <ActiveTeamContainer>
      <div>
        <div className="d-flex flex-wrap justify-content-center animation-fadeInRight">
          <p className="round p2-text-bold yellow">
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
                <p className="p1-text yellow">{(totalHashPerTeam1 && totalHashPerTeam1.length > 0) ? totalHashPerTeam1 : 0}</p>
              </div>
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/strength.png`} alt="power" height="80"/>
                <p className="p2-text sky">Power</p>
                <p className="p1-text yellow">{totalPowerPerTeam1}</p>
              </div>
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/ndr.png`} alt="ndr" height="80"/>
                <p className="p2-text sky">NDR</p>
                <p className="p1-text yellow">{totalNDRPerTeam1}</p>
              </div>
            </div>
            <div className="team-value">
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/hash.png`} alt="hash" height="80"/>
                <p className="p2-text sky">Hashes</p>
                <p className="p1-text yellow">{(totalHashPerTeam2 && totalHashPerTeam2.length > 0) ? totalHashPerTeam2 : 0}</p>
              </div>
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/strength.png`} alt="power" height="80"/>
                <p className="p2-text sky">Power</p>
                <p className="p1-text yellow">{totalPowerPerTeam2}</p>
              </div>
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/ndr.png`} alt="ndr" height="80"/>
                <p className="p2-text sky">NDR</p>
                <p className="p1-text yellow">{totalNDRPerTeam2}</p>
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
          <div role="button" className="join-red p1-text yellow" onClick={() => setMyTeam('1')}>Open RED</div>
        </div>}
        {teamId === "2" && <div className="hash-wars-round-join animation-fadeIn">
          <div role="button" className="join-blue p1-text yellow" onClick={() => setMyTeam('2')}>Open BLUE</div>
        </div>}
      </div>
    </ActiveTeamContainer>
  );
};

const ActiveTeamContainer = styled.div`
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

export default ActiveTeam;
