import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import { toast } from "react-toastify";
import styled from "styled-components";

import CloseIcon from "@material-ui/icons/Close";

import cardsActions from "../../redux/cards/actions";

const NFTStakingModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [stakeLoading, setStakeLoading] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(0);

  const cards = useSelector((state) => state.Cards.cards);
  const stakedCardTokens = useSelector((state) => state.Cards.stakedCardTokens);

  const unStakeCards = useMemo(() => {
    const ret = [];

    for (let i = 0; i < cards.length; i++) {
      const idx = stakedCardTokens.findIndex(
        (e) => Number(e) === Number(cards[i].id)
      );
      if (idx < 0 && Number(cards[i].owned) > 0) {
        ret.push({ ...cards[i] });
      }
    }
    console.log(ret);
    return ret;
  }, [cards, stakedCardTokens]);

  const handleStake = (cardId) => {
    setSelectedCardId(cardId);
    setStakeLoading(true);
    dispatch(
      cardsActions.stakeCard(cardId, (status) => {
        setSelectedCardId(0);
        setStakeLoading(false);
        if (status) {
          toast.success("Staked successfully");
          dispatch(cardsActions.getCards());
          dispatch(cardsActions.getStakedCards());
          dispatch(cardsActions.getMyStakedStrength());
          dispatch(cardsActions.getTotalStakedStrength());
          dispatch(cardsActions.getClaimableNDR());
          onClose();
        } else {
          toast.success("Staked failed");
        }
      })
    );
  };

  return (
    <NFTStakeModalContainer>
      <div className="header">
        <h2>Stake your Card</h2>
        <div role="button" className="close-button" onClick={(e) => onClose()}>
          <CloseIcon />
        </div>
      </div>
      <div
        className="d-flex flex-wrap justify-content-center"
        style={{ paddingBottom: 100 }}
      >
        {unStakeCards.length > 0 &&
          unStakeCards.map((card) => (
            <CardWrapper key={`stake_card_${card.id}`}>
              <div className="card position-relative">
                <img
                  src={card.image}
                  alt={`${card.name}`}
                  className="card-image"
                />
                <div className="card-border"></div>
              </div>
              <div className="button-wrapper text-center">
                {stakeLoading && card.id === selectedCardId ? (
                  <button className="hover-effect3">
                    <div className="loading-wrapper">
                      <img
                        src="/static/images/icons/loading.gif"
                        height="25"
                        alt=""
                        style={{ marginTop: 3, marginRight: 5 }}
                      />{" "}
                      Staking...
                    </div>{" "}
                  </button>
                ) : (
                  <button
                    className="hover-effect3"
                    onClick={(e) => handleStake(card.id)}
                  >
                    Stake
                  </button>
                )}
              </div>
            </CardWrapper>
          ))}
      </div>
    </NFTStakeModalContainer>
  );
};

export default NFTStakingModal;

const NFTStakeModalContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background: transparent;
  z-index: 200;
  overflow-y: auto;

  .header {
    width: 100%;
    box-sizing: border-box;
    padding: 100px 10% 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 2.5rem;
      font-family: Orbitron-Black;
      text-transform: uppercase;
      text-shadow: 5px 5px 3px #27787580;
      line-height: 2.5rem;
      text-align: center;
      color: #fec100;
    }

    .close-button {
      .MuiSvgIcon-root {
        width: 2.8em;
        height: 2.8em;
      }
      svg path {
        fill: #fec100;
      }
      &:hover {
        svg path {
          fill: #f628ca;
        }
      }
    }
  }
`;

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

    .un-staked {
      width: 290px;
      height: 410px;
    }

    .card-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 320px;
      height: 443px;
      background: url("/static/images/bg/components/card/card-border.png");
      background-size: cover;

      &:hover {
        background: url("/static/images/bg/components/card/card-border--active.png");
        background-size: cover;
      }
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
      box-sizing: border-box;
      padding-top: 15px;

      &:hover {
        background: url("/static/images/bg/components/card/button-bg--active.png");
        color: #fec100;
      }
    }
    .loading-wrapper {
      display: flex;
      font-size: 20px;
      justify-content: center;
      font-family: Orbitron-Medium;
      text-shadow: 5px 5px 3px #27787580;
      color: #161617;
    }
  }
`;
