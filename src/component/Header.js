import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const HeaderWrapper = styled.div`
  .menu-nav {
    .menu-item {
      height: ${props => props.theme.widthRatio * 63}px;
      margin-right: -${props => props.theme.widthRatio * 30}px;
      text-align: center;
      background-size: 100% 100%;

      .menu-link {
        display: block;
        height: 100%;
        text-decoration: none;

        .menu-text {
          color: #000000;
          font-size: ${props => props.theme.widthRatio * 26}px;
          font-family: Orbitron-Medium;
          text-shadow: ${props => props.theme.widthRatio * 5}px
           						 ${props => props.theme.heightRatio * 5}px
           						 ${props => props.theme.widthRatio * 3}px
           						 #27787580;
        }
      }

      &:nth-of-type(1) {
        background-image: url('/static/images/bg/components/header/menu-item-1-bg.png');
        width: ${props => props.theme.widthRatio * 236}px;

        &.active {
          background-image: url('/static/images/bg/components/header/menu-item-1-bg--active.png');
          width: 239px;
        }
      }
      
      &:nth-of-type(2) {
        background-image: url('/static/images/bg/components/header/menu-item-2-bg.png');
        width: ${props => props.theme.widthRatio * 212}px;

        &.active {
          background-image: url('/static/images/bg/components/header/menu-item-2-bg--active.png');
        }
      }
      
      &:nth-of-type(3) {
        background-image: url('/static/images/bg/components/header/menu-item-3-bg.png');
        width: ${props => props.theme.widthRatio * 250}px;
      }
      
      &:nth-of-type(4) {
        background-image: url('/static/images/bg/components/header/menu-item-4-bg.png');
        width: ${props => props.theme.widthRatio * 292}px;
      }
      
      &:nth-of-type(5) {
        background-image: url('/static/images/bg/components/header/menu-item-5-bg.png');
        width: ${props => props.theme.widthRatio * 339}px;
      }

      &.active {
        .menu-link {
          .menu-text {
            color: #fec100;
            font-weight: 900;
          }
        }
      }
    }
  }
`;

const Header = () => {
	const location = useLocation();
	const getCurrentUrl = (location) => {
		return location.pathname.split(/[?#]/)[0];
	};

	const checkIsActive = (location, url) => {
		const current = getCurrentUrl(location);
		if (!current || !url) {
			return  false;
		}

		if (current === url) {
			return  true;
		}

		return current.indexOf(url) > -1;
	};

	const getMenuItemActive = (url) => {
		return checkIsActive(location, url) ? "active"
			: "";
	};

	return (
		<HeaderWrapper className='header-menu d-flex justify-content-center animation-stretchRight'>
			<ul className='menu-nav d-flex list-unstyled'>
				<li className={`menu-item ${ getMenuItemActive('my-cards') } hover-effect2`}>
					<NavLink className='menu-link' to="/my-cards">
						<span className="menu-text">My Cards</span>
					</NavLink>
				</li>
				<li className={`menu-item ${ getMenuItemActive('stake') } hover-effect2`}>
					<NavLink className='menu-link' to="/stake">
						<span className="menu-text">Stake</span>
					</NavLink>
				</li>
				<li className={`menu-item ${ getMenuItemActive('get-heroes') } hover-effect2`}>
					<NavLink className='menu-link' to="/get-heroes">
						<span className="menu-text">Get Heroes</span>
					</NavLink>
				</li>
				<li className={`menu-item ${ getMenuItemActive('fight') } hover-effect2`}>
					<NavLink className='menu-link' to="/fight">
						<span className="menu-text">Fight Villains</span>
					</NavLink>
				</li>
				<li className={`menu-item ${ getMenuItemActive('unlock-wallet') } hover-effect2`}>
					<NavLink className='menu-link' to="/unlock-wallet">
						<span className="menu-text">Unlock Wallet</span>
					</NavLink>
				</li>
			</ul>
		</HeaderWrapper>
	)
};

export default Header;
