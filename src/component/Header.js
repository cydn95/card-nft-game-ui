import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useWallet } from "use-wallet";
import styled from "styled-components";
import lpstakingActions from "../redux/lpstaking/actions";
import { NavLink } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const getCurrentUrl = (location) => {
    return location.pathname.split(/[?#]/)[0];
  };

  const checkIsActive = (location, url) => {
    const current = getCurrentUrl(location);

    if (!current || !url) {
      return false;
    }

    if (current === url || (current === "/" && url === "home")) {
      return true;
    }

    return current.indexOf(url) > -1;
  };

  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "active" : "";
  };

  const dispatch = useDispatch();
  const { account } = useWallet();

  const ndrBalance = useSelector((state) => state.LpStaking.ndrBalance);

  useEffect(() => {
    dispatch(lpstakingActions.getNDRBalance());
  }, [dispatch, account]);

  return (
    <HeaderWrapper className="header-menu d-flex justify-content-center animation-stretchRight">
      <ul className="menu-nav d-flex list-unstyled">
        <li className={`menu-item ${getMenuItemActive("home")} hover-effect2`}>
          <NavLink className="menu-link" to="home">
            <span className="menu-text">Home</span>
          </NavLink>
        </li>
        <li
          className={`menu-item ${getMenuItemActive("my-cards")} hover-effect2`}
        >
          <a
            className="menu-link"
            href="https://opensea.io/account?search=%7B%22query%22%3A%22noderunners%22%2C%22resultModel%22%3A%22ASSETS%22%2C%22sortBy%22%3A%22LAST_TRANSFER_DATE%22%7D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="menu-text">My Cards</span>
          </a>
          {/* <a
            className="menu-link"
            href="https://rinkeby.opensea.io/accounts/0x1Ca43437430d1845F5Ff43bf73d36568d00740C7?search=%7B%22query%22%3A%22noderunners%22%2C%22sortBy%22%3A%22LISTING_DATE%22%7D "
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="menu-text">My Cards</span>
          </a> */}
        </li>
        <li className={`menu-item ${ getMenuItemActive('stake') } hover-effect2`}>
					<NavLink className='menu-link' to="/stake">
						<span className="menu-text">Stake</span>
					</NavLink>
				</li>
        <li
          className={`menu-item ${getMenuItemActive(
            "get-heroes"
          )} hover-effect2`}
        >
          <NavLink className="menu-link" to="/get-heroes">
            <span className="menu-text">Get Heroes</span>
          </NavLink>
        </li>
        {/* <li className={`menu-item ${ getMenuItemActive('fight-villains') } hover-effect2`}>
					<NavLink className='menu-link' to="/fight-villains">
						<span className="menu-text">Fight Villains</span>
					</NavLink>
				</li> */}
        <li
          className={`menu-item ${getMenuItemActive(
            "unlock-wallet"
          )} hover-effect2`}
        >
          <NavLink className="menu-link" to={account ? "#" : "/unlock-wallet"}>
            <span className="menu-text">
              {account ? (
                <span className="menu-text">
                  <strong>{`${(ndrBalance / Math.pow(10, 18)).toFixed(
                    4
                  )} `}</strong>
                  NDR
                </span>
              ) : (
                "Unlock Wallet"
              )}
            </span>
          </NavLink>
        </li>
      </ul>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  .menu-nav {
    margin-left: -18px;
    margin-bottom: 15px;

    .menu-item {
      height: ${(props) => props.theme.heightRatio * 63}px;
      margin-right: -${(props) => props.theme.widthRatio * 30}px;
      text-align: center;
      background-size: 100% 100%;

      .menu-link {
        height: 100%;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;

        .menu-text {
          color: #000000;
          font-size: ${(props) => props.theme.widthRatio * 26}px;
          line-height: ${(props) => props.theme.heightRatio * 38}px;
          font-family: Orbitron-Medium;
          margin-left: -${(props) => props.theme.widthRatio * 5}px;
          margin-top: -${(props) => props.theme.heightRatio * 5}px;
          display: inline-block;
          text-shadow: ${(props) => props.theme.widthRatio * 5}px
            ${(props) => props.theme.heightRatio * 5}px
            ${(props) => props.theme.widthRatio * 3}px
            ${(props) => props.theme.darken("#277875", 0.5)};
        }
      }

      &:nth-of-type(1) {
        background-image: url("/static/images/bg/components/header/menu-item-1-bg.png");
        width: ${(props) => props.theme.widthRatio * 236}px;

        &.active {
          background-image: url("/static/images/bg/components/header/menu-item-1-bg--active.png");
        }
      }

      &:nth-of-type(2) {
        background-image: url("/static/images/bg/components/header/menu-item-2-bg.png");
        width: ${(props) => props.theme.widthRatio * 242}px;

        &.active {
          background-image: url("/static/images/bg/components/header/menu-item-2-bg--active.png");
        }
      }

      &:nth-of-type(3) {
        background-image: url("/static/images/bg/components/header/menu-item-3-bg.png");
        width: ${(props) => props.theme.widthRatio * 250}px;

        &.active {
          background-image: url("/static/images/bg/components/header/menu-item-3-bg--active.png");
        }
      }

      &:nth-of-type(4) {
        background-image: url("/static/images/bg/components/header/menu-item-4-bg.png");
        width: ${(props) => props.theme.widthRatio * 292}px;

        &.active {
          background-image: url("/static/images/bg/components/header/menu-item-4-bg--active.png");
        }
      }

      &:nth-of-type(5) {
        background-image: url("/static/images/bg/components/header/menu-item-5-bg.png");
        width: ${(props) => props.theme.widthRatio * 339}px;

        &.active {
          background-image: url("/static/images/bg/components/header/menu-item-5-bg--active.png");
        }
      }

      &.active {
        .menu-link {
          .menu-text {
            color: #fec100;
            font-weight: 900;
          }
        }
      }

      @media (max-width: 1080px) {
        &:nth-of-type(1) {
          background-image: url("/static/images/bg/components/header/menu-item-1-bg.png");
          width: ${(props) => props.theme.widthRatio * 237}px;
        }

        &:nth-of-type(2) {
          background-image: url("/static/images/bg/components/header/menu-item-5-bg.png");
          width: ${(props) => props.theme.widthRatio * 307}px;
        }
      }
    }
  }
`;

export default Header;
