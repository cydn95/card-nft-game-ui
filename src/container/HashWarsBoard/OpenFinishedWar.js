import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import cn from "classnames";
import { ArrowBack } from "@material-ui/icons";

import Loading from "../../component/Loading";
import SectionTitle from "../../component/SectionTitle";
import LoadingTextIcon from "../../component/LoadingTextIcon";
import finishWarsAction from "../../redux/finishedWars/actions";
import nftStakingActions from "../../redux/nftStaking/actions";
import cardsActions from "../../redux/cards/actions";
import farmsAction from "../../redux/farms/actions";
import { CARD_SERIES, RESPONSE } from "../../helper/constant";

import NFTStakingModal from "../NFTStakingModal";
import NDRStakingModal from "../NDRStakingModal";

import { convertFromWei, getValueFromObject } from "../../helper/utils";
import "../../vendor/index.scss";

const OpenFinishedWar = ({
  handleResetOpenTeam,
  openTeam,
  openRound
}) => {
  const finishTotalHashPerTeam1 = useSelector((state) => state.FinishedWars.finishTotalHashPerTeam1);
  const finishTotalHashPerTeam2 = useSelector((state) => state.FinishedWars.finishTotalHashPerTeam2);
  const finishTotalHashPerUser = useSelector((state) => state.FinishedWars.finishTotalHashPerUser);
  const finishTotalPowerPerTeam = useSelector((state) => state.FinishedWars.finishTotalPowerPerTeam);
  const finishTotalPowerPerUser = useSelector((state) => state.FinishedWars.finishTotalPowerPerUser);
  const finishTotalNDRPerTeam = useSelector((state) => state.FinishedWars.finishTotalNDRPerTeam);
  const finishTotalNDRPerUser = useSelector((state) => state.FinishedWars.finishTotalNDRPerUser);
  const finishTeamPlayersCount = useSelector((state) => state.FinishedWars.finishTeamPlayersCount);

  const [UnstakeLoading, setUnstakeLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(finishWarsAction.getFinishTotalHashPerUserStatus(openRound));
    dispatch(finishWarsAction.getFinishTotalPowerPerTeamStatus(openRound, openTeam));
    dispatch(finishWarsAction.getFinishTotalPowerPerUserStatus(openRound));
    dispatch(finishWarsAction.getFinishTotalNDRPerTeamStatus(openRound, openTeam));
    dispatch(finishWarsAction.getFinishTotalNDRPerUserStatus(openRound));
    dispatch(finishWarsAction.getFinishTeamPlayersCountStatus(openRound, openTeam));
  }, [dispatch, openRound, openTeam]);

  const handleUnstake = () => {
    if (UnstakeLoading) return;
    setUnstakeLoading(true);
    dispatch(
      finishWarsAction.unstakeAll(openRound, (status) => {
        setUnstakeLoading(false);
        if (status === RESPONSE.SUCCESS) {
          toast.success("Unstaked successfully");
          dispatch(finishWarsAction.getFinishTotalNDRPerUserStatus(openRound));
          dispatch(finishWarsAction.getFinishTotalPowerPerUserStatus(openRound));
        } else {
          toast.error("Unstake failed");
        }
      })
    );
  }

  return (
    <OpenFinishedWarContainer>
      <div className="my-round">
        <div className="flex-center my-round-header">
          <div className="flex-center" role="button" onClick={() => handleResetOpenTeam()} style={{ zIndex: 1, width: 0}}>
            <ArrowBack style={{ color: '#80F1ED', fontSize: '30'}}/>
            <p className="p2-text sky">Back</p>
          </div>
          <p className={cn("p1-text", openTeam === '1' ? "red" : "blue", "my-round-header-title")}>{openTeam === '1' ? "RED" : "BLUE"} Team</p>
        </div>
        <div className="my-round-detail">
          <div className="my-round-detail-team">
            <div className="flex-center">
              <p className={cn("team-round", openTeam === '1' ? "team-round--red" : "team-round--blue", "p2-text-bold", "yellow" )}>Team Stats</p>
              <a className="p3-text sky">Join Team chat</a>
            </div>
            <div className="detail-board">
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/hash.png`} alt="hash" height="80"/>
                <p className="p2-text sky">Hashes</p>
                <p className="p1-text yellow">{openTeam === '1' ? finishTotalHashPerTeam1[openRound - 1] !== '0' ?convertFromWei(finishTotalHashPerTeam1[openRound - 1] * 1000, 2) : '0' : finishTotalHashPerTeam2[openRound - 1] !== '0' ? convertFromWei(finishTotalHashPerTeam2[openRound - 1] * 1000, 2) : '0'}</p>
              </div>
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/strength.png`} alt="power" height="80"/>
                <p className="p2-text sky">Power</p>
                <p className="p1-text yellow">{finishTotalPowerPerTeam ? finishTotalPowerPerTeam/100 : '0'}</p>
              </div>
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/ndr.png`} alt="ndr" height="80"/>
                <p className="p2-text sky">NDR</p>
                <p className="p1-text yellow">{finishTotalNDRPerTeam ? finishTotalNDRPerTeam !== '0' ? convertFromWei(finishTotalNDRPerTeam, 2) : '0' : '0'}</p>
              </div>
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/players.png`} alt="players" height="80"/>
                <p className="p2-text sky">Players</p>
                <p className="p1-text yellow">{finishTeamPlayersCount ? finishTeamPlayersCount : '0'}</p>
              </div>
            </div>
          </div>
          <div className="my-round-detail-my-stats">
            <div>
              <p className="team-round team-round--sky p2-text-bold">My Stats</p>
            </div>
            <div className="detail-board">
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/hash.png`} alt="hash" height="80"/>
                <p className="p2-text sky">Hashes</p>
                <p className="p1-text yellow">{(finishTotalHashPerUser && finishTotalHashPerUser !== '0') ? convertFromWei((finishTotalHashPerUser * 1000), 2) : '0'}</p>
              </div>
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/strength.png`} alt="power" height="80"/>
                <p className="p2-text sky">Power</p>
                <p className="p1-text yellow">{finishTotalPowerPerUser ? finishTotalPowerPerUser/100 : '0'}</p>
              </div>
              <div className="team-value-detail">
                <img className="margin-auto" src={`/static/images/icons/ndr.png`} alt="ndr" height="80"/>
                <p className="p2-text sky">NDR</p>
                <p className="p1-text yellow">{finishTotalNDRPerUser ? finishTotalNDRPerUser !== '0' ? convertFromWei(finishTotalNDRPerUser, 2) : '0' : '0'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hash-wars-round-join animation-fadeIn">
          <div
              role="button"
              className="stake-button stake-button--pink p1-text yellow"
              onClick={(e) => handleUnstake(e)}
            >
              {UnstakeLoading ? (
                <LoadingTextIcon loadingText="Unstaking..." />
              ) : (
                `Unstake All`
              )}
            </div>
        </div>
        <div className="">
          <SectionTitle title="Staked NFT" long />
        </div>
      </div>
    </OpenFinishedWarContainer>
  );
};

const OpenFinishedWarContainer = styled.div`
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
      margin-bottom: 20px;
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
`;

export default OpenFinishedWar;
