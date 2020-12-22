import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import { toast } from "react-toastify";
import styled from "styled-components";

import { Tab, Nav } from "react-bootstrap";

import UnlockWalletPage from "./UnlockWalletPage";
import SectionTitle from "../component/SectionTitle";

import CardStaking from "../component/Card/CardStaking";
import CardStakingOld from "../component/Card/CardStakingOld";

import BoostStake from "../component/Farm/BoostStake";
import NFTStakingBoard from "../container/NFTStakingBoard";

import NFTStakingModal from "../container/NFTStakingModal";
import NFTStakingModalOld from "../container/NFTStakingModalOld";

import cardsActions from "../redux/cards/actions";
import oldNFTStakingActions from "../redux/oldNFTStaking/actions";

import {
  MAX_STAKED_CARD_COUNT,
  MAX_BONUS_STAKED_CARD_COUNT,
} from "../helper/constant";

const Stake = () => {
  const dispatch = useDispatch();

  const [unStakeLoading, setUnStakeLoading] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(0);

  const [stakeDlgOpen, setStakeDlgOpen] = useState(false);
  const [stakeDlgOpenOld, setStakeDlgOpenOld] = useState(false);

  const [approveLoading, setApproveLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  const cards = useSelector((state) => state.Cards.cards);
  const stakedCardTokens = useSelector((state) => state.OldNFTStaking.stakedCardTokens); // Staked card count

  const stakeCards = useMemo(() => {
    const ret = [];
    for (let i = 0; i < 4; i++) {
      ret.push({
        card: null,
        unStaked: true,
      });
    }

    let cnt = 0;
    for (let i = 0; i < stakedCardTokens.length; i++) {
      const cardIndex = cards.findIndex(
        (e) => Number(e.id) === Number(stakedCardTokens[i])
      );
      if (cardIndex >= 0) {
        ret[cnt].card = { ...cards[cardIndex] };
        ret[cnt].unStaked = false;
        cnt++;
      }
    }
    return ret;
  }, [cards, stakedCardTokens]);

  const bonusCard = { card: null, unStaked: true, bonus: true };

  useEffect(() => {
    dispatch(cardsActions.getCards());
    dispatch(oldNFTStakingActions.getStakedCards());
    dispatch(
      oldNFTStakingActions.getApprovedStatus((status) => {
        setApproved(status);
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (cards.length > 0) {
      dispatch(oldNFTStakingActions.getMyCardsCount(cards));
    }
  }, [dispatch, cards]);

  const handleUnStake = (cardId) => {
    setSelectedCardId(cardId);
    setUnStakeLoading(true);
    dispatch(
      oldNFTStakingActions.unStakeCard(cardId, (status) => {
        setSelectedCardId(0);
        setUnStakeLoading(false);
        if (status) {
          toast.success("Sucess");
          dispatch(oldNFTStakingActions.getStakedCards());
          dispatch(oldNFTStakingActions.getMyStakedStrength());
          dispatch(oldNFTStakingActions.getTotalStakedStrength());
          dispatch(oldNFTStakingActions.getClaimableNDR());
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

  const handleOpenStakeModalOld = () => {
    setStakeDlgOpenOld(true);
  };

  const handleCloseStakeModalOld = () => {
    setStakeDlgOpenOld(false);
  };

  const handleApproveAll = () => {
    setApproveLoading(true);
    dispatch(
      oldNFTStakingActions.approveAll(true, (status) => {
        setApproveLoading(false);
        if (status) {
          toast.success("Approved successfully");
          dispatch(
            oldNFTStakingActions.getApprovedStatus((status) => {
              setApproved(status);
            })
          );
        } else {
          toast.success("Approved failed");
        }
      })
    );
  };

  const { account } = useWallet();
  if (!account) {
    return <UnlockWalletPage />;
  }

  return (
    <StakePageContainer>
      {stakeDlgOpen && (
        <div className="modal-container">
          <NFTStakeModalMask />
          <NFTStakingModal onClose={handleCloseStakeModal} />
        </div>
      )}
      {stakeDlgOpenOld && (
        <div className="modal-container">
          <NFTStakeModalMask />
          <NFTStakingModalOld onClose={handleCloseStakeModalOld} />
        </div>
      )}
      <Tab.Container id="left-tabs-example" defaultActiveKey="new-pool">
        <Nav
          variant="pills"
          className="justify-content-center animation-fadeIn"
        >
          <Nav.Item>
            <Nav.Link className="nav_menu" eventKey="new-pool">
              Stake NFT & LP
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav_menu" eventKey="old-pool">
              Exit Old Pool
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="new-pool">
            <NFTStakingBoard />
            <MenuWrapper className="animation-fadeInRight">
              <SectionTitle title="Staked Hero, Support and Bonus cards" long />
            </MenuWrapper>
            <MenuWrapper className="animation-fadeInRight">
              <div className="menu-actions">
                <div className="menu-item selected-card-count">{`${
                  stakedCardTokens.length
                }/${
                  MAX_STAKED_CARD_COUNT + MAX_BONUS_STAKED_CARD_COUNT
                } Selected`}</div>
                <div className="menu-item unstake-button">Unstake selected</div>
              </div>
            </MenuWrapper>
            <CardContainer>
              {stakeCards.length > 0 &&
                stakeCards.map((c, index) => (
                  <CardStaking
                    key={`card_${index}`}
                    card={c.card}
                    unStaked={c.unStaked}
                    currentProcessingCardId={selectedCardId}
                    onUnStake={handleUnStake}
                    onStake={handleOpenStakeModal}
                    loadingUnStake={unStakeLoading}
                    approved={approved}
                    loadingApprove={approveLoading}
                    onApprove={handleApproveAll}
                  />
                ))}
              <CardStaking
                card={bonusCard.card}
                unStaked={bonusCard.unStaked}
                currentProcessingCardId={selectedCardId}
                onUnStake={handleUnStake}
                onStake={handleOpenStakeModal}
                loadingUnStake={unStakeLoading}
                approved={approved}
                loadingApprove={approveLoading}
                onApprove={handleApproveAll}
                bonus
              />
            </CardContainer>
            <StakeButtonWrapper>
              <div
                className="stake-button button-approve-all"
                role="button"
                onClick={(e) => handleApproveAll()}
              >
                Approve all
              </div>
              <div className="stake-button button-stake-all">Stake</div>
            </StakeButtonWrapper>
          </Tab.Pane>
          <Tab.Pane eventKey="old-pool">
            <NFTStakingBoard />
            <MenuWrapper className="animation-fadeInRight">
              <SectionTitle
                title={`${stakedCardTokens.length}/${MAX_STAKED_CARD_COUNT} Cards Staked`}
                long
              />
            </MenuWrapper>
            <CardContainer>
              {stakeCards.length > 0 &&
                stakeCards.map((c, index) => (
                  <CardStakingOld
                    key={`card_${index}`}
                    card={c.card}
                    unStaked={c.unStaked}
                    currentProcessingCardId={selectedCardId}
                    onUnStake={handleUnStake}
                    onStake={handleOpenStakeModalOld}
                    loadingUnStake={unStakeLoading}
                    approved={approved}
                    loadingApprove={approveLoading}
                    onApprove={handleApproveAll}
                  />
                ))}
            </CardContainer>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
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
  margin-bottom: 100px;

  .stake-button {
    width: 210px;
    height: 32px;
    padding-top: 6px;
    font-family: Orbitron-Black;
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
    padding-left: 80px;
    margin-left: -15px;

    &:hover {
      background-image: url("/static/images/bg/pages/stake/button-3--active.png");
    }
  }
`;

export default Stake;
