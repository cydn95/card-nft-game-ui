import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

import SectionTitle from "../../component/SectionTitle";
import LoadingTextIcon from "../../component/LoadingTextIcon";

import CardStaking from "../../component/Card/CardStaking";
import CardStakingBonus from "../../component/Card/CardStakingBonus";

import NFTStakingBoard from "../NFTStakingBoard";
import NFTStakingModal from "../NFTStakingModal";
import NFTStakingModalBonus from "../NFTStakingModalBonus";

// import cardsActions from "../../redux/cards/actions";
import nftStakingActions from "../../redux/nftStaking/actions";

import { CARD_SERIES } from "../../helper/constant";

const NFTStaking = () => {
  const dispatch = useDispatch();

  // Selected Cards for Staking or Unstaking
  const [selectedUnstakeCardIds, setSelectedUnstakeCardIds] = useState([]);

  const [stakeDlgOpen, setStakeDlgOpen] = useState(false);
  const [bonusStakeDlgOpen, setBonusStakeDlgOpen] = useState(false);

  const [unStakeLoading, setUnStakeLoading] = useState(false);
  const [unStakeLoadingBonus, setUnStakeLoadingBonus] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  const cards = useSelector((state) => state.Cards.cards);
  const stakedCardTokens = useSelector(
    (state) => state.NFTStaking.stakedCardTokens
  ); // Staked card count

  const stakedCards = useMemo(() => {
    const ret = [];
    for (let i = 0; i < stakedCardTokens.length; i++) {
      const cardIndex = cards.findIndex(
        (e) => Number(e.id) === Number(stakedCardTokens[i])
      );

      if (cardIndex >= 0) {

        if (cards[cardIndex].series === CARD_SERIES.BADGE) continue;

        ret.push({
          card: { ...cards[cardIndex] },
          unStaked: false,
        });
      }
    }
    return ret;
  }, [cards, stakedCardTokens]);

  const bonusCard = useMemo(() => {
    for (let i = 0; i < stakedCardTokens.length; i++) {
      const cardIndex = cards.findIndex(
        (e) => Number(e.id) === Number(stakedCardTokens[i])
      );
      if (cardIndex >= 0) {

        if (cards[cardIndex].series !== CARD_SERIES.BADGE) continue;

        return {
          card: { ...cards[cardIndex] },
          unStaked: false,
          bonus: true
        }
      }
    }

    return { card: null, unStaked: true, bonus: true };

  }, [cards, stakedCardTokens]);

  useEffect(() => {
    dispatch(nftStakingActions.getStakedCards());
    dispatch(
      nftStakingActions.getApprovedStatus((status) => {
        setApproved(status);
      })
    );
  }, [dispatch]);

  // console.log(approved)
  useEffect(() => {
    if (cards.length > 0) {
      dispatch(nftStakingActions.getMyCardsCount(cards));
    }
  }, [dispatch, cards]);

  const handleSelectCard = (cardId) => {
    const oldUnstakeCardIds = [...selectedUnstakeCardIds];
    const findIndex = oldUnstakeCardIds.findIndex((id) => id === cardId);
    if (findIndex >= 0) {
      oldUnstakeCardIds.splice(findIndex, 1);
    } else {
      oldUnstakeCardIds.push(cardId);
    }
    setSelectedUnstakeCardIds([...oldUnstakeCardIds]);
  };

  const handleUnStake = () => {
    if (unStakeLoading) {
      return;
    }

    if (selectedUnstakeCardIds.length === 0) {
      toast.error("Select cards to unstake please");
      return;
    }

    setUnStakeLoading(true);
    dispatch(
      nftStakingActions.unStakeCard(selectedUnstakeCardIds, (status) => {
        setSelectedUnstakeCardIds([]);
        setUnStakeLoading(false);
        if (status) {
          toast.success("Sucess");
          dispatch(nftStakingActions.getStakedCards());
          dispatch(nftStakingActions.getMyStakedStrength());
          dispatch(nftStakingActions.getTotalStakedStrength());
          dispatch(nftStakingActions.getClaimableNDR());
        } else {
          toast.error("Failed...");
        }
      })
    );
  };

  const handleUnStakeBonus = (cardId) => {
    if (unStakeLoadingBonus) {
      return;
    }

    setUnStakeLoadingBonus(true);
    dispatch(
      nftStakingActions.unStakeCard([cardId], (status) => {
        setUnStakeLoadingBonus(false);
        if (status) {
          toast.success("Sucess");
          dispatch(nftStakingActions.getStakedCards());
          dispatch(nftStakingActions.getMyStakedStrength());
          dispatch(nftStakingActions.getTotalStakedStrength());
          dispatch(nftStakingActions.getClaimableNDR());
        } else {
          toast.error("Failed...");
        }
      })
    );
  };

  const handleOpenStakeModal = () => {
    setStakeDlgOpen(true);
  };

  const handleCloseStakeModal = () => {
    setStakeDlgOpen(false);
  };

  const handleApproveAll = () => {
    setApproveLoading(true);
    dispatch(
      nftStakingActions.approveAll(true, (status) => {
        setApproveLoading(false);
        if (status) {
          toast.success("Approved successfully");
          dispatch(
            nftStakingActions.getApprovedStatus((status) => {
              setApproved(status);
            })
          );
        } else {
          toast.error("Approved failed");
        }
      })
    );
  };

  // Bonus Stake ****************************************************
  const handleOpenBonusStakeModal = () => {
    setBonusStakeDlgOpen(true);
  };

  const handleCloseBonusStakeModal = () => {
    setBonusStakeDlgOpen(false);
  };

  return (
    <StakePageContainer>
      {stakeDlgOpen && (
        <div className="modal-container">
          <NFTStakeModalMask />
          <NFTStakingModal
            onClose={handleCloseStakeModal}
          />
        </div>
      )}

      {bonusStakeDlgOpen && (
        <div className="modal-container">
          <NFTStakeModalMask />
          <NFTStakingModalBonus onClose={handleCloseBonusStakeModal} />
        </div>
      )}

      <NFTStakingBoard />
      <MenuWrapper className="animation-fadeInRight">
        <SectionTitle title="Staked Hero & Support" long />
      </MenuWrapper>
      <MenuWrapper className="animation-fadeInRight">
        <div className="menu-actions">
          <div className="menu-item selected-card-count">{`${selectedUnstakeCardIds.length}/${stakedCardTokens.length} Selected`}</div>
          <div
            role="button"
            className="menu-item unstake-button"
            onClick={(e) => handleUnStake()}
          >
            {unStakeLoading ? (
              <LoadingTextIcon loadingText="Unstaking..." />
            ) : (
              `Unstake selected`
            )}
          </div>
          <StakeButtonWrapper>
            {approveLoading ? (
              <div
                className="stake-button button-approve-all"
                role="button"
                onClick={(e) => handleApproveAll()}
              >
                <img
                  src="/static/images/icons/loading.gif"
                  height="25"
                  alt=""
                  style={{ marginTop: 3, marginRight: 5 }}
                />{" "}
                Approving...{" "}
              </div>
            ) : (
              !approved && (
                <div
                  className="stake-button button-approve-all"
                  role="button"
                  onClick={(e) => handleApproveAll()}
                >
                  Approve all
                </div>
              )
            )}
            {approved && (
              <div
                role="button"
                className="stake-button button-stake-all"
                onClick={(e) => handleOpenStakeModal()}
              >
                Stake Hero/Support
              </div>
            )}
          </StakeButtonWrapper>
        </div>
      </MenuWrapper>
      <CardContainer>
        {stakedCards.length > 0 &&
          stakedCards.map((c, index) => (
            <CardStaking
              key={`card_${index}`}
              card={c.card}
              unStaked={c.unStaked}
              onSelectCard={(cardId) => handleSelectCard(cardId)}
              selectedCardIds={selectedUnstakeCardIds}
            />
          ))}
      </CardContainer>

      <MenuWrapper className="animation-fadeInRight" style={{ marginTop: 50 }}>
        <SectionTitle title="Staked Bonus card" long />
        {stakedCards.length === 0 && (
          <h2>
            In order to stake bonus card you need to stake at least 1 hero or
            support card.
          </h2>
        )}
      </MenuWrapper>

      {stakedCards.length > 0 && (
        <CardContainer style={{ marginBottom: 100 }}>
          <CardStakingBonus
            card={bonusCard.card}
            unStaked={bonusCard.unStaked}
            onUnStake={handleUnStakeBonus}
            onStake={handleOpenBonusStakeModal}
            loadingUnStake={unStakeLoadingBonus}
          />
        </CardContainer>
      )}
    </StakePageContainer>
  );
};

const StakePageContainer = styled.div`
  width: 100vw;
  max-width: 100%;

  .nav-pills {
    margin: 0px;
  }

  .nav-pills .nav-item .nav-link {
    margin-bottom: 10px;
    font-size: 24px;
  }
`;

const NFTStakeModalMask = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
  background: #000;
  opacity: 0.9;
  z-index: 100;
`;

const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-bottom: 20px;
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-family: Orbitron-Black;
    font-size: 1.5rem;
    color: #fec100;
    padding-left: 20px;
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

    .unstake-button {
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

const StakeButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 20px;

  .stake-button {
    width: 210px;
    height: 32px;
    padding-top: 2px;
    font-family: Orbitron-Medium;
    color: #161617;
    cursor: pointer;

    &:hover {
      color: #fec100;
    }
  }

  .button-approve-all {
    background-image: url("/static/images/bg/pages/stake/button-2.png");
    background-size: 100% 100%;
    padding-left: 40px;

    &:hover {
      background-image: url("/static/images/bg/pages/stake/button-2--active.png");
      color: #fec100;
    }
  }

  .button-stake-all {
    background-image: url("/static/images/bg/pages/stake/button-3.png");
    background-size: 100% 100%;
    padding-left: 18px;
    margin-left: -15px;

    &:hover {
      background-image: url("/static/images/bg/pages/stake/button-3--active.png");
    }
  }
`;

export default NFTStaking;
