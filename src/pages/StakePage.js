import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import styled from "styled-components";

import { Tab, Nav } from "react-bootstrap";

import UnlockWalletPage from "./UnlockWalletPage";

import NFTStaking from "../container/NFTStakingPage"
import NFTStakingOld from "../container/NFTStakingPageOld"

import cardsActions from "../redux/cards/actions";

const Stake = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cardsActions.getCards());
  }, [dispatch]);

  const { account } = useWallet();
  if (!account) {
    return <UnlockWalletPage />;
  }

  return (
    <StakePageContainer>
      <Tab.Container id="left-tabs-example" defaultActiveKey="new-pool">
        <Nav
          variant="pills"
          className="justify-content-center animation-fadeIn"
        >
          <Nav.Item>
            <Nav.Link className="nav_menu" eventKey="new-pool">
              Stake NFT
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
            <NFTStaking />
          </Tab.Pane>
          <Tab.Pane eventKey="old-pool">
            <NFTStakingOld />
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

export default Stake;
