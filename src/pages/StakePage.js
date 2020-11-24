import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import { toast } from "react-toastify";
import styled from "styled-components";

import { Tab, Nav } from "react-bootstrap";

import UnlockWalletPage from "./UnlockWalletPage";
import SectionTitle from "../component/SectionTitle";
import CardStaking from "../component/Card/CardStaking";
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
    <>
      {stakeDlgOpen && (
        <div className="modal-container">
          <NFTStakeModalMask />
          <NFTStakingModal onClose={handleCloseStakeModal} />
        </div>
      )}
      <Tab.Container id="left-tabs-example" defaultActiveKey="heroes">
        <Nav
          variant="pills"
          className="justify-content-center animation-fadeIn"
        >
          <Nav.Item>
            <Nav.Link eventKey="heroes">Stake Heroes</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="villains">Lock Villains</Nav.Link>
          </Nav.Item>
        </Nav>
        <NFTStakingBoard />
        <Tab.Content>
          <Tab.Pane eventKey="heroes">
            <div className="section-title d-flex justify-content-center animation-fadeInRight">
              <SectionTitle
                title={`${stakedCardTokens.length}/${MAX_STAKED_CARD_COUNT} Card Staked`}
                long
              />
            </div>
            <div
              className="d-flex flex-wrap justify-content-center"
              style={{ paddingBottom: 100 }}
            >
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
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="villains"></Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

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

export default Stake;
