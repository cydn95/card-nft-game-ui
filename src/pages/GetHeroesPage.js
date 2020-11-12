import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "use-wallet";

import { Nav, Tab } from "react-bootstrap";

import SectionTitle from "../component/SectionTitle";
import Card from "../component/Card";
import StakingBoard from "../container/StakingBoard";

import UnlockWalletPage from "./UnlockWalletPage";

import cardsActions from "../redux/cards/actions";

const GetHeroes = () => {
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.Cards.cards);

  useEffect(() => {
    dispatch(cardsActions.getCards());
  }, [dispatch]);

  const handleBuyCardEth = (cardId, hash) => {};

  const handleBuyCardHash = (cardId, eth) => {
    dispatch(cardsActions.buyHeroCardEth(cardId, eth, callbackBuyCard));
  };

  const callbackBuyCard = (status) => {};

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
            <div className="d-flex flex-wrap justify-content-center pb-3">
              {cards
                .filter((c) => c.series === "People")
                .map((c) => (
                  <Card
                    key={`card_${c.id}`}
                    card={c}
                    onBuyCardEth={handleBuyCardEth}
                    onBuyCardHash={handleBuyCardHash}
                    isHero={true}
                    payed={true}
                    eth={0.5}
                  />
                ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="items">
            <StakingBoard />
            <div className="section-title d-flex justify-content-center animation-fadeInRight">
              <SectionTitle title={"Support"} />
            </div>
            <div className="d-flex flex-wrap justify-content-center pb-3">
              {cards
                .filter((c) => c.series === "Support")
                .map((c) => (
                  <Card
                    key={`card_${c.id}`}
                    card={c}
                    onBuyCardEth={handleBuyCardEth}
                    onBuyCardHash={handleBuyCardHash}
                    isHero={true}
                    payed={true}
                    eth={0.5}
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
