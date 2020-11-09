import React, { useState } from "react";

import styled from "styled-components";
import { ArrowBack, Done, DoubleArrow } from "@material-ui/icons";

import { STAKE_MIN_LIMIT, STAKE_MAX_LIMIT } from "../../helper/constant";

const Deposit = ({
  loading,
  balance,
  staked,
  onClose,
  onApprove,
  onDeposit,
}) => {
  const [amount, setAmount] = useState("0.0000");

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const setMax = () => {
    if (balance > STAKE_MAX_LIMIT) {
      setAmount(STAKE_MAX_LIMIT);
    } else {
      setAmount(balance);
    }
  };

  return (
    <DepositWrapper>
      <div className="deposit-wrapper d-flex justify-content-center animation-slideDown">
        <div className="action button" role="button" onClick={onClose}>
          <ArrowBack />
          <span>Back</span>
        </div>
        <div className="credit">
          <div>
            <label>UNI-LP Staked:</label>
            <span>{staked}</span>
          </div>
          <div>
            <label>UNI-LP Balance:</label>
            <span>{balance}</span>
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
          <div className="action button" onClick={(e) => onApprove()}>
            <Done />
            <span>APPROVE</span>
          </div>
        )}
        {!loading && (
          <div className="action button" onClick={(e) => onDeposit(amount)}>
            <DoubleArrow />
            <span>STAKE</span>
          </div>
        )}
      </div>
    </DepositWrapper>
  );
};

const DepositWrapper = styled.div`
  .deposit-wrapper {
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
        width: 200px;
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
          width: 150px;
        }

        &:nth-child(5) {
          .MuiSvgIcon-root {
            transform: rotate(90deg);
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
          text-shadow: 5px 5px 3px #27787580;
        }

        .buttons {
          width: 95%;
          display: flex;
          justify-content: space-between;
          padding-left: 5px;
          padding-right: 10px;
          box-sizing: border-box;

          span {
            font-size: 16px;
          }
        }

        input {
          width: 140px;
          text-align: center;
          background: none;
          border: none;
          outline: none;
          color: #fec100;
          font-weight: 600;
          height: 40px;
          font-size: 30px;
          line-height: 30px;
          text-shadow: 5px 5px 3px #27787580;
          font-family: Orbitron-Black;
        }
      }

      &.credit {
        background: url("/static/images/bg/pages/get-heroes/credit-bg.png");
        background-size: 100% 100%;
        margin-right: -13px;
        padding: 15px 22px 26px 10px;
        min-width: 405px;
        text-shadow: 10px 10px 10px #80f1ed91;
        box-sizing: border-box;

        > div:first-child {
          margin-bottom: 4px;
        }

        label {
          color: #80f1ed;
          font-size: 20px;
          font-family: Orbitron-Medium;
          line-height: 1;
          margin: 0;
        }

        span {
          color: #fec100;
          font-size: 20px;
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

export default Deposit;
