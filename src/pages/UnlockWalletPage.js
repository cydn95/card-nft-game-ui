import React, { useEffect } from "react";
import { withRouter } from "react-router";
// import { useSelector, useDispatch } from "react-redux";
import { useWallet } from "use-wallet";

import pageActions from "../redux/page/actions";

import styled from "styled-components";

const UnlockWallet = ({ history }) => {
  // const dispatch = useDispatch();
  const { account, connect } = useWallet();

  // const ndrBalance = useSelector((state) => state.Page.ndrBalance);

  // useEffect(() => {
  //   dispatch(pageActions.getNDRBalance());
  // }, [dispatch]);

  useEffect(() => {
    if (account) {
      history.push("/get-heroes");
    }
  }, [account, history]);

  return (
    <>
      {!account && (
        <UnlockWalletWrapper>
          <div
            role="button"
            className="meta-mask d-flex flex-column align-items-center justify-content-center"
            onClick={(e) => connect("injected")}
          >
            <img src={`/static/images/icons/meta-mask.png`} alt="meta-mask" />
            <p>
              Connect to your <span>MetaMask</span> wallet
            </p>
          </div>
          <div
            role="button"
            onClick={(e) => connect("walletconnect")}
            className="wallet-connect d-flex flex-column align-items-center justify-content-center"
          >
            <img
              src={`/static/images/icons/wallet-connect.png`}
              alt="wallet-connect"
            />
            <p>
              Scan with <span>WalletConnect</span> to connect
            </p>
          </div>
        </UnlockWalletWrapper>
      )}
      {/* {account && (
        <BalanceWrapper>
          <div
            role="button"
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <h1>NDR BALANCE</h1>
            <h2>{(ndrBalance / Math.pow(10, 18)).toFixed(4)}</h2>
          </div>
        </BalanceWrapper>
      )} */}
    </>
  );
};

const BalanceWrapper = styled.div`
  margin-top: 180px;
  color: #fff;
  font-weight: 700;

  h2 {
    font-size: 4rem;
  }
`;
const UnlockWalletWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin-top: -101px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    width: 895px;
    height: 270px;
    background-size: 100% 100%;
    cursor: pointer;

    p {
      font-size: 20px;
      font-family: Orbitron-Medium;
    }

    span {
      font-size: 24px;
      font-family: Orbitron-Black;
      color: ${(props) => props.theme.palette.secondary.main};
    }

    &:first-of-type {
      background-image: url("/static/images/bg/pages/unlock-wallet/meta-mask.png");
      text-shadow: 10px 10px 10px
        ${(props) =>
          props.theme.darken(props.theme.palette.secondary.main, 0.57)};

      p {
        color: #ff24c8;
      }
    }

    &:last-of-type {
      background-image: url("/static/images/bg/pages/unlock-wallet/wallet-connect.png");
      text-shadow: 10px 10px 10px
        ${(props) => props.theme.darken(props.theme.palette.primary.main, 0.57)};

      p {
        color: ${(props) => props.theme.palette.primary.main};
      }
    }
  }
`;

export default withRouter(UnlockWallet);
