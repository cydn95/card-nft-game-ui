import React from "react";

import styled from "styled-components";
import { ShoppingCart, Reply } from "@material-ui/icons";

const Stake = ({ hashes, staked, onOpenDeposit, onOpenWithdraw }) => {
  const handleOpenDeposit = (e) => {
    e.preventDefault();
    onOpenDeposit();
  };

  const handleOpenWithdraw = (e) => {
    e.preventDefault();
    onOpenWithdraw();
  };
  return (
    <StakeWrapper>
      <div className="stake-wrapper d-flex justify-content-center animation-slideDown">
        <div className="credit">
          <div>
            <label>Hashes:</label>
            <span>{hashes ? parseFloat(hashes / Math.pow(10, 18)).toFixed(4) : "0.0000"}</span>
          </div>
          <div>
            <label>Staked:</label>
            <span>{staked ? parseFloat(staked / Math.pow(10, 18)).toFixed(4) : "0.0000"}</span>
          </div>
        </div>
        <a
          className="action"
          href="https://app.uniswap.org/#/add/0x739763a258640919981f9ba610ae65492455be53/ETH"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ShoppingCart />
          <span>GET UNI-LP</span>
        </a>
        <a className="action" href="/" onClick={(e) => handleOpenDeposit(e)}>
          <Reply />
          <span>STAKE</span>
        </a>
        <a className="action" href="/" onClick={(e) => handleOpenWithdraw(e)}>
          <Reply />
          <span>UNSTAKE</span>
        </a>
      </div>
    </StakeWrapper>
  );
};

const StakeWrapper = styled.div`
  .stake-wrapper {
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

        &:last-child {
          background: url("/static/images/bg/pages/get-heroes/credit-last-button-bg.png");
          background-size: 100% 100%;
          width: 140px;
          height: 100px;
        }

        &:hover {
          background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg--active.png");
        }

        &:nth-child(3) {
          .MuiSvgIcon-root {
            transform: rotateY(180deg);
          }
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

export default Stake;