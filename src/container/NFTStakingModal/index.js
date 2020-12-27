import React, { useState, useMemo } from "react";
import { useSelector /*useDispatch*/ } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

// import CloseIcon from "@material-ui/icons/Close";

import SectionTitle from "../../component/SectionTitle";
import LoadingTextIcon from "../../component/LoadingTextIcon";

// import cardsActions from "../../redux/cards/actions";
// import oldNFTStakingActions from "../../redux/oldNFTStaking/actions";

const NFTStakingModal = ({ remainStakableCards, onClose }) => {
  // const dispatch = useDispatch();

  const [stakeLoading, setStakeLoading] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState([]);

  const cards = useSelector((state) => state.Cards.cards);
  const stakedCardTokens = useSelector(
    (state) => state.OldNFTStaking.stakedCardTokens
  );

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
    return ret;
  }, [cards, stakedCardTokens]);

  const handleStake = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedCardIds.length === 0) {
      toast.error("Select cards please");
      return;
    }

    if (stakeLoading) return;

    setStakeLoading(true);
    // dispatch(
    //   oldNFTStakingActions.stakeCard(cardId, (status) => {
    //     setSelectedCardIds([]);
    //     setStakeLoading(false);
    //     if (status) {
    //       toast.success("Staked successfully");
    //       dispatch(cardsActions.getCards());
    //       dispatch(oldNFTStakingActions.getStakedCards());
    //       dispatch(oldNFTStakingActions.getMyStakedStrength());
    //       dispatch(oldNFTStakingActions.getTotalStakedStrength());
    //       dispatch(oldNFTStakingActions.getClaimableNDR());
    //       onClose();
    //     } else {
    //       toast.error("Staked failed");
    //     }
    //   })
    // );
  };

  const handleSelectCard = (e, cardId) => {
    e.preventDefault();
    e.stopPropagation();

    const oldSelectedCard = [...selectedCardIds];
    const findIndex = oldSelectedCard.findIndex((id) => id === cardId);
    if (findIndex >= 0) {
      oldSelectedCard.splice(findIndex, 1);
    } else {
      if (oldSelectedCard.length < remainStakableCards) {
        oldSelectedCard.push(cardId);
      }
    }
    setSelectedCardIds([...oldSelectedCard]);
  };

  return (
    <NFTStakeModalContainer onClick={(e) => onClose()}>
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Select cards to stake" long />
      </MenuWrapper>
      <MenuWrapper className="animation-fadeInRight">
        <div className="menu-actions">
          <div className="menu-item selected-card-count">{`${selectedCardIds.length}/${remainStakableCards} Selected`}</div>
          <div
            role="button"
            className="menu-item stake-button"
            onClick={(e) => handleStake(e)}
          >
            {stakeLoading ? (
              <LoadingTextIcon loadingText="Staking..." />
            ) : (
              `Stake selected`
            )}
          </div>
        </div>
      </MenuWrapper>
      <div
        className="d-flex flex-wrap justify-content-center animation-fadeInLeft"
        style={{ paddingBottom: 100 }}
      >
        {unStakeCards.length > 0 &&
          unStakeCards.map((card) => {
            const active = selectedCardIds.includes(card.id) ? "active" : "";
            return (
              <CardWrapper key={`stake_card_${card.id}`}>
                <div className={`card ${active}`}>
                  <img
                    src={card.image}
                    alt={`${card.name}`}
                    className="card-image"
                  />
                  <div
                    className="card-border"
                    onClick={(e) => handleSelectCard(e, card.id)}
                  ></div>
                </div>
              </CardWrapper>
            );
          })}
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
  padding-top: 100px;

  .header {
    width: 100%;
    box-sizing: border-box;
    padding: 75px 7.5% 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 1.875rem;
      font-family: Orbitron-Black;
      text-transform: uppercase;
      text-shadow: 5px 5px 3px #27787580;
      line-height: 1.875rem;
      text-align: center;
      color: #fec100;
    }

    .close-button {
      .MuiSvgIcon-root {
        width: 2.1em;
        height: 2.1em;
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
    width: 232.5px;
    height: 324px;
    position: relative;
    padding: 12.75px 10.5px;
    background: transparent;
    z-index: 400;

    .card-image {
      width: 217.5px;
      height: 307.5px;
      position: absolute;
    }

    .card-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 240px;
      height: 332.25px;
      background: url("/static/images/bg/components/card/card-border.png");
      background-size: cover;
      cursor: pointer;
    }

    &.active {
      .card-border {
        background: url("/static/images/bg/components/card/card-border--active.png");
        background-size: cover;
      }
    }
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 0px 7.5%;

  h2 {
    font-family: Orbitron-Black;
    font-size: 1.5rem;
    color: #fec100;
    padding-right: 20px;
    text-align: center;
  }

  .menu-actions {
    display: flex;
    padding-left: 20px;

    .menu-item {
      width: 210px;
      height: 32px;
      padding-left: 40px;
      padding-top: 6px;
    }

    .selected-card-count {
      background-image: url("/static/images/bg/pages/stake/title.png");
      background-size: 100% 100%;
      font-family: Orbitron-Black;
      color: #fec100;
    }

    .stake-button {
      background-image: url("/static/images/bg/pages/stake/button.png");
      background-size: 100% 100%;
      font-family: Orbitron-Medium;
      color: #161617;
      margin-left: -12px;
      cursor: pointer;

      &:hover {
        background-image: url("/static/images/bg/pages/stake/button--active.png");
        color: #fec100;
      }
    }
  }
`;
