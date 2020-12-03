import React, { useState } from "react";

import styled from "styled-components";
import { Reply, ShoppingCart } from "@material-ui/icons";

import ModalMask from "../../component/ModalMask";
import { convertFromWei } from "../../helper/utils";

const Stake = ({
  balance,
  hashes,
  staked,
  stat,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenOldWithdraw,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  const handleOpenDeposit = (e) => {
    e.preventDefault();
    onOpenDeposit();
  };

  const handleOpenWithdraw = (e) => {
    e.preventDefault();
    onOpenWithdraw();
  };

  // const handleOpenOldWithdraw = (e) => {
  //   e.preventDefault();
  //   onOpenOldWithdraw();
  // };

  const handleOpenHelp = (e) => {
    e.preventDefault();
    setShowHelp(!showHelp);
  }

  return (
    <StakeWrapper>
      {showHelp &&
        <ModalMask onClose={() => setShowHelp(false)} />
      }
      <div className="stake-wrapper d-flex justify-content-center align-items-end animation-slideDown">
        <a className="action" href="/" onClick={(e) => handleOpenHelp(e)} style={{ zIndex: 200 }}>
          {showHelp ? <span>X</span> : <span>?</span>}
        </a>
        <div className="stat">
          <div className="section top">
            <div className="credit" style={{ height: 70, marginRight: -22 }}>
              <label className="stat-info">TVL:</label>
              <span className="stat-info">{`$ ${stat.tvl}`}</span>
            </div>
            <div className="credit" style={{ width: 550, height: 70 }}>
              <label className="stat-info">1 UNI-LP</label>
              <span className="stat-info">{`${stat.lpPriceNDR} NDR ${stat.lpPriceETH} ETH`}</span>
            </div>
          </div>
          <div className="section">
            <div className="credit" style={{ marginRight: -22 }}>
              <div>
                <label>Hashes</label>
                <span>{hashes}</span>
              </div>
              <div>
                <label>Per Day</label>
                <span>{(staked / 2.25 * 10).toFixed(2)}</span>
              </div>
            </div>
            <div className="credit" style={{ width: 550 }}>
              <div>
                <label>UNI-LP Staked</label>
                <span>{staked}</span>
              </div>
              <div>
                <label>UNI-LP Balance</label>
                <span>{balance}</span>
              </div>
            </div>
          </div>
          {showHelp && <div className="help">
            Apparently we had reached a great height in the atmosphere, for the sky
            was a dead black, and the stars had ceased to twinkle. By the same illusion
            which lifts the horizon of the sea to the level of the spectator on a hillside,
            the sable cloud beneath was dished out, and the car seemed to float in the
            middle of an immense dark sphere, whose upper half was strewn with silver.
          </div>}
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
        <a
          className="action"
          href="https://info.uniswap.org/pair/0x65d0a154d2425ce2fd5fed3bdae94d9a9afe55ce"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ShoppingCart />
          <span>BUY NDR</span>
        </a>
        <a className="action" href="/" onClick={(e) => handleOpenDeposit(e)}>
          <Reply />
          <span>STAKE</span>
        </a>
        <a
          className="action"
          href="/"
          onClick={(e) => handleOpenWithdraw(e)}
          title="There is a 2% LP withdrawal fee."
        >
          <Reply />
          <span>UNSTAKE</span>
        </a>
        {/* <a
          className="action"
          href="/"
          onClick={(e) => handleOpenOldWithdraw(e)}
        >
          <span>Exit Old</span>
          <span>Pool</span>
        </a> */}
      </div>
    </StakeWrapper>
  );
};

const StakeWrapper = styled.div`
  .stake-wrapper {
    .section {
      display: flex;
      margin-top: -20px;
      
      &.top {
        margin-top: 0px;
      }
    }

    .help {
      position: absolute;
      border: 6px solid #cd3ed5;
      width: 905px;
      margin-top: -20px;
      padding: 16px;
      color: #fff;
      font-family: Orbitron-Medium;
      font-size: 1rem;
      z-index: 300;
    }

    > a,
    div {
      color: #212529;
      text-decoration: none;

      span {
        font-size: 20px;
        // max-width: 157px;
        font-family: Orbitron-Black;
        text-transform: uppercase;
        text-shadow: 5px 5px 3px #27787580;
        line-height: 1.2;
      }

      &.action {
        background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg.png");
        background-size: 100% 100%;
        width: 170px;
        height: 110px;
        margin-right: -13px;
        padding: 0 17px 22px 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        align-content: center;
        cursor: pointer;
        text-align: center;

        svg {
          width: 36px;
          height: 36px;
        }

        &:first-child {
          background: url("/static/images/bg/pages/get-heroes/credit-button-bg--active.png");
          background-size: 100% 100%;
          width: 80px;
          color: #fec100;
          margin-right: -3px;

          span {
            font-size: 2.5rem;
            padding-left: 5px;
          }
        }

        &:hover {
          background-image: url("/static/images/bg/pages/get-heroes/credit-button-bg--active.png");
          color: #fec100;
        }

        &:nth-child(5) {
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
        min-width: 400px;
        text-shadow: 10px 10px 10px #80f1ed91;
        display: flex;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;

        div {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          align-content: center;
        }

        label {
          color: #80f1ed;
          font-size: 1.5rem;
          font-family: Orbitron-Medium;
          line-height: 1;
          margin-bottom: 8px;

          &.stat-info {
            margin-bottom: 0px;
            padding-top: 3px;
            font-family: Orbitron-Black;
          }
        }

        span {
          color: #fec100;
          font-size: 1.75rem;
          font-family: Orbitron-Black;
          line-height: 1;
          padding-left: 9px;
          padding-top: 4px;
          margin: 0;
          text-shadow: inherit;

          &.stat-info {
            padding-top: 3px;
          }
        }
      }
    }
  }
`;

export default Stake;
