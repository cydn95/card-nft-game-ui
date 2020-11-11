import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "use-wallet";

import { toast } from "react-toastify";

import { Nav, Tab } from "react-bootstrap";

import SectionTitle from "../component/SectionTitle";
import Card from "../component/Card";
import { Heroes } from "../helper/dummy";
import {
  STAKE_MIN_LIMIT,
  STAKE_MAX_LIMIT,
  STAKE_RESPONSE,
} from "../helper/constant";
import { convertFromWei } from "../helper/utils";

import UnlockWalletPage from "./UnlockWalletPage";
import Stake from "../component/Farm/Stake";
import Deposit from "../component/Farm/Deposit";
import Withdraw from "../component/Farm/Withdraw";

import pageActions from "../redux/page/actions";
import cardsActions from "../redux/cards/actions";

const DLG_STAKE = 0;
const DLG_DEPOSIT = 1;
const DLG_WITHDRAW = 2;

const GetHeroes = () => {
  const dispatch = useDispatch();

  // 0: stake 1: deposit 2: withdraw
  const [openStatus, setOpenStatus] = useState(DLG_STAKE);

  const [loading, setLoading] = useState(false);

  const balance = useSelector((state) => state.Page.uniBalance);
  const stakedAmount = useSelector((state) => state.Page.lpBalance);
  const earningAmount = useSelector((state) => state.Page.lpEarning);

  const cards = useSelector((state) => state.Cards.cards);

  const init = useCallback(() => {
    dispatch(pageActions.getUNIBalance());
    dispatch(pageActions.getLPBalance());
    dispatch(pageActions.getLPEarning());
  }, [dispatch]);

  init();

  useEffect(() => {
    dispatch(cardsActions.getCards());
  }, [dispatch]);

  const handleBuyCardEth = (cardId, hash) => {};

  const handleBuyCardHash = (cardId, eth) => {
    dispatch(pageActions.buyHeroCardEth(cardId, eth, callbackBuyCard));
  };

  /*
    Deposit(Stake)
  */
  const handleOpenDeposit = () => {
    dispatch(pageActions.getUNIBalance());
    setOpenStatus(DLG_DEPOSIT);
  };

  const handleDeposit = (amount) => {
    if (checkAmount(amount)) {
      setLoading(true);
      dispatch(pageActions.depositLP(amount, callbackDeposit));
    }
  };

  const callbackDeposit = (status) => {
    console.log("callback deposit");
    setLoading(false);
    if (status === STAKE_RESPONSE.INSUFFICIENT) {
      toast.error("Insufficient balance...");
    } else if (status === STAKE_RESPONSE.SHOULD_APPROVE) {
      toast.error("You should approve first");
    } else if (status === STAKE_RESPONSE.SHOULD_STAKE) {
      toast.error("Staked amount is not enough");
    } else if (status === STAKE_RESPONSE.SUCCESS) {
      toast.success("Success");
      setOpenStatus(DLG_STAKE);
      init();
    } else {
      toast.error("Unexpected error...");
    }
  };

  const handleApprove = () => {
    setLoading(true);
    dispatch(
      pageActions.approveLP((status) => {
        setLoading(false);
        if (status === STAKE_RESPONSE.SUCCESS) {
          toast.success("Approved successfully");
        } else if (status === STAKE_RESPONSE.INSUFFICIENT) {
          toast.error("Failed. No balance...");
        } else {
          toast.error("Failed...");
        }
      })
    );
  };

  // ************************************************************

  const handleOpenWithdraw = () => {
    dispatch(pageActions.getLPBalance());
    setOpenStatus(DLG_WITHDRAW);
  };

  const handleWithdraw = (amount) => {
    if (checkAmount(amount)) {
      setLoading(true);
      dispatch(pageActions.withdrawLP(amount, callbackDeposit));
    }
  };

  // ***********************************************************
  const handleOpenStake = () => {
    setLoading(false);
    setOpenStatus(DLG_STAKE);
  };

  const checkAmount = (amount) => {
    if (isNaN(amount)) {
      toast.error("Amount should be a number");
      return false;
    }
    if (parseFloat(amount) < parseFloat(STAKE_MIN_LIMIT)) {
      toast.error(`Amount should be at least ${STAKE_MIN_LIMIT}`);
      return false;
    }
    if (parseFloat(amount) > parseFloat(STAKE_MAX_LIMIT)) {
      toast.error(`Amount can not be more than ${STAKE_MAX_LIMIT}`);
      return false;
    }

    return true;
  };

  const callbackBuyCard = (status) => {};

  const { account, connect } = useWallet();

  if (!account) {
    return <UnlockWalletPage />;
  }

  const StakingBoard = () => (
    <>
      {openStatus === DLG_STAKE && (
        <Stake
          hashes={convertFromWei(earningAmount)}
          staked={convertFromWei(stakedAmount)}
          balance={convertFromWei(balance)}
          onOpenDeposit={handleOpenDeposit}
          onOpenWithdraw={handleOpenWithdraw}
        />
      )}
      {openStatus === DLG_DEPOSIT && (
        <Deposit
          loading={loading}
          balance={convertFromWei(balance)}
          staked={convertFromWei(stakedAmount)}
          onClose={handleOpenStake}
          onApprove={handleApprove}
          onDeposit={handleDeposit}
        />
      )}
      {openStatus === DLG_WITHDRAW && (
        <Withdraw
          loading={loading}
          staked={convertFromWei(stakedAmount)}
          onClose={handleOpenStake}
          onWithdraw={handleWithdraw}
        />
      )}
    </>
  );

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
