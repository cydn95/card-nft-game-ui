import React from "react";
import styled from "styled-components";
import {Nav, Tab} from "react-bootstrap";

import {
	ShoppingCart,
	Reply
} from "@material-ui/icons";

import SectionTitle from "../component/SectionTitle";
import Card from "../component/Card";

const GetHeroesWrapper = styled.div`
	.card-credit {
    > div {
      span {
        font-size: 20px;
        max-width: 127px;
        font-family: Orbitron-Black;
        text-transform: uppercase;
        text-shadow: 5px 5px 3px #27787580;
        line-height: 1.2;
      }

      &.action {
        background-image: url('/static/images/bg/pages/get-heroes/credit-button-bg.png');
        background-size: 100% 100%;
        width: 140px;
        height: 100px;
        margin-right: -13px;
        padding: 0 17px 22px 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        
        &:hover {
        	background-image: url('/static/images/bg/pages/get-heroes/credit-button-bg--active.png');        	
        }
        
        &:nth-child(3) {
        	.MuiSvgIcon-root {
						transform: rotateY(180deg);
					}
       	}
        
        &:last-child {
					background: url('/static/images/bg/pages/get-heroes/credit-last-button-bg.png');
					background-size: 100% 100%;
					width: 140px;
					height: 100px;
				}
      }

      &.credit {
        background: url('/static/images/bg/pages/get-heroes/credit-bg.png');
        background-size: 100% 100%;
        margin-right: -13px;
        padding: 6px 22px 26px 10px;
        min-width: 405px;
        text-shadow: 10px 10px 10px #80f1ed91;
        
        > div:first-child {
        	margin-bottom: 4px;
        }

        label {
          color: #80f1ed;
          font-size: 30px;
          font-family: Orbitron-Medium;
          line-height: 1;
          margin: 0;
        }

        span {
          color: #fec100;
          font-size: 30px;
          font-family: Orbitron-Black;
          line-height: 1;
          padding-left: 9px;
          margin: 0;
          text-shadow: inherit;
        }
      }
    }
  }
`;

const Heroes = [
	{
		card: 'card-1',
		cardGrid: {
			name: 'Micheal Egorov',
			strength: 16,
			defense: 29,
			rarity: 'common',
			hash: 100,
			eth: 10,
			payed: true
		}
	},
	{
		card: 'card-2',
		cardGrid: {
			name: 'Micheal Egorov',
			strength: 16,
			defense: 29,
			rarity: 'common',
			hash: 100,
			eth: 10,
			payed: true
		}
	},
	{
		card: 'card-3',
		cardGrid: {
			name: 'Micheal Egorov',
			strength: 16,
			defense: 29,
			rarity: 'common',
			hash: 100,
			eth: 10,
			payed: true
		}
	},
	{
		card: 'card-2',
		cardGrid: {
			name: 'Micheal Egorov',
			strength: 16,
			defense: 29,
			rarity: 'common',
			hash: 100,
			eth: 10,
			payed: false
		}
	}
];

const GetHeroes = () => {
	return (
		<GetHeroesWrapper>
			<Tab.Container id="left-tabs-example" defaultActiveKey="heroes">
				<Nav variant="pills" className="justify-content-center animation-fadeIn">
					<Nav.Item>
						<Nav.Link eventKey="heroes">Heroes</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="items">Items</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="heroes">
						<div className="card-credit d-flex justify-content-center animation-slideDown">
							<div className="credit">
								<div>
									<label>Hashes:</label>
									<span>5.87</span>
								</div>
								<div>
									<label>Staked:</label>
									<span>10 UNI-LP</span>
								</div>
							</div>
							<div className="action">
								<ShoppingCart />
								<span>BUY</span>
							</div>
							<div className="action">
								<Reply />
								<span>
									STAKE
								</span>
							</div>
							<div className="action">
								<Reply />
								<span>
									UNSTAKE
								</span>
							</div>
						</div>
						<div className="section-title d-flex justify-content-center animation-fadeInRight">
							<SectionTitle title={'Heroes'} />
						</div>
						<div className="d-flex justify-content-center">
							{
								Heroes.map((c) => <Card card={c.card} cardGrid={c.cardGrid} />)
							}
						</div>
					</Tab.Pane>
					<Tab.Pane eventKey="items">
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</GetHeroesWrapper>
	);
};

export default GetHeroes;
