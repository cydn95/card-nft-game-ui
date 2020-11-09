import React, { useState } from "react";

import styled from "styled-components";
import { DoubleArrow, ArrowBack } from "@material-ui/icons";
import { STAKE_MIN_LIMIT, STAKE_MAX_LIMIT } from "../../helper/constant";

const Withdraw = ({ loading, staked, onClose, onWithdraw }) => {
  const [amount, setAmount] = useState("0.0000");

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const setMax = () => {
    if (staked > STAKE_MAX_LIMIT) {
      setAmount(STAKE_MAX_LIMIT);
    } else {
      setAmount(staked);
    }
  };

  return (
    <WithdrawWrapper>
      <div className="withdraw-wrapper d-flex justify-content-center animation-slideDown">
        <div className="action button" role="button" onClick={onClose}>
          <ArrowBack />
          <span>Back</span>
        </div>
        <div className="credit">
          <div>
            <label>UNI-LP Staked:</label>
          </div>
          <div>
            <span>{staked}</span>
          </div>
        </div>
        <div className="input">
          <div className="buttons">
            <span
              role="button"
              onClick={(e) => setAmount(STAKE_MIN_LIMIT)}
              className="min"
            >
              MIN
              <br />
              <small>2.25</small>
            </span>
            <span role="button" onClick={(e) => setMax()} className="max">
              MAX
              <br />
              <small>22.5</small>
            </span>
          </div>
          <input type="text" value={amount} onChange={handleChangeAmount} />
        </div>
        {loading && (
          <div className="action button">
            <img src="/static/images/icons/loading.gif" height="35" alt="" />
            <span>LOADING...</span>
          </div>
        )}
        {!loading && (
          <div className="action button" onClick={(e) => onWithdraw(amount)}>
            <DoubleArrow />
            <span>WITHDRAW</span>
          </div>
        )}
      </div>
    </WithdrawWrapper>
  );
};

const WithdrawWrapper = styled.div`
  .withdraw-wrapper {
    > a,
    div {
      color: #212529;
      text-decoration: none;

      span {
        font-size: 20px;
        max-width: 157px;
        font-family: Orbitron-Black;
        text-transform: uppercase;
        text-shadow: 5px 5px 3px #27787580;
        line-height: 1.2;
      }

      &.action {
        background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg.png");
        background-size: 100% 100%;
        width: 180px;
        height: 100px;
        margin-right: -13px;
        padding: 0 17px 22px 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
          background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg--active.png");
          color: #fec100;
        }

        &.button {
          width: 160px;
        }

        &:nth-child(4) {
          .MuiSvgIcon-root {
            transform: rotate(-90deg);
          }
        }
      }

      &.input {
        background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg-long--active.png");
        background-size: 100% 100%;
        width: 300px;
        height: 98px;
        margin-right: -13px;
        padding: 0 17px 22px 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #fec100;

        span {
          text-shadow: none;
          font-size: 14px;
          color: #fec100;
        }

        .buttons {
          width: 95%;
          display: flex;
          justify-content: space-between;
          padding-left: 5px;
          padding-right: 10px;
          box-sizing: border-box;
        }

        input {
          width: 140px;
          text-align: center;
          background: none;
          border: none;
          outline: none;
          color: #fec100;
          font-weight: 600;
          height: 32px;
          font-size: 2rem;
          line-height: 2rem;
        }
      }

      &.credit {
        background: url("/static/images/bg/pages/get-heroes/credit-bg.png");
        background-size: 100% 100%;
        margin-right: -13px;
        padding: 6px 22px 26px 10px;
        min-width: 405px;
        text-shadow: 10px 10px 10px #80f1ed91;

        > div:first-child {
          margin-bottom: 4px;
        }

        label {
          color: #80f1ed;
          font-size: 30px;
          font-family: Orbitron-Medium;
          line-height: 1;
          margin: 0;
        }

        span {
          color: #fec100;
          font-size: 30px;
          font-family: Orbitron-Black;
          line-height: 1;
          padding-left: 9px;
          margin: 0;
          text-shadow: inherit;
        }
      }
    }
  }
`;

export default Withdraw;
