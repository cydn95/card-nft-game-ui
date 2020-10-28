import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
	.card {
		width: 466px;
    height: 648px;
		position: relative;
		padding: 25px 22px;
		background: transparent;
		
		.card-image {
			width: 420px;
			height: 600px;
			position: absolute;
			
			&.un-obtained {
				opacity: 0.3;
			}
		}
		
		.un-obtained {
			width: 420px;
			height: 600px;
			opacity: 0.5;
		}
		
		.un-staked {
			width: 420px;
			height: 600px;
		}
		
		.card-border {
			position: absolute;
			top: 0;
			left: 0;
		}
		
		.marked {
			position: absolute;
			top: 10px;
			left: 10px;
			width: 149px;
			height: 149px;
		}
	}
	
	.score {
		font-size: 30px;
    font-family: Orbitron-Black;
    color: #fec100;
    text-shadow: #fec100 5px 5px 10px;
    display: flex;
    margin-top: -3px;
    padding-left: 22px;
    
    span {
    	padding-top: 3px;
    	margin-left: -2px;
    }
	}
	
	.button-wrapper {
		margin-top: -17px;
		
		.card-grid {
			width: 466px;
			padding: 0 22px;
			margin-top: 30px;
			text-shadow: 7px 7px 10px ${props => props.theme.darken(props.theme.palette.primary.main, 0.57)};
		
			h4 {
				font-size: 30px;
				font-family: Orbitron-Black;
				color: ${props => props.theme.palette.primary.main};
				border-bottom: 2px solid ${props => props.theme.palette.primary.main};
				padding-bottom: 4px;
				margin-bottom: 5px;
			}
			
			label {
				font-size: 20px;
				font-family: Orbitron-Medium;
				color: ${props => props.theme.palette.primary.main};
				margin-bottom: 0;
			}
			
			span {
				font-size: 20px;
				font-family: Orbitron-Black;
				color: ${props => props.theme.palette.secondary.main};
				padding-left: 7px;
			}
			
			.text-wrapper {
				line-height: 24px;
			}
		
			.grid-button-wrapper {
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				
				button {
					padding-bottom: -7px;
				
					&.hash-button {
						width: 229px;
						height: 53px;
						background-image: url('/static/images/bg/components/card/hash-button-bg.png'); 
						background-size: 100% 100%;
						margin-left: -5px;
						padding-bottom: 7px;
					}
					&.eth-button {
						width: 223px;
						height: 58px;
						background-image: url('/static/images/bg/components/card/eth-button-bg.png');
						background-size: 100% 100%;
						margin-right: -13px;
						padding-bottom: 7px;
					}
					&.buy-button {
						width: 436px;
						height: 58px;
						background-image: url('/static/images/bg/components/card/buy-button-bg.png');
						background-size: 100% 100%;
					}	
				}
			}
		}
	
		button {
			width: 357px;
			height: 78px;
			background: url('/static/images/bg/components/card/button-bg.png');
			border: none;
			color: #161617;
			font-size: 30px;
			font-family: Orbitron-Medium;
			text-shadow: 5px 5px 3px #27787580;
			outline: none;
		}	
	}
`;

const Card = ({ card, unObtained, marked, score, unStaked, cardGrid }) => {
	return (
		<CardWrapper>
			<div className="card">
				{
					unObtained
						? <img
							src={`/static/images/bg/components/card/un-obtained.png`}
							alt="unObtained"
							className="un-obtained"
						/>
						: ''
				}
				{
					unStaked
						? <img
							src={`/static/images/bg/components/card/un-staked.png`}
							alt="unStaked"
							className="un-staked"
						/>
						: <img
							src={`/static/images/cards/${card}.png`}
							alt={`${card}`}
							className={`card-image ${unObtained ? 'un-obtained' : ''}`}
						/>
				}
				<img
					src={`/static/images/bg/components/card/card-border.png`}
					alt="card-border"
					className="card-border"
				/>
				{
					marked
						? <img
							src={`/static/images/bg/components/card/marked.png`}
							alt="marked"
							className="marked"
						/>
						: ''
				}
			</div>
			{
				score
					? <div className="score">
						<img
							src={`/static/images/icons/cards.png`}
							alt="cards"
							className="card-icon"
						/>
						<span>{ score }</span>
					</div>
					: <div className="button-wrapper text-center">
						{
							unObtained
								? <button className='hover-effect3 un-obtained'>
									Obtain Card
								</button>
								: unStaked
								? <button className='hover-effect3'>
									Stake
								</button>
								: cardGrid
									? <div className="card-grid">
										<h4 className="text-left">{ cardGrid.name }</h4>
										<div className="d-flex">
											<div className="w-50 text-wrapper">
												<div className="text-left">
													<label>Strength:</label>
													<span>{ cardGrid.strength }</span>
												</div>
												<div className="text-left">
													<label>Minted:</label>
													<span>{ `${cardGrid.hash}/${cardGrid.eth}` }</span>
												</div>
											</div>
											<div className="w-50 text-wrapper">
												<div className="text-right">
													<label>Defense:</label>
													<span>{ cardGrid.defense }</span>
												</div>
												<div className="text-right">
													<label>Rarity:</label>
													<span>{ cardGrid.rarity }</span>
												</div>
											</div>
										</div>
										<div className="grid-button-wrapper">
											{
												cardGrid.payed
													? (
														<>
															<button className="hash-button hover-effect2">
																{ cardGrid.hash } Hash
															</button>
															<button className="eth-button hover-effect2">
																{ cardGrid.eth } Eth
															</button>
														</>
													)
													: <button className="buy-button hover-effect2">
														Buy on Opensea
													</button>
											}
										</div>
									</div>
									: <button className='hover-effect3'>
										Unstake
									</button>
						}
					</div>
			}
		</CardWrapper>
	);
};

export default Card;
