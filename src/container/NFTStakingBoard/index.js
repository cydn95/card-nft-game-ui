import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { toast } from "react-toastify";

import { convertFromWei } from "../../helper/utils";
import cardsActions from "../../redux/cards/actions";
import lpstakingActions from "../../redux/lpstaking/actions";

const NFTStakingBoard = () => {
  const dispatch = useDispatch();

  const [unStakeAllLoading, setUnStakeAllLoading] = useState(false);
  const [claimNDRLoading, setClaimNDRLoading] = useState(false);

  const myStakedStrength = useSelector((state) => state.Cards.myStakedStrength);
  const totalStakedStrength = useSelector(
    (state) => state.Cards.totalStakedStrength
  );
  const claimableNDR = useSelector((state) => state.Cards.claimableNDR);
  const ndrPerDay = useSelector((state) => state.Cards.ndrPerDay);

  const init = useCallback(() => {
    dispatch(cardsActions.getMyStakedStrength());
    dispatch(cardsActions.getTotalStakedStrength());
    dispatch(cardsActions.getClaimableNDR());
    dispatch(cardsActions.getNDRPerDay());
  }, [dispatch]);

  // Timer to get <NDR Per Day>
  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      dispatch(cardsActions.getClaimableNDR());
      dispatch(cardsActions.getNDRPerDay());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  const handleUnStakeAll = () => {
    setUnStakeAllLoading(true);
    dispatch(
      cardsActions.unStakeAllCards((status) => {
        setUnStakeAllLoading(false);
        if (status) {
          toast.success("Sucess");
          dispatch(cardsActions.getCards());
          dispatch(cardsActions.getStakedCards());
          dispatch(cardsActions.getMyStakedStrength());
          dispatch(cardsActions.getTotalStakedStrength());
          dispatch(cardsActions.getClaimableNDR());
        } else {
          toast.error("Failed...");
        }
      })
    );
  };

  const handleClaimNDR = () => {
    setClaimNDRLoading(true);
    dispatch(
      cardsActions.claimNDR((status) => {
        setClaimNDRLoading(false);
        if (status) {
          toast.success("Sucess");
          dispatch(cardsActions.getClaimableNDR());
          dispatch(lpstakingActions.getNDRBalance());
        } else {
          toast.error("Failed...");
        }
      })
    );
  };

  return (
    <NFTStakeWrapper>
      <div className="stake-stats d-flex justify-content-center animation-slideDown">
        {unStakeAllLoading ? (
          <div className="action button">
            <img src="/static/images/icons/loading.gif" height="35" alt="" />
            <span>LOADING...</span>
          </div>
        ) : (
          <div
            className="action button"
            role="button"
            onClick={handleUnStakeAll}
          >
            <span className="d-block text-center">unstake all</span>
          </div>
        )}
        <div className="stat">
          <h6>My Staked Strength</h6>
          <p>{myStakedStrength}</p>
        </div>
        <div className="stat">
          <h6>Total Staked Strength</h6>
          <p>{totalStakedStrength}</p>
        </div>
        <div className="stat">
          <div style={{marginTop: -3}}>
            <label>Claimable NDR:</label>
            <span>{convertFromWei(claimableNDR, 3)}</span>
          </div>
          <div>
            <label>NDR per day:</label>
            <span>{convertFromWei(ndrPerDay, 3)}</span>
          </div>
        </div>
        {claimNDRLoading ? (
          <div className="action button">
            <img src="/static/images/icons/loading.gif" height="35" alt="" />
            <span>LOADING...</span>
          </div>
        ) : (
          <div className="action button" role="button" onClick={handleClaimNDR}>
            <span className="d-block text-center">claim ndr</span>
          </div>
        )}
      </div>
    </NFTStakeWrapper>
  );
};

const NFTStakeWrapper = styled.div`
  .stake-stats {
    div {
      span {
        font-size: 16px;
        max-width: 101.6px;
        font-family: Orbitron-Black;
        text-transform: uppercase;
        text-shadow: 5px 5px 3px #27787580;
        line-height: 1;
      }

      &.action {
        background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg.png");
        background-size: 100% 100%;
        width: 144px;
        height: 80px;
        margin-right: -5.6px;
        padding: 0 13.6px 17.6px 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
          background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg--active.png");
          color: #fec100;
        }
      }

      &.stat {
        background: url("/static/images/bg/card-menu/stat-bg.png");
        background-size: cover;
        margin: 0 -5.6px;
        padding: 8px 9.6px 0px;
        min-width: 234.4px;
        text-shadow: 0px 8px 8px #80f1ed91;
        font-family: Orbitron-Black;

        > div:first-child {
          margin-bottom: 3.2px;
        }

        div {
          label {
            color: #80f1ed;
            font-size: 0.8rem;
            // font-family: Orbitron-Medium;
            line-height: 1rem;
            margin: 0;
          }

          span {
            color: #fec100;
            font-size: 1rem;
            // font-family: Orbitron-Black;
            line-height: 1rem;
            padding-left: 9px;
            margin: 0;
            text-shadow: inherit;
          }
        }

        h6 {
          color: #80f1ed;
          font-size: 16px;
          line-height: 1;
          margin: 0 0 5.6px;
        }

        p {
          color: #fec100;
          font-size: 24px;
          line-height: 1;
          margin: 0;
        }
      }
    }
  }
`;

export default NFTStakingBoard;
