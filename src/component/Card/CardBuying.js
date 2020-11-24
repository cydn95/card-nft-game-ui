import React from "react";
import styled from "styled-components";

import { CARD_HASH_PRICE_UNIT } from "../../helper/constant";
import { convertFromWei } from "../../helper/utils";

const CardBuying = ({
  card,
  isHero,
  eth,
  onBuyCardEth,
  onBuyCardHash,
  currentProcessingCardId,
  loadingHash,
  loadingEth,
}) => {
  return (
    <CardWrapper>
      <div className="card position-relative">
        <img src={card.image} alt={card.name} className={`card-image`} />
        <img
          src={`/static/images/bg/components/card/card-border.png`}
          width="320"
          height="443"
          alt="card-border"
          className="card-border"
        />
      </div>
      <div className="button-wrapper text-center">
        <div className="card-grid">
          <h4 className="text-left">{card.name}</h4>
          <div className="d-flex">
            <div className="w-50 text-wrapper">
              <div className="text-left">
                <label>Strength:</label>
                <span>{card.strength}</span>
              </div>
              <div className="text-left">
                <label>Minted:</label>
                <span>
                  {card.minted}/{card.total_minted}
                </span>
              </div>
            </div>
            <div className="w-50 text-wrapper">
              <div className="text-right">
                <label>Defense:</label>
                <span>{card.defense}</span>
              </div>
              <div className="text-right">
                <label>Rarity:</label>
                <span>{card.rarity.text}</span>
              </div>
            </div>
          </div>
          <div className="grid-button-wrapper">
            {isHero &&
              (loadingHash && card.id === currentProcessingCardId ? (
                <button className="hash-button hover-effect2">
                  <div className="loading-wrapper">
                    <img
                      src="/static/images/icons/loading.gif"
                      height="20"
                      alt=""
                    />
                    BUYING...
                  </div>
                </button>
              ) : (
                <button
                  className="hash-button hover-effect2"
                  onClick={(e) => onBuyCardHash(card)}
                >
                  {card.rarity.weight * CARD_HASH_PRICE_UNIT} Hash
                </button>
              ))}

            {loadingEth && card.id === currentProcessingCardId ? (
              <button
                className={`${
                  isHero ? "eth-button" : "buy-button"
                } hover-effect2`}
              >
                <div className="loading-wrapper">
                  <img
                    src="/static/images/icons/loading.gif"
                    height="20"
                    alt=""
                  />
                  BUYING...
                </div>
              </button>
            ) : (
              <button
                className={`${
                  isHero ? "eth-button" : "buy-button"
                } hover-effect2`}
                onClick={(e) => onBuyCardEth(card)}
              >
                {" "}
                <span>Ξ</span>
                {` `}
                {convertFromWei(eth, 4)}
              </button>
            )}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  margin: 8px;

  .card {
    width: 310px;
    height: 432px;
    position: relative;
    padding: 17px 14px;
    background: transparent;

    .card-image {
      width: 290px;
      height: 410px;
      position: absolute;

      &.un-obtained {
        opacity: 0.3;
      }
    }

    .card-border {
      position: absolute;
      top: 0;
      left: 0;
    }

    .marked {
      position: absolute;
      top: 6.566px;
      left: 6.66px;
      width: 99px;
      height: 99px;
    }
  }

  .button-wrapper {
    margin-top: -11.666px;

    button {
      width: 238px;
      height: 52px;
      background: url("/static/images/bg/components/card/button-bg.png");
      border: none;
      color: #161617;
      font-size: 20px;
      font-family: Orbitron-Medium;
      text-shadow: 5px 5px 3px #27787580;
      outline: none;
    }
  }

  .card-grid {
    width: 310px;
    padding: 0 22px;
    margin-top: 20px;
    text-shadow: 4.66667px 4.66667px 6.66667px
      ${(props) => props.theme.darken(props.theme.palette.primary.main, 0.57)};

    h4 {
      font-size: 20px;
      font-family: Orbitron-Black;
      color: ${(props) => props.theme.palette.primary.main};
      border-bottom: 1.333px solid
        ${(props) => props.theme.palette.primary.main};
      padding-bottom: 2.66667px;
      margin-bottom: 3.3333px;
    }

    label {
      font-size: 13.6667px;
      font-family: Orbitron-Medium;
      color: ${(props) => props.theme.palette.primary.main};
      margin-bottom: 0;
    }

    span {
      font-size: 13.66667px;
      font-family: Orbitron-Black;
      color: ${(props) => props.theme.palette.secondary.main};
      padding-left: 4.66667px;
    }

    .text-wrapper {
      line-height: 16px;
    }

    .grid-button-wrapper {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      button {
        padding-bottom: -4.66667px;

        &.hash-button {
          // width: 152px;
          flex: 1;
          height: 35px;
          background-image: url("/static/images/bg/components/card/hash-button-bg.png");
          background-size: 100% 100%;
          margin-left: -3.33333px;
          padding-bottom: 4.66667px;
        }
        &.eth-button {
          // width: 148px;
          flex: 1;
          height: 38px;
          background-image: url("/static/images/bg/components/card/eth-button-bg.png");
          background-size: 100% 100%;
          margin-right: -8.66667px;
          padding-bottom: 4.66667px;

          span {
            font-family: "arial";
            font-size: 20px;
            color: #161617;
          }
        }
        &.buy-button {
          width: 290px;
          height: 38px;
          background-image: url("/static/images/bg/components/card/buy-button-bg.png");
          background-size: 100% 100%;

          span {
            font-family: "arial";
            font-size: 20px;
            color: #161617;
          }
        }
      }

      .loading-wrapper {
        display: flex;
        font-size: 14px;
        justify-content: center;
        color: #161617;
      }
    }
  }
`;

export default CardBuying;
