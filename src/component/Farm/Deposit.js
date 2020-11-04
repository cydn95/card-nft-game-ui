import React, { useState } from "react";

import styled from "styled-components";
import { DoubleArrow, Close } from "@material-ui/icons";

import { STAKE_MIN_LIMIT, STAKE_MAX_LIMIT } from "../../helper/constant";

const Deposit = ({ uniBalance, onClose, onDeposit }) => {
  const [amount, setAmount] = useState('');

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  }

  return (
    <DepositWrapper>
      <div className="deposit-wrapper d-flex justify-content-center animation-slideDown">
        <div className="action" role="button" onClick={onClose}>
          <Close />
          <span>CANCEL</span>
        </div>
        <div className="credit">
          <div>
            <label>Your UNI-LP Balance</label>
          </div>
          <div>
            <span>{(uniBalance / Math.pow(10, 18)).toFixed(4)}</span>
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
            <span
              role="button"
              onClick={(e) => setAmount(STAKE_MAX_LIMIT)}
              className="max"
            >
              MAX
              <br />
              <small>22.5</small>
            </span>
          </div>
          <input type="text" value={amount} onChange={handleChangeAmount} />
        </div>
        <div className="action" onClick={(e) => onDeposit(amount)}>
          <DoubleArrow />
          <span>DEPOSIT</span>
        </div>
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
        width: 180px;
        height: 100px;
        margin-right: -13px;
        padding: 0 17px 22px 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:first-child {
          background: url("/static/images/bg/pages/get-heroes/credit-first-button-bg.png");
          background-size: 100% 100%;
          width: 140px;
          height: 100px;
        }

        &:last-child {
          background: url("/static/images/bg/pages/get-heroes/credit-last-button-bg.png");
          background-size: 100% 100%;
          width: 140px;
          height: 100px;
        }

        &:hover {
          background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg--active.png");
        }

        &:nth-child(4) {
          .MuiSvgIcon-root {
            transform: rotate(90deg);
          }
        }
      }

      &.input {
        background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg--active.png");
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

export default Deposit;
