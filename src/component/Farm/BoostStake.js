import React from "react";
import styled from "styled-components";

import { toast } from "react-toastify";

import AmountInput from "./AmountInput";

import { STAKE_MIN_LIMIT, STAKE_MAX_LIMIT } from "../../helper/constant";

const BoostStake = ({ token, fee, amount }) => {
  return (
    <BoostStakeWrapper>
      <div className="token">{token.toUpperCase()}</div>
      <div className="block">
        <div className="row">
          <span className="title">{`1 ${token} =  `}</span>
          <span className="value">0.05 STR</span>
        </div>
        <div className="row">
          <span className="title">APY:</span>
          <span className="value">900 %</span>
        </div>
      </div>
      <div className="block">
        <div className="row">
          <span className="title">STAKED:</span>
        </div>
        <div className="row">
          <span className="title">{`1 ${token} =  `}</span>
          <span className="value">0.05 STR</span>
        </div>
      </div>
      <div className="section">
        <div className="row">
          <AmountInput
            className="amount"
            showMin={false}
            min={STAKE_MIN_LIMIT}
            showMax={true}
            max={STAKE_MAX_LIMIT}
            value="0.0000"
          />
        </div>
      </div>
      <div className="row">
        <button className="action approve">APPROVE</button>
        <button className="action stake">STAKE</button>
      </div>
      <div className="row">
        <button className="action unstake">Claim and Unstake</button>
      </div>
      <div className="row">
        <button className="action claim">{`Claim ${token}`}</button>
      </div>
      <div className="row">
        <span className="fee-label">{`2% Unstake fee`}</span>
      </div>
    </BoostStakeWrapper>
  );
};

const BoostStakeWrapper = styled.div`
  width: 380px;
  min-height: 332.25px;
  background: url("/static/images/bg/components/card/card-border.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 26px 46px;
  box-sizing: border-box;

  .token {
    font-family: Orbitron-Black;
    text-shadow: 0px 10px 5px #fec10080;
    color: #fec100;
    font-size: 1.7rem;
    margin-bottom: 10px;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
  }

  .block {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid #80f1ed;
    box-shadow: 0px 5px 3px #80f1ed80;
    width: 100%;
    margin-bottom: 15px;
  }

  .row {
    display: flex;
    justify-content: center;
    width: 100%;

    font-family: Orbitron-Medium;
    font-size: 1.1rem;
    padding-top: 4px;
    padding-bottom: 4px;

    .title {
      color: #80f1ed;
      text-shadow: 5px 5px 3px #80f1ed80;
      padding-right: 5px;
    }

    .value {
      color: #fec100;
      text-shadow: 5px 5px 3px #fec10080;
    }

    .action {
      flex: 1;
      border: none;
      outline: none;
      height: 60px;
      font-family: Orbitron-Black;
      font-size: 15px;

      &.approve {
        background: url("/static/images/bg/components/card/button-left.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-bottom: 15px;

        &:hover {
          background: url("/static/images/bg/components/card/button-left--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.stake {
        background: url("/static/images/bg/components/card/button-right.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-bottom: 15px;

        &:hover {
          background: url("/static/images/bg/components/card/button-right--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.unstake {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-top: -20px;

        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }

      &.claim {
        background: url("/static/images/bg/components/card/button-bg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-top: -15px;
        
        &:hover {
          background: url("/static/images/bg/components/card/button-bg--active.png");
          background-size: 100% 100%;
          color: #fec100;
        }
      }
    }

    .fee-label {
      font-family: Orbitron-Medium;
      color: #fec100;
    }

    .amount {
      flex: 1;
      height: 65px;
    }

    .str {
      height: 65px;
      width: 65px;
      border: 4px solid #e182ea;
      margin-left: 5px;
      font-family: Orbitron-Black;
      color: #fec100;
      text-align: center;
      box-sizing: border-box;
    }
  }
`;

export default BoostStake;
