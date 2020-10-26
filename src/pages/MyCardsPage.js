import React from "react";
import styled from "styled-components";
import { Tab, Nav } from "react-bootstrap";
import SectionTitle from "../component/SectionTitle";

const MyCardsWrapper = styled.div`
	.nav-pills {
    margin: -40px 0 19px;

    .nav-item {
      .nav-link {
        color: #80f1ed;
        font-size: 30px;
        font-family: Orbitron-Medium;
        padding: 8px;
        outline: none;
        text-shadow: 7px 7px 10px #80f1ed91;

        &.active {
          color: #fec100;
          font-family: Orbitron-Black;
          background: none;
          text-shadow: 0 0 7px #fec10059;
        }
      }
    }
  }

  .stake-stats {
    div {
      span {
        font-size: 20px;
        max-width: 127px;
        font-family: Orbitron-Black;
        text-transform: uppercase;
        text-shadow: 5px 5px 3px #27787580;
        line-height: 1.2;
      }

      &:first-child {
        background: url('/assets/images/bg/card-menu/stats-first-bg.png');
        background-size: cover;
        width: 150px;
        height: 100px;
        margin-right: -8px;
        padding: 15px 0 0 2px;
      }

      &:last-child {
        background: url('/assets/images/bg/card-menu/stats-last-bg.png');
        background-size: cover;
        width: 150px;
        height: 100px;
        margin-left: -8px;
        padding: 15px 0 0 2px;
      }

      &.stat {
        background: url('/assets/images/bg/card-menu/stat-bg.png');
        background-size: cover;
        margin: 0 -7px;
        padding: 10px 12px 0;
        min-width: 293px;
        text-shadow: 15px 15px 10px #80f1ed91;

        h6 {
          color: #80f1ed;
          font-size: 20px;
          line-height: 1;
          margin: 0 0 7px;
        }

        p {
          color: #fec100;
          font-size: 30px;
          font-family: Orbitron-Black;
          line-height: 1;
          margin: 0;
        }
      }
    }
  }

  // .section-title {
  //   .title-wrapper {
  //     min-width: 1776px;
  //     margin-top: -34px;
  //   }
	//
  //   .title {
  //     background: url('/assets/images/bg/my-cards/title-bg.png');
  //     width: 272px;
  //     height: 67px;
  //     color: #fec100;
  //     font-size: 30px;
  //     font-family: Orbitron-Black;
  //     padding: 2px 0 0 13px;
  //     text-shadow: 5px 5px 3px #27787580;
  //   }
	//
  //   .title-line {
  //     background: url('/assets/images/bg/my-cards/title-line.png') no-repeat;
  //     background-position: bottom;
  //     width: 853px;
  //     height: 65px;
  //   }
  // }

  .card-wrapper {
    &.unstake {
      button {
        background: url('/assets/images/bg/card-menu/button-bg--stake.png');
        color: #fec100;
        font-size: 30px;
        font-family: Orbitron-Black;
        text-shadow: 0 0 7px #00000059;
      }
    }

    &:nth-of-type(2) {
      margin-top: 10px;
    }

    &:nth-of-type(3) {
      margin-top: 20px;
    }

    .card {
      width: 466px;
      height: 648px;
      position: relative;
      padding: 26px 24px;
      background: transparent;

      img {
        width: fit-content;

        &.card-bg {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
        }

        &.unstake-layer {
          position: absolute;
          top: 25px;
          z-index: 1;
        }
      }
    }

    button {
      width: 357px;
      height: 78px;
      background: url('/assets/images/bg/card-menu/button-bg.png');
      border: none;
      color: #161617;
      font-size: 30px;
      font-family: Orbitron-Medium;
      text-shadow: 5px 5px 3px #27787580;
      outline: none;
    }

    .score {
      font-size: 30px;
      font-family: Orbitron-Black;
      color: #fec100;
      text-shadow: #fec100 5px 5px 10px;
    }
  }
`;

const MyCards = () => {
	return (
		<MyCardsWrapper>
			<Tab.Container id="my-cards-page" defaultActiveKey="heroes">
				<Nav variant="pills" className="justify-content-center animation-fadeIn">
					<Nav.Item>
						<Nav.Link eventKey="heroes">Heroes</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="items">Items</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="villains">Villains</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="heroes">
						<div className="section-title d-flex justify-content-center animation-fadeInRight">
							<SectionTitle title={'Developers'} />
						</div>
						{/*<div className="d-flex justify-content-center">*/}
						{/*	<div className="card-wrapper d-flex flex-column animation-hatch">*/}
						{/*		<div className="card">*/}
						{/*			<img src={`/assets/images/card/card-1.png`} alt="card-1"/>*/}
						{/*			<img*/}
						{/*				src={`/assets/images/bg/card-menu/card-bg--stake.png`}*/}
						{/*				className='card-bg'*/}
						{/*				alt="card-bg"*/}
						{/*			/>*/}
						{/*		</div>*/}
						{/*		<div className="score">*/}
						{/*			<img src={`/assets/images/icons/cards.png`} className="card-icon" alt="cards"/>*/}
						{/*			<span>02</span>*/}
						{/*		</div>*/}
						{/*	</div>*/}
						{/*	<div*/}
						{/*		className={`card-wrapper d-flex invisible flex-column align-items-center animation-hatch animation-delay-1`}*/}
						{/*		onLoad={(e) => {*/}
						{/*			const elm = e.currentTarget;*/}
						{/*			setTimeout(() => {*/}
						{/*				elm.className = `visible ${elm.className}`;*/}
						{/*			}, 600);*/}
						{/*		}}*/}
						{/*	>*/}
						{/*		<div className="card">*/}
						{/*			<img src={`/assets/images/card/card-1.png`} alt="card-1"/>*/}
						{/*			/!*<img src={`/assets/images/bg/components/card/dark-overlay-bg.png`} alt="dark-overlay"/>*!/*/}
						{/*			<img*/}
						{/*				src={`/assets/images/bg/card-menu/card-bg--stake.png`}*/}
						{/*				className='card-bg'*/}
						{/*				alt="card-bg"*/}
						{/*			/>*/}
						{/*		</div>*/}
						{/*		<button className='hover-effect3'>*/}
						{/*			Obtain Card*/}
						{/*		</button>*/}
						{/*	</div>*/}
						{/*	<div*/}
						{/*		className="card-wrapper invisible d-flex flex-column animation-hatch animation-delay-2"*/}
						{/*		onLoad={(e) => {*/}
						{/*			const elm = e.currentTarget;*/}
						{/*			setTimeout(() => {*/}
						{/*				elm.className = `visible ${elm.className}`;*/}
						{/*			}, 1100);*/}
						{/*		}}*/}
						{/*	>*/}
						{/*		<div className="card">*/}
						{/*			<img src={`/assets/images/card/card-1.png`} alt="card-1"/>*/}
						{/*			<img*/}
						{/*				src={`/assets/images/bg/card-menu/card-bg--stake.png`}*/}
						{/*				className='card-bg'*/}
						{/*				alt="card-bg"*/}
						{/*			/>*/}
						{/*		</div>*/}
						{/*		<div className="score">*/}
						{/*			<img src={`/assets/images/icons/cards.png`} className="card-icon" alt="cards"/>*/}
						{/*			<span>69</span>*/}
						{/*		</div>*/}
						{/*	</div>*/}
						{/*	<div*/}
						{/*		className="card-wrapper unstake invisible d-flex flex-column align-items-center animation-hatch animation-delay-3"*/}
						{/*		onLoad={(e) => {*/}
						{/*			const elm = e.currentTarget;*/}
						{/*			setTimeout(() => {*/}
						{/*				elm.className = `visible ${elm.className}`;*/}
						{/*			}, 1600);*/}
						{/*		}}*/}
						{/*	>*/}
						{/*		<div className="card">*/}
						{/*			<img src={`/assets/images/card/card-1.png`} alt="card-1"/>*/}
						{/*			<img*/}
						{/*				src={`/assets/images/bg/card-menu/card-bg--unstake.png`}*/}
						{/*				className='card-bg'*/}
						{/*				alt="card-bg"*/}
						{/*			/>*/}
						{/*			<img*/}
						{/*				src={`/assets/images/bg/card-menu/unstake-layer.png`}*/}
						{/*				className='unstake-layer'*/}
						{/*				alt="unstake-layer"/>*/}
						{/*		</div>*/}
						{/*		<button className='hover-effect3'>*/}
						{/*			Obtain Card*/}
						{/*		</button>*/}
						{/*	</div>*/}
						{/*</div>*/}
						{/*<div className="section-title d-flex justify-content-center animation-fadeInRight">*/}
						{/*	<div className="title-wrapper d-flex">*/}
						{/*		<div className="title">*/}
						{/*			Influencers*/}
						{/*		</div>*/}
						{/*		<div className="title-line">*/}

						{/*		</div>*/}
						{/*	</div>*/}
						{/*</div>*/}
						{/*<div className="d-flex justify-content-center">*/}
						{/*	<div className="card-wrapper d-flex flex-column animation-hatch">*/}
						{/*		<div className="card">*/}
						{/*			<img src={`/assets/images/card/card-1.png`} alt="card-1"/>*/}
						{/*			<img*/}
						{/*				src={`/assets/images/bg/card-menu/card-bg--stake.png`}*/}
						{/*				className='card-bg'*/}
						{/*				alt="card-bg"*/}
						{/*			/>*/}
						{/*		</div>*/}
						{/*		<div className="score">*/}
						{/*			<img src={`/assets/images/icons/cards.png`} className="card-icon" alt="cards"/>*/}
						{/*			<span>02</span>*/}
						{/*		</div>*/}
						{/*	</div>*/}
						{/*	<div*/}
						{/*		className={`card-wrapper d-flex invisible flex-column align-items-center animation-hatch animation-delay-1`}*/}
						{/*		onLoad={(e) => {*/}
						{/*			const elm = e.currentTarget;*/}
						{/*			setTimeout(() => {*/}
						{/*				elm.className = `visible ${elm.className}`;*/}
						{/*			}, 600);*/}
						{/*		}}*/}
						{/*	>*/}
						{/*		<div className="card">*/}
						{/*			<img src={`/assets/images/card/card-1.png`} alt="card-1"/>*/}
						{/*			/!*<img src={`/assets/images/bg/components/card/dark-overlay-bg.png`} alt="dark-overlay"/>*!/*/}
						{/*			<img*/}
						{/*				src={`/assets/images/bg/card-menu/card-bg--stake.png`}*/}
						{/*				className='card-bg'*/}
						{/*				alt="card-bg"*/}
						{/*			/>*/}
						{/*		</div>*/}
						{/*		<button className='hover-effect3'>*/}
						{/*			Obtain Card*/}
						{/*		</button>*/}
						{/*	</div>*/}
						{/*	<div*/}
						{/*		className="card-wrapper invisible d-flex flex-column animation-hatch animation-delay-2"*/}
						{/*		onLoad={(e) => {*/}
						{/*			const elm = e.currentTarget;*/}
						{/*			setTimeout(() => {*/}
						{/*				elm.className = `visible ${elm.className}`;*/}
						{/*			}, 1100);*/}
						{/*		}}*/}
						{/*	>*/}
						{/*		<div className="card">*/}
						{/*			<img src={`/assets/images/card/card-1.png`} alt="card-1"/>*/}
						{/*			<img*/}
						{/*				src={`/assets/images/bg/card-menu/card-bg--stake.png`}*/}
						{/*				className='card-bg'*/}
						{/*				alt="card-bg"*/}
						{/*			/>*/}
						{/*		</div>*/}
						{/*		<div className="score">*/}
						{/*			<img src={`/assets/images/icons/cards.png`} className="card-icon" alt="cards"/>*/}
						{/*			<span>69</span>*/}
						{/*		</div>*/}
						{/*	</div>*/}
						{/*	<div*/}
						{/*		className="card-wrapper unstake invisible d-flex flex-column align-items-center animation-hatch animation-delay-3"*/}
						{/*		onLoad={(e) => {*/}
						{/*			const elm = e.currentTarget;*/}
						{/*			setTimeout(() => {*/}
						{/*				elm.className = `visible ${elm.className}`;*/}
						{/*			}, 1600);*/}
						{/*		}}*/}
						{/*	>*/}
						{/*		<div className="card">*/}
						{/*			<img src={`/assets/images/card/card-1.png`} alt="card-1"/>*/}
						{/*			<img*/}
						{/*				src={`/assets/images/bg/card-menu/card-bg--unstake.png`}*/}
						{/*				className='card-bg'*/}
						{/*				alt="card-bg"*/}
						{/*			/>*/}
						{/*			<img*/}
						{/*				src={`/assets/images/bg/card-menu/unstake-layer.png`}*/}
						{/*				className='unstake-layer'*/}
						{/*				alt="unstake-layer"/>*/}
						{/*		</div>*/}
						{/*		<button className='hover-effect3'>*/}
						{/*			Obtain Card*/}
						{/*		</button>*/}
						{/*	</div>*/}
						{/*</div>*/}
					</Tab.Pane>
					<Tab.Pane eventKey="items">

					</Tab.Pane>
					<Tab.Pane eventKey="villains">

					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</MyCardsWrapper>
	);
};

export default MyCards;
