import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import { toast } from "react-toastify";

import { Nav, Tab } from "react-bootstrap";

import SectionTitle from "../component/SectionTitle";
import Card from "../component/Card";
import StakingBoard from "../container/StakingBoard";

import UnlockWalletPage from "./UnlockWalletPage";

import cardsActions from "../redux/cards/actions";
import lpstakingActions from "../redux/lpstaking/actions";
import { RESPONSE, CARD_TYPE } from "../helper/constant";

const GetHeroes = () => {
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.Cards.cards);
  const cardPrice = useSelector((state) => state.Cards.cardPrice);

  const [isBuyingHash, setBuyingHash] = useState(false);
  const [isBuyingEth, setBuyingEth] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(0);

  // Timer to get price and minted count frequently - 30s
  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      dispatch(cardsActions.getMintedCount(cards));
      dispatch(cardsActions.getCardsPrice());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch, cards]);

  useEffect(() => {
    dispatch(cardsActions.getCards());
    dispatch(cardsActions.getCardsPrice());
  }, [dispatch]);

  const handleBuyCardEth = (card) => {
    setBuyingEth(true);
    setSelectedCardId(card.id);
    dispatch(cardsActions.buyHeroCardEth(card, callbackBuyCardEth));
  };

  const handleBuyCardHash = (card) => {
    setBuyingHash(true);
    setSelectedCardId(card.id);
    dispatch(cardsActions.buyHeroCardHash(card, callbackBuyCardHash));
  };

  const callbackBuyCardHash = (status) => {
    setBuyingHash(false);
    setSelectedCardId(0);
    if (status === RESPONSE.SUCCESS) {
      toast.success("Success");
      dispatch(lpstakingActions.getEarningAmount());
      dispatch(cardsActions.getMintedCount(cards));
    } else if (status === RESPONSE.INSUFFICIENT) {
      toast.error("You have not enough Hash");
    } else {
      toast.error("Failed...");
    }
  };

  const callbackBuyCardEth = (status) => {
    setBuyingEth(false);
    setSelectedCardId(0);
    if (status === RESPONSE.SUCCESS) {
      toast.success("Success");
      dispatch(cardsActions.getMintedCount(cards));
    } else if (status === RESPONSE.INSUFFICIENT) {
      toast.error("You have not enough ETH");
    } else {
      toast.error("Failed...");
    }
  };

  const { account } = useWallet();

  if (!account) {
    return <UnlockWalletPage />;
  }

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="heroes">
        <Nav
          variant="pills"
          className="justify-content-center animation-fadeIn"
        >
          <Nav.Item>
            <Nav.Link eventKey="heroes">Heroes</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="items">Support</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="heroes">
            <StakingBoard />
            <div className="section-title d-flex justify-content-center animation-fadeInRight">
              <SectionTitle title={"Heroes"} />
            </div>
            <div
              className="d-flex flex-wrap justify-content-center"
              style={{ paddingBottom: 100 }}
            >
              {cards
                .filter((c) => CARD_TYPE.HERO.includes(c.series))
                .map((c) => (
                  <Card
                    key={`card_${c.id}`}
                    card={c}
                    onBuyCardEth={handleBuyCardEth}
                    onBuyCardHash={handleBuyCardHash}
                    isHero={true}
                    payed={true}
                    eth={cardPrice[c.rarity.weight].hero}
                    currentProcessingCardId={selectedCardId}
                    loadingHash={isBuyingHash}
                    loadingEth={isBuyingEth}
                  />
                ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="items">
            <StakingBoard />
            <div className="section-title d-flex justify-content-center animation-fadeInRight">
              <SectionTitle title={"Support"} />
            </div>
            <div
              className="d-flex flex-wrap justify-content-center"
              style={{ paddingBottom: 100 }}
            >
              {cards
                .filter((c) => CARD_TYPE.SUPPORT.includes(c.series))
                .map((c) => (
                  <Card
                    key={`card_${c.id}`}
                    card={c}
                    onBuyCardEth={handleBuyCardEth}
                    onBuyCardHash={handleBuyCardHash}
                    isHero={false}
                    payed={true}
                    eth={cardPrice[c.rarity.weight].support}
                    currentProcessingCardId={selectedCardId}
                    loadingHash={isBuyingHash}
                    loadingEth={isBuyingEth}
                  />
                ))}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default GetHeroes;
