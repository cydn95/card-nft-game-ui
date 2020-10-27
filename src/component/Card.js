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
									? ''
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
