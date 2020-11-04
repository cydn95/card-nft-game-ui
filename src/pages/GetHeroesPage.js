import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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

import Stake from "../component/Farm/Stake";
import Deposit from "../component/Farm/Deposit";
import Withdraw from "../component/Farm/Withdraw";

import pageActions from "../redux/page/actions";

const DLG_STAKE = 0;
const DLG_DEPOSIT = 1;
const DLG_WITHDRAW = 2;

const GetHeroes = () => {
  const dispatch = useDispatch();

  // 0: stake 1: deposit 2: withdraw
  const [openStatus, setOpenStatus] = useState(DLG_STAKE);
  const uniBalance = useSelector((state) => state.Page.uniBalance);
  const lpBalance = useSelector((state) => state.Page.lpBalance);
  const lpEarning = useSelector((state) => state.Page.lpEarning);

  useEffect(() => {
    dispatch(pageActions.getLPBalance());
    dispatch(pageActions.getLPEarning());
  }, [dispatch]);

  const handleBuyCardEth = (cardId, hash) => {
    console.log("cardId", cardId);
    console.log("hash", hash);
  };

  const handleBuyCardHash = (cardId, eth) => {
    console.log("cardId", cardId);
    console.log("eth", eth);

    dispatch(pageActions.buyHeroCardEth(cardId, eth, callbackBuyCard));
  };

  const handleOpenDeposit = () => {
    dispatch(pageActions.getUNIBalance());
    setOpenStatus(DLG_DEPOSIT);
  };

  const handleOpenWithdraw = () => {
    dispatch(pageActions.getLPBalance());
    setOpenStatus(DLG_WITHDRAW);
  };

  const handleOpenStake = () => {
    setOpenStatus(DLG_STAKE);
  };

  const handleDeposit = (amount) => {
    if (checkAmount(amount)) {
      dispatch(pageActions.depositLP(amount, callbackDeposit));
    }
  };

  const callbackDeposit = (status) => {
    if (status === STAKE_RESPONSE.INSUFFICIENT) {
      toast.error("Insufficient balance...");
    } else if (status === STAKE_RESPONSE.ERROR) {
      toast.error("Unexpected error...");
    } else if (status === STAKE_RESPONSE.SUCCESS) {
      toast.success("Success");
      dispatch(pageActions.getUNIBalance());
      dispatch(pageActions.getLPBalance());
      dispatch(pageActions.getLPEarning());
      setOpenStatus(DLG_STAKE);
    }
  };

  const handleWithdraw = (amount) => {
    console.log(amount);
    if (checkAmount(amount)) {
      dispatch(pageActions.withdrawLP(amount, callbackDeposit));
    }
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
            {openStatus === DLG_STAKE && (
              <Stake
                hashes={lpEarning}
                staked={lpBalance}
                onOpenDeposit={handleOpenDeposit}
                onOpenWithdraw={handleOpenWithdraw}
              />
            )}
            {openStatus === DLG_DEPOSIT && (
              <Deposit
                uniBalance={uniBalance}
                onClose={handleOpenStake}
                onDeposit={handleDeposit}
              />
            )}
            {openStatus === DLG_WITHDRAW && (
              <Withdraw
                lpBalance={lpBalance}
                onClose={handleOpenStake}
                onWithdraw={handleWithdraw}
              />
            )}
            <div className="section-title d-flex justify-content-center animation-fadeInRight">
              <SectionTitle title={"Heroes"} />
            </div>
            <div className="d-flex flex-wrap justify-content-center">
              {Heroes.map((c) => (
                <Card
                  key={`card_${c.id}`}
                  card={c.card}
                  cardId={c.id}
                  cardGrid={c.cardGrid}
                  onBuyCardEth={handleBuyCardEth}
                  onBuyCardHash={handleBuyCardHash}
                />
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="items"></Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default GetHeroes;
