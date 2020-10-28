import React from "react";
import styled from "styled-components";

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
		
		p {
			font-size: 20px;
			font-family: Orbitron-Medium;
		}
		
		span {
			font-size: 24px;
			font-family: Orbitron-Black;
			color: ${props => props.theme.palette.secondary.main};
		}
		
		&:first-of-type {
			background-image: url("/static/images/bg/pages/unlock-wallet/meta-mask.png");
			text-shadow: 10px 10px 10px ${props => props.theme.darken(props.theme.palette.secondary.main, 0.57)};
			
			p {
				color: #ff24c8;
			}
		}
		
		&:last-of-type {
			background-image: url("/static/images/bg/pages/unlock-wallet/wallet-connect.png");
			text-shadow: 10px 10px 10px ${props => props.theme.darken(props.theme.palette.primary.main, 0.57)};
			
			p {
				color: ${props => props.theme.palette.primary.main};
			}
		}
	}
`;

const UnlockWallet = () => {
	return (
		<UnlockWalletWrapper>
			<div className="meta-mask d-flex flex-column align-items-center justify-content-center">
				<img src={`/static/images/icons/meta-mask.png`} alt="meta-mask"/>
				<p>Connect to your <span>MetaMask</span> wallet</p>
			</div>
			<div className="wallet-connect d-flex flex-column align-items-center justify-content-center">
				<img src={`/static/images/icons/wallet-connect.png`} alt="wallet-connect"/>
				<p>Scan with <span>WalletConnect</span> to connect</p>
			</div>
		</UnlockWalletWrapper>
	)
};

export default UnlockWallet;
