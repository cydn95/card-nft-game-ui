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

import cardsActions from "../redux/cards/actions";

import { MAX_STAKED_CARD_COUNT } from "../helper/constant";

const Stake = () => {
  const dispatch = useDispatch();

  const [unStakeLoading, setUnStakeLoading] = useState(false);
  const [stakeDlgOpen, setStakeDlgOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(0);

  const [approveLoading, setApproveLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  const cards = useSelector((state) => state.Cards.cards);
  const stakedCardTokens = useSelector((state) => state.Cards.stakedCardTokens);

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
    dispatch(cardsActions.getStakedCards());
    dispatch(
      cardsActions.getApprovedStatus((status) => {
        setApproved(status);
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (cards.length > 0) {
      dispatch(cardsActions.getMyCardsCount(cards));
    }
  }, [dispatch, cards]);

  const handleUnStake = (cardId) => {
    setSelectedCardId(cardId);
    setUnStakeLoading(true);
    dispatch(
      cardsActions.unStakeCard(cardId, (status) => {
        setSelectedCardId(0);
        setUnStakeLoading(false);
        if (status) {
          toast.success("Sucess");
          dispatch(cardsActions.getStakedCards());
          dispatch(cardsActions.getMyStakedStrength());
          dispatch(cardsActions.getTotalStakedStrength());
          dispatch(cardsActions.getClaimableNDR());
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
      cardsActions.approveAll(true, (status) => {
        setApproveLoading(false);
        if (status) {
          toast.success("Approved successfully");
          dispatch(
            cardsActions.getApprovedStatus((status) => {
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
      <Tab.Container id="left-tabs-example" defaultActiveKey="old-pool">
        <Nav
          variant="pills"
          className="justify-content-center animation-fadeIn"
        >
          <Nav.Item>
            <Nav.Link className="nav_menu" eventKey="new-pool">Stake NFT & LP</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav_menu" eventKey="old-pool">Exit Old Pool</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="new-pool">
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
            <MenuWrapper className="animation-fadeInRight">
              <SectionTitle title="Stake LP tokens" long />
              <h2>You need to stake at least 1 Hero or Support NFT card to stake LP tokens</h2>
            </MenuWrapper>
            <div
              className="d-flex flex-wrap justify-content-center"
              style={{ paddingBottom: 100 }}
            >
              <BoostStake token="NDR" />
              <BoostStake token="LP" fee={2} />
            </div>
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
                    onStake={handleOpenStakeModal}
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
  
`

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
  padding-bottom: 100px;
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
`;

export default Stake;
