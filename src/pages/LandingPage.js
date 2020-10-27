import React from "react";
import styled from "styled-components";
import ReactFullpage from "@fullpage/react-fullpage";
import Header from "../component/Header";

const LandingPageWrapper = styled.div`
	.fullpage-wrapper {
		> div {
			background-size: 100% 100%;
	
			.fp-tableCell {
				display: block;
				height: 100vh !important;
			}
	
			h1 {
				font-size: ${props => props.theme.widthRatio * 40}px;
				color: #fec100;
				font-family: Orbitron-Black;
				text-shadow: ${props => props.theme.widthRatio * 7}px
				 						 ${props => props.theme.heightRatio * 7}px
				 						 ${props => props.theme.widthRatio * 10}px
				 						 #00000091;
				text-transform: uppercase;
			}
		
			p {
				font-size: ${props => props.theme.widthRatio * 30}px;
				color: #80f1ed;
				font-family: Orbitron-Medium;
				text-shadow: ${props => props.theme.widthRatio * 7}px
										 ${props => props.theme.heightRatio * 7}px
										 ${props => props.theme.widthRatio * 10}px;
				line-height: 36px;
				
				a {
					color: #80f1ed;
				}
			}
	
			img {
				width: fit-content;
			}
	
			button {
				background-image: url("/static/images/bg/pages/landing-page/button-bg.png");
				background-size: 100%;
				background-color: transparent;
				width: ${props => props.theme.widthRatio * 330}px;
				height: ${props => props.theme.widthRatio * 88}px;
				border: none;
				font-size: ${props => props.theme.widthRatio * 38}px;
				color: #fec100;
				font-family: Orbitron-Black;
				text-shadow: 0
				 						 0
				 						 ${props => props.theme.widthRatio * 7}px
				 						 #00000059;
				padding-top: ${props => props.theme.heightRatio * 7}px;
				outline: none;
			}
		}
		
		.section {
			height: 100vh !important;
		}
	
		.section-1 {
			background-image: url("/static/images/bg/pages/landing-page/landing-page-section-1-bg.png");
	
			.logo {
				width: ${props => props.theme.widthRatio * 540}px;
				height: ${props => props.theme.heightRatio * 182}px;
				margin-left: ${props => props.theme.widthRatio * 79}px;
				margin-top: ${props => props.theme.heightRatio * 7}px;
			}
	
			h1 {
				margin-top: ${props => props.theme.heightRatio * 144}px;
				margin-bottom: ${props => props.theme.heightRatio * 27}px;
				max-width: ${props => props.theme.widthRatio * 895}px;
			}
	
			p:first-of-type {
				max-width: ${props => props.theme.widthRatio * 958}px;
				margin-bottom: ${props => props.theme.heightRatio * 36}px;
			}
	
			button {
				margin-top: ${props => props.theme.heightRatio * 33}px;
			}
		}
	
		.section-2 {
			background-image: url("/static/images/bg/pages/landing-page/landing-page-section-2-bg.png");
	
			.fp-tableCell {
				padding-left: ${props => props.theme.widthRatio * 99}px;
				padding-top: ${props => props.theme.heightRatio * 305}px;
			}
	
			h1 {
				max-width: ${props => props.theme.widthRatio * 420}px;
				margin-bottom: ${props => props.theme.heightRatio * 35}px;
			}
	
			p {
				max-width: ${props => props.theme.widthRatio * 635}px;
			}
	
			button {
				margin-top: ${props => props.theme.heightRatio * 197}px;
				margin-left: -${props => props.theme.widthRatio * 17}px;
			}
		}
	
		.section-3 {
			background-image: url("/static/images/bg/pages/landing-page/landing-page-section-3-bg.png");
	
			.fp-tableCell {
				padding-left: ${props => props.theme.widthRatio * 71}px;
				padding-top: ${props => props.theme.heightRatio * 91}px;
			}
	
			h1 {
				max-width: ${props => props.theme.widthRatio * 520}px;
				margin-bottom: ${props => props.theme.heightRatio * 37}px;
			}
	
			p {
				max-width: ${props => props.theme.widthRatio * 880}px;
				margin-bottom: ${props => props.theme.heightRatio * 103}px;
			}
	
			button {
				margin-left: -${props => props.theme.widthRatio * 20}px;
			}
		}
	
		.section-4 {
			background-image: url("/static/images/bg/pages/landing-page/landing-page-section-4-bg.png");
	
			.fp-tableCell {
				display: flex;
				flex-flow: column;
				align-items: center;justify-content: center;
			}
	
			.icons-wrapper {
				max-width: ${props => props.theme.widthRatio * 1416}px;
	
				div:first-of-type {
					max-width: ${props => props.theme.widthRatio * 650}px;
				}
	
				div:last-of-type {
					max-width: ${props => props.theme.widthRatio * 625}px;
				}
			}
	
			img {
				margin-bottom: ${props => props.theme.heightRatio * 37}px;
			}
	
			h1 {
				margin-bottom: ${props => props.theme.heightRatio * 45}px;
			}
	
			button {
				margin-top: ${props => props.theme.heightRatio * 39}px;
			}
		}
	
		.section-5 {
			background-image: url("/static/images/bg/pages/landing-page/landing-page-section-5-bg.png");
	
			.fp-tableCell {
				display: flex;
				flex-flow: column;
				align-items: center;justify-content: center;
			}
	
			.logos-wrapper {
				margin: ${props => props.theme.heightRatio * 90}px
				 				0
				 				${props => props.theme.heightRatio * 107}px;
				max-width: ${props => props.theme.widthRatio * 955}px;
				
				img {
					width: ${props => props.theme.widthRatio * 143}px;
					height: ${props => props.theme.heightRatio * 143}px;
				}
			}
		}
	}
`;

const LandingPage = () => {
	return (
		<LandingPageWrapper>
			<ReactFullpage
				scrollingSpeed={1000}
				scrollHorizontally={true}
				className='landing-page'
				render={
					() => {
						return (
							<ReactFullpage.Wrapper>
								<div className={`section-1 section 'd-flex' flex-column`}>
									<Header />
									<img src={`/static/images/logo/logo-color.png`} className='logo animation-fadeIn' alt="logo"/>
									<div className="content-wrapper d-flex flex-column align-items-center">
										<div className="animation-slideUp">
											<h1 className='text-center'>Join the resistance and fight for the decentralised tomorrow</h1>
											<p className='text-center'>The year is 2074, underground cyber partisans form a resistance alliance called Node Runners. Their main goal is to defeat the corporate autocracy that has taken over the world.</p>
											<p className='text-center'>Do you have what it takes to join them?</p>
										</div>
										<button className='hover-effect1 animation-bigEntrance'>GET CARDS</button>
									</div>
								</div>

								<div className={`section-2 section 'd-flex' flex-column`}>
									<div className=''>
										<h1>Get hero cards that will kick  villain’s ass</h1>
										<p>Don’t forget the genesis heroes that have brought the decentralised world. With their help you will be able to fight and defeat the corporate villains.</p>
									</div>
									<button className='hover-effect1'>GET CARDS</button>
								</div>

								<div className={`section-3 section 'd-flex' flex-column`}>
									<div>
										<h1>Stake Heroes, Lock Villains, Earn NDR </h1>
										<p>Get rewarded for your hard work. Stake your Hero cards or Lock up defeated villains and get rewarded with NDR tokens. That's how justice is served.</p>
									</div>
									<button className='hover-effect1'>GET CARDS</button>
								</div>

								<div className={`section-4 section`}>
									<div className='icons-wrapper d-flex align-items-start w-100 justify-content-between'>
										<div className='d-flex flex-column align-items-center'>
											<img src={`/static/images/icons/inflationary.png`} alt='inflationary'/>
											<h1>Non inflationary </h1>
											<p className='text-center'>Every token transaction has a 2% fee which is used for NFT staking rewards.</p>
										</div>
										<div className='d-flex flex-column align-items-center'>
											<img src={`/static/images/icons/autopilot.png`} className='fit-content' alt="autopilot"/>
											<h1>Liquidity on autopilot</h1>
											<p className='text-center'>When you obtain cards for Ether, it is used to buy NDR from the market and provide liquidity to the NOR/ETH pool.</p>
										</div>
									</div>
									<button className='hover-effect1'>GET CARDS</button>
								</div>

								<div className={`section-5 section`}>
									<h1 className='text-center'>
										Stay connected<br />
										with the resistance
									</h1>
									<div className='logos-wrapper d-flex align-items-center justify-content-between w-100'>
										<a href='https://t.me/noderunners_channel' target='_blank'>
											<img src={`/static/images/icons/logo1.png`} alt="NodeRunners Telegram"/>
										</a>
										<a href='/' target='_blank'>
											<img src={`/static/images/icons/logo2.png`} alt=""/>
										</a>
										<a href='https://twitter.com/Node_Runners' target='_blank'>
											<img src={`/static/images/icons/logo3.png`} alt="NodeRunners Twitter"/>
										</a>
										<a href='https://noderunners.medium.com/' target='_blank'>
											<img src={`/static/images/icons/logo4.png`} alt="NodeRunners Medium"/>
										</a>
									</div>
									<p>Uniswap, Opensea, <a href='https://etherscan.io/token/0x739763a258640919981f9ba610ae65492455be53' target='_blank'>$NDR address</a></p>
								</div>
							</ReactFullpage.Wrapper>
						)
					}
				}/>
		</LandingPageWrapper>
	)
};

export default LandingPage;
